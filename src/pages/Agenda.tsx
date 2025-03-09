
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Plus } from "lucide-react";
import AgendaCalendar from "@/components/agenda/AgendaCalendar";
import { AgendaEvent } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";
import { ensureUppercase } from "@/utils/formatUtils";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";

const Agenda = () => {
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language];

  // Load data from local storage
  useEffect(() => {
    const storedEvents = localStorage.getItem("apuntea_agenda_events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  // Save data to local storage
  useEffect(() => {
    if (events.length > 0 || localStorage.getItem("apuntea_agenda_events")) {
      localStorage.setItem("apuntea_agenda_events", JSON.stringify(events));
    }
  }, [events]);

  // Add new event
  const handleAddEvent = (newEvent: Omit<AgendaEvent, "id">) => {
    // Ensure all text content is uppercase
    const eventWithId = {
      ...newEvent,
      title: ensureUppercase(newEvent.title),
      description: ensureUppercase(newEvent.description),
      id: uuidv4()
    };
    
    setEvents(prev => [...prev, eventWithId]);
    
    toast({
      title: t.eventAdded || "Event added",
      description: `"${eventWithId.title}" ${t.successfullyAdded || "successfully added"}.`,
    });
  };

  // Edit event
  const handleEditEvent = (updatedEvent: AgendaEvent) => {
    // Ensure all text content is uppercase
    const uppercaseEvent = {
      ...updatedEvent,
      title: ensureUppercase(updatedEvent.title),
      description: ensureUppercase(updatedEvent.description),
    };
    
    setEvents(prev => 
      prev.map(event => 
        event.id === uppercaseEvent.id ? uppercaseEvent : event
      )
    );
    
    toast({
      title: t.eventUpdated || "Event updated",
      description: `"${uppercaseEvent.title}" ${t.successfullyUpdated || "successfully updated"}.`,
    });
  };

  // Delete event
  const handleDeleteEvent = (eventId: string) => {
    const eventToDelete = events.find(e => e.id === eventId);
    
    setEvents(prev => prev.filter(event => event.id !== eventId));
    
    toast({
      title: t.eventDeleted || "Event deleted",
      description: eventToDelete 
        ? `"${eventToDelete.title}" ${t.successfullyDeleted || "successfully deleted"}.`
        : t.eventSuccessfullyDeleted || "Event successfully deleted.",
    });
  };

  return (
    <div className="grid grid-cols-1 gap-6 animate-slide-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1 flex items-center">
            <Calendar className="mr-2 h-7 w-7" />
            {t.agenda}
          </h1>
          <p className="text-muted-foreground">
            {t.manageEventsAndReminders || "Manage events and reminders"}
          </p>
        </div>
      </div>

      <Card className="rounded-sm">
        <CardContent className="p-6">
          <AgendaCalendar 
            events={events}
            onAddEvent={handleAddEvent}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Agenda;
