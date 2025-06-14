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
import { Separator } from "@/components/ui/separator";
import { Subcategory } from "@/types";
import { formatNumberWithEuropeanStyle, parseEuropeanNumber } from "@/utils/formatUtils";

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

  useEffect(() => {
    const budgetCategory = categories.find(c => c.id === "budget");
    if (budgetCategory) {
      const initialBudgetAmounts: {[key: string]: string} = {};
      budgetCategory.subcategories.forEach(sub => {
        initialBudgetAmounts[sub.id] = sub.budgetAmount 
          ? formatNumberWithEuropeanStyle(sub.budgetAmount, { formatNumber: true })
          : '';
      });
      setBudgetAmounts(initialBudgetAmounts);
    }
  }, [categories]);

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
      income: budgetCategory.subcategories
        .filter(sub => incomeSubcategories.includes(sub.id))
        .sort((a, b) => a.name.localeCompare(b.name)),
      expense: budgetCategory.subcategories
        .filter(sub => !incomeSubcategories.includes(sub.id) && !financingSubcategories.includes(sub.id))
        .sort((a, b) => a.name.localeCompare(b.name)),
      financing: budgetCategory.subcategories
        .filter(sub => financingSubcategories.includes(sub.id))
        .sort((a, b) => a.name.localeCompare(b.name))
    };
  };
  
  const budgetGroups = getBudgetSubcategoryGroups();

  const handleBudgetAmountChange = (id: string, value: string) => {
    if (value === '' || /^[0-9]*[.,]?[0-9]*$/.test(value)) {
      setBudgetAmounts(prev => ({
        ...prev,
        [id]: value
      }));
    }
  };

  const saveBudgetAmount = (id: string) => {
    if (budgetAmounts[id] !== undefined) {
      const normalizedValue = budgetAmounts[id].replace(',', '.');
      const amount = normalizedValue === '' ? 0 : parseFloat(normalizedValue);
      updateBudgetAmount(id, amount);
      
      setBudgetAmounts(prev => ({
        ...prev,
        [id]: formatNumberWithEuropeanStyle(amount, { formatNumber: true })
      }));
    }
  };

  const getCategoryDisplayName = (categoryId: string) => {
    switch(categoryId) {
      case "income": return "INCOME";
      case "expense": return "EXPENSE";
      case "financing": return "FINANCING";
      case "noteTask": return "EVENT";  // Changed from "NOTE / TASK" to "EVENT"
      case "paymentType": return "PAYMENT TYPE";
      case "budget": return "BUDGET";
      case "currency": return "CURRENCY";
      default: return categoryId.toUpperCase();
    }
  };

  const getCategoryStyle = (categoryId: string) => {
    switch(categoryId) {
      case "income": return {
        borderColor: "#f0b50a", // gold color for income
        buttonBg: "bg-apuntea-gold text-black hover:bg-apuntea-gold/90"
      };
      case "expense": return {
        borderColor: "#9b87f5", // purple color for expense
        buttonBg: "bg-apuntea-purple text-white hover:bg-apuntea-purple/90"
      };
      case "financing": return {
        borderColor: "#1A1F2C", // dark color for financing
        buttonBg: "bg-apuntea-dark text-white hover:bg-apuntea-dark/90"
      };
      default: return {
        borderColor: "#d1d5db", // default gray border
        buttonBg: "bg-primary text-primary-foreground hover:bg-primary/90"
      };
    }
  };

  const renderBudgetSubcategories = (subcategories: Subcategory[], type: string) => {
    const style = getCategoryStyle(type.toLowerCase());
    
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-3">{type.toUpperCase()}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {subcategories.map((subcategory) => (
              <div key={subcategory.id} className="border border-gray-300 rounded-sm p-2 flex items-center justify-between">
                <div className="font-medium text-sm truncate mr-2">{subcategory.name}</div>
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <Input
                    value={budgetAmounts[subcategory.id] || ''}
                    onChange={(e) => handleBudgetAmountChange(subcategory.id, e.target.value)}
                    className="w-20 text-right h-8 text-sm rounded-sm number-input"
                    placeholder="0,00"
                    inputMode="decimal"
                  />
                  <Button 
                    size="sm" 
                    onClick={() => saveBudgetAmount(subcategory.id)}
                    className={`h-8 px-2 ${style.buttonBg} rounded-sm`}
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
    <div className="grid grid-cols-1 gap-6 animate-slide-in max-w-screen-xl mx-auto px-4 sm:px-8 w-full mt-8">
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
              <div className="space-y-6">
                {budgetGroups.income.length > 0 && (
                  <>
                    {renderBudgetSubcategories(budgetGroups.income, "income")}
                    <Separator className="my-4" />
                  </>
                )}
                {budgetGroups.expense.length > 0 && (
                  <>
                    {renderBudgetSubcategories(budgetGroups.expense, "expense")}
                    <Separator className="my-4" />
                  </>
                )}
                {budgetGroups.financing.length > 0 && (
                  renderBudgetSubcategories(budgetGroups.financing, "financing")
                )}
              </div>
            ) : (
              <CategoryCard
                title={getCategoryDisplayName(category.id)}
                subcategories={category.subcategories.sort((a, b) => a.name.localeCompare(b.name))}
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
                    : category.id === "noteTask" 
                    ? "EVENT TYPES FOR AGENDA" // Updated description for EVENT tab
                    : undefined
                }
                categoryStyle={getCategoryStyle(category.id)}
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
