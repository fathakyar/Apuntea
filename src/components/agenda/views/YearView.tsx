
import React from "react";
import { 
  eachMonthOfInterval, 
  getYear, 
  getMonth, 
  startOfMonth, 
  endOfMonth, 
  add,
  isSameMonth, 
  isToday, 
  format,
  parse
} from "date-fns";
import { AgendaEvent, Invoice } from "@/types";
import { cn } from "@/lib/utils";

interface YearViewProps {
  currentDate: Date;
  events: AgendaEvent[];
  onMonthSelect: (date: Date) => void;
}

const YearView: React.FC<YearViewProps> = ({
  currentDate,
  events,
  onMonthSelect
}) => {
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
        const days = eachMonthOfInterval({
          start: startDate,
          end: add(startDate, { days: 34 }) // Just enough days to show the month
        });

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
            onClick={() => onMonthSelect(month)}
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

export default YearView;
