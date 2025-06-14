
import React from "react";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { AgendaEvent, Invoice } from "@/types";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/invoiceUtils";

function groupAndSortEvents(
  filteredEvents: Array<AgendaEvent | (Invoice & { eventType?: 'invoice' })>
) {
  const grouped = filteredEvents.reduce((acc, event) => {
    let groupKey: string;
    if ('eventType' in event && event.eventType === 'invoice') {
      groupKey = event.type || 'unknown';
    } else {
      groupKey = (event as AgendaEvent).type || 'unknown';
    }
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(event);
    return acc;
  }, {} as Record<string, Array<AgendaEvent | (Invoice & { eventType?: 'invoice' })>>);

  Object.keys(grouped).forEach(key => {
    if (['income', 'expense', 'financing'].includes(key)) {
      grouped[key].sort((a, b) => ('eventType' in a && 'eventType' in b)
        ? (b as Invoice).totalAmount - (a as Invoice).totalAmount : 0
      );
    } else {
      grouped[key].sort((a, b) => {
        if (!('eventType' in a) && !('eventType' in b)) {
          const importanceOrder: {[key: string]: number} = { '!!!': 1, '!!': 2, '!': 3 };
          return importanceOrder[(a as AgendaEvent).importance || '!'] - importanceOrder[(b as AgendaEvent).importance || '!'];
        }
        return 0;
      });
    }
  });

  return grouped;
}

const getGroupTitle = (type: string) => {
  switch(type) {
    case 'income': return 'INCOME';
    case 'expense': return 'EXPENSE';
    case 'financing': return 'FINANCING';
    case 'GÖREV': return 'TASK';
    case 'NOT': return 'NOTE';
    default: return type.toUpperCase();
  }
};

const getBadgeColor = (type: string) => {
  switch(type) {
    case 'income': return 'bg-apuntea-gold text-black';
    case 'expense': return 'bg-apuntea-purple text-white';
    case 'financing': return 'bg-apuntea-dark text-white';
    case 'GÖREV': return 'bg-blue-500 text-white';
    case 'NOT': return 'bg-green-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

const getImportanceBadge = (importance?: string) => {
  switch(importance) {
    case '!!!': return <Badge className="bg-red-500 text-white">!!!</Badge>;
    case '!!': return <Badge className="bg-orange-500 text-white">!!</Badge>;
    case '!':  return <Badge className="bg-yellow-500 text-black">!</Badge>;
    default:   return null;
  }
};

const AgendaEventsList = ({
  events,
  invoices,
  selectedDate,
  activeFilter,
  onEventClick,
  onAddNote,
  onAddRecord,
  t
}: {
  events: AgendaEvent[];
  invoices: Invoice[];
  selectedDate: Date;
  activeFilter: string;
  onEventClick: (event: AgendaEvent | (Invoice & { eventType?: 'invoice' })) => void;
  onAddNote: () => void;
  onAddRecord: () => void;
  t: any;
}) => {
  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
  const dayEvents = events.filter(ev => ev.date === selectedDateStr);
  const dayInvoices = invoices.filter(iv => iv.invoiceDate === selectedDateStr).map(iv => ({ ...iv, eventType: "invoice" as const }));

  let filteredEvents = [...dayEvents, ...dayInvoices];
  if (activeFilter !== "all") {
    filteredEvents = filteredEvents.filter(event => {
      if (activeFilter === "note") {
        if (!("eventType" in event)) return true;
        return false;
      } else {
        if ("eventType" in event && event.eventType === "invoice") {
          return event.type === activeFilter;
        }
        return false;
      }
    });
  }

  const groupedEvents = groupAndSortEvents(filteredEvents);

  if (Object.keys(groupedEvents).length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground flex flex-col items-center">
        <CalendarIcon className="h-12 w-12 mb-2 opacity-20" />
        <p>No events for this date</p>
        <div className="flex space-x-2 mt-4">
          <button onClick={onAddRecord} className="text-sm text-primary flex items-center gap-1">
            <Plus size={16} /> Add Record
          </button>
          <button onClick={onAddNote} className="text-sm text-primary flex items-center gap-1">
            <Plus size={16} /> Add Note
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-2 flex-grow">
      {Object.entries(groupedEvents).map(([groupType, groupEvents]) => (
        <div key={groupType} className="space-y-2">
          <h3 className="font-semibold text-sm tracking-wider">
            <Badge className={getBadgeColor(groupType)}>{getGroupTitle(groupType)}</Badge>
          </h3>
          <div className="space-y-2">
            {groupEvents.map((event) =>
              "eventType" in event && event.eventType === "invoice" ? (
                <div
                  key={`invoice-${event.id}`}
                  className="border p-2 rounded-md hover:bg-muted/20 cursor-pointer flex items-center justify-between"
                  onClick={() => onEventClick(event)}
                >
                  <div className="font-medium truncate">{event.companyName}</div>
                  <div className="text-sm font-medium whitespace-nowrap ml-3">
                    {formatCurrency(event.totalAmount)} {event.currencyCode || "EUR"}
                  </div>
                </div>
              ) : (
                <div
                  key={`event-${event.id}`}
                  className="border p-2 rounded-md hover:bg-muted/20 cursor-pointer flex items-center"
                  onClick={() => onEventClick(event)}
                >
                  <div className="flex-shrink-0 mr-2">{getImportanceBadge((event as AgendaEvent).importance)}</div>
                  <div className="flex-grow overflow-hidden pr-3">
                    <div className="font-medium truncate">{(event as AgendaEvent).title}</div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{(event as AgendaEvent).description}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default AgendaEventsList;
