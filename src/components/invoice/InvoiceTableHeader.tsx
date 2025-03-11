
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const InvoiceTableHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Type</TableHead>
        <TableHead>Document Date</TableHead>
        <TableHead>Document Number</TableHead>
        <TableHead>Company</TableHead>
        <TableHead className="text-right">Amount</TableHead>
        <TableHead className="text-right">VAT</TableHead>
        <TableHead className="text-right">Total</TableHead>
        <TableHead>Category</TableHead>
        <TableHead>Document</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default InvoiceTableHeader;
