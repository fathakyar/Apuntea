
import React, { useRef, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { translations } from "@/utils/translations";

const SearchBar: React.FC = () => {
  const t = translations.en;
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

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
  );
};

export default SearchBar;
