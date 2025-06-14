
import React from "react";
import BackgroundDecorations from "@/components/layout/BackgroundDecorations";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <BackgroundDecorations />
      <main className="flex-1 w-full flex flex-col">
        <div className="container mx-auto px-4 py-4 md:px-6 md:py-6 flex-1 flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
