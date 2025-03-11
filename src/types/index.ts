export interface Invoice {
  id: string;
  documentName: string;
  invoiceDate: string;
  invoiceNumber: string;
  companyName: string;
  amount: number;
  vat: number;
  totalAmount: number;
  documentLink: string;
  createdAt: string;
  updatedAt: string;
  type?: RecordType; // Added type field
}

export interface User {
  email: string;
  isAuthenticated: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface InvoiceFormData {
  documentName: string;
  invoiceDate: string;
  invoiceNumber: string;
  companyName: string;
  amount: number | string;
  vat: number | string;
  totalAmount: number | string;
  type?: RecordType; // Added type field
}

export interface FormattingOptions {
  toUpperCase?: boolean;
  formatNumber?: boolean;
}

declare global {
  interface Window {
    gapi: any;
  }
}

export interface Subcategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
  editable: boolean;
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
  importance: string;
  date: string;
  subcategoryId: string;
}

export type RecordType = "income" | "expense" | "financing";
