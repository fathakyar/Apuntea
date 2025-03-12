
import { useState } from "react";
import { add, isSameDay, parse } from "date-fns";

type ViewMode = "day" | "week" | "month" | "year";

export const useCalendarState = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  // Changed default view to "day" as requested
  const [viewMode, setViewMode] = useState<ViewMode>("day");

  const navigate = (direction: "prev" | "next" | "today") => {
    if (direction === "today") {
      setCurrentDate(new Date());
      return;
    }

    if (viewMode === "day") {
      setCurrentDate(prev => {
        const days = direction === "prev" ? -1 : 1;
        return add(prev, { days });
      });
    } else if (viewMode === "week") {
      setCurrentDate(prev => {
        const weeks = direction === "prev" ? -1 : 1;
        return add(prev, { weeks });
      });
    } else if (viewMode === "month") {
      setCurrentDate(prev => {
        return direction === "prev" ? add(prev, { months: -1 }) : add(prev, { months: 1 });
      });
    } else if (viewMode === "year") {
      setCurrentDate(prev => {
        const years = direction === "prev" ? -1 : 1;
        return add(prev, { years });
      });
    }
  };

  const handleViewModeChange = (newMode: ViewMode) => {
    setViewMode(newMode);
  };

  const handleDateSelect = (date: Date, events: any[]) => {
    setSelectedDate(date);
    // Only open the event form if it's a blank date click in month or week view
    if ((viewMode === "month" || viewMode === "week") && 
        events.filter(event => isSameDay(parse(event.date, "yyyy-MM-dd", new Date()), date)).length === 0) {
      setEditingEvent(null);
      setIsFormOpen(true);
    }
  };

  const handleMonthSelect = (date: Date) => {
    setCurrentDate(date);
    setViewMode("month");
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  return {
    currentDate,
    selectedDate,
    isFormOpen,
    editingEvent,
    viewMode,
    setIsFormOpen,
    setEditingEvent,
    navigate,
    handleViewModeChange,
    handleDateSelect,
    handleMonthSelect,
    handleAddEvent
  };
};
