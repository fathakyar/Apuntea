
import { Category, Currency } from "@/types";
import { v4 as uuidv4 } from "uuid";

// Function to create subcategories from string array
const createSubcategories = (names: string[]) => {
  return names.map(name => ({
    id: uuidv4(),
    name
  }));
};

// Initial categories data
export const initialCategories: Category[] = [
  {
    id: "income",
    name: "INCOME",
    subcategories: createSubcategories([
      "SALES REVENUE", 
      "FINANCIAL INCOME", 
      "ADVERTISING AND SPONSORSHIP INCOME", 
      "LICENSE AND COPYRIGHT INCOME", 
      "RENTAL INCOME", 
      "INCENTIVE AND GRANT INCOME", 
      "OTHER INCOME"
    ]),
    editable: true
  },
  {
    id: "expense",
    name: "EXPENSE",
    subcategories: createSubcategories([
      "RAW MATERIALS AND SUPPLIES", 
      "SERVICE PROCUREMENT", 
      "LOGISTICS EXPENSES", 
      "SALARY AND WAGE EXPENSES", 
      "EMPLOYEE SOCIAL INSURANCE AND BENEFITS", 
      "RENT EXPENSES", 
      "DEPRECIATION EXPENSES", 
      "ELECTRICITY EXPENSE", 
      "WATER EXPENSE", 
      "GAS EXPENSE", 
      "INTERNET EXPENSE", 
      "COMMUNICATION EXPENSE", 
      "INSURANCE EXPENSE", 
      "MARKETING AND SALES EXPENSES", 
      "TECHNOLOGY AND INFRASTRUCTURE EXPENSES", 
      "FINANCIAL EXPENSES", 
      "LEGAL EXPENSES", 
      "MANAGEMENT EXPENSES", 
      "TAXES AND FEES", 
      "PENALTIES / COMPENSATION", 
      "OTHER EXPENSES"
    ]),
    editable: true
  },
  {
    id: "financing",
    name: "FINANCING",
    subcategories: createSubcategories([
      "DEBT / LOAN RECEIPT", 
      "DEBT / LOAN PAYMENT", 
      "LENDING", 
      "LOAN COLLECTION"
    ]),
    editable: true
  },
  {
    id: "noteTask",
    name: "NOTE / TASK",
    subcategories: createSubcategories([
      "NOTE", 
      "TASK"
    ]),
    editable: true
  },
  {
    id: "paymentType",
    name: "PAYMENT TYPE",
    subcategories: createSubcategories([
      "CASH", 
      "WIRE TRANSFER", 
      "CREDIT CARD", 
      "CHECK"
    ]),
    editable: true
  },
  {
    id: "budget",
    name: "BUDGET",
    subcategories: [], // This will be auto-populated
    editable: false
  }
];

// Most common world currencies
export const currencies: Currency[] = [
  { code: "EUR", name: "Europe", symbol: "€", selected: true },
  { code: "USD", name: "United States Dollar", symbol: "$", selected: false },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", selected: false },
  { code: "GBP", name: "British Pound", symbol: "£", selected: false },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", selected: false },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", selected: false },
  { code: "RUB", name: "Russian Ruble", symbol: "₽", selected: false },
  { code: "INR", name: "Indian Rupee", symbol: "₹", selected: false },
  { code: "CAD", name: "Canadian Dollar", symbol: "$", selected: false },
  { code: "AUD", name: "Australian Dollar", symbol: "$", selected: false },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", selected: false },
  { code: "SGD", name: "Singapore Dollar", symbol: "$", selected: false },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", selected: false },
  { code: "ZAR", name: "South African Rand", symbol: "R", selected: false },
  { code: "AED", name: "United Arab Emirates Dirham", symbol: "د.إ", selected: false },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼", selected: false }
];
