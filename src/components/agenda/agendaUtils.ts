
import { AgendaEvent, Invoice, RecordType } from "@/types";
import { format } from "date-fns";

export function getEventsForDate(events: AgendaEvent[], invoices: Invoice[], date: Date, filter: string) {
  const selectedDateStr = format(date, "yyyy-MM-dd");
  const dayEvents = events.filter(event => event.date === selectedDateStr);
  const dayInvoices = invoices
    .filter(invoice => invoice.invoiceDate === selectedDateStr)
    .map(invoice => ({ ...invoice, eventType: "invoice" as const }));

  let filteredEvents = [...dayEvents, ...dayInvoices];

  if (filter !== "all") {
    filteredEvents = filteredEvents.filter(event => {
      if (filter === "note") {
        if (!("eventType" in event)) return true;
        return false;
      } else {
        if ("eventType" in event && event.eventType === "invoice") {
          return event.type === filter;
        }
        return false;
      }
    });
  }
  return filteredEvents;
}

export function getEventColorForDate(events: AgendaEvent[], invoices: Invoice[], date: Date) {
  const dateString = format(date, "yyyy-MM-dd");
  const incomeInvoice = invoices.find(invoice =>
    invoice.invoiceDate === dateString && invoice.type === "income"
  );
  if (incomeInvoice) return "bg-apuntea-gold";

  const expenseInvoice = invoices.find(invoice =>
    invoice.invoiceDate === dateString && invoice.type === "expense"
  );
  if (expenseInvoice) return "bg-apuntea-purple";

  const financingInvoice = invoices.find(invoice =>
    invoice.invoiceDate === dateString && invoice.type === "financing"
  );
  if (financingInvoice) return "bg-apuntea-dark";

  if (events.some(event => event.date === dateString)) {
    return "bg-blue-400";
  }
  return "";
}
