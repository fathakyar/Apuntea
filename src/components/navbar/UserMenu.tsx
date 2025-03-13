
import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Settings, LogOut, FileInput } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { translations } from "@/utils/translations";
import { useAuth } from "@/contexts/AuthContext";

const UserMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const t = translations.en;

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  if (!user) return null;

  return (
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
  );
};

export default UserMenu;
