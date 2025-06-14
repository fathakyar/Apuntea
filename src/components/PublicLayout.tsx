
import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundDecorations from "@/components/layout/BackgroundDecorations";

interface PublicLayoutProps {
  children: React.ReactNode;
}

// Sadeleşmiş ve temiz PublicLayout
const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => (
  <div className="flex flex-col min-h-screen w-full bg-background relative">
    <BackgroundDecorations />
    <Navbar />
    <main className="flex flex-1 flex-col w-full">
      {children}
    </main>
    <Footer />
  </div>
);

export default PublicLayout;
