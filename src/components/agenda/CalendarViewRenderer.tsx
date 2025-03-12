
import React from "react";
import { AgendaEvent, Invoice } from "@/types";
import DayView from "./views/DayView";
import WeekView from "./views/WeekView";
import MonthView from "./views/MonthView";
import YearView from "./views/YearView";

type ViewMode = "day" | "week" | "month" | "year";

interface CalendarViewRendererProps {
  viewMode: ViewMode;
  currentDate: Date;
  events: AgendaEvent[];
  invoices: Invoice[];
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onEventClick: (e: React.MouseEvent, event: AgendaEvent | (Invoice & { eventType?: 'invoice' })) => void;
  onMonthSelect: (date: Date) => void;
}

const CalendarViewRenderer: React.FC<CalendarViewRendererProps> = ({
  viewMode,
  currentDate,
  events,
  invoices,
  selectedDate,
  onDateSelect,
  onEventClick,
  onMonthSelect
}) => {
  switch (viewMode) {
    case "day":
      return (
        <DayView
          currentDate={currentDate}
          events={events}
          invoices={invoices}
          onEventClick={onEventClick}
        />
      );
    case "week":
      return (
        <WeekView
          currentDate={currentDate}
          events={events}
          invoices={invoices}
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
          onEventClick={onEventClick}
        />
      );
    case "month":
      return (
        <MonthView
          currentDate={currentDate}
          events={events}
          invoices={invoices}
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
          onEventClick={onEventClick}
        />
      );
    case "year":
      return (
        <YearView
          currentDate={currentDate}
          events={events}
          onMonthSelect={onMonthSelect}
        />
      );
    default:
      return (
        <MonthView
          currentDate={currentDate}
          events={events}
          invoices={invoices}
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
          onEventClick={onEventClick}
        />
      );
  }
};

export default CalendarViewRenderer;
