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
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch tenants");
      const data = await res.json();

      if (data?.tenants) {
        const parsed: Tenant[] = data.tenants.map((t: string) => {
          const idx = t.lastIndexOf("_");
          return {
            name: t.substring(0, idx), // "KIMS" or "Vasavi Eye Care"
            id: t, // full string with UUID
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
        { headers: { Authorization: `Bearer ${token}` } }
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
    <div className="p-6 justify-center text-center ">
      <div className="p-6 flex justify-around text-center ">
        <h1 className="text-xl font-bold mb-4">Tenant Patients</h1>
        {tenants.length > 0 ? (
          <div className="mb-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline"  className="max-w-screen-lg">
                  {selectedTenant ? selectedTenant.name : "Select Tenant"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-w-screen-lg bg-slate-200">
                {tenants.map((t) => (
                  <DropdownMenuItem
                    key={t.id}
                    onClick={() => {
                      setSelectedTenant(t);
                      fetchPatients(t.id);
                    }}
                  >
                    {t.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="text-gray-600">Loading tenants...</div>
        )}
      </div>

      {/* ✅ Dropdown */}

      {/* ✅ Patients */}
      {loading ? (
        <div className="text-center">Loading patients...</div>
      ) : patients.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Age</th>
              <th className="border px-4 py-2">Gender</th>
              <th className="border px-4 py-2">Hospital</th>
              <th className="border px-4 py-2">Doctor</th>
              <th className="border px-4 py-2">Mobile</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.composite_id}>
                <td className="border px-4 py-2">{p.composite_id}</td>
                <td className="border px-4 py-2">{p.name}</td>
                <td className="border px-4 py-2">{p.Age}</td>
                <td className="border px-4 py-2">{p.gender}</td>
                <td className="border px-4 py-2">{p.Hospital_name}</td>
                <td className="border px-4 py-2">{p.assigned_doctor}</td>
                <td className="border px-4 py-2">{p.mobile_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        selectedTenant && (
          <div className="text-center text-gray-600">No patients found</div>
        )
      )}
    </div>
  );
}
