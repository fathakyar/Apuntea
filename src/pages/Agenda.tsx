
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { translations } from "@/utils/translations";
import { getInvoices, formatCurrency } from "@/utils/invoiceUtils";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDefinitions } from "@/contexts/DefinitionsContext";
import { AgendaEvent, Invoice, RecordType } from "@/types";
import { v4 as uuidv4 } from "uuid";
import AgendaToolbar from "@/components/agenda/AgendaToolbar";
import AgendaEventsList from "@/components/agenda/AgendaEventsList";
import DialogEventForm from "@/components/agenda/DialogEventForm";

const Agenda = () => {
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AgendaEvent | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | RecordType | "note">("all");
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();
  const { categories } = useDefinitions();
  const eventCategory = categories.find(cat => cat.id === "noteTask");

  useEffect(() => {
    const storedEvents = localStorage.getItem("apuntea_agenda_events");
    if (storedEvents) setEvents(JSON.parse(storedEvents));
    setInvoices(getInvoices());
  }, []);

  useEffect(() => {
    if (events.length > 0 || localStorage.getItem("apuntea_agenda_events")) {
      localStorage.setItem("apuntea_agenda_events", JSON.stringify(events));
    }
  }, [events]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) setSelectedDate(date);
  };

  const handleAddNote = () => {
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  const handleAddRecord = () => navigate("/new-record");

  const handleAddOrEditEvent = (newEvent: AgendaEvent | Omit<AgendaEvent, "id">) => {
    if ("id" in newEvent) {
      setEvents(prev => prev.map(event => event.id === newEvent.id ? {
        ...newEvent,
        title: (newEvent.title || "").toUpperCase(),
        description: (newEvent.description || "").toUpperCase(),
      } : event));
      toast({ title: t.eventUpdated, description: `"${newEvent.title}" ${t.successfullyUpdated}.` });
    } else {
      const eventWithId = {
        ...newEvent,
        title: (newEvent.title || "").toUpperCase(),
        description: (newEvent.description || "").toUpperCase(),
        id: uuidv4()
      };
      setEvents(prev => [...prev, eventWithId]);
      toast({ title: t.eventAdded, description: `"${eventWithId.title}" ${t.successfullyAdded}.` });
    }
    setIsFormOpen(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    const eventToDelete = events.find(e => e.id === eventId);
    setEvents(prev => prev.filter(event => event.id !== eventId));
    toast({
      title: t.eventDeleted,
      description: eventToDelete ? `"${eventToDelete.title}" ${t.successfullyDeleted}.` : t.eventSuccessfullyDeleted,
    });
    setIsFormOpen(false);
  };

  const handleEventClick = (event: AgendaEvent | (Invoice & { eventType?: 'invoice' })) => {
    if ('eventType' in event && event.eventType === 'invoice') navigate(`/edit/${event.id}`);
    else { setEditingEvent(event as AgendaEvent); setIsFormOpen(true); }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-slide-in">
      {/* Sol: Takvim */}
      <aside className="lg:w-[340px] w-full shrink-0 mb-4 lg:mb-0">
        <Card className="rounded-sm">
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="pointer-events-auto"
            />
          </CardContent>
        </Card>
      </aside>

      {/* Sağ: Kayıtlar ve kontrol barı */}
      <main className="flex-1 w-full">
        <AgendaToolbar
          selectedDate={selectedDate}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          handleAddNote={handleAddNote}
          handleAddRecord={handleAddRecord}
          onDateSelect={date => date && setSelectedDate(date)}
          t={t}
        />

        <Card className="rounded-sm h-full">
          <CardContent className="p-6">
            <AgendaEventsList
              events={events}
              invoices={invoices}
              selectedDate={selectedDate}
              activeFilter={activeFilter}
              onEventClick={handleEventClick}
              onAddNote={handleAddNote}
              onAddRecord={handleAddRecord}
              t={t}
            />
          </CardContent>
        </Card>
      </main>

      <DialogEventForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        selectedDate={selectedDate}
        editingEvent={editingEvent}
        subcategories={eventCategory?.subcategories || []}
        onSubmit={handleAddOrEditEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
};

export default Agenda;
