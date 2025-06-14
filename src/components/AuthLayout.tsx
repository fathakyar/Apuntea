
import React from "react";
import BackgroundDecorations from "@/components/layout/BackgroundDecorations";

interface AuthLayoutProps {
  children: React.ReactNode;
}

// Sadeleşmiş AuthLayout (giriş akışı için)
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => (
  <div className="flex flex-col min-h-screen w-full bg-background relative">
    <BackgroundDecorations />
    <main className="flex flex-1 flex-col w-full">{children}</main>
  </div>
);

export default AuthLayout;
