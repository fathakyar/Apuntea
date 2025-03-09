
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
