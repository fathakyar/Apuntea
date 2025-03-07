
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  Menu,
  X,
  FileText,
  Upload,
  LayoutDashboard,
  LineChart,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: "Upload Invoice", path: "/upload", icon: <Upload className="h-5 w-5" /> },
    { name: "Records", path: "/records", icon: <FileText className="h-5 w-5" /> },
    { name: ".BI", path: "/bi", icon: <LineChart className="h-5 w-5" /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/4d2af4ce-8457-4acd-8aa3-6758e383a21f.png"
                alt="Apuntea Logo"
                className="h-8 mr-2"
              />
              <span className="font-bold text-xl text-apuntea-purple">Apuntea</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                  isActive(item.path)
                    ? "bg-apuntea-purple text-white"
                    : "text-foreground hover:bg-apuntea-light hover:text-apuntea-purple"
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center ml-6">
            {user && (
              <div className="flex items-center">
                <div className="flex flex-col items-end mr-4">
                  <span className="font-medium text-sm">{user.email}</span>
                  <span className="text-xs text-muted-foreground">Admin</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={logout} 
                  className="text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-background"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-card/90 backdrop-blur-md animate-slide-in">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                isActive(item.path)
                  ? "bg-apuntea-purple text-white"
                  : "text-foreground hover:bg-apuntea-light hover:text-apuntea-purple"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </Link>
          ))}
          
          {user && (
            <div className="px-3 py-2 border-t border-border mt-2 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{user.email}</p>
                  <p className="text-xs text-muted-foreground">Admin</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
