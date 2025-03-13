
import React from "react";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileClock, Columns, CalendarDays, CalendarCheck } from "lucide-react";
import { formatDateHeader } from "./utils/calendarUtils";

type ViewMode = "day" | "week" | "month" | "year";

interface CalendarHeaderProps {
  currentDate: Date;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onNavigate: (direction: "prev" | "next" | "today") => void;
  onAddEvent: () => void;
  t: any; // Translations
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  viewMode,
  onViewModeChange,
  onNavigate,
  onAddEvent,
  t
}) => {
  return (
    <div className="flex flex-col space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5" />
          <h2 className="text-xl font-bold">
            {formatDateHeader(currentDate, viewMode)}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigate("prev")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate("today")}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onNavigate("next")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="day" value={viewMode} onValueChange={(v) => onViewModeChange(v as ViewMode)} className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="day" className="flex items-center">
            <FileClock className="h-4 w-4 mr-2" />
            Day
          </TabsTrigger>
          <TabsTrigger value="week" className="flex items-center">
            <Columns className="h-4 w-4 mr-2" />
            Week
          </TabsTrigger>
          <TabsTrigger value="month" className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2" />
            Month
          </TabsTrigger>
          <TabsTrigger value="year" className="flex items-center">
            <CalendarCheck className="h-4 w-4 mr-2" />
            Year
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CalendarHeader;
