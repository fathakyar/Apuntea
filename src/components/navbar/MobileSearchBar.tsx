
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { translations } from "@/utils/translations";

const MobileSearchBar: React.FC = () => {
  const t = translations.en;
  
  return (
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
  );
};

export default MobileSearchBar;
