import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Learners from "./pages/Learners";
import Courses from "./pages/Courses";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/Sidebar";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { SuperAdminProvider, useSuperAdmin } from "./contexts/SuperAdminContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AuthCallback from "./pages/AuthCallback";
import SuperAdminLogin from "./pages/SuperAdminLogin";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";

const queryClient = new QueryClient();

// Protected route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!loading && !user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Super admin protected route
const SuperAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSuperAdmin } = useSuperAdmin();
  
  if (!isSuperAdmin) {
    return <Navigate to="/superadmin/login" replace />;
  }

  return <>{children}</>;
};

// Public-only routes (redirect to home if logged in)
const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Main App Routes component
const AppRoutes = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Super Admin Routes */}
      <Route path="/superadmin/login" element={<SuperAdminLogin />} />
      <Route path="/superadmin/requests" element={
        <SuperAdminRoute>
          <SuperAdminDashboard />
        </SuperAdminRoute>
      } />

      {/* Auth Routes */}
      <Route path="/login" element={
        <PublicOnlyRoute>
          <Login />
        </PublicOnlyRoute>
      } />
      <Route path="/signup" element={
        <PublicOnlyRoute>
          <Signup />
        </PublicOnlyRoute>
      } />
      <Route path="/forgot-password" element={
        <PublicOnlyRoute>
          <ForgotPassword />
        </PublicOnlyRoute>
      } />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* Protected App Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <div className="flex w-full min-h-screen">
            <Sidebar user={user} />
            <div className="flex-1 overflow-auto">
              <Index />
            </div>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/learners" element={
        <ProtectedRoute>
          <div className="flex w-full min-h-screen">
            <Sidebar user={user} />
            <div className="flex-1 overflow-auto">
              <Learners />
            </div>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/learners/:id" element={
        <ProtectedRoute>
          <div className="flex w-full min-h-screen">
            <Sidebar user={user} />
            <div className="flex-1 overflow-auto">
              <Learners />
            </div>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/courses" element={
        <ProtectedRoute>
          <div className="flex w-full min-h-screen">
            <Sidebar user={user} />
            <div className="flex-1 overflow-auto">
              <Courses />
            </div>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/courses/:id" element={
        <ProtectedRoute>
          <div className="flex w-full min-h-screen">
            <Sidebar user={user} />
            <div className="flex-1 overflow-auto">
              <Courses />
            </div>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/courses/assign/:id" element={
        <ProtectedRoute>
          <div className="flex w-full min-h-screen">
            <Sidebar user={user} />
            <div className="flex-1 overflow-auto">
              <Courses />
            </div>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/analytics" element={
        <ProtectedRoute>
          <div className="flex w-full min-h-screen">
            <Sidebar user={user} />
            <div className="flex-1 overflow-auto">
              <Analytics />
            </div>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <div className="flex w-full min-h-screen">
            <Sidebar user={user} />
            <div className="flex-1 overflow-auto">
              <Settings />
            </div>
          </div>
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SuperAdminProvider>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </SuperAdminProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
