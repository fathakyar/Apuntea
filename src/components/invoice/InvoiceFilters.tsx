
import React from "react";
import { Search, Filter, CalendarRange } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

interface InvoiceFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  dateRange: DateRange;
  setDateRange: (value: DateRange) => void;
  clearFilters: () => void;
}

const InvoiceFilters: React.FC<InvoiceFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  typeFilter,
  setTypeFilter,
  dateRange,
  setDateRange,
  clearFilters,
}) => {
  return (
    <div className="flex flex-col space-y-4 mb-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter by Type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="income">
                <div className="flex items-center gap-2">
                  <Badge className="bg-apuntea-gold text-black">Income</Badge>
                </div>
              </SelectItem>
              <SelectItem value="expense">
                <div className="flex items-center gap-2">
                  <Badge className="bg-apuntea-purple text-white">Expense</Badge>
                </div>
              </SelectItem>
              <SelectItem value="financing">
                <div className="flex items-center gap-2">
                  <Badge className="bg-apuntea-dark text-white">Financing</Badge>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start">
                <CalendarRange className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "dd/MM/yyyy")} - {format(dateRange.to, "dd/MM/yyyy")}
                    </>
                  ) : (
                    format(dateRange.from, "dd/MM/yyyy")
                  )
                ) : (
                  <span>Date Range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          
          {(typeFilter || dateRange.from) && (
            <Button variant="ghost" onClick={clearFilters} size="sm">
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceFilters;
