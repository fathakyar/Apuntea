
import React, { useState, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, FileClock, Columns, CalendarDays, CalendarCheck } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, parse, add, eachWeekOfInterval, getWeek, startOfWeek, endOfWeek, eachMonthOfInterval, endOfYear, startOfYear, getMonth, getYear, getDay, getDate } from "date-fns";
import { tr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDefinitions } from "@/contexts/DefinitionsContext";
import AgendaEventForm from "./AgendaEventForm";
import AgendaEvent from "./AgendaEvent";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AgendaEvent as AgendaEventType } from "@/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AgendaCalendarProps {
  events: AgendaEventType[];
  onAddEvent: (event: Omit<AgendaEventType, "id">) => void;
  onEditEvent: (event: AgendaEventType) => void;
  onDeleteEvent: (eventId: string) => void;
}

type ViewMode = "day" | "week" | "month" | "year";

const AgendaCalendar: React.FC<AgendaCalendarProps> = ({
  events,
  onAddEvent,
  onEditEvent,
  onDeleteEvent
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AgendaEventType | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  
  const { categories } = useDefinitions();
  const notTaskCategory = categories.find(cat => cat.id === "noteTask");

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

  // View mode header
  const renderViewModeHeader = () => {
    let headerText = "";
    
    if (viewMode === "day") {
      headerText = format(currentDate, "dd MMMM yyyy, EEEE", { locale: tr });
    } else if (viewMode === "week") {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
      headerText = `${format(weekStart, "dd")} - ${format(weekEnd, "dd MMMM yyyy")}`;
    } else if (viewMode === "month") {
      headerText = format(currentDate, "MMMM yyyy", { locale: tr });
    } else if (viewMode === "year") {
      headerText = format(currentDate, "yyyy", { locale: tr });
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
              Bugün
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
              Ekle
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="day" className="flex items-center">
              <FileClock className="h-4 w-4 mr-2" />
              Gün
            </TabsTrigger>
            <TabsTrigger value="week" className="flex items-center">
              <Columns className="h-4 w-4 mr-2" />
              Hafta
            </TabsTrigger>
            <TabsTrigger value="month" className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-2" />
              Ay
            </TabsTrigger>
            <TabsTrigger value="year" className="flex items-center">
              <CalendarCheck className="h-4 w-4 mr-2" />
              Yıl
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    );
  };

  // Day view content
  const renderDayView = () => {
    const dayEvents = events.filter(event => 
      isSameDay(parse(event.date, "yyyy-MM-dd", new Date()), currentDate)
    );
    
    return (
      <div className="border rounded-sm p-4 min-h-[500px]">
        <h3 className="font-bold mb-4">{format(currentDate, "dd MMMM yyyy, EEEE", { locale: tr })}</h3>
        
        {dayEvents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Bu güne ait etkinlik bulunmuyor. Yeni etkinlik eklemek için "Ekle" butonuna tıklayın.
          </div>
        ) : (
          <div className="space-y-2">
            {dayEvents.map(event => (
              <div 
                key={event.id} 
                className="flex items-center p-3 border rounded-sm hover:bg-muted/50 cursor-pointer"
                onClick={() => {
                  setEditingEvent(event);
                  setIsFormOpen(true);
                }}
              >
                <div className="flex-grow">
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-muted-foreground truncate">{event.description}</p>
                </div>
                <div className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                  {event.type}
                </div>
              </div>
            ))}
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
          const dayEvents = events.filter(event => 
            isSameDay(parse(event.date, "yyyy-MM-dd", new Date()), day)
          );
          
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
                if (dayEvents.length === 0) {
                  setEditingEvent(null);
                  setIsFormOpen(true);
                }
              }}
            >
              <div className={cn(
                "text-center py-1 font-medium rounded-sm mb-2",
                isToday(day) && "bg-primary text-primary-foreground"
              )}>
                {format(day, "EEE", { locale: tr })}
                <div className="text-xl">{format(day, "dd")}</div>
              </div>
              
              <div className="flex-grow overflow-y-auto space-y-1">
                {dayEvents.map(event => (
                  <AgendaEvent
                    key={event.id}
                    event={event}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingEvent(event);
                      setIsFormOpen(true);
                    }}
                  />
                ))}
              </div>
              
              {dayEvents.length === 0 && (
                <div className="text-center text-xs text-muted-foreground mt-2">
                  Etkinlik yok
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
      const days = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
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
                const dayEvents = events.filter(event => 
                  isSameDay(parse(event.date, "yyyy-MM-dd", new Date()), day)
                );
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
                      if (dayEvents.length === 0) {
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
                      {dayEvents.map((event) => (
                        <AgendaEvent 
                          key={event.id} 
                          event={event} 
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingEvent(event);
                            setIsFormOpen(true);
                          }}
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
          const monthName = format(month, "MMMM", { locale: tr });
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
                {["P", "S", "Ç", "P", "C", "C", "P"].map((d, i) => (
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
                    {monthEvents.length} etkinlik
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
              {editingEvent ? "Etkinlik Düzenle" : "Yeni Etkinlik Ekle"}
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
