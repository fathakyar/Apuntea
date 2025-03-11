
import React from "react";
import { ArrowUpDown } from "lucide-react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

type SortField = 'type' | 'invoiceDate' | 'invoiceNumber' | 'companyName' | 'amount' | 'vat' | 'totalAmount';
type SortDirection = 'asc' | 'desc';

interface InvoiceTableHeaderProps {
  sortField: SortField;
  sortDirection: SortDirection;
  handleSort: (field: SortField) => void;
}

const InvoiceTableHeader: React.FC<InvoiceTableHeaderProps> = ({
  sortField,
  sortDirection,
  handleSort,
}) => {
  const SortHeader: React.FC<{ label: string; field: SortField }> = ({ label, field }) => (
    <div 
      className="flex items-center space-x-1 cursor-pointer" 
      onClick={() => handleSort(field)}
    >
      <span>{label}</span>
      <ArrowUpDown className={`h-4 w-4 ${sortField === field ? 'text-primary' : 'text-muted-foreground'}`} />
    </div>
  );

  return (
    <TableHeader>
      <TableRow>
        <TableHead><SortHeader label="Type" field="type" /></TableHead>
        <TableHead><SortHeader label="Invoice Date" field="invoiceDate" /></TableHead>
        <TableHead><SortHeader label="Invoice Number" field="invoiceNumber" /></TableHead>
        <TableHead><SortHeader label="Company Name" field="companyName" /></TableHead>
        <TableHead className="text-right"><SortHeader label="Amount" field="amount" /></TableHead>
        <TableHead className="text-right"><SortHeader label="VAT" field="vat" /></TableHead>
        <TableHead className="text-right"><SortHeader label="Total Amount" field="totalAmount" /></TableHead>
        <TableHead>Document</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default InvoiceTableHeader;
