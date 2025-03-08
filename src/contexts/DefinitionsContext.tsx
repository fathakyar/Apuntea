
import React, { createContext, useState, useContext, useEffect } from "react";
import { Category, Subcategory, Currency } from "@/types";
import { initialCategories, currencies } from "@/utils/definitionsData";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

interface DefinitionsContextType {
  categories: Category[];
  currencies: Currency[];
  addSubcategory: (categoryId: string, name: string) => void;
  updateSubcategory: (categoryId: string, subcategoryId: string, newName: string) => void;
  deleteSubcategory: (categoryId: string, subcategoryId: string) => void;
  toggleCurrencySelection: (currencyCode: string) => void;
}

const DefinitionsContext = createContext<DefinitionsContextType | null>(null);

export const DefinitionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currenciesList, setCurrenciesList] = useState<Currency[]>([]);
  const { toast } = useToast();

  // Initialize from localStorage or defaults
  useEffect(() => {
    const storedCategories = localStorage.getItem("apuntea_categories");
    const storedCurrencies = localStorage.getItem("apuntea_currencies");
    
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      setCategories(initialCategories);
    }
    
    if (storedCurrencies) {
      setCurrenciesList(JSON.parse(storedCurrencies));
    } else {
      setCurrenciesList(currencies);
    }
  }, []);

  // Update localStorage when data changes
  useEffect(() => {
    if (categories.length > 0) {
      // Auto-update budget category with income and expense subcategories
      const updatedCategories = [...categories];
      
      const incomeCategory = updatedCategories.find(c => c.id === "income");
      const expenseCategory = updatedCategories.find(c => c.id === "expense");
      const budgetCategory = updatedCategories.find(c => c.id === "budget");
      
      if (incomeCategory && expenseCategory && budgetCategory) {
        // Combine income and expense subcategories for budget
        const combinedSubcategories = [
          ...incomeCategory.subcategories,
          ...expenseCategory.subcategories
        ];
        
        // Update budget subcategories
        budgetCategory.subcategories = combinedSubcategories;
        
        localStorage.setItem("apuntea_categories", JSON.stringify(updatedCategories));
      }
    }
  }, [categories]);

  useEffect(() => {
    if (currenciesList.length > 0) {
      localStorage.setItem("apuntea_currencies", JSON.stringify(currenciesList));
    }
  }, [currenciesList]);

  // Add new subcategory
  const addSubcategory = (categoryId: string, name: string) => {
    // Ensure name is uppercase
    const uppercaseName = name.toUpperCase();
    
    setCategories(prev => 
      prev.map(category => {
        if (category.id === categoryId && category.editable) {
          return {
            ...category,
            subcategories: [
              ...category.subcategories,
              { id: uuidv4(), name: uppercaseName }
            ]
          };
        }
        return category;
      })
    );
    
    toast({
      title: "Alt kategori eklendi",
      description: `"${uppercaseName}" başarıyla eklendi.`,
    });
  };

  // Update subcategory
  const updateSubcategory = (categoryId: string, subcategoryId: string, newName: string) => {
    // Ensure new name is uppercase
    const uppercaseNewName = newName.toUpperCase();
    
    setCategories(prev => 
      prev.map(category => {
        if (category.id === categoryId && category.editable) {
          return {
            ...category,
            subcategories: category.subcategories.map(sub => 
              sub.id === subcategoryId ? { ...sub, name: uppercaseNewName } : sub
            )
          };
        }
        return category;
      })
    );
    
    toast({
      title: "Alt kategori güncellendi",
      description: `Alt kategori başarıyla "${uppercaseNewName}" olarak güncellendi.`,
    });
  };

  // Delete subcategory
  const deleteSubcategory = (categoryId: string, subcategoryId: string) => {
    const categoryToUpdate = categories.find(c => c.id === categoryId);
    const subcategoryToDelete = categoryToUpdate?.subcategories.find(s => s.id === subcategoryId);
    
    if (!categoryToUpdate?.editable) return;
    
    setCategories(prev => 
      prev.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            subcategories: category.subcategories.filter(sub => sub.id !== subcategoryId)
          };
        }
        return category;
      })
    );
    
    toast({
      title: "Alt kategori silindi",
      description: subcategoryToDelete 
        ? `"${subcategoryToDelete.name}" başarıyla silindi.`
        : "Alt kategori başarıyla silindi.",
    });
  };

  // Toggle currency selection
  const toggleCurrencySelection = (currencyCode: string) => {
    setCurrenciesList(prev => 
      prev.map(currency => {
        if (currency.code === currencyCode) {
          return { ...currency, selected: !currency.selected };
        }
        return currency;
      })
    );
  };

  return (
    <DefinitionsContext.Provider value={{ 
      categories, 
      currencies: currenciesList,
      addSubcategory,
      updateSubcategory,
      deleteSubcategory,
      toggleCurrencySelection
    }}>
      {children}
    </DefinitionsContext.Provider>
  );
};

export const useDefinitions = (): DefinitionsContextType => {
  const context = useContext(DefinitionsContext);
  if (!context) {
    throw new Error("useDefinitions must be used within a DefinitionsProvider");
  }
  return context;
};
