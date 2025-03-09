
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  FileText,
  Plus,
  LayoutDashboard,
  LineChart,
  Calendar,
  User,
  Settings,
  LogOut,
  FileInput
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: "Yeni Kayıt", path: "/upload", icon: <Plus className="h-5 w-5" /> },
    { name: "Kayıtlar", path: "/records", icon: <FileText className="h-5 w-5" /> },
    { name: "Ajanda", path: "/agenda", icon: <Calendar className="h-5 w-5" /> },
    { name: "BI", path: "/bi", icon: <LineChart className="h-5 w-5" /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="bg-black/80 dark:bg-black/90 backdrop-blur-md sticky top-0 z-50 border-b border-apuntea-purple/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/4d2af4ce-8457-4acd-8aa3-6758e383a21f.png"
                alt="Apuntea Logo"
                className="h-8 mr-2"
              />
              <span className="font-bold text-xl text-apuntea-purple uppercase">Apuntea</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center uppercase ${
                  isActive(item.path)
                    ? "bg-apuntea-purple text-white"
                    : "text-white hover:bg-apuntea-light hover:text-apuntea-purple"
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center ml-6">
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-white hover:text-apuntea-gold"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-black/90 border-apuntea-purple/50 text-white">
                  <DropdownMenuLabel className="uppercase font-bold text-apuntea-purple">Admin</DropdownMenuLabel>
                  <DropdownMenuItem className="text-white hover:text-apuntea-gold uppercase">
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-apuntea-purple/30" />
                  <DropdownMenuItem 
                    className="cursor-pointer text-white hover:text-apuntea-gold uppercase"
                    onClick={() => handleNavigation("/definitions")}
                  >
                    <FileInput className="mr-2 h-4 w-4" />
                    <span>Tanımlamalar</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer text-white hover:text-apuntea-gold uppercase"
                    onClick={() => handleNavigation("/settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Ayarlar</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-apuntea-purple/30" />
                  <DropdownMenuItem 
                    className="cursor-pointer text-destructive uppercase" 
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-apuntea-gold hover:bg-black"
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
        <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-md animate-slide-in">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium flex items-center uppercase ${
                isActive(item.path)
                  ? "bg-apuntea-purple text-white"
                  : "text-white hover:bg-apuntea-light hover:text-apuntea-purple"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </Link>
          ))}
          
          {user && (
            <div className="px-3 py-2 border-t border-apuntea-purple/30 mt-2 pt-2">
              <div className="flex items-center justify-between">
                <div className="text-white uppercase">
                  <p className="text-sm font-medium">{user.email}</p>
                  <p className="text-xs text-apuntea-gold">Admin</p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:text-apuntea-gold"
                    onClick={() => handleNavigation("/definitions")}
                  >
                    <FileInput className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:text-apuntea-gold"
                    onClick={() => handleNavigation("/settings")}
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="text-destructive hover:text-red-400"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
