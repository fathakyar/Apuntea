
import React from "react";
import { startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isToday, format } from "date-fns";
import { AgendaEvent as AgendaEventType, Invoice } from "@/types";
import { cn } from "@/lib/utils";
import AgendaEventComponent from "../AgendaEvent";
import { getEventsForDay } from "../utils/calendarUtils";

interface WeekViewProps {
  currentDate: Date;
  events: AgendaEventType[];
  invoices: Invoice[];
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onEventClick: (e: React.MouseEvent, event: AgendaEventType | (Invoice & { eventType?: 'invoice' })) => void;
}

const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  invoices,
  selectedDate,
  onDateSelect,
  onEventClick
}) => {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  return (
    <div className="grid grid-cols-7 gap-4">
      {days.map((day) => {
        const combinedEvents = getEventsForDay(day, events, invoices);
        
        return (
          <div 
            key={day.toISOString()} 
            className={cn(
              "border rounded-sm p-2 min-h-[300px] flex flex-col",
              isToday(day) && "ring-2 ring-primary",
              selectedDate && isSameDay(selectedDate, day) && "bg-muted/20"
            )}
            onClick={() => onDateSelect(day)}
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
                <AgendaEventComponent
                  key={('id' in event) ? event.id : `invoice-${event.id}`}
                  event={event}
                  onClick={(e) => onEventClick(e, event)}
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

export default WeekView;
