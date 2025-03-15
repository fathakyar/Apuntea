import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import AgendaCalendar from "@/components/agenda/AgendaCalendar";
import { AgendaEvent, Invoice, RecordType } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";
import { ensureUppercase } from "@/utils/formatUtils";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";
import { getInvoices } from "@/utils/invoiceUtils";
import { useNavigate } from "react-router-dom";
import { format, isToday, parse } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DialogEventForm from "@/components/agenda/DialogEventForm";
import { formatCurrency } from "@/utils/invoiceUtils";

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
  
  const notTaskCategory = { id: "noteTask", name: "Notes & Tasks", subcategories: [
    { id: "note", name: "NOTE" },
    { id: "task", name: "TASK" }
  ]};

  useEffect(() => {
    const storedEvents = localStorage.getItem("apuntea_agenda_events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
    
    const invoiceRecords = getInvoices();
    setInvoices(invoiceRecords);
  }, []);

  useEffect(() => {
    if (events.length > 0 || localStorage.getItem("apuntea_agenda_events")) {
      localStorage.setItem("apuntea_agenda_events", JSON.stringify(events));
    }
  }, [events]);

  const getEventsForSelectedDate = () => {
    const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
    
    const dayEvents = events.filter(event => 
      event.date === selectedDateStr
    );
    
    const dayInvoices = invoices.filter(invoice => 
      invoice.invoiceDate === selectedDateStr
    ).map(invoice => ({
      ...invoice,
      eventType: 'invoice' as const
    }));
    
    let filteredEvents = [...dayEvents, ...dayInvoices];
    
    if (activeFilter !== 'all') {
      filteredEvents = filteredEvents.filter(event => {
        if (activeFilter === 'note') {
          // Show all events created via the "ADD NEW EVENT" popup when NOTES filter is selected
          if (!('eventType' in event)) {
            return true;
          }
          return false;
        } else {
          if ('eventType' in event && event.eventType === 'invoice') {
            return event.type === activeFilter;
          }
          return false;
        }
      });
    }
    
    return filteredEvents;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };
  
  const handleAddNote = () => {
    setEditingEvent(null);
    setIsFormOpen(true);
  };
  
  const handleAddRecord = () => {
    navigate("/new-record");
  };

  const handleAddOrEditEvent = (newEvent: AgendaEvent | Omit<AgendaEvent, "id">) => {
    if ("id" in newEvent) {
      const uppercaseEvent = {
        ...newEvent,
        title: ensureUppercase(newEvent.title),
        description: ensureUppercase(newEvent.description),
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
    } else {
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
    }
    
    setIsFormOpen(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    const eventToDelete = events.find(e => e.id === eventId);
    
    setEvents(prev => prev.filter(event => event.id !== eventId));
    
    toast({
      title: t.eventDeleted || "Event deleted",
      description: eventToDelete 
        ? `"${eventToDelete.title}" ${t.successfullyDeleted || "successfully deleted"}.`
        : t.eventSuccessfullyDeleted || "Event successfully deleted.",
    });
    
    setIsFormOpen(false);
  };
  
  const handleEventClick = (event: AgendaEvent | (Invoice & { eventType?: 'invoice' })) => {
    if ('eventType' in event && event.eventType === 'invoice') {
      navigate(`/edit/${event.id}`);
    } else {
      setEditingEvent(event as AgendaEvent);
      setIsFormOpen(true);
    }
  };
  
  const hasEventsOnDate = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    
    const hasEvent = events.some(event => event.date === dateString);
    
    const hasInvoice = invoices.some(invoice => invoice.invoiceDate === dateString);
    
    return hasEvent || hasInvoice;
  };
  
  const getEventColorForDate = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    
    const incomeInvoice = invoices.find(invoice => 
      invoice.invoiceDate === dateString && invoice.type === 'income'
    );
    if (incomeInvoice) return "bg-apuntea-gold";
    
    const expenseInvoice = invoices.find(invoice => 
      invoice.invoiceDate === dateString && invoice.type === 'expense'
    );
    if (expenseInvoice) return "bg-apuntea-purple";
    
    const financingInvoice = invoices.find(invoice => 
      invoice.invoiceDate === dateString && invoice.type === 'financing'
    );
    if (financingInvoice) return "bg-apuntea-dark";
    
    if (events.some(event => event.date === dateString)) {
      return "bg-blue-400";
    }
    
    return "";
  };
  
  const filteredEvents = getEventsForSelectedDate();

  // Group events by type
  const groupedEvents = filteredEvents.reduce((acc, event) => {
    let groupKey: string;
    
    if ('eventType' in event && event.eventType === 'invoice') {
      groupKey = event.type || 'unknown';
    } else {
      const agendaEvent = event as AgendaEvent;
      groupKey = agendaEvent.type || 'unknown';
    }
    
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    
    acc[groupKey].push(event);
    return acc;
  }, {} as Record<string, Array<AgendaEvent | (Invoice & { eventType?: 'invoice' })>>);
  
  const getGroupTitle = (type: string) => {
    switch(type) {
      case 'income': return 'INCOME';
      case 'expense': return 'EXPENSE';
      case 'financing': return 'FINANCING';
      case 'GÖREV': return 'TASK';
      case 'NOT': return 'NOTE';
      default: return type.toUpperCase();
    }
  };
  
  const getBadgeColor = (type: string) => {
    switch(type) {
      case 'income': return 'bg-apuntea-gold text-black';
      case 'expense': return 'bg-apuntea-purple text-white';
      case 'financing': return 'bg-apuntea-dark text-white'; 
      case 'GÖREV': return 'bg-blue-500 text-white';
      case 'NOT': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  // Importance level badges
  const getImportanceBadge = (importance?: string) => {
    switch(importance) {
      case 'high':
        return <Badge className="bg-red-500 text-white">HIGH</Badge>;
      case 'medium':
        return <Badge className="bg-orange-500 text-white">MEDIUM</Badge>;
      case 'low':
        return <Badge className="bg-green-500 text-white">LOW</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 animate-slide-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1 flex items-center">
            <CalendarIcon className="mr-2 h-7 w-7" />
            {t.agenda}
          </h1>
          <p className="text-muted-foreground">
            {t.manageEventsAndReminders || "Manage events and reminders"}
          </p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleAddRecord}
            className="bg-apuntea-purple text-white rounded-md px-4 py-2 flex items-center gap-2 hover:bg-apuntea-purple/90 transition-colors"
          >
            <Plus size={18} />
            RECORD
          </button>
          <button 
            onClick={handleAddNote}
            className="bg-apuntea-gold text-black rounded-md px-4 py-2 flex items-center gap-2 hover:bg-apuntea-gold/90 transition-colors"
          >
            <Plus size={18} />
            NOTE
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-3">
          <Card className="rounded-sm h-full">
            <CardContent className="p-4">
              <div className="flex flex-col space-y-4">
                <div className="mt-4">
                  <Calendar 
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && handleDateSelect(date)}
                    className="rounded-md pointer-events-auto"
                    modifiers={{
                      hasEvent: (date) => hasEventsOnDate(date),
                      today: (date) => isToday(date)
                    }}
                    modifiersClassNames={{
                      hasEvent: "font-bold",
                      today: "bg-primary/20 text-primary font-bold"
                    }}
                    components={{
                      DayContent: (props) => {
                        const eventColor = getEventColorForDate(props.date);
                        return (
                          <div className="relative flex h-9 w-9 items-center justify-center p-0">
                            <span>{props.date.getDate()}</span>
                            {eventColor && (
                              <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full ${eventColor}`} />
                            )}
                          </div>
                        );
                      }
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-9">
          <Card className="rounded-sm h-full">
            <CardContent className="p-6">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    {format(selectedDate, 'dd MMMM yyyy, EEEE')}
                  </h2>
                  
                  <Tabs value={activeFilter} onValueChange={(v) => setActiveFilter(v as any)}>
                    <TabsList>
                      <TabsTrigger value="all">ALL</TabsTrigger>
                      <TabsTrigger value="income">INCOME</TabsTrigger>
                      <TabsTrigger value="expense">EXPENSE</TabsTrigger>
                      <TabsTrigger value="financing">FINANCING</TabsTrigger>
                      <TabsTrigger value="note">NOTES</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <div className="space-y-6 mt-2 flex-grow">
                  {Object.keys(groupedEvents).length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground flex flex-col items-center">
                      <CalendarIcon className="h-12 w-12 mb-2 opacity-20" />
                      <p>No events for this date</p>
                      <div className="flex space-x-2 mt-4">
                        <button
                          onClick={handleAddRecord}
                          className="text-sm text-primary flex items-center gap-1"
                        >
                          <Plus size={16} />
                          Add Record
                        </button>
                        <button
                          onClick={handleAddNote}
                          className="text-sm text-primary flex items-center gap-1"
                        >
                          <Plus size={16} />
                          Add Note
                        </button>
                      </div>
                    </div>
                  ) : (
                    Object.entries(groupedEvents).map(([groupType, groupEvents]) => (
                      <div key={groupType} className="space-y-2">
                        <h3 className="font-semibold text-sm tracking-wider">
                          <Badge className={`${getBadgeColor(groupType)}`}>
                            {getGroupTitle(groupType)}
                          </Badge>
                        </h3>
                        
                        <div className="space-y-2">
                          {groupEvents.map((event) => {
                            if ('eventType' in event && event.eventType === 'invoice') {
                              // Financial record
                              const invoice = event as Invoice & { eventType: 'invoice' };
                              return (
                                <div 
                                  key={`invoice-${invoice.id}`}
                                  className="border p-2 rounded-md hover:bg-muted/20 cursor-pointer flex items-center justify-between"
                                  onClick={() => handleEventClick(invoice)}
                                >
                                  <div className="flex-grow overflow-hidden">
                                    <div className="font-medium truncate">{invoice.companyName}</div>
                                  </div>
                                  <div className="text-sm font-medium whitespace-nowrap ml-3">
                                    {formatCurrency(invoice.totalAmount)} {invoice.currencyCode || "EUR"}
                                  </div>
                                </div>
                              );
                            } else {
                              // Note or task
                              const agendaEvent = event as AgendaEvent;
                              return (
                                <div 
                                  key={`event-${agendaEvent.id}`}
                                  className="border p-2 rounded-md hover:bg-muted/20 cursor-pointer flex items-center justify-between"
                                  onClick={() => handleEventClick(agendaEvent)}
                                >
                                  <div className="flex-grow overflow-hidden pr-3">
                                    <div className="font-medium truncate">{agendaEvent.title}</div>
                                    <p className="text-sm text-muted-foreground line-clamp-1">
                                      {agendaEvent.description}
                                    </p>
                                  </div>
                                  <div className="flex-shrink-0">
                                    {getImportanceBadge(agendaEvent.importance)}
                                  </div>
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <DialogEventForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        selectedDate={selectedDate}
        editingEvent={editingEvent}
        subcategories={notTaskCategory.subcategories}
        onSubmit={handleAddOrEditEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
};

export default Agenda;
