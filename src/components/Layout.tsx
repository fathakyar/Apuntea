
import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundDecorations from "@/components/layout/BackgroundDecorations";

interface LayoutProps {
  children: React.ReactNode;
}

// Tüm ana layout sadeleştirildi, fazla div ve container kaldırıldı.
const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="flex flex-col min-h-screen w-full bg-background relative">
    <BackgroundDecorations />
    <Navbar />
    <main className="flex flex-1 flex-col w-full">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
