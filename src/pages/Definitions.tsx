
import React, { useState, useEffect } from "react";
import { useDefinitions } from "@/contexts/DefinitionsContext";
import CategoryCard from "@/components/definitions/CategoryCard";
import CurrencySelector from "@/components/definitions/CurrencySelector";
import { Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Subcategory } from "@/types";

const Definitions = () => {
  const { 
    categories, 
    currencies,
    addSubcategory, 
    updateSubcategory,
    deleteSubcategory,
    toggleCurrencySelection,
    updateBudgetAmount
  } = useDefinitions();
  
  const [activeTab, setActiveTab] = useState(categories[0]?.id || "");
  const { language } = useLanguage();
  const t = translations[language];
  const [budgetAmounts, setBudgetAmounts] = useState<{[key: string]: string}>({});

  // Initialize budget amounts from stored values
  useEffect(() => {
    const budgetCategory = categories.find(c => c.id === "budget");
    if (budgetCategory) {
      const initialBudgetAmounts: {[key: string]: string} = {};
      budgetCategory.subcategories.forEach(sub => {
        initialBudgetAmounts[sub.id] = sub.budgetAmount?.toString() || '';
      });
      setBudgetAmounts(initialBudgetAmounts);
    }
  }, [categories]);

  // Group budget subcategories by income and expense
  const getBudgetSubcategoryGroups = () => {
    const budgetCategory = categories.find(c => c.id === "budget");
    const incomeCategory = categories.find(c => c.id === "income");
    const expenseCategory = categories.find(c => c.id === "expense");
    const financingCategory = categories.find(c => c.id === "financing");
    
    if (!budgetCategory || !incomeCategory || !expenseCategory || !financingCategory) 
      return { income: [], expense: [], financing: [] };
    
    const incomeSubcategories = incomeCategory.subcategories.map(sub => sub.id);
    const financingSubcategories = financingCategory.subcategories.map(sub => sub.id);
    
    return {
      income: budgetCategory.subcategories.filter(sub => 
        incomeSubcategories.includes(sub.id)
      ),
      expense: budgetCategory.subcategories.filter(sub => 
        !incomeSubcategories.includes(sub.id) && !financingSubcategories.includes(sub.id)
      ),
      financing: budgetCategory.subcategories.filter(sub =>
        financingSubcategories.includes(sub.id)
      )
    };
  };
  
  const budgetGroups = getBudgetSubcategoryGroups();

  // Handle budget amount input change
  const handleBudgetAmountChange = (id: string, value: string) => {
    // Only allow numbers and decimal point
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setBudgetAmounts(prev => ({
        ...prev,
        [id]: value
      }));
    }
  };

  // Save budget amount for a subcategory
  const saveBudgetAmount = (id: string) => {
    if (budgetAmounts[id] !== undefined) {
      const amount = budgetAmounts[id] === '' ? 0 : parseFloat(budgetAmounts[id]);
      updateBudgetAmount(id, amount);
    }
  };

  // Map category IDs to display names in uppercase English
  const getCategoryDisplayName = (categoryId: string) => {
    switch(categoryId) {
      case "income": return "INCOME";
      case "expense": return "EXPENSE";
      case "financing": return "FINANCING";
      case "noteTask": return "NOTE / TASK";
      case "paymentType": return "PAYMENT TYPE";
      case "budget": return "BUDGET";
      case "currency": return "CURRENCY";
      default: return categoryId.toUpperCase();
    }
  };

  // Render budget subcategories with input fields
  const renderBudgetSubcategories = (subcategories: Subcategory[], type: string) => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">{type.toUpperCase()}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {subcategories.map((subcategory) => (
              <div key={subcategory.id} className="border rounded-md p-3 flex items-center justify-between">
                <div className="font-medium">{subcategory.name}</div>
                <div className="flex items-center space-x-2">
                  <Input
                    value={budgetAmounts[subcategory.id] || ''}
                    onChange={(e) => handleBudgetAmountChange(subcategory.id, e.target.value)}
                    className="w-24 text-right"
                    placeholder="0.00"
                  />
                  <Button 
                    size="sm" 
                    onClick={() => saveBudgetAmount(subcategory.id)}
                    className="h-9"
                  >
                    OK
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-6 animate-slide-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1 flex items-center">
            <Settings className="mr-2 h-6 w-6" />
            DEFINITIONS
          </h1>
          <p className="text-muted-foreground">
            MANAGE SYSTEM CATEGORIES AND SUBCATEGORIES
          </p>
        </div>
      </div>

      <Tabs 
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full justify-start mb-6 overflow-x-auto">
          {categories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="px-4 py-2"
            >
              {getCategoryDisplayName(category.id)}
            </TabsTrigger>
          ))}
          <TabsTrigger value="currency" className="px-4 py-2">
            CURRENCY
          </TabsTrigger>
        </TabsList>
        
        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            {category.id === "budget" ? (
              <div className="space-y-8">
                {budgetGroups.income.length > 0 && renderBudgetSubcategories(budgetGroups.income, "INCOME")}
                {budgetGroups.expense.length > 0 && renderBudgetSubcategories(budgetGroups.expense, "EXPENSE")}
                {budgetGroups.financing.length > 0 && renderBudgetSubcategories(budgetGroups.financing, "FINANCING")}
              </div>
            ) : (
              <CategoryCard
                title={getCategoryDisplayName(category.id)}
                subcategories={category.subcategories}
                editable={category.editable}
                onAdd={(name) => addSubcategory(category.id, name)}
                onUpdate={(subcategoryId, newName) => 
                  updateSubcategory(category.id, subcategoryId, newName)
                }
                onDelete={(subcategoryId) => 
                  deleteSubcategory(category.id, subcategoryId)
                }
                description={
                  category.id === "budget" 
                    ? "AUTOMATICALLY SYNCHRONIZED WITH INCOME AND EXPENSE CATEGORIES"
                    : undefined
                }
              />
            )}
          </TabsContent>
        ))}
        
        <TabsContent value="currency" className="mt-0">
          <CurrencySelector 
            currencies={currencies}
            onToggle={toggleCurrencySelection}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Definitions;
