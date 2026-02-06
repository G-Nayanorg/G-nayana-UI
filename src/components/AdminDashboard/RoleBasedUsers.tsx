import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Phone,
  Mail,
  Building2,
  Calendar,
  User,
  Shield,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

const apiBase = import.meta.env.VITE_API_BASE;

interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  mobile_number: string;
  email: string;
  role: string;
  hospital_name: string | null;
  created_at: string;
}

const RoleBasedUsers: React.FC<{ role: string }> = ({ role }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getAuthToken = () =>
    localStorage.getItem("token") ||
    localStorage.getItem("access_token") ||
    localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = getAuthToken();

        if (!token) {
          localStorage.removeItem("token");
          localStorage.removeItem("access_token");
          localStorage.removeItem("authToken");
          navigate("/"); // redirect to home
          return; // stop further execution
        }

        const res = await fetch(`${apiBase}/admin/users?role=${role}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (!res.ok) {
          console.error(`Error fetching users: ${res.status}`);
          return;
        }

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [role, navigate]);

  if (loading)
    return (
      <div className="flex flax-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
        <p className="text-sm text-gray-500 font-medium">
          Loading {role} users...
        </p>
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div
          className={cn(
            "p-2 rounded-lg",
            role.toLowerCase() === "superadmin"
              ? "bg-purple-100 text-purple-600"
              : "bg-blue-100 text-blue-600",
          )}
        >
          {role.toLowerCase() === "superadmin" ? (
            <Shield className="h-6 w-6" />
          ) : (
            <Users className="h-6 w-6" />
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-800 capitalize">
          {role} Users
          <span className="ml-2 text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            {users.length}
          </span>
        </h2>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  User Info
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Hospital
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.length > 0 ? (
                users.map((u) => (
                  <tr
                    key={u.id}
                    className="hover:bg-gray-50/80 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        #{u.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold text-xs mr-3">
                          {u.first_name[0]}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-900">
                            {u.first_name} {u.last_name}
                          </span>
                          <span className="text-xs text-gray-500">
                            @{u.username}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center text-xs text-gray-600">
                          <Phone className="h-3 w-3 mr-1.5 text-gray-400" />
                          {u.mobile_number}
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <Mail className="h-3 w-3 mr-1.5 text-gray-400" />
                          {u.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 flex items-center gap-1.5">
                        {u.hospital_name ? (
                          <>
                            <Building2 className="h-3.5 w-3.5 text-gray-400" />
                            {u.hospital_name}
                          </>
                        ) : (
                          <span className="text-gray-400 italic">N/A</span>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No {role} users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {users.length > 0 ? (
          users.map((u) => (
            <div
              key={u.id}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:border-blue-100 transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {u.first_name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">
                      {u.first_name} {u.last_name}
                    </h3>
                    <p className="text-xs text-blue-600 font-medium">
                      @{u.username}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-bold bg-gray-100 text-gray-600">
                  #{u.id}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <div className="p-1.5 bg-white rounded-md shadow-sm text-gray-400">
                    <Phone className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {u.mobile_number}
                  </span>
                </div>

                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <div className="p-1.5 bg-white rounded-md shadow-sm text-gray-400">
                    <Mail className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 truncate">
                    {u.email}
                  </span>
                </div>

                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <div className="p-1.5 bg-white rounded-md shadow-sm text-gray-400">
                    <Building2 className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {u.hospital_name || "No Hospital Info"}
                  </span>
                </div>

                <div className="pt-2 mt-1 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Joined
                  </span>
                  <span>{new Date(u.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">No {role} users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleBasedUsers;
