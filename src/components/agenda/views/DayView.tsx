
import React from "react";
import { format } from "date-fns";
import { AgendaEvent, Invoice } from "@/types";
import { getEventsForDay } from "../utils/calendarUtils";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/invoiceUtils";

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
  
  // Group invoices by type
  const groupedInvoices = combinedEvents.reduce((acc, event) => {
    if ('eventType' in event && event.eventType === 'invoice') {
      const invoice = event as Invoice & { eventType: 'invoice' };
      const type = invoice.type || 'unknown';
      
      if (!acc[type]) {
        acc[type] = {
          items: [],
          totalAmount: 0
        };
      }
      
      acc[type].items.push(invoice);
      acc[type].totalAmount += invoice.totalAmount || 0;
    } else {
      // Handle regular events
      const type = 'events';
      if (!acc[type]) {
        acc[type] = {
          items: [],
          totalAmount: 0
        };
      }
      acc[type].items.push(event);
    }
    
    return acc;
  }, {} as Record<string, { items: any[], totalAmount: number }>);
  
  // Sort the groups for consistent display order
  const orderedGroups = ['income', 'expense', 'financing', 'events'];
  
  const getGroupTitle = (groupName: string) => {
    switch(groupName) {
      case 'income': return 'GELİR';
      case 'expense': return 'GİDER';
      case 'financing': return 'FİNANSMAN';
      case 'events': return 'NOTLAR & GÖREVLER';
      default: return groupName.toUpperCase();
    }
  };
  
  const getGroupColor = (groupName: string) => {
    switch(groupName) {
      case 'income': return 'bg-apuntea-gold text-black';
      case 'expense': return 'bg-apuntea-purple text-white';
      case 'financing': return 'bg-apuntea-dark text-white';
      default: return 'bg-primary text-primary-foreground';
    }
  };
  
  return (
    <div className="border rounded-sm p-4 min-h-[500px]">
      <h3 className="font-bold mb-4">{format(currentDate, "dd MMMM yyyy, EEEE")}</h3>
      
      {Object.keys(groupedInvoices).length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No events for this day. Click "New" to add an event.
        </div>
      ) : (
        <div className="space-y-6">
          {orderedGroups.map(groupName => {
            const group = groupedInvoices[groupName];
            if (!group || group.items.length === 0) return null;
            
            return (
              <div key={groupName} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-sm uppercase tracking-wider">
                    <Badge className={`${getGroupColor(groupName)} px-2 py-0.5`}>
                      {getGroupTitle(groupName)}
                    </Badge>
                  </h4>
                  {groupName !== 'events' && group.totalAmount > 0 && (
                    <div className="text-sm font-medium">
                      {formatCurrency(group.totalAmount).replace(' €', '')} EUR
                    </div>
                  )}
                </div>
                
                {group.items.map((item) => {
                  if ('eventType' in item && item.eventType === 'invoice') {
                    const invoice = item as Invoice & { eventType: 'invoice' };
                    return (
                      <div 
                        key={`invoice-${invoice.id}`}
                        className="flex items-center p-3 border rounded-sm hover:bg-muted/50 cursor-pointer"
                        onClick={(e) => onEventClick(e, invoice)}
                      >
                        <div className="flex-grow">
                          <h4 className="font-medium">{invoice.companyName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {invoice.invoiceNumber} - {formatCurrency(invoice.totalAmount).replace(' €', '')} {invoice.currencyCode || 'EUR'}
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                          {invoice.type?.toUpperCase()}
                        </div>
                      </div>
                    );
                  } else {
                    const agendaEvent = item as AgendaEvent;
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
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DayView;
