
import { parse, isSameDay, format, Locale } from "date-fns";
import { AgendaEvent, Invoice } from "@/types";

export const getEventsForDay = (day: Date, events: AgendaEvent[], invoices: Invoice[]) => {
  const dayEvents = events.filter(event => 
    isSameDay(parse(event.date, "yyyy-MM-dd", new Date()), day)
  );
  
  const dayInvoices = invoices
    .filter(invoice => 
      isSameDay(parse(invoice.invoiceDate, "yyyy-MM-dd", new Date()), day)
    )
    .map(invoice => ({
      ...invoice,
      eventType: 'invoice' as const
    }));
  
  return [...dayEvents, ...dayInvoices];
};

export const formatDateHeader = (date: Date, viewMode: string, locale?: Locale) => {
  if (viewMode === "day") {
    return format(date, "dd MMMM yyyy, EEEE", { locale });
  } else if (viewMode === "week") {
    return format(date, "MMMM yyyy", { locale });
  } else if (viewMode === "month") {
    return format(date, "MMMM yyyy", { locale });
  } else if (viewMode === "year") {
    return format(date, "yyyy", { locale });
  }
  return format(date, "MMMM yyyy", { locale });
};
