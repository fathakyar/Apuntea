
import React from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  // If loading, show a loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-apuntea-purple/20 h-12 w-12 mb-4"></div>
          <div className="h-4 bg-apuntea-purple/20 rounded w-24"></div>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 md:px-6 md:py-8">
        {children}
      </main>
      <footer className="py-4 border-t border-border text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          &copy; {new Date().getFullYear()} Apuntea Invoice Tracker. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
