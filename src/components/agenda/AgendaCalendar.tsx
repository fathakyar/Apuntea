
import React, { useState } from "react";
import { add, parse, isSameDay, format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AgendaEvent as AgendaEventType, Invoice } from "@/types";
import { useDefinitions } from "@/contexts/DefinitionsContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";

// Import new components
import CalendarHeader from "./CalendarHeader";
import DayView from "./views/DayView";
import WeekView from "./views/WeekView";
import MonthView from "./views/MonthView";
import YearView from "./views/YearView";
import AgendaEventForm from "./AgendaEventForm";

type ViewMode = "day" | "week" | "month" | "year";

interface AgendaCalendarProps {
  events: AgendaEventType[];
  invoices: Invoice[];
  onAddEvent: (event: Omit<AgendaEventType, "id">) => void;
  onEditEvent: (event: AgendaEventType) => void;
  onDeleteEvent: (eventId: string) => void;
  onInvoiceClick: (invoice: Invoice) => void;
}

const AgendaCalendar: React.FC<AgendaCalendarProps> = ({
  events,
  invoices,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
  onInvoiceClick
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AgendaEventType | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  
  const { categories } = useDefinitions();
  const notTaskCategory = categories.find(cat => cat.id === "noteTask");
  const { language } = useLanguage();
  const t = translations[language];

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

  const handleEventClick = (e: React.MouseEvent, event: AgendaEventType | (Invoice & { eventType?: 'invoice' })) => {
    e.stopPropagation();
    
    if ('eventType' in event && event.eventType === 'invoice') {
      onInvoiceClick(event);
      return;
    }
    
    setEditingEvent(event as AgendaEventType);
    setIsFormOpen(true);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // Only open the event form if it's a blank date click in month or week view
    if ((viewMode === "month" || viewMode === "week") && 
        events.filter(event => isSameDay(parse(event.date, "yyyy-MM-dd", new Date()), date)).length === 0) {
      setEditingEvent(null);
      setIsFormOpen(true);
    }
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  const handleViewModeChange = (newMode: ViewMode) => {
    setViewMode(newMode);
  };

  const handleMonthSelect = (date: Date) => {
    setCurrentDate(date);
    setViewMode("month");
  };

  const renderView = () => {
    switch (viewMode) {
      case "day":
        return (
          <DayView
            currentDate={currentDate}
            events={events}
            invoices={invoices}
            onEventClick={handleEventClick}
          />
        );
      case "week":
        return (
          <WeekView
            currentDate={currentDate}
            events={events}
            invoices={invoices}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onEventClick={handleEventClick}
          />
        );
      case "month":
        return (
          <MonthView
            currentDate={currentDate}
            events={events}
            invoices={invoices}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onEventClick={handleEventClick}
          />
        );
      case "year":
        return (
          <YearView
            currentDate={currentDate}
            events={events}
            onMonthSelect={handleMonthSelect}
          />
        );
      default:
        return (
          <MonthView
            currentDate={currentDate}
            events={events}
            invoices={invoices}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onEventClick={handleEventClick}
          />
        );
    }
  };

  const handleAddOrEditEvent = (event: AgendaEventType | Omit<AgendaEventType, "id">) => {
    if ("id" in event) {
      onEditEvent(event);
    } else {
      onAddEvent(event);
    }
    setIsFormOpen(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (eventId: string) => {
    onDeleteEvent(eventId);
    setIsFormOpen(false);
    setEditingEvent(null);
  };

  return (
    <div className="h-full">
      <CalendarHeader
        currentDate={currentDate}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        onNavigate={navigate}
        onAddEvent={handleAddEvent}
        t={t}
      />
      
      {renderView()}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingEvent ? "Edit Event" : "Add New Event"}
            </DialogTitle>
          </DialogHeader>
          <AgendaEventForm
            event={editingEvent}
            onSubmit={handleAddOrEditEvent}
            onDelete={editingEvent ? handleDeleteEvent : undefined}
            subcategories={notTaskCategory?.subcategories || []}
            selectedDate={selectedDate}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgendaCalendar;
