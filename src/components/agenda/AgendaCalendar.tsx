
import React from "react";
import { isSameDay, parse } from "date-fns";
import { AgendaEvent as AgendaEventType, Invoice } from "@/types";
import { useDefinitions } from "@/contexts/DefinitionsContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";

// Import components and hooks
import CalendarHeader from "./CalendarHeader";
import DialogEventForm from "./DialogEventForm";
import CalendarViewRenderer from "./CalendarViewRenderer";
import { useCalendarState } from "./hooks/useCalendarState";

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
  const { 
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
  } = useCalendarState();
  
  const { categories } = useDefinitions();
  const notTaskCategory = categories.find(cat => cat.id === "noteTask");
  const { language } = useLanguage();
  const t = translations[language];

  const handleEventClick = (e: React.MouseEvent, event: AgendaEventType | (Invoice & { eventType?: 'invoice' })) => {
    e.stopPropagation();
    
    if ('eventType' in event && event.eventType === 'invoice') {
      onInvoiceClick(event);
      return;
    }
    
    setEditingEvent(event as AgendaEventType);
    setIsFormOpen(true);
  };

  const handleDateSelectWrapper = (date: Date) => {
    handleDateSelect(date, events);
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
      
      <CalendarViewRenderer
        viewMode={viewMode}
        currentDate={currentDate}
        events={events}
        invoices={invoices}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelectWrapper}
        onEventClick={handleEventClick}
        onMonthSelect={handleMonthSelect}
      />

      <DialogEventForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        selectedDate={selectedDate}
        editingEvent={editingEvent}
        subcategories={notTaskCategory?.subcategories || []}
        onSubmit={handleAddOrEditEvent}
        onDelete={onDeleteEvent}
      />
    </div>
  );
};

export default AgendaCalendar;
