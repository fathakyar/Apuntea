
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";

const Index = () => {
  const { user, isLoading } = useAuth();

  // If loading, show a loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-apuntea-purple/50 h-12 w-12 mb-4"></div>
          <div className="h-4 bg-apuntea-purple/50 rounded w-24"></div>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Wrap outlet in Layout to ensure header and footer are shown on all pages
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default Index;
