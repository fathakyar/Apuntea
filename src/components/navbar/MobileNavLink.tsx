
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MobileNavLinkProps {
  to: string;
  icon: React.ReactNode;
  name: string;
  isActive: boolean;
  onClick?: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, icon, name, isActive, onClick }) => {
  return (
    <Link
      to={to}
      className={cn(
        "block px-3 py-2 rounded-sm text-base font-medium flex items-center uppercase",
        isActive
          ? "bg-apuntea-purple text-white"
          : "text-gray-800 dark:text-white hover:bg-apuntea-light hover:text-apuntea-purple"
      )}
      onClick={onClick}
    >
      {icon}
      <span className="ml-2">{name}</span>
    </Link>
  );
};

export default MobileNavLink;
