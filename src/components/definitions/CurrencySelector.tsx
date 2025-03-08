
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Currency } from "@/types";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CurrencySelectorProps {
  currencies: Currency[];
  onToggle: (code: string) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ currencies, onToggle }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const filteredCurrencies = currencies.filter(currency => 
    currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">PARA BİRİMİ</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Para birimi ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-64 overflow-y-auto p-1">
            {filteredCurrencies.map((currency) => (
              <div 
                key={currency.code}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50"
              >
                <Checkbox
                  id={`currency-${currency.code}`}
                  checked={currency.selected}
                  onCheckedChange={() => onToggle(currency.code)}
                />
                <label
                  htmlFor={`currency-${currency.code}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                >
                  {currency.code} – {currency.name} ({currency.symbol})
                </label>
              </div>
            ))}
            {filteredCurrencies.length === 0 && (
              <div className="col-span-full text-center py-4 text-muted-foreground">
                Arama kriterine uygun para birimi bulunamadı
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencySelector;
