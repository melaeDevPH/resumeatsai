import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import GeneratorPage from "./pages/GeneratorPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { ToastProvider } from "./hooks/useToast.jsx";

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/generate" element={<GeneratorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ToastProvider>
  );
}
