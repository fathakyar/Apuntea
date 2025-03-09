
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Plus } from "lucide-react";
import AgendaCalendar from "@/components/agenda/AgendaCalendar";
import { AgendaEvent } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

const Agenda = () => {
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const { toast } = useToast();

  // Local storage'dan verileri yükle
  useEffect(() => {
    const storedEvents = localStorage.getItem("apuntea_agenda_events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  // Local storage'a verileri kaydet
  useEffect(() => {
    if (events.length > 0 || localStorage.getItem("apuntea_agenda_events")) {
      localStorage.setItem("apuntea_agenda_events", JSON.stringify(events));
    }
  }, [events]);

  // Yeni etkinlik ekleme
  const handleAddEvent = (newEvent: Omit<AgendaEvent, "id">) => {
    const eventWithId = {
      ...newEvent,
      id: uuidv4()
    };
    
    setEvents(prev => [...prev, eventWithId]);
    
    toast({
      title: "Etkinlik eklendi",
      description: `"${newEvent.title}" başarıyla eklendi.`,
    });
  };

  // Etkinlik düzenleme
  const handleEditEvent = (updatedEvent: AgendaEvent) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    
    toast({
      title: "Etkinlik güncellendi",
      description: `"${updatedEvent.title}" başarıyla güncellendi.`,
    });
  };

  // Etkinlik silme
  const handleDeleteEvent = (eventId: string) => {
    const eventToDelete = events.find(e => e.id === eventId);
    
    setEvents(prev => prev.filter(event => event.id !== eventId));
    
    toast({
      title: "Etkinlik silindi",
      description: eventToDelete 
        ? `"${eventToDelete.title}" başarıyla silindi.`
        : "Etkinlik başarıyla silindi.",
    });
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-6 animate-slide-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1 flex items-center">
              <Calendar className="mr-2 h-7 w-7" />
              Ajanda
            </h1>
            <p className="text-muted-foreground">
              Etkinlikleri ve hatırlatmaları düzenleme
            </p>
          </div>
        </div>

        <Card>
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
    </Layout>
  );
};

export default Agenda;
