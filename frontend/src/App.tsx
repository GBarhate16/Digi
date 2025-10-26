// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import { useLenis } from "./hooks/lenis"; // ✅ Import Lenis hook
// Removed unused imports - using simplified approach
import { lazy, Suspense, useState, useEffect } from "react";
import { AuthProvider } from "./contexts/AuthProvider";
import ProtectedRoute from "./Components/ProtectedRoute";
import Preloader from "./Components/Preloader";

// Lazy load components for code splitting
const Home = lazy(() => import("./pages/Home"));
const AboutUsSection = lazy(() => import("./pages/AboutUsPage"));
const Services = lazy(() => import("./pages/Services"));
const Industries = lazy(() => import("./pages/Industries"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

function App() {
  useLenis(); // ✅ Enable Lenis globally
  const [showPreloader, setShowPreloader] = useState(true);

  // IMMEDIATE SCROLL FIX - Run as soon as component mounts
  useEffect(() => {
    // Force enable scrolling immediately
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.height = 'auto';
  }, []);

  useEffect(() => {
    // Remove the HTML bridge preloader and loading class when React preloader shows
    const bridge = document.querySelector('.preloader-bridge');
    if (bridge) {
      bridge.remove();
    }
    
    // Remove loading class to restore component styling
    document.documentElement.classList.remove('initial-loading');
    
    // Force scrolling to work
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.height = 'auto';
    document.body.style.position = 'static';
    document.documentElement.style.position = 'static';
  }, []);

  // Show preloader on initial load
  if (showPreloader) {
    return <Preloader onComplete={() => setShowPreloader(false)} />;
  }

  return (
    <div className="app-content bg-black">
      <AuthProvider>
        <Router>
          <Suspense fallback={<div className="min-h-screen bg-black"></div>}>
            <Routes>
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
              {/* Catch-all route */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;