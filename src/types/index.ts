
export type RecordType = "income" | "expense" | "financing";

export interface Invoice {
  id: string;
  type?: RecordType;
  documentName?: string;
  invoiceDate: string;
  invoiceNumber: string;
  companyName: string;
  amount: number;
  vat: number;
  totalAmount: number;
  documentLink: string;
  categoryId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceFormData {
  documentName: string;
  invoiceDate: string;
  invoiceNumber: string;
  companyName: string;
  amount: any;
  vat: any;
  totalAmount: any;
  categoryId?: string;
}

export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
  editable: boolean;
}

export interface Subcategory {
  id: string;
  name: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  selected: boolean;
}

export interface AgendaEvent {
  id: string;
  title: string;
  description: string;
  type: string;
  subcategoryId: string;
  date: string;
  reminder?: boolean;
}
