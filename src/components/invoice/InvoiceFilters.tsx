
import React from "react";
import { Calendar as CalendarIcon, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useDefinitions } from "@/contexts/DefinitionsContext";

interface InvoiceFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  categoryFilter: string;
  setCategoryFilter: (categoryId: string) => void;
  paymentTypeFilter: string;
  setPaymentTypeFilter: (paymentTypeId: string) => void;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  clearFilters: () => void;
}

const InvoiceFilters: React.FC<InvoiceFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  typeFilter,
  setTypeFilter,
  categoryFilter,
  setCategoryFilter,
  paymentTypeFilter,
  setPaymentTypeFilter,
  dateRange,
  setDateRange,
  clearFilters,
}) => {
  const { categories } = useDefinitions();
  const hasFilters = !!searchTerm || 
                    (!!typeFilter && typeFilter !== "all") || 
                    !!categoryFilter || 
                    !!paymentTypeFilter || 
                    !!dateRange.from;

  // Get subcategories based on record type
  const getSubcategories = () => {
    if (!typeFilter || typeFilter === "all") return [];
    const category = categories.find(cat => cat.id === typeFilter);
    return category ? category.subcategories : [];
  };

  // Get payment types
  const getPaymentTypes = () => {
    const paymentTypeCategory = categories.find(cat => cat.id === "paymentType");
    return paymentTypeCategory ? paymentTypeCategory.subcategories : [];
  };

  const subcategories = getSubcategories();
  const paymentTypes = getPaymentTypes();
  
  // Handle date range selection safely
  const handleDateRangeChange = (newRange: DateRange | undefined) => {
    if (newRange) {
      setDateRange(newRange);
    }
  };

  return (
    <div className="bg-background/60 backdrop-blur-sm sticky top-0 z-10 py-4 border-b mb-4">
      <div className="flex flex-wrap md:flex-nowrap gap-3 items-center">
        <div className="relative flex-grow min-w-[200px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="SEARCH DOCUMENT..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-0 hover:bg-transparent"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !dateRange.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange}
              onSelect={handleDateRangeChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="financing">Financing</SelectItem>
          </SelectContent>
        </Select>

        {typeFilter && typeFilter !== "all" && subcategories.length > 0 && (
          <Select 
            value={categoryFilter} 
            onValueChange={setCategoryFilter}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {subcategories.map(subcategory => (
                <SelectItem key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Select 
          value={paymentTypeFilter} 
          onValueChange={setPaymentTypeFilter}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All payment types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_all">All Payment Types</SelectItem>
            {paymentTypes.map(paymentType => (
              <SelectItem key={paymentType.id} value={paymentType.id}>
                {paymentType.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button variant="ghost" onClick={clearFilters} className="h-10">
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default InvoiceFilters;
