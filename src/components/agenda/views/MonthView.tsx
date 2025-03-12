
import React from "react";
import { format, isSameDay, isToday, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
import { AgendaEvent as AgendaEventType, Invoice } from "@/types";
import { cn } from "@/lib/utils";
import AgendaEventComponent from "../AgendaEvent";
import { getEventsForDay } from "../utils/calendarUtils";

interface MonthViewProps {
  currentDate: Date;
  events: AgendaEventType[];
  invoices: Invoice[];
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onEventClick: (e: React.MouseEvent, event: AgendaEventType | (Invoice & { eventType?: 'invoice' })) => void;
}

const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  invoices,
  selectedDate,
  onDateSelect,
  onEventClick
}) => {
  // Generate days for the month view (including days from prev/next months to fill the grid)
  const getDaysInMonth = (date: Date) => {
    const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 }); // Start week on Monday
    const end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  };

  const daysInMonth = getDaysInMonth(currentDate);

  return (
    <div className="grid grid-cols-7 gap-1 mt-2">
      {/* Day of week headers */}
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
        <div key={day} className="text-center text-xs font-medium p-1">
          {day}
        </div>
      ))}
      
      {/* Calendar days */}
      {daysInMonth.map((day) => {
        const isCurrentMonth = day.getMonth() === currentDate.getMonth();
        const combinedEvents = getEventsForDay(day, events, invoices);
        
        return (
          <div
            key={day.toISOString()}
            className={cn(
              "min-h-[100px] p-1 border border-border",
              !isCurrentMonth && "bg-muted/30 text-muted-foreground",
              isToday(day) && "ring-1 ring-primary",
              selectedDate && isSameDay(selectedDate, day) && "bg-muted/20",
              "cursor-pointer hover:bg-muted/10"
            )}
            onClick={() => onDateSelect(day)}
          >
            <div
              className={cn(
                "text-right text-xs p-1",
                isToday(day) && "font-bold text-primary"
              )}
            >
              {format(day, "d")}
            </div>
            
            <div className="overflow-y-auto max-h-20 space-y-1">
              {combinedEvents.slice(0, 3).map((event) => {
                if ('eventType' in event && event.eventType === 'invoice') {
                  return (
                    <AgendaEventComponent
                      key={`invoice-${event.id}`}
                      event={event}
                      onClick={(e) => onEventClick(e, event)}
                      compact={true}
                    />
                  );
                } else {
                  return (
                    <AgendaEventComponent
                      key={`event-${(event as AgendaEventType).id}`}
                      event={event as AgendaEventType}
                      onClick={(e) => onEventClick(e, event)}
                      compact={true}
                    />
                  );
                }
              })}
              
              {combinedEvents.length > 3 && (
                <div className="text-xs text-center text-muted-foreground mt-1">
                  +{combinedEvents.length - 3} more
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MonthView;
