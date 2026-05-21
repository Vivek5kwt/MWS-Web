import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";
import Homepage from "./Pages/Homepage";
import WealthScoreFinalResult from "./Component/CheckMyWealthScore/WealthScoreFinalResult";
import CheckMyWealthScore from "./Component/CheckMyWealthScore/Checkmywealthscore";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

const AdminPanel = lazy(() => import("./Pages/AdminPanel"));

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Admin — no Header/Footer, lazy loaded so its CSS doesn't bleed into main app */}
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <Suspense fallback={<div>Loading...</div>}>
              <AdminPanel />
            </Suspense>
          </AdminRoute>
        }
      />

      {/* Public routes */}
      <Route path="/" element={<MainLayout><Homepage /></MainLayout>} />

      {/* Protected routes */}
      <Route
        path="/checkmyscore"
        element={
          <MainLayout>
            <ProtectedRoute>
              <CheckMyWealthScore />
            </ProtectedRoute>
          </MainLayout>
        }
      />
      <Route
        path="/wealth-score-final-result"
        element={
          <MainLayout>
            <ProtectedRoute>
              <WealthScoreFinalResult />
            </ProtectedRoute>
          </MainLayout>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
