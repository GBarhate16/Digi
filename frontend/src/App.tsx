// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import { useLenis } from "./hooks/lenis"; // ✅ Import Lenis hook
import { lazy, Suspense } from "react";
import { AuthProvider } from "./contexts/AuthProvider";
import ProtectedRoute from "./Components/ProtectedRoute";

// Lazy load components for code splitting
const Home = lazy(() => import("./pages/Home"));
const AboutUsSection = lazy(() => import("./pages/AboutUsPage"));
const Services = lazy(() => import("./pages/Services"));
const Industries = lazy(() => import("./pages/Industries"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

// Loading component for Suspense
const LoadingComponent = () => (
  <div className="min-h-screen w-full bg-black flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-white text-lg">Loading...</p>
    </div>
  </div>
);

function App() {
  useLenis(); // ✅ Enable Lenis globally

  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<LoadingComponent />}>
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
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;