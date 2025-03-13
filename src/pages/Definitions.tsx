
import React, { useState } from "react";
import { useDefinitions } from "@/contexts/DefinitionsContext";
import CategoryCard from "@/components/definitions/CategoryCard";
import CurrencySelector from "@/components/definitions/CurrencySelector";
import { Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";

const Definitions = () => {
  const { 
    categories, 
    currencies,
    addSubcategory, 
    updateSubcategory,
    deleteSubcategory,
    toggleCurrencySelection
  } = useDefinitions();
  
  const [activeTab, setActiveTab] = useState(categories[0]?.id || "");
  const { language } = useLanguage();
  const t = translations[language];

  // Group budget subcategories by income and expense
  const getBudgetSubcategoryGroups = () => {
    const budgetCategory = categories.find(c => c.id === "budget");
    const incomeCategory = categories.find(c => c.id === "income");
    const expenseCategory = categories.find(c => c.id === "expense");
    
    if (!budgetCategory || !incomeCategory || !expenseCategory) return { income: [], expense: [] };
    
    const incomeSubcategories = incomeCategory.subcategories.map(sub => sub.id);
    
    return {
      income: budgetCategory.subcategories.filter(sub => 
        incomeSubcategories.includes(sub.id)
      ),
      expense: budgetCategory.subcategories.filter(sub => 
        !incomeSubcategories.includes(sub.id)
      )
    };
  };
  
  const budgetGroups = getBudgetSubcategoryGroups();

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
              <div className="space-y-6">
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-4">INCOME</h3>
                  <div className="flex flex-wrap gap-2">
                    {budgetGroups.income.map((subcategory) => (
                      <div key={subcategory.id} className="relative">
                        <div className="px-3 py-1 border rounded-md text-sm">
                          {subcategory.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">EXPENSE</h3>
                  <div className="flex flex-wrap gap-2">
                    {budgetGroups.expense.map((subcategory) => (
                      <div key={subcategory.id} className="relative">
                        <div className="px-3 py-1 border rounded-md text-sm">
                          {subcategory.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
