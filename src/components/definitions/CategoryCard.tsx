import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, X, Info } from "lucide-react";
import { Subcategory } from "@/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { translations } from "@/utils/translations";

interface CategoryCardProps {
  title: string;
  description?: string;
  subcategories: Subcategory[];
  editable: boolean;
  onAdd: (name: string) => void;
  onUpdate: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  subcategories,
  editable,
  onAdd,
  onUpdate,
  onDelete
}) => {
  const [newSubcategory, setNewSubcategory] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const t = translations.en;

  // Sort subcategories alphabetically by name
  const sortedSubcategories = [...subcategories].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  const handleAdd = () => {
    if (newSubcategory.trim()) {
      // Convert to uppercase before adding
      onAdd(newSubcategory.trim().toUpperCase());
      setNewSubcategory("");
    }
  };

  const startEditing = (subcategory: Subcategory) => {
    setEditingId(subcategory.id);
    setEditValue(subcategory.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditValue("");
  };

  const saveEdit = (id: string) => {
    if (editValue.trim()) {
      // Convert to uppercase before updating
      onUpdate(id, editValue.trim().toUpperCase());
      setEditingId(null);
      setEditValue("");
    }
  };

  // Auto convert input to uppercase
  const handleNewSubcategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSubcategory(e.target.value.toUpperCase());
  };

  const handleEditValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value.toUpperCase());
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{title}</CardTitle>
          {!editable && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Info className="h-5 w-5 text-muted-foreground" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This category is automatically updated</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Subcategories list */}
          <div className="flex flex-wrap gap-2">
            {sortedSubcategories.map((subcategory) => (
              <div key={subcategory.id} className="relative">
                {editingId === subcategory.id ? (
                  <div className="flex items-center space-x-1">
                    <Input
                      value={editValue}
                      onChange={handleEditValueChange}
                      className="h-8 min-w-40 text-sm"
                      autoFocus
                    />
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0" 
                      onClick={() => saveEdit(subcategory.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0" 
                      onClick={cancelEditing}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Badge 
                    variant="outline" 
                    className="px-3 py-1 h-auto text-sm flex items-center gap-1 group"
                  >
                    {subcategory.name}
                    {editable && (
                      <div className="flex items-center">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-5 w-5 p-0 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" 
                          onClick={() => startEditing(subcategory)}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-5 w-5 p-0 ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-red-500" 
                          onClick={() => onDelete(subcategory.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </Badge>
                )}
              </div>
            ))}
          </div>
          
          {/* Add new subcategory form */}
          {editable && (
            <div className="flex items-center space-x-2 mt-4">
              <Input
                value={newSubcategory}
                onChange={handleNewSubcategoryChange}
                placeholder={t.newSubcategory || "New subcategory"}
                className="h-9"
              />
              <Button 
                size="sm" 
                onClick={handleAdd}
                disabled={!newSubcategory.trim()}
                className="whitespace-nowrap"
              >
                <Plus className="h-4 w-4 mr-1" />
                {t.add || "Add"}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
