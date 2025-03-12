
import React from "react";
import { cn } from "@/lib/utils";
import { AgendaEvent as AgendaEventType, Invoice } from "@/types";
import { FileText, CheckSquare, Receipt } from "lucide-react";
import { formatCurrency } from "@/utils/invoiceUtils";

interface AgendaEventProps {
  event: AgendaEventType | (Invoice & { eventType?: 'invoice' });
  onClick: (e: React.MouseEvent) => void;
}

const AgendaEvent: React.FC<AgendaEventProps> = ({ event, onClick }) => {
  // Check if this is an invoice record
  const isInvoice = 'eventType' in event && event.eventType === 'invoice';
  
  // Color selection function
  const getCategoryColor = (subcategoryId: string) => {
    // Use the last character of subcategoryId for consistent color
    const lastChar = subcategoryId.charAt(subcategoryId.length - 1);
    const colorMap: Record<string, string> = {
      "0": "bg-red-50 text-red-800 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800/50",
      "1": "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800/50",
      "2": "bg-green-50 text-green-800 border-green-200 dark:bg-green-950/50 dark:text-green-300 dark:border-green-800/50",
      "3": "bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800/50",
      "4": "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-950/50 dark:text-yellow-300 dark:border-yellow-800/50",
      "5": "bg-pink-50 text-pink-800 border-pink-200 dark:bg-pink-950/50 dark:text-pink-300 dark:border-pink-800/50",
      "6": "bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800/50",
      "7": "bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800/50",
      "8": "bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-300 dark:border-cyan-800/50",
      "9": "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/50",
    };
    
    return colorMap[lastChar] || "bg-gray-50 text-gray-800 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700";
  };

  // Display based on event type
  if (isInvoice) {
    const invoice = event as Invoice & { eventType: 'invoice' };
    
    // Set color based on invoice type
    const getInvoiceTypeColor = (type?: string) => {
      switch (type) {
        case 'income':
          return "bg-apuntea-gold/20 text-black border-apuntea-gold/30 dark:bg-apuntea-gold/10 dark:border-apuntea-gold/20";
        case 'expense':
          return "bg-apuntea-purple/20 text-purple-800 border-apuntea-purple/30 dark:bg-apuntea-purple/10 dark:border-apuntea-purple/20 dark:text-purple-300";
        case 'financing':
          return "bg-apuntea-dark/20 text-gray-800 border-apuntea-dark/30 dark:bg-apuntea-dark/10 dark:border-apuntea-dark/20 dark:text-gray-300";
        default:
          return "bg-gray-50 text-gray-800 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700";
      }
    };
    
    return (
      <div
        className={cn(
          "text-xs px-2 py-1 rounded-sm border truncate flex items-center gap-1",
          getInvoiceTypeColor(invoice.type),
          "cursor-pointer hover:opacity-80 transition-opacity"
        )}
        onClick={onClick}
        title={`${invoice.companyName} - ${formatCurrency(invoice.totalAmount)}`}
      >
        <Receipt className="h-3 w-3 shrink-0" />
        <span className="truncate">{invoice.companyName} - {formatCurrency(invoice.totalAmount)}</span>
      </div>
    );
  }
  
  const regularEvent = event as AgendaEventType;
  const isTask = regularEvent.type === "GÖREV";
  
  return (
    <div
      className={cn(
        "text-xs px-2 py-1 rounded-sm border truncate flex items-center gap-1",
        getCategoryColor(regularEvent.subcategoryId),
        "cursor-pointer hover:opacity-80 transition-opacity"
      )}
      onClick={onClick}
      title={regularEvent.title}
    >
      {isTask ? (
        <CheckSquare className="h-3 w-3 shrink-0" />
      ) : (
        <FileText className="h-3 w-3 shrink-0" />
      )}
      <span className="truncate">{regularEvent.title}</span>
    </div>
  );
};

export default AgendaEvent;
