
import React from "react";
import { TableHead, TableHeader, TableRow } from "../ui/table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

export type SortField = 'type' | 'invoiceDate' | 'invoiceNumber' | 'companyName' | 'amount' | 'vat' | 'totalAmount';
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
  const renderSortIcon = (field: SortField) => {
    if (field !== sortField) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    
    return sortDirection === 'asc' 
      ? <ArrowUp className="ml-2 h-4 w-4" /> 
      : <ArrowDown className="ml-2 h-4 w-4" />;
  };

  return (
    <TableHeader>
      <TableRow>
        <TableHead 
          className="w-[180px] cursor-pointer"
          onClick={() => handleSort('type')}
        >
          <div className="flex items-center">
            Type {renderSortIcon('type')}
          </div>
        </TableHead>
        <TableHead 
          className="w-[150px] cursor-pointer"
          onClick={() => handleSort('invoiceDate')}
        >
          <div className="flex items-center">
            Date {renderSortIcon('invoiceDate')}
          </div>
        </TableHead>
        <TableHead 
          className="w-[180px] cursor-pointer"
          onClick={() => handleSort('invoiceNumber')}
        >
          <div className="flex items-center">
            Number {renderSortIcon('invoiceNumber')}
          </div>
        </TableHead>
        <TableHead 
          className="cursor-pointer"
          onClick={() => handleSort('companyName')}
        >
          <div className="flex items-center">
            Company {renderSortIcon('companyName')}
          </div>
        </TableHead>
        <TableHead 
          className="w-[130px] text-right cursor-pointer"
          onClick={() => handleSort('amount')}
        >
          <div className="flex items-center justify-end">
            Amount {renderSortIcon('amount')}
          </div>
        </TableHead>
        <TableHead 
          className="w-[130px] text-right cursor-pointer"
          onClick={() => handleSort('vat')}
        >
          <div className="flex items-center justify-end">
            VAT {renderSortIcon('vat')}
          </div>
        </TableHead>
        <TableHead 
          className="w-[150px] text-right cursor-pointer"
          onClick={() => handleSort('totalAmount')}
        >
          <div className="flex items-center justify-end">
            Total {renderSortIcon('totalAmount')}
          </div>
        </TableHead>
        <TableHead className="w-[100px]">
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default InvoiceTableHeader;
