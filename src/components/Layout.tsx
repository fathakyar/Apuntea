
import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen text-foreground uppercase">
      {/* Wave background decorations */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-5">
        <div className="absolute top-0 left-0 w-full h-80 bg-wave-pattern animate-wave"></div>
        <div className="absolute bottom-0 left-0 w-full h-80 bg-wave-pattern animate-wave"></div>
      </div>

      {/* Gradient decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-gold rounded-full opacity-20 blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-purple rounded-full opacity-10 blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2"></div>
      
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-6 md:px-6 md:py-8">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
