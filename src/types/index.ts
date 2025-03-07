
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
}

export interface FormattingOptions {
  toUpperCase?: boolean;
  formatNumber?: boolean;
}

// Add to the types file to support window.gapi
declare global {
  interface Window {
    gapi: any;
  }
}
