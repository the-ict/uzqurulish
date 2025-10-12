import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPasswordPage from "./pages/auth/ForgotPassword";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Overview from "./pages/public/Overview";
import Projects from "./pages/public/Projects";
import Navigator from "./pages/public/PermitNavigator";
import Documents from "./pages/public/DocumentGenerator";
import Compliance from "./pages/public/ComplianceChecker";
import Zoning from "./pages/public/ZooningAdvisor";
import SupportHelp from "./pages/public/SupportHelp";
import Notifications from "./pages/public/Notifications";
import PaymentSubscription from "./pages/public/PaymentSubscription";
import Homepage from "./pages/public/HomePage";
import SettingsPage from "./pages/public/SettingsPage";
import TeamPage from "./pages/public/TeamPage";
import DocumentsPage from "./pages/public/DocumentsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { ToastContainer } from "react-toastify";
import ResetPasswordPage from "./pages/auth/ResetPassword";
import PaymePayment from "./pages/public/PaymePayment";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/dashboard/*"
          element={
            <div className="flex h-screen bg-gray-50">
              <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
              <div className="flex-1 flex flex-col min-w-0">
                <TopBar setSidebarOpen={setSidebarOpen} />
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  <Routes>
                    <Route path="/" element={<Navigate to="overview" />} />
                    <Route path="overview" element={<Overview />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="navigator" element={<Navigator />} />
                    <Route path="documents" element={<Documents />} />
                    <Route path="compliance" element={<Compliance />} />
                    <Route path="zoning" element={<Zoning />} />
                    <Route path="support" element={<SupportHelp />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="subscription" element={<PaymentSubscription />} />
                    <Route path="payme-payment" element={<PaymePayment />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="team" element={<TeamPage />} />
                    <Route path="documents-page" element={<DocumentsPage />} />
                  </Routes>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}
