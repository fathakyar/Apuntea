
import React from "react";
import { useLocation } from "react-router-dom";
import MobileNavLink from "./MobileNavLink";
import MobileSearchBar from "./MobileSearchBar";
import MobileUserInfo from "./MobileUserInfo";
import { useNavigationConfig } from "./NavigationConfig";

interface MobileMenuProps {
  isOpen: boolean;
  onNavigate: (path: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onNavigate }) => {
  const location = useLocation();
  const { navigationItems } = useNavigationConfig();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden block">
      <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-black/90 backdrop-blur-md animate-slide-in">
        <MobileSearchBar />
        
        {navigationItems.map((item) => (
          <MobileNavLink
            key={item.path}
            to={item.path}
            icon={item.icon}
            name={item.name}
            isActive={isActive(item.path)}
            onClick={() => onNavigate(item.path)}
          />
        ))}
        
        <MobileUserInfo onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default MobileMenu;
