
import React from "react";
import BackgroundDecorations from "@/components/layout/BackgroundDecorations";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <BackgroundDecorations />
      <main className="flex-1 flex flex-col w-full">
        <div className="flex-1 flex flex-col w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
