
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getInvoices } from "@/utils/invoiceUtils";

interface CompanyAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  name?: string;
  required?: boolean;
  className?: string;
}

const CompanyAutocomplete: React.FC<CompanyAutocompleteProps> = ({
  value,
  onChange,
  id = "companyName",
  name = "companyName",
  required = false,
  className,
}) => {
  const [companies, setCompanies] = useState<string[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get unique company names from existing invoices
    const invoices = getInvoices();
    const uniqueCompanies = Array.from(
      new Set(invoices.map((invoice) => invoice.companyName.toUpperCase()))
    ).sort();
    setCompanies(uniqueCompanies);
  }, []);

  useEffect(() => {
    if (!value) {
      setFilteredCompanies([]);
      return;
    }

    const filtered = companies.filter((company) =>
      company.includes(value.toUpperCase())
    );
    setFilteredCompanies(filtered);
  }, [value, companies]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toUpperCase();
    onChange(newValue);
    setIsOpen(true);
  };

  const handleCompanySelect = (company: string) => {
    onChange(company);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <Label htmlFor={id} className="form-label">
        Company Name
      </Label>
      <Input
        id={id}
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder="Company name"
        className={className}
        required={required}
        onFocus={() => setIsOpen(true)}
      />

      {isOpen && filteredCompanies.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-background py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {filteredCompanies.map((company) => (
            <li
              key={company}
              className="cursor-pointer px-4 py-2 hover:bg-accent transition-colors"
              onClick={() => handleCompanySelect(company)}
            >
              {company}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompanyAutocomplete;
