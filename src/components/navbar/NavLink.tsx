
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  name: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, name, isActive, onClick }) => {
  return (
    <Link
      to={to}
      className={cn(
        "px-3 py-2 rounded-sm text-sm font-medium transition-colors duration-200 flex items-center uppercase",
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

export default NavLink;
