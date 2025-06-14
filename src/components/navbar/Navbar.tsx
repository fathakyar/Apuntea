import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import NavLink from "./NavLink";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";
import { useNavigationConfig } from "./NavigationConfig";

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { navigationItems } = useNavigationConfig();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-black/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 dark:border-apuntea-purple/30 transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="max-w-screen-xl mx-auto w-full px-4 sm:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/23d89839-23e5-4a91-9d1e-ab2a8bb6a03e.png"
                alt="Apuntea Logo"
                className="h-8 mr-2"
              />
            </Link>
          </div>

          {/* Menü (Logo'dan daha uzak) */}
          <div className="hidden md:flex items-center space-x-3 ml-8">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                icon={item.icon}
                name={item.name}
                isActive={isActive(item.path)}
              />
            ))}
          </div>

          {/* Sağ arama ve kullanıcı */}
          <div className="hidden md:flex items-center ml-auto gap-2 mr-2">
            <SearchBar />
            {user && <UserMenu />}
          </div>

          {/* Mobil Menü */}
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

      <MobileMenu isOpen={isOpen} onNavigate={handleNavigation} />
    </nav>
  );
};

export default Navbar;
