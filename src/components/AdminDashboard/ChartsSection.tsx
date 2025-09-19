import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const apiBase = import.meta.env.VITE_API_BASE;

const COLORS = [
  "hsl(214 83% 47%)",
  "hsl(158 64% 51%)",
  "hsl(43 89% 58%)",
  "hsl(267 57% 52%)",
  "hsl(12 85% 61%)",
  "hsl(200 70% 50%)",
];

const getColor = (index: number) => COLORS[index % COLORS.length];

const ChartsSection: React.FC = () => {
  const navigate = useNavigate();
  const [overall, setOverall] = useState<any[]>([]);
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [confidenceStages, setConfidenceStages] = useState<any[]>([]);
  const [hospitalDistribution, setHospitalDistribution] = useState<any[]>([]);

  const getAuthToken = () =>
    localStorage.getItem("token") ||
    localStorage.getItem("access_token") ||
    localStorage.getItem("authToken");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          localStorage.clear();
          navigate("/");
          return;
        }

        // ✅ API #1: disease distribution
        const res1 = await fetch(`${apiBase}/analytics/disease/stages`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res1.ok) throw new Error(`Error ${res1.status}`);
        const result1 = await res1.json();
        setOverall(result1.overall_distribution);
        setHospitals(result1.tenant_wise_distribution);
        setHospitalDistribution(result1.tenant_wise_distribution);

        // ✅ API #2: avg confidence
        const res2 = await fetch(`${apiBase}/analytics/disease/stages/avg-confidence`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res2.ok) throw new Error(`Error ${res2.status}`);
        const result2 = await res2.json();
        setConfidenceStages(result2.distribution);
      } catch (err) {
        console.error("Error fetching analytics data:", err);
      }
    };

    fetchAnalytics();
  }, [navigate]);

  // Custom Pie label
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const hospitalData = hospitals.map((h) => ({
    name: h.hospital_name || h.tenant_id,
    value: h.total_records,
    tenant_id: h.tenant_id,
    hospital_name: h.hospital_name,
  }));

  const stackedHospitalData = hospitalDistribution.map((h) => {
    const row: any = { hospital_name: h.hospital_name || h.tenant_id };
    h.distribution.forEach((d: any) => {
      row[d.stage] = d.count;
    });
    return row;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Overall Distribution Pie */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Overall Disease Stage Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={overall}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={110}
                  dataKey="count"
                  nameKey="stage"
                >
                  {overall.map((entry, index) => (
                    <Cell key={`cell-overall-${index}`} fill={getColor(index)} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Hospital-wise Contribution Pie */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Hospital Contribution to Overall Patients
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={hospitalData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={110}
                  dataKey="value"
                  nameKey="name"
                >
                  {hospitalData.map((entry, index) => (
                    <Cell key={`cell-hospital-${index}`} fill={getColor(index)} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props: any) => {
                    const { tenant_id, hospital_name } = props.payload;
                    return [`${value} patients`, `${hospital_name} (Tenant: ${tenant_id})`];
                  }}
                />
                <Legend
                  formatter={() => ""}
                  payload={hospitalData.map((entry, index) => ({
                    id: entry.name,
                    type: "square",
                    color: getColor(index),
                    value: "",
                  }))}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Avg Confidence */}
      <Card className="shadow-md col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Avg Confidence by Disease Stage
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Model prediction confidence for each stage
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={confidenceStages}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="stage" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="avg_confidence" radius={[4, 4, 0, 0]}>
                  {confidenceStages.map((entry, index) => (
                    <Cell key={`cell-bar-${index}`} fill={getColor(index)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Hospital-wise Stacked Bar */}
      {stackedHospitalData.length > 0 && (
        <Card className="shadow-md col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">
              Disease Distribution per Hospital
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stackedHospitalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="hospital_name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {overall.map((stage, index) => (
                    <Bar key={stage.stage} dataKey={stage.stage} stackId="a" fill={getColor(index)} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChartsSection;
