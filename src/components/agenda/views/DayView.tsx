
import React from "react";
import { format } from "date-fns";
import { AgendaEvent, Invoice } from "@/types";
import { getEventsForDay } from "../utils/calendarUtils";

interface DayViewProps {
  currentDate: Date;
  events: AgendaEvent[];
  invoices: Invoice[];
  onEventClick: (e: React.MouseEvent, event: AgendaEvent | (Invoice & { eventType?: 'invoice' })) => void;
}

const DayView: React.FC<DayViewProps> = ({
  currentDate,
  events,
  invoices,
  onEventClick
}) => {
  const combinedEvents = getEventsForDay(currentDate, events, invoices);
  
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
                  onClick={(e) => onEventClick(e, invoice)}
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
              const agendaEvent = event as AgendaEvent;
              return (
                <div 
                  key={`event-${agendaEvent.id}`}
                  className="flex items-center p-3 border rounded-sm hover:bg-muted/50 cursor-pointer"
                  onClick={(e) => onEventClick(e, agendaEvent)}
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

export default DayView;
