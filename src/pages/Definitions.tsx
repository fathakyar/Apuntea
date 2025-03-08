
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { useDefinitions } from "@/contexts/DefinitionsContext";
import CategoryCard from "@/components/definitions/CategoryCard";
import CurrencySelector from "@/components/definitions/CurrencySelector";
import { Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-6 animate-slide-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1 flex items-center">
              <Settings className="mr-2 h-6 w-6" />
              Tanımlamalar
            </h1>
            <p className="text-muted-foreground">
              Sistem içindeki kategori ve alt kategori tanımlamalarını yönetin
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
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <CategoryCard
                title={category.name}
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
                    ? "GELİR ve GİDER kategorileri ile otomatik olarak senkronize edilir"
                    : undefined
                }
              />
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-4">
          <CurrencySelector 
            currencies={currencies}
            onToggle={toggleCurrencySelection}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Definitions;
