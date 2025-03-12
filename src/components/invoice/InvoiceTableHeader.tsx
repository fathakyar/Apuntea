
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
      className="p-0 h-auto font-medium hover:bg-transparent hover:underline"
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
          <SortableHeader field="type">Type</SortableHeader>
        </TableHead>
        <TableHead className="w-[120px]">
          <SortableHeader field="invoiceDate">Date</SortableHeader>
        </TableHead>
        <TableHead>
          <SortableHeader field="invoiceNumber">Invoice No</SortableHeader>
        </TableHead>
        <TableHead>
          <SortableHeader field="companyName">Company</SortableHeader>
        </TableHead>
        <TableHead className="text-right">
          <SortableHeader field="amount">Amount</SortableHeader>
        </TableHead>
        <TableHead className="text-right">
          <SortableHeader field="vat">VAT</SortableHeader>
        </TableHead>
        <TableHead className="text-right">
          <SortableHeader field="totalAmount">Total</SortableHeader>
        </TableHead>
        <TableHead>
          <SortableHeader field="currencyCode">Currency</SortableHeader>
        </TableHead>
        <TableHead>
          <SortableHeader field="categoryId">Category</SortableHeader>
        </TableHead>
        <TableHead>
          <SortableHeader field="paymentTypeId">Payment Type</SortableHeader>
        </TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default InvoiceTableHeader;
