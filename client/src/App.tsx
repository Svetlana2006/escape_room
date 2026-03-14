import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import MissionPage from "./pages/MissionPage";
import QuizPage from "./pages/QuizPage";
import DonePage from "./pages/DonePage";

export default function App() {
  return (
    <div className="app-bg-grid">
      <div className="scanlines" />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/mission" element={<MissionPage />} />
        <Route path="/quiz/:segmentId" element={<QuizPage />} />
        <Route path="/done" element={<DonePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
