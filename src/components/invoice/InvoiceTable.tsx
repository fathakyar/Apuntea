
import React, { useState } from "react";
import { Invoice } from "@/types";
import { Table } from "@/components/ui/table";
import { DateRange } from "react-day-picker";
import InvoiceFilters from "./InvoiceFilters";
import InvoiceTableHeader, { SortField, SortDirection } from "./InvoiceTableHeader";
import InvoiceTableBody from "./InvoiceTableBody";
import InvoiceEmptyState from "./InvoiceEmptyState";

interface InvoiceTableProps {
  invoices: Invoice[];
  onEdit: (invoice: Invoice) => void;
  onDelete: (id: string) => void;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>('invoiceDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("_all");
  const [paymentTypeFilter, setPaymentTypeFilter] = useState<string>("_all");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      invoice.companyName.toLowerCase().includes(searchLower) ||
      invoice.invoiceNumber.toLowerCase().includes(searchLower) ||
      (invoice.documentName?.toLowerCase().includes(searchLower) || false);
    
    // Apply type filter
    const matchesType = !typeFilter || typeFilter === "all" ? true : invoice.type === typeFilter;
    
    // Apply category filter
    const matchesCategory = !categoryFilter || categoryFilter === "_all" ? true : invoice.categoryId === categoryFilter;
    
    // Apply payment type filter
    const matchesPaymentType = !paymentTypeFilter || paymentTypeFilter === "_all" ? true : invoice.paymentTypeId === paymentTypeFilter;
    
    // Apply date filter
    let matchesDate = true;
    if (dateRange.from) {
      const invoiceDate = new Date(invoice.invoiceDate);
      matchesDate = invoiceDate >= dateRange.from;
      
      if (dateRange.to) {
        matchesDate = matchesDate && invoiceDate <= dateRange.to;
      }
    }
    
    return matchesSearch && matchesType && matchesCategory && matchesPaymentType && matchesDate;
  });

  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'type':
        comparison = (a.type || 'expense').localeCompare(b.type || 'expense');
        break;
      case 'invoiceDate':
        comparison = new Date(a.invoiceDate).getTime() - new Date(b.invoiceDate).getTime();
        break;
      case 'invoiceNumber':
        comparison = a.invoiceNumber.localeCompare(b.invoiceNumber);
        break;
      case 'companyName':
        comparison = a.companyName.localeCompare(b.companyName);
        break;
      case 'amount':
        comparison = a.amount - b.amount;
        break;
      case 'vat':
        comparison = a.vat - b.vat;
        break;
      case 'totalAmount':
        comparison = a.totalAmount - b.totalAmount;
        break;
      case 'currencyCode':
        comparison = (a.currencyCode || 'EUR').localeCompare(b.currencyCode || 'EUR');
        break;
      case 'categoryId':
        comparison = (a.categoryId || '').localeCompare(b.categoryId || '');
        break;
      case 'paymentTypeId':
        comparison = (a.paymentTypeId || '').localeCompare(b.paymentTypeId || '');
        break;
      default:
        comparison = 0;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const clearFilters = () => {
    setTypeFilter("all");
    setSearchTerm("");
    setCategoryFilter("_all");
    setPaymentTypeFilter("_all");
    setDateRange({ from: undefined, to: undefined });
  };

  const hasFilters = !!searchTerm || 
                    (typeFilter && typeFilter !== "all") || 
                    (categoryFilter && categoryFilter !== "_all") || 
                    (paymentTypeFilter && paymentTypeFilter !== "_all") || 
                    !!dateRange.from;

  return (
    <div className="w-full animate-fade-in">
      <InvoiceFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        paymentTypeFilter={paymentTypeFilter}
        setPaymentTypeFilter={setPaymentTypeFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
        clearFilters={clearFilters}
      />

      {sortedInvoices.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <InvoiceTableHeader 
                sortField={sortField} 
                sortDirection={sortDirection} 
                handleSort={handleSort} 
              />
              <InvoiceTableBody 
                invoices={sortedInvoices} 
                onEdit={onEdit} 
                onDelete={onDelete} 
              />
            </Table>
          </div>
        </div>
      ) : (
        <InvoiceEmptyState hasFilters={hasFilters} />
      )}
    </div>
  );
};

export default InvoiceTable;
