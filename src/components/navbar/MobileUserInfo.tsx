
import React from "react";
import { useNavigate } from "react-router-dom";
import { FileInput, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { translations } from "@/utils/translations";
import { useAuth } from "@/contexts/AuthContext";

interface MobileUserInfoProps {
  onNavigate: (path: string) => void;
}

const MobileUserInfo: React.FC<MobileUserInfoProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const t = translations.en;

  if (!user) return null;

  return (
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
            onClick={() => onNavigate("/definitions")}
          >
            <FileInput className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-800 dark:text-white hover:text-apuntea-purple"
            onClick={() => onNavigate("/settings")}
          >
            <Settings className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => {
              logout();
              onNavigate("");
            }}
            className="text-destructive hover:text-red-400"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileUserInfo;
