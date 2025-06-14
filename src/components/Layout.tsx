
import React from "react";
import Navbar from "@/components/navbar/Navbar";
import BackgroundDecorations from "@/components/layout/BackgroundDecorations";
import Footer from "@/components/layout/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      <BackgroundDecorations />
      <Navbar />
      <main className="flex-1 flex flex-col w-full">
        <div className="flex-1 flex flex-col w-full">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
