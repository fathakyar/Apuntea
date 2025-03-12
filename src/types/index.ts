
export type RecordType = "income" | "expense" | "financing";

export type SupportedLanguage = "en" | "es" | "tr";

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
  currencyCode?: string;
  paymentTypeId?: string;
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
  importance?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  isAuthenticated?: boolean;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  isLoading: boolean;
}

export interface FormattingOptions {
  toUpperCase?: boolean;
  formatNumber?: boolean;
  decimalPlaces?: number;
}
