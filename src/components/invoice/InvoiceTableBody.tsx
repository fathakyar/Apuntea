
import React from "react";
import { Invoice } from "@/types";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, ExternalLink } from "lucide-react";
import { formatCurrency, formatDate } from "@/utils/invoiceUtils";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface InvoiceTableBodyProps {
  invoices: Invoice[];
  onEdit: (invoice: Invoice) => void;
  onDelete: (id: string) => void;
}

const InvoiceTableBody: React.FC<InvoiceTableBodyProps> = ({ 
  invoices, 
  onEdit, 
  onDelete 
}) => {
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

  const getDocumentUrl = (url: string) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    if (url === '#') {
      return 'javascript:void(0)';
    }
    
    return url;
  };

  const handleEditClick = (e: React.MouseEvent, invoice: Invoice) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(invoice);
  };

  const handleDocumentClick = (e: React.MouseEvent, url: string) => {
    if (url === '#') {
      e.preventDefault();
      e.stopPropagation();
      alert('Document is not available.');
      return;
    }
    
    // For actual URLs, the default link behavior will work
  };

  return (
    <TableBody>
      {invoices.map((invoice) => (
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
              className="h-8 w-8"
              onClick={(e) => handleDocumentClick(e, invoice.documentLink)}
              type="button"
              asChild={invoice.documentLink !== '#'}
            >
              {invoice.documentLink !== '#' ? (
                <a 
                  href={getDocumentUrl(invoice.documentLink)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="View document"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <span title="No document available">
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </span>
              )}
            </Button>
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={(e) => handleEditClick(e, invoice)}
                className="h-8 w-8"
                title="Edit invoice"
                type="button"
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
                    type="button"
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
  );
};

export default InvoiceTableBody;
