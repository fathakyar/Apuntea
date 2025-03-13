
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, FilterIcon } from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react";
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
  const [activeFilter, setActiveFilter] = useState<"all" | RecordType | "task">("all");
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();
  
  // Get subcategories for the form
  const notTaskCategory = { id: "noteTask", name: "Notes & Tasks", subcategories: [
    { id: "note", name: "NOTE" },
    { id: "task", name: "TASK" }
  ]};

  // Load events data from local storage
  useEffect(() => {
    const storedEvents = localStorage.getItem("apuntea_agenda_events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
    
    // Load invoice records
    const invoiceRecords = getInvoices();
    setInvoices(invoiceRecords);
  }, []);

  // Save data to local storage
  useEffect(() => {
    if (events.length > 0 || localStorage.getItem("apuntea_agenda_events")) {
      localStorage.setItem("apuntea_agenda_events", JSON.stringify(events));
    }
  }, [events]);

  // Get events for the selected date
  const getEventsForSelectedDate = () => {
    const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
    
    // Filter events for the selected date
    const dayEvents = events.filter(event => 
      event.date === selectedDateStr
    );
    
    // Filter invoices for the selected date
    const dayInvoices = invoices.filter(invoice => 
      invoice.invoiceDate === selectedDateStr
    ).map(invoice => ({
      ...invoice,
      eventType: 'invoice' as const
    }));
    
    // Apply additional filter if needed
    let filteredEvents = [...dayEvents, ...dayInvoices];
    
    if (activeFilter !== 'all') {
      filteredEvents = filteredEvents.filter(event => {
        if (activeFilter === 'task') {
          // For tasks from agenda events
          if (!('eventType' in event)) {
            return event.type === 'GÖREV';
          }
          return false;
        } else {
          // For income, expense, financing from invoices
          if ('eventType' in event && event.eventType === 'invoice') {
            return event.type === activeFilter;
          }
          return false;
        }
      });
    }
    
    return filteredEvents;
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };
  
  // Handle adding a new event
  const handleAddEvent = () => {
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  // Add new event
  const handleAddOrEditEvent = (newEvent: AgendaEvent | Omit<AgendaEvent, "id">) => {
    if ("id" in newEvent) {
      // Edit existing event
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
      // Add new event
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
    
    setIsFormOpen(false);
  };
  
  // Handle invoice click
  const handleEventClick = (event: AgendaEvent | (Invoice & { eventType?: 'invoice' })) => {
    if ('eventType' in event && event.eventType === 'invoice') {
      navigate(`/edit/${event.id}`);
    } else {
      setEditingEvent(event as AgendaEvent);
      setIsFormOpen(true);
    }
  };
  
  // Check if a date has events
  const hasEventsOnDate = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    
    // Check events
    const hasEvent = events.some(event => event.date === dateString);
    
    // Check invoices
    const hasInvoice = invoices.some(invoice => invoice.invoiceDate === dateString);
    
    return hasEvent || hasInvoice;
  };
  
  // Get dot color for calendar dates with events
  const getEventColorForDate = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    
    // Priority order: income, expense, financing, notes/tasks
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
    
    // For any other event
    if (events.some(event => event.date === dateString)) {
      return "bg-blue-400";
    }
    
    return "";
  };
  
  // Filtered events to display
  const filteredEvents = getEventsForSelectedDate();

  // Get group title by type
  const getGroupTitle = (type: string) => {
    switch(type) {
      case 'income': return 'GELİR';
      case 'expense': return 'GİDER';
      case 'financing': return 'FİNANSMAN';
      case 'GÖREV': return 'GÖREV';
      case 'NOT': return 'NOT';
      default: return type.toUpperCase();
    }
  };
  
  // Get badge color by type
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
        <button 
          onClick={handleAddEvent}
          className="bg-apuntea-gold text-black rounded-md px-4 py-2 flex items-center gap-2 hover:bg-apuntea-gold/90 transition-colors"
        >
          <Plus size={18} />
          {t.new || "New"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar side */}
        <div className="md:col-span-1">
          <Card className="rounded-sm h-full">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                {/* Month and year display */}
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {format(selectedDate, 'MMMM yyyy')}
                  </h2>
                </div>
                
                {/* Calendar */}
                <div className="mt-4">
                  <Calendar 
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && handleDateSelect(date)}
                    className="rounded-md"
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
        
        {/* Events Side */}
        <div className="md:col-span-2">
          <Card className="rounded-sm h-full">
            <CardContent className="p-6">
              <div className="flex flex-col h-full">
                {/* Day header */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    {format(selectedDate, 'dd MMMM yyyy, EEEE')}
                  </h2>
                  
                  {/* Filter */}
                  <Tabs value={activeFilter} onValueChange={(v) => setActiveFilter(v as any)}>
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="income">Income</TabsTrigger>
                      <TabsTrigger value="expense">Expense</TabsTrigger>
                      <TabsTrigger value="financing">Financing</TabsTrigger>
                      <TabsTrigger value="task">Tasks</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                {/* Events List */}
                <div className="space-y-4 mt-2 flex-grow">
                  {filteredEvents.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground flex flex-col items-center">
                      <Calendar className="h-12 w-12 mb-2 opacity-20" />
                      <p>No events for this date</p>
                      <button
                        onClick={handleAddEvent}
                        className="mt-4 text-sm text-primary flex items-center gap-1"
                      >
                        <Plus size={16} />
                        Add Event
                      </button>
                    </div>
                  ) : (
                    filteredEvents.map((event) => {
                      if ('eventType' in event && event.eventType === 'invoice') {
                        const invoice = event as Invoice & { eventType: 'invoice' };
                        return (
                          <div 
                            key={`invoice-${invoice.id}`}
                            className="border p-4 rounded-md hover:bg-muted/20 cursor-pointer"
                            onClick={() => handleEventClick(invoice)}
                          >
                            <div className="flex items-center justify-between">
                              <Badge className={getBadgeColor(invoice.type || '')}>
                                {getGroupTitle(invoice.type || '')}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {formatCurrency(invoice.totalAmount).replace(' €', '')} EUR
                              </span>
                            </div>
                            <h3 className="font-semibold mt-2">{invoice.companyName}</h3>
                            <p className="text-sm text-muted-foreground">
                              {invoice.invoiceNumber}
                            </p>
                          </div>
                        );
                      } else {
                        const agendaEvent = event as AgendaEvent;
                        return (
                          <div 
                            key={`event-${agendaEvent.id}`}
                            className="border p-4 rounded-md hover:bg-muted/20 cursor-pointer"
                            onClick={() => handleEventClick(agendaEvent)}
                          >
                            <div className="flex items-center justify-between">
                              <Badge className={getBadgeColor(agendaEvent.type)}>
                                {getGroupTitle(agendaEvent.type)}
                              </Badge>
                            </div>
                            <h3 className="font-semibold mt-2">{agendaEvent.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {agendaEvent.description}
                            </p>
                          </div>
                        );
                      }
                    })
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Event Form Dialog */}
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
