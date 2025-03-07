
import { Invoice, InvoiceFormData } from "@/types";
import { v4 as uuidv4 } from 'uuid';

// Mock function to simulate invoice data extraction
export const extractInvoiceData = async (file: File): Promise<InvoiceFormData> => {
  // In a real app, this would be an API call to an OCR service or ML model
  // For demo purposes, we'll return mock data with random values
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const documentName = file.name;
  const currentDate = new Date();
  
  // Generate some random data for demo
  const invoiceNumber = `INV-${Math.floor(Math.random() * 10000)}`;
  const companies = ["Acme Inc.", "Globex Corporation", "Stark Industries", "Wayne Enterprises", "Umbrella Corp"];
  const companyName = companies[Math.floor(Math.random() * companies.length)];
  const amount = parseFloat((Math.random() * 1000 + 100).toFixed(2));
  const vat = parseFloat((amount * 0.21).toFixed(2)); // 21% VAT
  const totalAmount = parseFloat((amount + vat).toFixed(2));
  
  // Format date as YYYY-MM-DD for input field
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const invoiceDate = `${year}-${month}-${day}`;
  
  return {
    documentName,
    invoiceDate,
    invoiceNumber,
    companyName,
    amount,
    vat,
    totalAmount
  };
};

// Get invoices from local storage
export const getInvoices = (): Invoice[] => {
  const invoices = localStorage.getItem('apuntea_invoices');
  return invoices ? JSON.parse(invoices) : [];
};

// Save invoice to local storage
export const saveInvoice = (invoiceData: InvoiceFormData, fileUrl: string): Invoice => {
  const invoices = getInvoices();
  
  // Create new invoice with ID and timestamps
  const newInvoice: Invoice = {
    id: uuidv4(),
    documentName: invoiceData.documentName,
    invoiceDate: invoiceData.invoiceDate,
    invoiceNumber: invoiceData.invoiceNumber,
    companyName: invoiceData.companyName,
    amount: typeof invoiceData.amount === 'string' ? parseFloat(invoiceData.amount) : invoiceData.amount,
    vat: typeof invoiceData.vat === 'string' ? parseFloat(invoiceData.vat) : invoiceData.vat,
    totalAmount: typeof invoiceData.totalAmount === 'string' ? parseFloat(invoiceData.totalAmount) : invoiceData.totalAmount,
    documentLink: fileUrl,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // Add to invoices array and save to localStorage
  invoices.push(newInvoice);
  localStorage.setItem('apuntea_invoices', JSON.stringify(invoices));
  
  return newInvoice;
};

// Update existing invoice
export const updateInvoice = (invoice: Invoice): void => {
  const invoices = getInvoices();
  const index = invoices.findIndex(i => i.id === invoice.id);
  
  if (index !== -1) {
    // Update invoice and updatedAt timestamp
    invoices[index] = {
      ...invoice,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem('apuntea_invoices', JSON.stringify(invoices));
  }
};

// Delete invoice by ID
export const deleteInvoice = (id: string): void => {
  const invoices = getInvoices();
  const updatedInvoices = invoices.filter(invoice => invoice.id !== id);
  localStorage.setItem('apuntea_invoices', JSON.stringify(updatedInvoices));
};

// Format currency (for display)
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};

// Format date (for display)
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
};
