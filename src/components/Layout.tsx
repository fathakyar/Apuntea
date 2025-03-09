
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
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

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gradient-to-b dark:from-black dark:to-gray-900 text-foreground uppercase">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6 md:px-6 md:py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
