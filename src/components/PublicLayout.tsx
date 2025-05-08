
import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundDecorations from "@/components/layout/BackgroundDecorations";

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <BackgroundDecorations />
      <Navbar />
      <main className="flex-1 w-full">
        <div className="container mx-auto px-4 py-4 md:px-6 md:py-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
