
import React, { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, parse, add } from "date-fns";
import { tr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDefinitions } from "@/contexts/DefinitionsContext";
import AgendaEventForm from "./AgendaEventForm";
import AgendaEvent from "./AgendaEvent";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AgendaEvent as AgendaEventType } from "@/types";

interface AgendaCalendarProps {
  events: AgendaEventType[];
  onAddEvent: (event: Omit<AgendaEventType, "id">) => void;
  onEditEvent: (event: AgendaEventType) => void;
  onDeleteEvent: (eventId: string) => void;
}

const AgendaCalendar: React.FC<AgendaCalendarProps> = ({
  events,
  onAddEvent,
  onEditEvent,
  onDeleteEvent
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AgendaEventType | null>(null);
  
  const { categories } = useDefinitions();
  const notTaskCategory = categories.find(cat => cat.id === "noteTask");
  
  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5" />
          <h2 className="text-xl font-bold">
            {format(currentMonth, "MMMM yyyy", { locale: tr })}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(new Date())}
          >
            Bugün
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button 
            size="sm"
            onClick={() => {
              setEditingEvent(null);
              setIsFormOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-1" />
            Ekle
          </Button>
        </div>
      </div>
    );
  };

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
    const monthStart = startOfMonth(currentMonth);
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
              const isCurrentMonth = isSameMonth(day, currentMonth);
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
                  onClick={() => setSelectedDate(day)}
                >
                  <div className="text-right mb-1">
                    <span
                      className={cn(
                        "inline-block w-6 h-6 text-center leading-6 rounded-full text-xs",
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
                        onClick={() => {
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
      {renderDays()}
      {renderCells()}

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
