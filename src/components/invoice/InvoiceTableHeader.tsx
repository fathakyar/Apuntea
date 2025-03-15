
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import { Button } from "@/components/ui/button";

export type SortField = 'type' | 'invoiceDate' | 'invoiceNumber' | 'companyName' | 'amount' | 'vat' | 'totalAmount' | 'currencyCode' | 'categoryId' | 'paymentTypeId';
export type SortDirection = 'asc' | 'desc';

interface InvoiceTableHeaderProps {
  sortField: SortField;
  sortDirection: SortDirection;
  handleSort: (field: SortField) => void;
}

const InvoiceTableHeader: React.FC<InvoiceTableHeaderProps> = ({
  sortField,
  sortDirection,
  handleSort
}) => {
  const getSortIcon = (field: SortField) => {
    if (field !== sortField) return null;
    
    return sortDirection === 'asc' 
      ? <ArrowUpNarrowWide className="ml-1 h-4 w-4 inline" />
      : <ArrowDownNarrowWide className="ml-1 h-4 w-4 inline" />;
  };
  
  const SortableHeader = ({ field, children }: { field: SortField, children: React.ReactNode }) => (
    <Button 
      variant="ghost" 
      className="p-0 h-auto font-medium hover:bg-transparent hover:underline uppercase"
      onClick={() => handleSort(field)}
    >
      {children}
      {getSortIcon(field)}
    </Button>
  );
  
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">
          <SortableHeader field="type">TYPE</SortableHeader>
        </TableHead>
        <TableHead className="w-[120px]">
          <SortableHeader field="invoiceDate">DATE</SortableHeader>
        </TableHead>
        <TableHead>
          <SortableHeader field="invoiceNumber">DOC. NO.</SortableHeader>
        </TableHead>
        <TableHead>
          <SortableHeader field="companyName">COMPANY</SortableHeader>
        </TableHead>
        <TableHead className="text-right">
          <SortableHeader field="amount">AMOUNT</SortableHeader>
        </TableHead>
        <TableHead className="text-right">
          <SortableHeader field="vat">VAT</SortableHeader>
        </TableHead>
        <TableHead className="text-right">
          <SortableHeader field="totalAmount">TOTAL</SortableHeader>
        </TableHead>
        <TableHead>
          <SortableHeader field="currencyCode">CURRENCY</SortableHeader>
        </TableHead>
        <TableHead>
          <SortableHeader field="categoryId">CATEGORY</SortableHeader>
        </TableHead>
        <TableHead>
          <SortableHeader field="paymentTypeId">PAYMENT TYPE</SortableHeader>
        </TableHead>
        <TableHead className="text-right">ACTIONS</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default InvoiceTableHeader;
