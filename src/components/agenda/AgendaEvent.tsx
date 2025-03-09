
import React from "react";
import { cn } from "@/lib/utils";
import { AgendaEvent as AgendaEventType } from "@/types";
import { FileText, CheckSquare } from "lucide-react";

interface AgendaEventProps {
  event: AgendaEventType;
  onClick: () => void;
}

const AgendaEvent: React.FC<AgendaEventProps> = ({ event, onClick }) => {
  // Renk seçimi için basit bir fonksiyon
  const getCategoryColor = (subcategoryId: string) => {
    // subcategoryId'nin son karakterini alarak sabit renk dönelim
    const lastChar = subcategoryId.charAt(subcategoryId.length - 1);
    const colorMap: Record<string, string> = {
      "0": "bg-red-100 text-red-800 border-red-200",
      "1": "bg-blue-100 text-blue-800 border-blue-200",
      "2": "bg-green-100 text-green-800 border-green-200",
      "3": "bg-purple-100 text-purple-800 border-purple-200",
      "4": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "5": "bg-pink-100 text-pink-800 border-pink-200",
      "6": "bg-indigo-100 text-indigo-800 border-indigo-200",
      "7": "bg-orange-100 text-orange-800 border-orange-200",
      "8": "bg-cyan-100 text-cyan-800 border-cyan-200",
      "9": "bg-emerald-100 text-emerald-800 border-emerald-200",
    };
    
    return colorMap[lastChar] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const isTask = event.type === "GÖREV";
  
  return (
    <div
      className={cn(
        "text-xs px-2 py-1 rounded border truncate flex items-center gap-1",
        getCategoryColor(event.subcategoryId),
        "cursor-pointer hover:opacity-80 transition-opacity"
      )}
      onClick={onClick}
      title={event.title}
    >
      {isTask ? (
        <CheckSquare className="h-3 w-3 shrink-0" />
      ) : (
        <FileText className="h-3 w-3 shrink-0" />
      )}
      <span className="truncate">{event.title}</span>
    </div>
  );
};

export default AgendaEvent;
