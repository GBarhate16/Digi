// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import { useLenis } from "./hooks/lenis"; // ✅ Import Lenis hook
import Home from "./pages/Home";
import AboutUsSection from "./pages/AboutUsPage";
import { AuthProvider } from "./contexts/AuthProvider";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Services from "./pages/Services";
import Industries from "./pages/Industries";

function App() {
  useLenis(); // ✅ Enable Lenis globally

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Shared layout route */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutUsSection />} />
            <Route path="services" element={<Services />} />
            <Route path="industries" element={<Industries />} />
          </Route>
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
