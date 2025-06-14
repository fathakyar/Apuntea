
import React from "react";
import Navbar from "@/components/navbar/Navbar";
import BackgroundDecorations from "@/components/layout/BackgroundDecorations";
import Footer from "@/components/layout/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <BackgroundDecorations />
      <Navbar />
      <main className="flex-1 w-full flex flex-col">
        <div className="container mx-auto px-4 py-4 md:px-6 md:py-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
