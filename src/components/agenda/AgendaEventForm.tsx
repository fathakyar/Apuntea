
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Trash2, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";
import { AgendaEvent, Subcategory } from "@/types";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface AgendaEventFormProps {
  event: AgendaEvent | null;
  onSubmit: (event: AgendaEvent | Omit<AgendaEvent, "id">) => void;
  onDelete?: (eventId: string) => void;
  onCancel: () => void;
  subcategories: Subcategory[];
  selectedDate: Date | null;
}

const AgendaEventForm: React.FC<AgendaEventFormProps> = ({
  event,
  onSubmit,
  onDelete,
  onCancel,
  subcategories,
  selectedDate
}) => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const [formData, setFormData] = useState<Omit<AgendaEvent, "id"> & { id?: string }>({
    title: "",
    description: "",
    type: "NOT",
    importance: "",
    date: format(new Date(), "yyyy-MM-dd"),
    subcategoryId: subcategories[0]?.id || "",
  });
  
  const [date, setDate] = useState<Date | undefined>(
    selectedDate || new Date()
  );
  
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  useEffect(() => {
    if (event) {
      setFormData({
        ...event
      });
      setDate(new Date(event.date));
    } else if (selectedDate) {
      setDate(selectedDate);
      setFormData(prev => ({
        ...prev,
        date: format(selectedDate, "yyyy-MM-dd")
      }));
    }
  }, [event, selectedDate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.toUpperCase() }));
  };

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleImportanceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, importance: value }));
  };

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setFormData((prev) => ({
        ...prev,
        date: format(newDate, "yyyy-MM-dd")
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id);
    }
  };

  // Translation helper for form labels
  const getLabel = (key: string) => {
    if (language === "tr") {
      switch(key) {
        case "title": return "BAŞLIK";
        case "type": return "TÜR";
        case "importance": return "ÖNEM";
        case "date": return "TARİH";
        case "description": return "AÇIKLAMA";
        case "cancel": return "İPTAL";
        case "add": return "EKLE";
        case "update": return "GÜNCELLE";
        case "delete": return "SİL";
        case "deleteConfirmTitle": return "Bu etkinliği silmek istediğinizden emin misiniz?";
        case "deleteConfirmDesc": return "Bu işlem geri alınamaz. Etkinlik tamamen silinecektir.";
        case "note": return "NOT";
        case "task": return "GÖREV";
        default: return key;
      }
    }
    
    // English labels
    switch(key) {
      case "title": return "TITLE";
      case "type": return "TYPE";
      case "importance": return "IMPORTANCE";
      case "date": return "DATE";
      case "description": return "DESCRIPTION";
      case "cancel": return "CANCEL";
      case "add": return "ADD";
      case "update": return "UPDATE";
      case "delete": return "DELETE";
      case "deleteConfirmTitle": return "Are you sure you want to delete this event?";
      case "deleteConfirmDesc": return "This action cannot be undone. The event will be permanently deleted.";
      case "note": return "NOTE";
      case "task": return "TASK";
      default: return key;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">{getLabel("title")}</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder={getLabel("title")}
          required
          className="rounded-sm"
        />
      </div>

      <div className="space-y-2">
        <Label>{getLabel("type")}</Label>
        <ToggleGroup type="single" value={formData.type} onValueChange={handleTypeChange} className="justify-start">
          <ToggleGroupItem value="NOT" className="data-[state=on]:bg-blue-500 data-[state=on]:text-white">
            {getLabel("note")}
          </ToggleGroupItem>
          <ToggleGroupItem value="GÖREV" className="data-[state=on]:bg-green-500 data-[state=on]:text-white">
            {getLabel("task")}
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <Label>{getLabel("importance")}</Label>
        <ToggleGroup type="single" value={formData.importance} onValueChange={handleImportanceChange} className="justify-start">
          <ToggleGroupItem value="!" className="data-[state=on]:bg-yellow-500 data-[state=on]:text-white">
            <AlertTriangle className="h-4 w-4 mr-1" />
            !
          </ToggleGroupItem>
          <ToggleGroupItem value="!!" className="data-[state=on]:bg-orange-500 data-[state=on]:text-white">
            <AlertTriangle className="h-4 w-4 mr-1" />
            !!
          </ToggleGroupItem>
          <ToggleGroupItem value="!!!" className="data-[state=on]:bg-red-500 data-[state=on]:text-white">
            <AlertTriangle className="h-4 w-4 mr-1" />
            !!!
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">{getLabel("date")}</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal rounded-sm",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>{getLabel("date")}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">{getLabel("description")}</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder={getLabel("description")}
          rows={4}
          className="rounded-sm"
        />
      </div>

      <div className="flex justify-between pt-2">
        <div>
          {event && onDelete && (
            <Button
              type="button"
              variant="outline"
              className="text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-sm"
              onClick={() => setIsDeleteAlertOpen(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {getLabel("delete")}
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onCancel} className="rounded-sm">
            {getLabel("cancel")}
          </Button>
          <Button type="submit" className="rounded-sm">
            {event ? getLabel("update") : getLabel("add")}
          </Button>
        </div>
      </div>

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{getLabel("deleteConfirmTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {getLabel("deleteConfirmDesc")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-sm">{getLabel("cancel")}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-sm"
            >
              {getLabel("delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
};

export default AgendaEventForm;
