
import React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventDatePickerProps {
  date: Date | undefined;
  onChange: (date: Date | undefined) => void;
  getLabel: (key: string) => string;
}

const EventDatePicker: React.FC<EventDatePickerProps> = ({
  date,
  onChange,
  getLabel,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="date">{getLabel("date")}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal rounded-sm",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{getLabel("date")}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onChange}
            initialFocus
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EventDatePicker;
