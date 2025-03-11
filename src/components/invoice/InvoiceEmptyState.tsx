
import React from "react";
import { FileText } from "lucide-react";

interface InvoiceEmptyStateProps {
  hasFilters: boolean;
}

const InvoiceEmptyState: React.FC<InvoiceEmptyStateProps> = ({ hasFilters }) => {
  return (
    <div className="text-center py-10 border rounded-lg glass-card">
      <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-40" />
      <h3 className="text-lg font-medium mb-1">No invoices found</h3>
      <p className="text-muted-foreground">
        {hasFilters ? "Try adjusting your filters" : "Start by uploading your first invoice"}
      </p>
    </div>
  );
};

export default InvoiceEmptyState;
