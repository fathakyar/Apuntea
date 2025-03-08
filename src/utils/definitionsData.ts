
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
    name: "GELİR",
    subcategories: createSubcategories([
      "SATIŞ GELİRLERİ", 
      "FİNANSAL GELİRLER", 
      "REKLAM VE SPONSORLUK GELİRLERİ", 
      "LİSANS VE TELİF GELİRLERİ", 
      "KİRALAMA GELİRLERİ", 
      "TEŞVİK VE HİBE GELİRLERİ", 
      "DİĞER GELİRLER"
    ]),
    editable: true
  },
  {
    id: "expense",
    name: "GİDER",
    subcategories: createSubcategories([
      "HAMMADDE VE MALZEME ALIMI", 
      "HİZMET ALIMI", 
      "LOJİSTİK GİDERLERİ", 
      "MAAŞ VE ÜCRET GİDERLERİ", 
      "ÇALIŞAN SOSYAL SİGORTA VE YAN HAKLARI", 
      "KİRA GİDERLERİ", 
      "AMORTİSMAN GİDERLERİ", 
      "ELEKTRİK GİDERİ", 
      "SU GİDERİ", 
      "GAZ GİDERİ", 
      "İNTERNET GİDERİ", 
      "İLETİŞİM GİDERİ", 
      "SİGORTA GİDERİ", 
      "PAZARLAMA VE SATIŞ GİDERLERİ", 
      "TEKNOLOJİ VE ALTYAPI GİDERLERİ", 
      "FİNANSAL GİDERLER", 
      "HUKUKİ GİDERLER", 
      "YÖNETİM GİDERLERİ", 
      "VERGİLER VE HARÇLAR", 
      "CEZA / TAZMİNAT", 
      "DİĞER GİDERLER"
    ]),
    editable: true
  },
  {
    id: "financing",
    name: "FİNANSMAN",
    subcategories: createSubcategories([
      "BORÇ / KREDİ ALIMI", 
      "BORÇ / KREDİ ÖDEMESİ", 
      "BORÇ VERME", 
      "VERİLEN BORCUN"
    ]),
    editable: true
  },
  {
    id: "noteTask",
    name: "NOT / GÖREV",
    subcategories: createSubcategories([
      "NOT", 
      "GÖREV"
    ]),
    editable: true
  },
  {
    id: "paymentType",
    name: "ÖDEME TÜRÜ",
    subcategories: createSubcategories([
      "NAKİT", 
      "HAVALE/EFT", 
      "KREDİ KARTI", 
      "ÇEK"
    ]),
    editable: true
  },
  {
    id: "budget",
    name: "BÜTÇE",
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
