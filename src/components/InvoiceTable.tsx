
import React, { useState } from "react";
import { Invoice } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Edit,
  Trash2,
  ExternalLink,
  ArrowUpDown,
  Search,
  FileText,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatCurrency, formatDate } from "@/utils/invoiceUtils";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

interface InvoiceTableProps {
  invoices: Invoice[];
  onEdit: (invoice: Invoice) => void;
  onDelete: (id: string) => void;
}

type SortField = 'type' | 'invoiceDate' | 'invoiceNumber' | 'companyName' | 'amount' | 'vat' | 'totalAmount';
type SortDirection = 'asc' | 'desc';

const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>('invoiceDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [invoiceToDelete, setInvoiceToDelete] = useState<string | null>(null);

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
    return (
      invoice.companyName.toLowerCase().includes(searchLower) ||
      invoice.invoiceNumber.toLowerCase().includes(searchLower) ||
      invoice.documentName.toLowerCase().includes(searchLower)
    );
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
      default:
        comparison = 0;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const confirmDelete = (id: string) => {
    setInvoiceToDelete(id);
  };

  const handleDeleteConfirm = () => {
    if (invoiceToDelete) {
      onDelete(invoiceToDelete);
      setInvoiceToDelete(null);
    }
  };

  const getTypeColor = (type?: string) => {
    switch (type) {
      case 'income':
        return 'bg-apuntea-gold text-black';
      case 'expense':
        return 'bg-apuntea-purple text-white';
      case 'financing':
        return 'bg-apuntea-dark text-white';
      default:
        return 'bg-muted';
    }
  };

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
    <div className="w-full animate-fade-in">
      <div className="flex items-center mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {sortedInvoices.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
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
              <TableBody>
                {sortedInvoices.map((invoice) => (
                  <TableRow key={invoice.id} className="animate-fade-in">
                    <TableCell>
                      <Badge className={`${getTypeColor(invoice.type)} capitalize`}>
                        {invoice.type || 'expense'}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(invoice.invoiceDate)}</TableCell>
                    <TableCell>{invoice.invoiceNumber}</TableCell>
                    <TableCell>{invoice.companyName}</TableCell>
                    <TableCell className="text-right">{formatCurrency(invoice.amount)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(invoice.vat)}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(invoice.totalAmount)}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        asChild
                        className="h-8 w-8"
                      >
                        <a 
                          href={invoice.documentLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          title="View document"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onEdit(invoice)}
                          className="h-8 w-8"
                          title="Edit invoice"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                              title="Delete invoice"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the invoice. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => onDelete(invoice.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 border rounded-lg glass-card">
          <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-40" />
          <h3 className="text-lg font-medium mb-1">No invoices found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? "Try adjusting your search" : "Start by uploading your first invoice"}
          </p>
        </div>
      )}
    </div>
  );
};

export default InvoiceTable;
