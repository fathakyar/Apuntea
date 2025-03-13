import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  FileText,
  Plus,
  Calendar,
  User,
  Settings,
  LogOut,
  FileInput,
  Search,
  LineChart
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { translations } from "@/utils/translations";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const t = translations.en;
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const navigationItems = [
    { name: t.agenda, path: "/agenda", icon: <Calendar className="h-5 w-5" /> },
    { name: t.new, path: "/new-record", icon: <Plus className="h-5 w-5" /> },
    { name: t.records, path: "/records", icon: <FileText className="h-5 w-5" /> },
    { name: ".BI", path: "/bi", icon: <LineChart className="h-5 w-5" /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white dark:bg-black/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-apuntea-purple/30 transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/23d89839-23e5-4a91-9d1e-ab2a8bb6a03e.png"
                alt="Apuntea Logo"
                className="h-8 mr-2"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1 ml-4">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-sm text-sm font-medium transition-colors duration-200 flex items-center uppercase ${
                  isActive(item.path)
                    ? "bg-apuntea-purple text-white"
                    : "text-gray-800 dark:text-white hover:bg-apuntea-light hover:text-apuntea-purple"
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center ml-auto gap-2">
            <div 
              ref={searchRef}
              className={cn(
                "relative border border-gray-300 dark:border-gray-700 rounded-sm transition-all duration-300",
                isSearchFocused ? "w-64" : "w-40"
              )}
            >
              <Input
                type="search"
                placeholder={t.search}
                className="h-8 rounded-sm pl-8 pr-4 bg-gray-100 dark:bg-black/50 border-0 text-sm"
                onFocus={() => setIsSearchFocused(true)}
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-gray-800 dark:text-white hover:text-apuntea-purple"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white dark:bg-black/90 border-gray-200 dark:border-apuntea-purple/50 text-gray-800 dark:text-white">
                  <DropdownMenuLabel className="uppercase font-bold text-apuntea-purple">Admin</DropdownMenuLabel>
                  <DropdownMenuItem className="text-gray-800 dark:text-white hover:text-apuntea-purple uppercase">
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200 dark:bg-apuntea-purple/30" />
                  <DropdownMenuItem 
                    className="cursor-pointer text-gray-800 dark:text-white hover:text-apuntea-purple uppercase"
                    onClick={() => handleNavigation("/definitions")}
                  >
                    <FileInput className="mr-2 h-4 w-4" />
                    <span>{t.definitions}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer text-gray-800 dark:text-white hover:text-apuntea-purple uppercase"
                    onClick={() => handleNavigation("/settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{t.settings}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200 dark:bg-apuntea-purple/30" />
                  <DropdownMenuItem 
                    className="cursor-pointer text-destructive uppercase" 
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t.logout}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 dark:text-white hover:text-apuntea-purple dark:hover:text-apuntea-gold hover:bg-gray-100 dark:hover:bg-black"
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

      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-black/90 backdrop-blur-md animate-slide-in">
          <div className="px-3 py-2">
            <div className="relative border border-gray-300 dark:border-gray-700 rounded-sm">
              <Input
                type="search"
                placeholder={t.search}
                className="w-full h-9 rounded-sm pl-8 pr-4 bg-gray-100 dark:bg-black/50 border-0"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded-sm text-base font-medium flex items-center uppercase ${
                isActive(item.path)
                  ? "bg-apuntea-purple text-white"
                  : "text-gray-800 dark:text-white hover:bg-apuntea-light hover:text-apuntea-purple"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </Link>
          ))}
          
          {user && (
            <div className="px-3 py-2 border-t border-gray-200 dark:border-apuntea-purple/30 mt-2 pt-2">
              <div className="flex items-center justify-between">
                <div className="text-gray-800 dark:text-white uppercase">
                  <p className="text-sm font-medium">{user.email}</p>
                  <p className="text-xs text-apuntea-purple">Admin</p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-gray-800 dark:text-white hover:text-apuntea-purple"
                    onClick={() => handleNavigation("/definitions")}
                  >
                    <FileInput className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-gray-800 dark:text-white hover:text-apuntea-purple"
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
