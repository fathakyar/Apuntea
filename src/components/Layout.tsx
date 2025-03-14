
import React from "react";
import Navbar from "@/components/navbar/Navbar";
import BackgroundDecorations from "@/components/layout/BackgroundDecorations";
import MainContent from "@/components/layout/MainContent";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundDecorations />
      <Navbar />
      <MainContent>{children}</MainContent>
    </div>
  );
};

export default Layout;
