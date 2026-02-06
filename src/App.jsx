// src/App.jsx
import React, { useEffect, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ButtonGradient from "./assets/svg/ButtonGradient";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PrivateRoute from "./components/Auth/PrivateRoute";
import LoadingSpinner from "./components/ui/LoadingSpinner";

// ✅ Lazy load all route components for better performance
const DiabetesPatientRegister = React.lazy(
  () => import("./components/PatientDetails/DiabetesPatientRegister"),
);
const AnalysisPage = React.lazy(() => import("./components/Analysis/Analysis"));
const Login = React.lazy(() => import("./components/Auth/login/login"));
const Dashboard = React.lazy(
  () => import("./components/Dashboard/admin/admin"),
);
const AdminDashboard = React.lazy(
  () => import("./components/AdminDashboard/AdminDashboard"),
);
const Authmodel = React.lazy(() => import("./components/Auth/Model/Model"));
const PatientLookup = React.lazy(
  () => import("./components/AdminDashboard/PatientLookup"),
);
const Profile = React.lazy(() => import("./components/Profile/Profile"));
const TenantsRecords = React.lazy(
  () => import("./components/TenantsRecords/TenantRecords"),
);
const DiabeticRetinopathyPage = React.lazy(
  () => import("./components/DiabeticRetinopathy/DiabeticRetinopathyPage"),
);

// ✅ Scroll to hash utility
const ScrollToHashElement = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 0);
      }
    }
  }, [location]);
  return null;
};

const App = () => {
  const location = useLocation();

  // ❌ Hide header/footer on these routes
  const hideHeaderFooterRoutes = ["/login", "/Authmodel"];
  const hideFooterRoutes = [
    "/register-patient",
    "/patient-list",
    "/Analysis",
    "/profile",
  ];

  const shouldShowHeader = !hideHeaderFooterRoutes.includes(location.pathname);
  const shouldShowFooter =
    !hideFooterRoutes.includes(location.pathname) &&
    !hideHeaderFooterRoutes.includes(location.pathname);

  // ✅ Remove padding for login route
  const shouldAddTopPadding = !hideHeaderFooterRoutes.includes(
    location.pathname,
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" />

      {shouldShowHeader && <Header />}

      {/* Main Content */}
      <main
        className={
          shouldAddTopPadding
            ? "pt-[4.25rem] lg:pt-[4.75rem] overflow-hidden flex-grow"
            : "overflow-hidden flex-grow"
        }
      >
        <ScrollToHashElement />

        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<DiabeticRetinopathyPage />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route
                path="/register-patient"
                element={<DiabetesPatientRegister />}
              />
            </Route>

            {/* <Route path="/patient-list" element={<DiabetesPatientList />} /> */}
            <Route path="/Analysis" element={<AnalysisPage />} />

            <Route element={<PrivateRoute />}>
              <Route path="/patient-records" element={<Dashboard />} />
            </Route>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/Authmodel" element={<Authmodel />} />
            <Route path="/patient-search" element={<PatientLookup />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/tenant-patients" element={<TenantsRecords />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer */}
      {shouldShowFooter && <Footer />}

      <ButtonGradient />
    </div>
  );
};

export default App;
