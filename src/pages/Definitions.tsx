
import React from "react";
import Layout from "@/components/Layout";
import { useDefinitions } from "@/contexts/DefinitionsContext";
import CategoryCard from "@/components/definitions/CategoryCard";
import CurrencySelector from "@/components/definitions/CurrencySelector";
import { Settings } from "lucide-react";

const Definitions = () => {
  const { 
    categories, 
    currencies,
    addSubcategory, 
    updateSubcategory,
    deleteSubcategory,
    toggleCurrencySelection
  } = useDefinitions();

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
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
          ))}
        </div>

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
