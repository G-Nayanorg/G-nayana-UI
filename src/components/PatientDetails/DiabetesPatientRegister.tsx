import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  User,
  Activity,
  Building2,
  Calendar,
  ChevronDown,
  Check,
  AlertCircle,
  Heart,
  Eye,
  Phone,
  UserCheck,
  Menu,
  Shield,
  Stethoscope,
  FileText,
  CheckCircle,
} from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import SuccessAnimation from "./SuccessAnimation";

const apiBase = import.meta.env.VITE_API_BASE;

interface FormErrors {
  patient_id?: string;
  name?: string;
  age?: string;
  gender?: string;
  mobile_number?: string;
  Hospital_name?: string;
  Date_of_registration?: string;
  Duration_of_Diabetes?: string;
  HbA1c_Level?: string;
  Blood_Pressure?: string;
  Blood_Pressure_Systolic?: string;
  Blood_Pressure_Diastolic?: string;
  Fasting_Blood_Glucose?: string;
  BMI?: string;
  Cholesterol?: string;
  Albuminuria?: string;
  num_visits?: string;
  visits_id?: number | string;
  assigned_doctor?: string;
  tenant_id?: string;
}

interface Tenant {
  name: string;
  id: string;
}

const DiabetesPatientRegister: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const totalSteps = 4;

  const [registerMode, setRegisterMode] = useState<"new" | "op">("new");

  const [formData, setFormData] = useState<any>({
    patient_id: "",
    name: "",
    age: "",
    gender: "",
    mobile_number: "",
    HbA1c_Level: "",
    Fasting_Blood_Glucose: "",
    Blood_Pressure_Systolic: "",
    Blood_Pressure_Diastolic: "",
    Cholesterol: "",
    BMI: "",
    Albuminuria: "",
    Duration_of_Diabetes: "",
    Visual_Acuity: "Normal",
    // Hospital_name: "",
    assigned_doctor: "",
    Date_of_registration: new Date(),
    tenant_id: "",
  });

  const getAuthToken = () =>
    localStorage.getItem("token") ||
    localStorage.getItem("access_token") ||
    localStorage.getItem("authToken");

  // Fetch tenants
  const fetchTenants = async () => {
    try {
      const token = getAuthToken();
      const res = await fetch(
        `${apiBase}/Get_patient_Clinical_and_PREDICTION_data/tenants`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        },
      );

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
      console.warn(
        "Could not fetch tenants (likely insufficient permissions or network error)",
        err,
      );
      // Suppress toast: clients don't need to see this error if they don't have access
      // toast.error("Failed to load tenants");
    }
  };

  React.useEffect(() => {
    fetchTenants();
  }, []);

  const [errors, setErrors] = useState<FormErrors>({});

  const validateStep1 = (data: typeof formData): FormErrors => {
    const newErrors: FormErrors = {};

    // If OP mode, patient_id is required and must be positive integer
    if (registerMode === "op") {
      if (!data.patient_id && data.patient_id !== 0) {
        newErrors.patient_id = "Patient ID is required for OP patients.";
      } else {
        const pid = parseInt(String(data.patient_id), 10);
        if (isNaN(pid) || pid <= 0) {
          newErrors.patient_id = "Patient ID must be a positive integer.";
        }
      }
    }

    if (!data.name || !data.name.trim())
      newErrors.name = "Patient name is required.";
    if (!data.age && data.age !== 0) {
      newErrors.age = "Age is required.";
    } else {
      const ageNum = parseInt(String(data.age), 10);
      if (isNaN(ageNum) || ageNum < 18 || ageNum > 90) {
        newErrors.age = "Age must be an integer between 18 and 90 years.";
      }
    }
    if (!data.gender) newErrors.gender = "Gender is required.";
    if (!data.mobile_number || !String(data.mobile_number).trim())
      newErrors.mobile_number = "Mobile number is required.";
    else if (!/^\d{10}$/.test(String(data.mobile_number)))
      newErrors.mobile_number = "Enter a valid 10 digit mobile number.";

    return newErrors;
  };

  const validateStep2 = (data: typeof formData): FormErrors => {
    const newErrors: FormErrors = {};
    const {
      Duration_of_Diabetes,
      HbA1c_Level,
      Blood_Pressure_Diastolic,
      Blood_Pressure_Systolic,
      Fasting_Blood_Glucose,
      BMI,
      Cholesterol,
      Albuminuria,
    } = data;

    if (
      Duration_of_Diabetes === "" ||
      Duration_of_Diabetes === null ||
      Duration_of_Diabetes === undefined
    ) {
      newErrors.Duration_of_Diabetes = "Duration of Diabetes is required.";
    } else {
      const dod = parseInt(String(Duration_of_Diabetes), 10);
      if (isNaN(dod) || dod < 0 || dod > 50) {
        newErrors.Duration_of_Diabetes =
          "Duration must be an integer between 0 and 50 years.";
      }
    }

    if (!HbA1c_Level && HbA1c_Level !== 0) {
      newErrors.HbA1c_Level = "HbA1c Level is required.";
    } else {
      const hba1c = parseFloat(String(HbA1c_Level));
      if (isNaN(hba1c) || hba1c < 4.0 || hba1c > 14.0) {
        newErrors.HbA1c_Level = "HbA1c Level must be between 4.0 and 14.0%.";
      }
    }

    // Systolic
    if (
      Blood_Pressure_Systolic === "" ||
      Blood_Pressure_Systolic === null ||
      Blood_Pressure_Systolic === undefined
    ) {
      newErrors.Blood_Pressure_Systolic = "Systolic BP is required.";
    } else {
      const s = parseInt(String(Blood_Pressure_Systolic), 10);
      if (isNaN(s) || s < 70 || s > 250) {
        newErrors.Blood_Pressure_Systolic =
          "Enter a valid systolic BP (70-250).";
      }
    }

    // Diastolic
    if (
      Blood_Pressure_Diastolic === "" ||
      Blood_Pressure_Diastolic === null ||
      Blood_Pressure_Diastolic === undefined
    ) {
      newErrors.Blood_Pressure_Diastolic = "Diastolic BP is required.";
    } else {
      const d = parseInt(String(Blood_Pressure_Diastolic), 10);
      if (isNaN(d) || d < 30 || d > 150) {
        newErrors.Blood_Pressure_Diastolic =
          "Enter a valid diastolic BP (30-150).";
      }
    }

    if (!Fasting_Blood_Glucose && Fasting_Blood_Glucose !== 0) {
      newErrors.Fasting_Blood_Glucose = "Fasting Blood Glucose is required.";
    } else {
      const fbg = parseFloat(String(Fasting_Blood_Glucose));
      if (isNaN(fbg) || fbg < 70 || fbg > 300) {
        newErrors.Fasting_Blood_Glucose =
          "Fasting Blood Glucose must be between 70 and 300 mg/dL.";
      }
    }

    if (!BMI && BMI !== 0) {
      newErrors.BMI = "BMI is required.";
    } else {
      const bmiVal = parseFloat(String(BMI));
      if (isNaN(bmiVal) || bmiVal < 10 || bmiVal > 50) {
        newErrors.BMI = "BMI must be between 10 and 50 kg/m².";
      }
    }

    if (!Cholesterol && Cholesterol !== 0) {
      newErrors.Cholesterol = "Cholesterol is required.";
    } else {
      const chol = parseInt(String(Cholesterol), 10);
      if (isNaN(chol) || chol < 100 || chol > 400) {
        newErrors.Cholesterol =
          "Cholesterol must be an integer between 100 and 400 mg/dL.";
      }
    }

    if (!Albuminuria && Albuminuria !== 0) {
      newErrors.Albuminuria = "Albuminuria is required.";
    } else {
      const alb = parseFloat(String(Albuminuria));
      if (isNaN(alb) || alb < 0 || alb > 1000) {
        newErrors.Albuminuria = "Albuminuria must be between 0 and 1000 mg/dL.";
      }
    }

    return newErrors;
  };

  const validateStep3 = (data: typeof formData): FormErrors => {
    const newErrors: FormErrors = {};
    // if (!data.Hospital_name || !String(data.Hospital_name).trim())
    //   newErrors.Hospital_name = "Hospital name is required.";
    if (!data.assigned_doctor || !String(data.assigned_doctor).trim())
      newErrors.assigned_doctor = "Doctor name is required.";
    if (!data.Date_of_registration)
      newErrors.Date_of_registration = "Registration date is required.";
    return newErrors;
  };

  const validateForm = (data: typeof formData) => {
    const step1Errors = validateStep1(data);
    const step2Errors = validateStep2(data);
    const step3Errors = validateStep3(data);
    return { ...step1Errors, ...step2Errors, ...step3Errors };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleNextStep = () => {
    let currentStepErrors: FormErrors = {};
    if (currentStep === 1) {
      currentStepErrors = validateStep1(formData);
    } else if (currentStep === 2) {
      currentStepErrors = validateStep2(formData);
    } else if (currentStep === 3) {
      currentStepErrors = validateStep3(formData);
    }

    if (Object.keys(currentStepErrors).length > 0) {
      setErrors(currentStepErrors);
      toast.error("Please correct the errors on this page before proceeding.");
    } else {
      setErrors({});
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        setSidebarOpen(false);
      }
    }
  };

  const parseOrUndefined = (val: any) => {
    if (val === null || val === undefined || String(val).trim() === "")
      return undefined;
    const n = Number(val);
    return Number.isFinite(n) ? n : undefined;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm(formData);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error(
        "Please fill in all required fields correctly across all steps.",
      );

      const step1Fields: (keyof FormErrors)[] = [
        "patient_id",
        "name",
        "age",
        "gender",
        "mobile_number",
      ];
      const step2Fields: (keyof FormErrors)[] = [
        "Duration_of_Diabetes",
        "HbA1c_Level",
        "Blood_Pressure_Systolic",
        "Blood_Pressure_Diastolic",
        "Fasting_Blood_Glucose",
        "BMI",
        "Cholesterol",
        "Albuminuria",
      ];
      const step3Fields: (keyof FormErrors)[] = [
        // "Hospital_name",
        "Date_of_registration",
        "assigned_doctor",
      ];

      if (step1Fields.some((key) => formErrors[key])) setCurrentStep(1);
      else if (step2Fields.some((key) => formErrors[key])) setCurrentStep(2);
      else if (step3Fields.some((key) => formErrors[key])) setCurrentStep(3);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const payload: any = {
      name: formData.name,
      // ...(formData.patient_id && String(formData.patient_id).trim() !== ""
      //   ? { patient_id: parseOrUndefined(formData.patient_id) }
      //   : {}),
      // include patient_id only when provided (for OP mode it is required)
      ...(formData.patient_id && String(formData.patient_id).trim() !== ""
        ? { patient_id: parseOrUndefined(formData.patient_id) }
        : {}),
      Age: parseOrUndefined(formData.age),
      gender: formData.gender,
      mobile_number: String(formData.mobile_number),
      HbA1c_Level: parseOrUndefined(formData.HbA1c_Level),
      Fasting_Blood_Glucose: parseOrUndefined(formData.Fasting_Blood_Glucose),
      Blood_Pressure_Systolic: parseOrUndefined(
        formData.Blood_Pressure_Systolic,
      ),
      Blood_Pressure_Diastolic: parseOrUndefined(
        formData.Blood_Pressure_Diastolic,
      ),
      Cholesterol: parseOrUndefined(formData.Cholesterol),
      BMI: parseOrUndefined(formData.BMI),
      Albuminuria: parseOrUndefined(formData.Albuminuria),
      Duration_of_Diabetes: parseOrUndefined(formData.Duration_of_Diabetes),
      Visual_Acuity: formData.Visual_Acuity,
      // Hospital_name: formData.Hospital_name,
      assigned_doctor: formData.assigned_doctor,
      Date_of_registration:
        formData.Date_of_registration instanceof Date
          ? formData.Date_of_registration.toISOString().split("T")[0]
          : formData.Date_of_registration,
    };

    const API_URL = `${apiBase}/patient_data_ingestion/create_patient`;

    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("access_token") ||
      localStorage.getItem("authToken");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let apiErrorMessage = `Error ${response.status}: ${
          response.statusText || "Unknown API Error"
        }`;
        let errorJson: any = null;
        try {
          errorJson = await response.json();
        } catch (err) {
          console.warn("Could not parse error JSON", err);
        }

        if (errorJson?.detail && Array.isArray(errorJson.detail)) {
          const newErrors: any = {};
          errorJson.detail.forEach((errItem: any) => {
            const loc = errItem.loc;
            const field =
              Array.isArray(loc) && loc.length >= 2
                ? loc[loc.length - 1]
                : null;
            if (field) {
              newErrors[field] = errItem.msg || "Invalid value";
            }
          });
          if (Object.keys(newErrors).length > 0) {
            setErrors((prev) => ({ ...prev, ...newErrors }));
            throw new Error(Object.values(newErrors)[0] as string);
          }
        }

        if (errorJson?.detail && typeof errorJson.detail === "string") {
          apiErrorMessage = errorJson.detail;
        } else if (errorJson?.message) {
          apiErrorMessage = errorJson.message;
        }
        throw new Error(apiErrorMessage);
      }

      const data = await response.json();

      // Save composite_id or patient_id depending on response (backwards compatibility)
      const compositeId =
        data?.identifiers?.composite_id ?? data?.composite_id ?? null;
      if (compositeId) {
        localStorage.setItem("composite_id", String(compositeId));
        // Do NOT overwrite patient_id with composite_id in all cases; set patient_id properly if returned
        if (data?.identifiers?.patient_id) {
          localStorage.setItem(
            "patient_id",
            String(data.identifiers.patient_id),
          );
        } else if (data?.patient_id) {
          localStorage.setItem("patient_id", String(data.patient_id));
        }
      } else if (data?.patient_id) {
        localStorage.setItem("patient_id", String(data.patient_id));
      } else if (payload.patient_id) {
        // If OP mode and backend didn't return anything but we sent patient_id, store it
        localStorage.setItem("patient_id", String(payload.patient_id));
      }

      setRegistrationComplete(true);
      toast.success("Patient registered successfully!");
    } catch (err) {
      console.error("Registration failed:", err);
      const message =
        err instanceof Error ? err.message : "An unknown error occurred";
      toast.error(`Registration failed: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinueToUpload = () => {
    const compositeId = localStorage.getItem("composite_id");

    if (compositeId) {
      localStorage.setItem("patient_id", compositeId);
      navigate("/analysis");
    } else {
      alert("Composite ID not found. Please register first.");
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  const steps = [
    {
      id: 1,
      title: "Patient Information",
      icon: UserCheck,
      description: "Basic patient details",
      color: "bg-blue-600",
    },
    {
      id: 2,
      title: "Clinical Data",
      icon: Activity,
      description: "Medical test results",
      color: "bg-green-600",
    },
    {
      id: 3,
      title: "Administrative Details",
      icon: Building2,
      description: "Hospital and registration info",
      color: "bg-purple-600",
    },
    {
      id: 4,
      title: "Review & Submit",
      icon: Check,
      description: "Verify and save patient data",
      color: "bg-orange-600",
    },
  ];

  const StepperContent = () => (
    <div className="space-y-2">
      <div className="p-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Patient Registration
          </h1>
        </div>
        <p className="text-gray-600 text-xs mt-1">
          Complete all steps to register
        </p>
      </div>
      <div className="p-3 border-b border-gray-100 bg-white">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-gray-700">Progress</span>
          <span className="text-xs font-medium text-gray-700">
            {Math.round(progressPercentage)}%
          </span>
        </div>

        <Progress
          value={progressPercentage}
          className="h-1.5 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-indigo-600 bg-gray-200 rounded-full"
        />
      </div>
      <div className="p-3 space-y-2">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          return (
            <div
              key={step.id}
              onClick={() => {
                setCurrentStep(step.id);
                setSidebarOpen(false);
              }}
              className={cn(
                "flex items-start p-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white hover:shadow-md border border-transparent",
                isActive &&
                  "bg-white border-blue-200 shadow-md ring-1 ring-blue-100",
                isCompleted && "bg-green-50/50 border-green-200",
                !isActive && !isCompleted && "hover:bg-gray-50 border-gray-100",
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full mr-3 transition-all duration-200",
                  isActive && "bg-blue-600 text-white shadow-lg scale-110",
                  isCompleted && "bg-green-600 text-white",
                  !isActive && !isCompleted && "bg-gray-200 text-gray-600",
                )}
              >
                {isCompleted && !isActive ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className={cn(
                    "text-sm font-semibold transition-colors duration-200",
                    isActive && "text-blue-900",
                    isCompleted && "text-green-900",
                    !isActive && !isCompleted && "text-gray-700",
                  )}
                >
                  {step.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {step.description}
                </p>
              </div>
              <div
                className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-full",
                  isActive
                    ? "bg-blue-100 text-blue-800"
                    : isCompleted
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-500",
                )}
              >
                {step.id}/4
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            {/* NEW: Register Mode Toggle */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-xl border border-blue-100">
              <div className="text-sm font-medium text-gray-700 mb-2">
                Registration Type:
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setRegisterMode("new")}
                  className={cn(
                    "px-3 py-2 rounded-lg border transition-all duration-200 flex items-center gap-2 min-w-[120px] text-center text-sm",
                    registerMode === "new"
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : "bg-white text-gray-700 hover:bg-blue-50",
                  )}
                >
                  <User className="h-4 w-4 mx-auto" />
                  <span>New Patient</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRegisterMode("op")}
                  className={cn(
                    "px-4 py-3 rounded-lg border transition-all duration-200 flex items-center gap-2 min-w-[140px] text-center",
                    registerMode === "op"
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                      : "bg-white text-gray-700 hover:bg-indigo-50",
                  )}
                >
                  <FileText className="h-4 w-4 mx-auto" />
                  <span>OP / Existing Patient</span>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {registerMode === "new"
                  ? "Register a brand new patient. No patient_id required."
                  : "Link this visit to an existing patient by entering their patient_id (required)."}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* patient_id input shows only for OP mode */}
              {registerMode === "op" && (
                <div className="space-y-2">
                  <label
                    htmlFor="patient_id"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4 text-indigo-600" />
                    Patient ID (Existing)
                  </label>
                  <Input
                    id="patient_id"
                    name="patient_id"
                    value={formData.patient_id}
                    onChange={handleChange}
                    placeholder="Enter existing patient ID (numeric)"
                    className={cn(
                      "transition-all duration-200 h-10 bg-gray-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
                      errors.patient_id &&
                        "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/50",
                    )}
                  />
                  {errors.patient_id && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.patient_id}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <User className="h-4 w-4 text-blue-600" />
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={cn(
                    "transition-all duration-200 h-10 bg-gray-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
                    errors.name &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/50",
                  )}
                  placeholder="Enter patient's full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="age"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <User className="h-4 w-4 text-green-600" />
                    Age
                  </label>
                  <Input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    step="1"
                    className={cn(
                      "transition-all duration-200 h-10 bg-gray-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
                      errors.age &&
                        "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/50",
                    )}
                    placeholder="Enter age in years"
                  />
                  {errors.age && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.age}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="gender"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <User className="h-4 w-4 text-purple-600" />
                    Gender
                  </label>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-10 px-3 py-2 rounded-lg border border-input text-sm shadow-sm flex items-center justify-between transition-all duration-200 bg-gray-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
                            !formData.gender && "text-muted-foreground",
                            errors.gender &&
                              "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/50",
                          )}
                        >
                          <span className="truncate">
                            {formData.gender || "Select gender"}
                          </span>
                          <ChevronDown className="h-4 w-4 opacity-50 ml-2 flex-shrink-0" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full bg-white shadow-lg border mt-1 z-50">
                        {["Male", "Female", "Other"].map((option) => (
                          <DropdownMenuItem
                            key={option}
                            onSelect={() =>
                              setFormData((prev: any) => ({
                                ...prev,
                                gender: option,
                              }))
                            }
                            className="cursor-pointer px-3 py-2 text-sm hover:bg-blue-50 transition-colors"
                          >
                            {option}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {errors.gender && (
                      <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.gender}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="mobile_number"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <Phone className="h-4 w-4 text-green-600" />
                  Mobile Number
                </label>
                <Input
                  type="tel"
                  id="mobile_number"
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleChange}
                  className={cn(
                    "transition-all duration-200 h-10 bg-gray-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
                    errors.mobile_number &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/50",
                  )}
                  placeholder="Enter mobile number"
                />
                {errors.mobile_number && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.mobile_number}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <Stethoscope className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Clinical Data
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Please enter accurate medical test results
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  id: "HbA1c_Level",
                  label: "HbA1c Level",
                  unit: "%",
                  icon: Heart,
                  step: "0.1",
                },
                {
                  id: "Fasting_Blood_Glucose",
                  label: "Fasting Glucose",
                  unit: "mg/dL",
                  icon: Activity,
                  step: "0.1",
                },
                {
                  id: "Cholesterol",
                  label: "Cholesterol",
                  unit: "mg/dL",
                  icon: Activity,
                  step: "1",
                },
                {
                  id: "BMI",
                  label: "BMI",
                  unit: "kg/m²",
                  icon: User,
                  step: "0.1",
                },
                {
                  id: "Albuminuria",
                  label: "Albuminuria",
                  unit: "mg/dL",
                  icon: Activity,
                  step: "0.1",
                },
              ].map(({ id, label, unit, icon: Icon, step }) => (
                <div key={id} className="space-y-2">
                  <label
                    htmlFor={id}
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4 text-green-600" />
                    {label} ({unit})
                  </label>
                  <Input
                    type="number"
                    step={step}
                    id={id}
                    name={id}
                    value={formData[id as keyof typeof formData] as string}
                    onChange={handleChange}
                    className={cn(
                      "transition-all duration-200 h-10 bg-gray-50/50 hover:bg-white hover:border-green-300 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20",
                      errors[id as keyof FormErrors] &&
                        "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50/50",
                    )}
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                  {errors[id as keyof FormErrors] && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors[id as keyof FormErrors]}
                    </p>
                  )}
                </div>
              ))}

              {/* Blood Pressure */}
              <div key="Blood_Pressure" className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Heart className="h-4 w-4 text-green-600" />
                  Blood Pressure (mmHg)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Input
                      type="number"
                      step="1"
                      name="Blood_Pressure_Systolic"
                      value={formData.Blood_Pressure_Systolic}
                      onChange={handleChange}
                      placeholder="Systolic"
                      className={cn(
                        "transition-all duration-200 h-10 hover:border-green-300 focus:border-green-500 focus:ring-green-500",
                        errors.Blood_Pressure_Systolic &&
                          "border-red-500 focus:border-red-500 focus:ring-red-500",
                      )}
                    />
                    {errors.Blood_Pressure_Systolic && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.Blood_Pressure_Systolic}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Input
                      type="number"
                      step="1"
                      name="Blood_Pressure_Diastolic"
                      value={formData.Blood_Pressure_Diastolic}
                      onChange={handleChange}
                      placeholder="Diastolic"
                      className={cn(
                        "transition-all duration-200 h-10 hover:border-green-300 focus:border-green-500 focus:ring-green-500",
                        errors.Blood_Pressure_Diastolic &&
                          "border-red-500 focus:border-red-500 focus:ring-red-500",
                      )}
                    />
                    {errors.Blood_Pressure_Diastolic && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.Blood_Pressure_Diastolic}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="Duration_of_Diabetes"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4 text-green-600" />
                  Diabetes Duration (Years)
                </label>
                <Input
                  type="number"
                  step="1"
                  id="Duration_of_Diabetes"
                  name="Duration_of_Diabetes"
                  value={formData.Duration_of_Diabetes}
                  onChange={handleChange}
                  className={cn(
                    "transition-all duration-200 h-10 hover:border-green-300 focus:border-green-500 focus:ring-green-500",
                    errors.Duration_of_Diabetes &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500",
                  )}
                  placeholder="Years with diabetes"
                />
                {errors.Duration_of_Diabetes && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.Duration_of_Diabetes}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="Visual_Acuity"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <Eye className="h-4 w-4 text-green-600" />
                  Visual Acuity
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-10 justify-between text-left font-normal transition-all duration-200 hover:border-green-300 flex items-center"
                    >
                      <span className="truncate">{formData.Visual_Acuity}</span>
                      <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full bg-white shadow-lg border">
                    {["Normal", "Mild", "Moderate", "Severe", "Blind"].map(
                      (option) => (
                        <DropdownMenuItem
                          key={option}
                          onSelect={() =>
                            setFormData((prev: any) => ({
                              ...prev,
                              Visual_Acuity: option,
                            }))
                          }
                          className="cursor-pointer hover:bg-green-50 transition-colors"
                        >
                          {option}
                        </DropdownMenuItem>
                      ),
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-100">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Administrative Details
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Hospital and registration information
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* <div className="space-y-2">
                <label
                  htmlFor="Hospital_name"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >

                  <Building2 className="h-4 w-4 text-purple-600" />
                  Hospital Name
                </label>
                <Input
                  type="text"
                  id="Hospital_name"
                  name="Hospital_name"
                  value={formData.Hospital_name}
                  onChange={handleChange}
                  className={cn(
                    "transition-all duration-200",
                    errors.Hospital_name &&
                      "border-red-500 focus:border-red-500"
                  )}
                  placeholder="Enter hospital name"
                />
                {errors.Hospital_name && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.Hospital_name}
                  </p>
                )}
              </div> */}

              <div className="space-y-2">
                <label
                  htmlFor="Date_of_registration"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4 text-purple-600" />
                  Date of Registration
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-10 justify-start text-left font-normal transition-all duration-200",
                        !formData.Date_of_registration &&
                          "text-muted-foreground",
                        errors.Date_of_registration &&
                          "border-red-500 focus:ring-red-500",
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {formData.Date_of_registration ? (
                        format(formData.Date_of_registration, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={formData.Date_of_registration}
                      onSelect={(date: Date | undefined) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          Date_of_registration: date || new Date(),
                        }))
                      }
                      disabled={(date: Date) =>
                        format(date, "yyyy-MM-dd") !==
                        format(new Date(), "yyyy-MM-dd")
                      }
                      initialFocus
                      className="p-3 pointer-events-auto bg-white"
                    />
                  </PopoverContent>
                </Popover>
                {errors.Date_of_registration && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.Date_of_registration}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="assigned_doctor"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <User className="h-4 w-4 text-purple-600" />
                  Assigned Doctor
                </label>
                <Input
                  type="text"
                  id="assigned_doctor"
                  name="assigned_doctor"
                  value={formData.assigned_doctor}
                  onChange={handleChange}
                  className={cn(
                    "transition-all duration-200 h-10",
                    errors.assigned_doctor &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500",
                  )}
                  placeholder="Enter doctor's name"
                />
                {errors.assigned_doctor && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.assigned_doctor}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-100">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Review & Submit
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Please review all information before submitting
              </p>
            </div>

            <div className="space-y-5">
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Patient Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Name:</span>
                    <span>{formData.name || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Age:</span>
                    <span>{formData.age || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Gender:</span>
                    <span>{formData.gender || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Mobile:</span>
                    <span>{formData.mobile_number || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-5 rounded-xl border border-green-200">
                <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Clinical Data
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">HbA1c:</span>
                    <span>
                      {formData.HbA1c_Level
                        ? `${formData.HbA1c_Level}%`
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">
                      Fasting Glucose:
                    </span>
                    <span>
                      {formData.Fasting_Blood_Glucose
                        ? `${formData.Fasting_Blood_Glucose} mg/dL`
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">
                      Systolic BP:
                    </span>
                    <span>
                      {formData.Blood_Pressure_Systolic
                        ? `${formData.Blood_Pressure_Systolic} mmHg`
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">
                      Diastolic BP:
                    </span>
                    <span>
                      {formData.Blood_Pressure_Diastolic
                        ? `${formData.Blood_Pressure_Diastolic} mmHg`
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">
                      Cholesterol:
                    </span>
                    <span>
                      {formData.Cholesterol
                        ? `${formData.Cholesterol} mg/dL`
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">BMI:</span>
                    <span>
                      {formData.BMI ? `${formData.BMI} kg/m²` : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">
                      Albuminuria:
                    </span>
                    <span>
                      {formData.Albuminuria
                        ? `${formData.Albuminuria} mg/dL`
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">
                      Diabetes Duration:
                    </span>
                    <span>
                      {formData.Duration_of_Diabetes
                        ? `${formData.Duration_of_Diabetes} years`
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">
                      Visual Acuity:
                    </span>
                    <span>{formData.Visual_Acuity || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-5 rounded-xl border border-purple-200">
                <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Administrative Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Tenant:</span>
                    <span>
                      {tenants.find((t) => t.id === formData.tenant_id)?.name ||
                        "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">
                      Assigned Doctor:
                    </span>
                    <span>{formData.assigned_doctor || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">
                      Registration Date:
                    </span>
                    <span>
                      {formData.Date_of_registration
                        ? format(formData.Date_of_registration, "PPP")
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (registrationComplete) {
    return (
      <SuccessAnimation onContinue={handleContinueToUpload} mode="register" />
    );
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="flex flex-col md:flex-row w-full h-full">
        {/* Mobile Header - Removed 'fixed' and added top margin to clear global navbar overlap */}
        <div className="md:hidden w-full bg-white shadow-sm border-b border-gray-200 mt-14">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-600 rounded-md">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Patient Registration
              </h1>
            </div>
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-80 p-0 sm:max-w-sm bg-white"
              >
                <StepperContent />
              </SheetContent>
            </Sheet>
          </div>
          <div className="px-4 pb-2">
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>

        <div className="hidden md:block min-h-[calc(100vh-5rem)] bg-white w-1/4 min-w-[320px] border-r border-gray-200 overflow-y-auto shadow-lg pt-8 md:pt-10">
          <StepperContent />
        </div>

        <div className="flex-1 p-3 md:p-6 overflow-y-auto pt-16 md:pt-8">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
                <CardHeader
                  className={cn(
                    "text-white rounded-t-2xl",
                    steps[currentStep - 1]?.color ||
                      "bg-gradient-to-r from-blue-600 to-indigo-600",
                    "p-4",
                  )}
                >
                  <CardTitle className="flex items-center gap-3 text-lg">
                    {React.createElement(steps[currentStep - 1]?.icon || User, {
                      className: "h-6 w-6",
                    })}
                    {steps[currentStep - 1]?.title}
                    <span className="ml-auto text-sm font-normal bg-white/20 px-3 py-1 rounded-full">
                      Step {currentStep} of {totalSteps}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">{renderFormStep()}</CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="w-full sm:w-auto px-6 py-2 transition-all duration-200 h-10 hover:bg-gray-100 hover:text-gray-900 border-gray-200"
                >
                  ← Previous
                </Button>

                {currentStep < totalSteps && (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all duration-300 h-10 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
                  >
                    Next Step →
                  </Button>
                )}

                {currentStep === totalSteps && (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white transition-all duration-200 h-10"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Submit Registration
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiabetesPatientRegister;
