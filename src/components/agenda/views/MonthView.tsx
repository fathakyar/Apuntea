
import React from "react";
import { 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isToday, 
  format,
  add
} from "date-fns";
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
  const renderDays = () => {
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
              const combinedEvents = getEventsForDay(day, events, invoices);
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
                  onClick={() => onDateSelect(day)}
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
                      <AgendaEventComponent 
                        key={('id' in event) ? event.id : `invoice-${event.id}`}
                        event={event}
                        onClick={(e) => onEventClick(e, event)}
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

export default MonthView;
