// src/App.jsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
// import Roadmap from "./components/Roadmap";
import DiabetesPatientRegister from "./components/PatientDetails/DiabetesPatientRegister";
// import DiabetesPatientList from "./components/PatientDetails/DiabetesPatientList";
import AnalysisPage from "./components/Analysis/Analysis";
import Login from "./components/Auth/login/login";
import Dashboard from "./components/Dashboard/admin/admin";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Authmodel from "./components/Auth/Model/Model";
import PatientLookup from "./components/AdminDashboard/PatientLookup";
import Profile from "./components/Profile/Profile";
import TenantsRecords from "./components/TenantsRecords/TenantRecords";

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

// ✅ Landing Page
const LandingPage = () => (
  <>
    <div id="hero">
      <Hero />
    </div>
    <div id="collaboration">
      <Collaboration />
    </div>
    <div id="benefits">
      <Benefits />
    </div>
    {/* <div id="roadmap">
      <Roadmap />
    </div> */}
  </>
);

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
    location.pathname
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-right" />

      {shouldShowHeader && <Header />}

      {/* Main Content */}
      <main
        className={
          shouldAddTopPadding
            ? "pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden flex-grow"
            : "overflow-hidden flex-grow"
        }
      >
        <ScrollToHashElement />

        <Routes>
          <Route path="/" element={<LandingPage />} />
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
      </main>

      {/* Footer */}
      {shouldShowFooter && <Footer />}

      <ButtonGradient />
    </div>
  );
};

export default App;
