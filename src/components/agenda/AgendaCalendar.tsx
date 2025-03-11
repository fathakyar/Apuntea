import React, { useState, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, FileClock, Columns, CalendarDays, CalendarCheck } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, parse, add, eachWeekOfInterval, getWeek, startOfWeek, endOfWeek, eachMonthOfInterval, endOfYear, startOfYear, getMonth, getYear, getDay, getDate } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDefinitions } from "@/contexts/DefinitionsContext";
import AgendaEventForm from "./AgendaEventForm";
import AgendaEvent from "./AgendaEvent";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AgendaEvent as AgendaEventType, Invoice } from "@/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";

interface AgendaCalendarProps {
  events: AgendaEventType[];
  invoices: Invoice[];
  onAddEvent: (event: Omit<AgendaEventType, "id">) => void;
  onEditEvent: (event: AgendaEventType) => void;
  onDeleteEvent: (eventId: string) => void;
  onInvoiceClick: (invoice: Invoice) => void;
}

type ViewMode = "day" | "week" | "month" | "year";

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

  // Get the correct locale for date formatting based on language
  const getDateLocale = () => {
    // Only English is supported now
    return undefined;
  };

  // Navigation helpers
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
        return direction === "prev" ? subMonths(prev, 1) : addMonths(prev, 1);
      });
    } else if (viewMode === "year") {
      setCurrentDate(prev => {
        const years = direction === "prev" ? -1 : 1;
        return add(prev, { years });
      });
    }
  };

  // Helper to get events for a specific day
  const getEventsForDay = (day: Date) => {
    // Get regular agenda events
    const dayEvents = events.filter(event => 
      isSameDay(parse(event.date, "yyyy-MM-dd", new Date()), day)
    );
    
    // Get invoice records for this day
    const dayInvoices = invoices
      .filter(invoice => 
        isSameDay(parse(invoice.invoiceDate, "yyyy-MM-dd", new Date()), day)
      )
      .map(invoice => ({
        ...invoice,
        eventType: 'invoice' as const
      }));
    
    // Combine both types of events
    return [...dayEvents, ...dayInvoices];
  };

  // Handle event click
  const handleEventClick = (e: React.MouseEvent, event: AgendaEventType | (Invoice & { eventType?: 'invoice' })) => {
    e.stopPropagation();
    
    // Check if this is an invoice record
    if ('eventType' in event && event.eventType === 'invoice') {
      onInvoiceClick(event);
      return;
    }
    
    // Otherwise it's a regular agenda event
    setEditingEvent(event as AgendaEventType);
    setIsFormOpen(true);
  };

  // View mode header
  const renderViewModeHeader = () => {
    let headerText = "";
    const locale = getDateLocale();
    
    if (viewMode === "day") {
      headerText = format(currentDate, "dd MMMM yyyy, EEEE", { locale });
    } else if (viewMode === "week") {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
      headerText = `${format(weekStart, "dd")} - ${format(weekEnd, "dd MMMM yyyy", { locale })}`;
    } else if (viewMode === "month") {
      headerText = format(currentDate, "MMMM yyyy", { locale });
    } else if (viewMode === "year") {
      headerText = format(currentDate, "yyyy", { locale });
    }
    
    return (
      <div className="flex items-center">
        <CalendarIcon className="mr-2 h-5 w-5" />
        <h2 className="text-xl font-bold">
          {headerText}
        </h2>
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex items-center justify-between">
          {renderViewModeHeader()}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("today")}
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button 
              size="sm"
              onClick={() => {
                setEditingEvent(null);
                setIsFormOpen(true);
              }}
              className="bg-apuntea-gold text-black hover:bg-apuntea-gold/90"
            >
              <Plus className="h-4 w-4 mr-1" />
              {t.new}
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)} className="w-full">
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

  // Day view content
  const renderDayView = () => {
    const combinedEvents = getEventsForDay(currentDate);
    
    return (
      <div className="border rounded-sm p-4 min-h-[500px]">
        <h3 className="font-bold mb-4">{format(currentDate, "dd MMMM yyyy, EEEE")}</h3>
        
        {combinedEvents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No events for this day. Click "New" to add an event.
          </div>
        ) : (
          <div className="space-y-2">
            {combinedEvents.map((event) => {
              if ('eventType' in event && event.eventType === 'invoice') {
                const invoice = event as Invoice & { eventType: 'invoice' };
                return (
                  <div 
                    key={`invoice-${invoice.id}`} 
                    className="flex items-center p-3 border rounded-sm hover:bg-muted/50 cursor-pointer"
                    onClick={(e) => handleEventClick(e, invoice)}
                  >
                    <div className="flex-grow">
                      <h4 className="font-medium">{invoice.companyName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {invoice.invoiceNumber} - {invoice.totalAmount}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                      {invoice.type?.toUpperCase()}
                    </div>
                  </div>
                );
              } else {
                const agendaEvent = event as AgendaEventType;
                return (
                  <div 
                    key={`event-${agendaEvent.id}`} 
                    className="flex items-center p-3 border rounded-sm hover:bg-muted/50 cursor-pointer"
                    onClick={(e) => handleEventClick(e, agendaEvent)}
                  >
                    <div className="flex-grow">
                      <h4 className="font-medium">{agendaEvent.title}</h4>
                      <p className="text-sm text-muted-foreground truncate">{agendaEvent.description}</p>
                    </div>
                    <div className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                      {agendaEvent.type}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    );
  };

  // Week view content
  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
    
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
    
    return (
      <div className="grid grid-cols-7 gap-4">
        {days.map((day) => {
          const combinedEvents = getEventsForDay(day);
          
          return (
            <div 
              key={day.toISOString()} 
              className={cn(
                "border rounded-sm p-2 min-h-[300px] flex flex-col",
                isToday(day) && "ring-2 ring-primary",
                isSameDay(selectedDate || new Date(), day) && "bg-muted/20"
              )}
              onClick={() => {
                setSelectedDate(day);
                if (combinedEvents.length === 0) {
                  setEditingEvent(null);
                  setIsFormOpen(true);
                }
              }}
            >
              <div className={cn(
                "text-center py-1 font-medium rounded-sm mb-2",
                isToday(day) && "bg-primary text-primary-foreground"
              )}>
                {format(day, "EEE")}
                <div className="text-xl">{format(day, "dd")}</div>
              </div>
              
              <div className="flex-grow overflow-y-auto space-y-1">
                {combinedEvents.map((event) => (
                  <AgendaEvent
                    key={'id' in event ? event.id : `invoice-${event.id}`}
                    event={event}
                    onClick={(e) => handleEventClick(e, event)}
                  />
                ))}
              </div>
              
              {combinedEvents.length === 0 && (
                <div className="text-center text-xs text-muted-foreground mt-2">
                  No events
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Month view content (traditional calendar)
  const renderMonthView = () => {
    const renderDays = () => {
      // Day names
      const getDayNames = () => {
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      };
      
      const days = getDayNames();
      
      return (
        <div className="grid grid-cols-7 gap-1 mb-2">
          {days.map((day) => (
            <div
              key={day}
              className="text-center py-2 text-sm font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>
      );
    };
  
    const renderCells = () => {
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(monthStart);
      const startDate = add(monthStart, { days: -((monthStart.getDay() + 6) % 7) });
      const endDate = add(monthEnd, { days: (7 - monthEnd.getDay()) % 7 });
      
      const dateFormat = "d";
      const rows = [];
      
      let days = eachDayOfInterval({
        start: startDate,
        end: endDate
      });
      
      let daysMatrix = [];
      for (let i = 0; i < days.length; i += 7) {
        daysMatrix.push(days.slice(i, i + 7));
      }
  
      rows.push(
        daysMatrix.map((row, i) => (
          <React.Fragment key={`row-${i}`}>
            <div className="grid grid-cols-7 gap-1">
              {row.map((day, idx) => {
                const combinedEvents = getEventsForDay(day);
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isSelectedDay = selectedDate && isSameDay(day, selectedDate);
                const isCurrentDay = isToday(day);
                
                return (
                  <div
                    key={`cell-${idx}`}
                    className={cn(
                      "min-h-[100px] border p-1 relative",
                      isCurrentMonth ? "bg-background" : "bg-muted/20",
                      isSelectedDay && "ring-2 ring-primary",
                      isCurrentDay && "border-primary",
                      "cursor-pointer hover:bg-muted/50 transition-colors"
                    )}
                    onClick={() => {
                      setSelectedDate(day);
                      if (combinedEvents.length === 0) {
                        setEditingEvent(null);
                        setIsFormOpen(true);
                      }
                    }}
                  >
                    <div className="text-right mb-1">
                      <span
                        className={cn(
                          "inline-block w-6 h-6 text-center leading-6 rounded-sm text-xs",
                          isCurrentDay && "bg-primary text-primary-foreground font-bold"
                        )}
                      >
                        {format(day, dateFormat)}
                      </span>
                    </div>
                    <div className="overflow-y-auto max-h-[80px] space-y-1 pr-1">
                      {combinedEvents.map((event) => (
                        <AgendaEvent 
                          key={'id' in event ? event.id : `invoice-${event.id}`}
                          event={event}
                          onClick={(e) => handleEventClick(e, event)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        ))
      );
  
      return <div className="space-y-1">{rows}</div>;
    };
  
    return (
      <div>
        {renderDays()}
        {renderCells()}
      </div>
    );
  };

  // Year view
  const renderYearView = () => {
    const year = getYear(currentDate);
    const months = eachMonthOfInterval({
      start: new Date(year, 0, 1),
      end: new Date(year, 11, 31)
    });

    return (
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {months.map(month => {
          const monthName = format(month, "MMMM");
          const monthStart = startOfMonth(month);
          const monthEnd = endOfMonth(month);
          const startDate = add(monthStart, { days: -((monthStart.getDay() + 6) % 7) });
          const days = eachDayOfInterval({
            start: startDate,
            end: add(startDate, { days: 34 }) // Just enough days to show the month
          });

          // Count events for this month
          const monthEvents = events.filter(event => {
            const eventDate = parse(event.date, "yyyy-MM-dd", new Date());
            return getMonth(eventDate) === getMonth(month) && 
                   getYear(eventDate) === getYear(month);
          });
          
          let daysMatrix = [];
          for (let i = 0; i < days.length; i += 7) {
            daysMatrix.push(days.slice(i, i + 7));
          }

          return (
            <div 
              key={month.toString()} 
              className="border rounded-sm p-3 cursor-pointer hover:bg-muted/20"
              onClick={() => {
                setCurrentDate(month);
                setViewMode("month");
              }}
            >
              <h3 className="text-center font-bold mb-2">{monthName}</h3>
              <div className="grid grid-cols-7 gap-px text-center">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <div key={i} className="text-xs text-muted-foreground">
                    {d}
                  </div>
                ))}
                
                {daysMatrix.slice(0, 5).map((week, weekIndex) => (
                  week.map((day, dayIndex) => {
                    const isCurrentMonth = isSameMonth(day, month);
                    return (
                      <div 
                        key={`${weekIndex}-${dayIndex}`}
                        className={cn(
                          "text-xs h-5 w-5 flex items-center justify-center",
                          !isCurrentMonth && "text-muted-foreground/50",
                          isToday(day) && "bg-primary text-primary-foreground rounded-sm"
                        )}
                      >
                        {isCurrentMonth ? format(day, "d") : ""}
                      </div>
                    );
                  })
                ))}
              </div>
              
              {monthEvents.length > 0 && (
                <div className="mt-2 text-center text-xs">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-sm">
                    {monthEvents.length} events
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Render the appropriate view based on viewMode
  const renderContent = () => {
    switch (viewMode) {
      case "day":
        return renderDayView();
      case "week":
        return renderWeekView();
      case "month":
        return renderMonthView();
      case "year":
        return renderYearView();
      default:
        return renderMonthView();
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
      {renderHeader()}
      {renderContent()}

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
