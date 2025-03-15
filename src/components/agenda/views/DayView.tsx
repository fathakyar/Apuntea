
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
      const type = eventItem.type || 'unknown';
      
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
  
  // Sort financial records by amount (largest to smallest)
  ['income', 'expense', 'financing'].forEach(groupName => {
    if (groupedInvoices[groupName]) {
      groupedInvoices[groupName].items.sort((a, b) => {
        if ('eventType' in a && 'eventType' in b &&
            a.eventType === 'invoice' && b.eventType === 'invoice') {
          return b.totalAmount - a.totalAmount;
        }
        return 0;
      });
    }
  });
  
  // Sort the groups for consistent display order
  const orderedGroups = ['income', 'expense', 'financing', 'TASK', 'NOTE'];
  
  const getGroupTitle = (groupName: string) => {
    switch(groupName) {
      case 'income': return 'INCOME';
      case 'expense': return 'EXPENSE';
      case 'financing': return 'FINANCING';
      case 'TASK': return 'TASK';
      case 'NOTE': return 'NOTE';
      default: return groupName.toUpperCase();
    }
  };
  
  const getGroupColor = (groupName: string) => {
    switch(groupName) {
      case 'income': return 'bg-apuntea-gold text-black';
      case 'expense': return 'bg-apuntea-purple text-white';
      case 'financing': return 'bg-apuntea-dark text-white';
      case 'TASK': return 'bg-blue-500 text-white';
      case 'NOTE': return 'bg-green-500 text-white';
      default: return 'bg-primary text-primary-foreground';
    }
  };
  
  // Importance level badges
  const getImportanceBadge = (importance?: string) => {
    switch(importance) {
      case '!!!':
        return <Badge className="bg-red-500 text-white">!!!</Badge>;
      case '!!':
        return <Badge className="bg-orange-500 text-white">!!</Badge>;
      case '!':
        return <Badge className="bg-yellow-500 text-black">!</Badge>;
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
                          className="flex items-center p-2 border rounded-sm hover:bg-muted/50 cursor-pointer"
                          onClick={(e) => onEventClick(e, agendaEvent)}
                        >
                          <div className="flex-shrink-0 mr-3">
                            {getImportanceBadge(agendaEvent.importance)}
                          </div>
                          <div className="flex-grow overflow-hidden">
                            <div className="font-medium truncate">{agendaEvent.title}</div>
                          </div>
                          <p className="text-sm text-muted-foreground truncate hidden sm:block ml-2 flex-shrink">
                            {agendaEvent.description}
                          </p>
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
