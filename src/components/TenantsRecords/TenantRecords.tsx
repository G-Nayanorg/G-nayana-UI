"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-hot-toast";
import {
  ChevronDown,
  Building2,
  Users,
  Search,
  Phone,
  User,
  Activity,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Tenant {
  name: string;
  id: string;
}

interface Patient {
  composite_id: string;
  name: string;
  gender: string;
  Age: number;
  Hospital_name: string;
  assigned_doctor: string;
  mobile_number: string;
  tenant_id: string;
}

const apiBase = import.meta.env.VITE_API_BASE;
const Tenant_API = `${apiBase}/Get_patient_Clinical_and_PREDICTION_data`;

export default function TenantPatients() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);

  const getAuthToken = () =>
    localStorage.getItem("token") ||
    localStorage.getItem("access_token") ||
    localStorage.getItem("authToken");

  // ✅ Fetch tenants
  const fetchTenants = async () => {
    try {
      const token = getAuthToken();
      const res = await fetch(`${Tenant_API}/tenants`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch tenants");
      const data = await res.json();

      if (data?.tenants) {
        const parsed: Tenant[] = data.tenants.map((t: string) => {
          const idx = t.lastIndexOf("_");
          return {
            name: t.substring(0, idx),
            id: t,
          };
        });
        setTenants(parsed);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load tenants");
    }
  };

  // ✅ Fetch patients by tenant
  const fetchPatients = async (tenantId: string) => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const res = await fetch(
        `${Tenant_API}/get_patient_data_clinical?tenant_id=${tenantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        },
      );

      if (!res.ok) throw new Error("Failed to fetch patients");
      const data = await res.json();
      setPatients(data?.patient_data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch patients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8 pt-20 md:pt-24 pb-24">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              Tenant Patients
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              Manage and view patient records via Tenant selection
            </p>
          </div>

          <div className="w-full md:w-auto">
            {tenants.length > 0 ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full md:w-[280px] h-12 justify-between bg-white border-blue-200 hover:bg-blue-50 text-base font-medium transition-all duration-200 shadow-sm"
                  >
                    <span className="truncate">
                      {selectedTenant ? selectedTenant.name : "Select Tenant"}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[300px] overflow-y-auto bg-white/95 backdrop-blur-xl border-blue-100 shadow-xl rounded-xl">
                  {tenants.map((t) => (
                    <DropdownMenuItem
                      key={t.id}
                      onClick={() => {
                        setSelectedTenant(t);
                        fetchPatients(t.id);
                      }}
                      className="py-3 px-4 cursor-pointer hover:bg-blue-50 focus:bg-blue-50 transition-colors bg-white hover:text-blue-700"
                    >
                      <Building2 className="h-4 w-4 mr-2 text-blue-500" />
                      {t.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                disabled
                variant="outline"
                className="w-full md:w-auto h-12 bg-gray-50"
              >
                <span className="animate-pulse">Loading tenants...</span>
              </Button>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="relative">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-3xl border border-white/20 shadow-lg backdrop-blur-sm">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-blue-900 font-medium animate-pulse">
                Fetching patient records...
              </p>
            </div>
          ) : patients.length > 0 ? (
            <>
              {/* Desktop Table View (> md) */}
              <div className="hidden md:block bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50/50 border-b border-gray-100">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Patient ID
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Details
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Hospital Info
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {patients.map((p) => (
                        <tr
                          key={p.composite_id}
                          className="hover:bg-blue-50/50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              #{p.composite_id.slice(0, 8)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs mr-3">
                                {p.name[0]}
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                {p.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {p.Age} yrs • {p.gender}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-900">
                                {p.Hospital_name}
                              </span>
                              <span className="text-xs text-gray-500">
                                Dr. {p.assigned_doctor}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                            {p.mobile_number}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Card View (< md) */}
              <div className="md:hidden grid grid-cols-1 gap-4">
                {patients.map((p) => (
                  <div
                    key={p.composite_id}
                    className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 hover:border-blue-200 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
                          {p.name[0]}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{p.name}</h3>
                          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                            #{p.composite_id.slice(0, 8)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex flex-col gap-1 p-2 bg-gray-50 rounded-lg">
                        <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                          <User className="h-3 w-3" /> Info
                        </span>
                        <span className="font-semibold text-gray-700">
                          {p.Age} yrs, {p.gender}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1 p-2 bg-gray-50 rounded-lg">
                        <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                          <Phone className="h-3 w-3" /> Contact
                        </span>
                        <span className="font-semibold text-gray-700">
                          {p.mobile_number}
                        </span>
                      </div>

                      <div className="col-span-2 flex flex-col gap-1 p-2 bg-gray-50 rounded-lg">
                        <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                          <Building2 className="h-3 w-3" /> Hospital
                        </span>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-700">
                            {p.Hospital_name}
                          </span>
                          <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                            Dr. {p.assigned_doctor}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            selectedTenant && (
              <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-3xl border border-white/20 shadow-lg text-center backdrop-blur-sm">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  No patients found
                </h3>
                <p className="text-gray-500 max-w-sm mt-1">
                  No records were found for the selected tenant. Try selecting a
                  different tenant.
                </p>
              </div>
            )
          )}

          {!loading && !selectedTenant && patients.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-3xl border border-white/20 shadow-lg text-center backdrop-blur-sm">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Get Started
              </h3>
              <p className="text-gray-500 max-w-sm mt-1">
                Select a tenant from the dropdown above to view their patient
                records.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
