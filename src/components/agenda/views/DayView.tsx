
import React from "react";
import { format } from "date-fns";
import { AgendaEvent, Invoice } from "@/types";
import { getEventsForDay } from "../utils/calendarUtils";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/invoiceUtils";
import { Calendar } from "lucide-react";

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
      const eventItem = event as AgendaEvent;
      const type = eventItem.type || 'events';
      
      if (!acc[type]) {
        acc[type] = {
          items: [],
          totalAmount: 0
        };
      }
      acc[type].items.push(eventItem);
    }
    
    return acc;
  }, {} as Record<string, { items: any[], totalAmount: number }>);
  
  // Sort the groups for consistent display order
  const orderedGroups = ['income', 'expense', 'financing', 'GÖREV', 'NOT'];
  
  const getGroupTitle = (groupName: string) => {
    switch(groupName) {
      case 'income': return 'INCOME';
      case 'expense': return 'EXPENSE';
      case 'financing': return 'FINANCING';
      case 'GÖREV': return 'TASK';
      case 'NOT': return 'NOTE';
      default: return groupName.toUpperCase();
    }
  };
  
  const getGroupColor = (groupName: string) => {
    switch(groupName) {
      case 'income': return 'bg-apuntea-gold text-black';
      case 'expense': return 'bg-apuntea-purple text-white';
      case 'financing': return 'bg-apuntea-dark text-white';
      case 'GÖREV': return 'bg-blue-500 text-white';
      case 'NOT': return 'bg-green-500 text-white';
      default: return 'bg-primary text-primary-foreground';
    }
  };
  
  // Importance level badges
  const getImportanceBadge = (importance?: string) => {
    switch(importance) {
      case 'high':
        return <Badge className="bg-red-500 text-white">HIGH</Badge>;
      case 'medium':
        return <Badge className="bg-orange-500 text-white">MEDIUM</Badge>;
      case 'low':
        return <Badge className="bg-green-500 text-white">LOW</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="border rounded-sm p-4 min-h-[500px]">
      <h3 className="font-bold mb-4">{format(currentDate, "dd MMMM yyyy, EEEE")}</h3>
      
      {Object.keys(groupedInvoices).length === 0 ? (
        <div className="text-center py-8 text-muted-foreground flex flex-col items-center">
          <Calendar className="h-12 w-12 mb-2 opacity-20" />
          <p>No events for this day. Click "New" to add an event.</p>
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
                  {(['income', 'expense', 'financing'].includes(groupName)) && group.totalAmount > 0 && (
                    <div className="text-sm font-medium">
                      {formatCurrency(group.totalAmount).replace(' €', '')} EUR
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  {group.items.map((item) => {
                    if ('eventType' in item && item.eventType === 'invoice') {
                      const invoice = item as Invoice & { eventType: 'invoice' };
                      return (
                        <div 
                          key={`invoice-${invoice.id}`}
                          className="flex items-center justify-between p-2 border rounded-sm hover:bg-muted/50 cursor-pointer"
                          onClick={(e) => onEventClick(e, invoice)}
                        >
                          <div className="flex-grow overflow-hidden">
                            <div className="font-medium truncate">{invoice.companyName}</div>
                          </div>
                          <div className="text-sm font-medium whitespace-nowrap ml-3">
                            {formatCurrency(invoice.totalAmount)} {invoice.currencyCode || 'EUR'}
                          </div>
                        </div>
                      );
                    } else {
                      const agendaEvent = item as AgendaEvent;
                      return (
                        <div 
                          key={`event-${agendaEvent.id}`}
                          className="flex items-center justify-between p-2 border rounded-sm hover:bg-muted/50 cursor-pointer"
                          onClick={(e) => onEventClick(e, agendaEvent)}
                        >
                          <div className="flex-grow overflow-hidden pr-3">
                            <div className="font-medium truncate">{agendaEvent.title}</div>
                            <p className="text-sm text-muted-foreground line-clamp-1">{agendaEvent.description}</p>
                          </div>
                          <div className="flex-shrink-0">
                            {getImportanceBadge(agendaEvent.importance)}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DayView;
