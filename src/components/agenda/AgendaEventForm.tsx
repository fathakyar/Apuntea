
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";
import { AgendaEvent, Subcategory } from "@/types";

// Import extracted components
import EventTypeToggle from "./form/EventTypeToggle";
import ImportanceToggle from "./form/ImportanceToggle";
import EventDatePicker from "./form/EventDatePicker";
import DeleteEventDialog from "./form/DeleteEventDialog";
import EventFormActions from "./form/EventFormActions";

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
    subcategoryId: subcategories[0]?.id || "",
    date: format(new Date(), "yyyy-MM-dd"),
    importance: ""
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
    // Only English labels now
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

      <EventTypeToggle 
        value={formData.type} 
        onChange={handleTypeChange} 
        getLabel={getLabel} 
      />

      <ImportanceToggle 
        value={formData.importance} 
        onChange={handleImportanceChange} 
        getLabel={getLabel} 
      />

      <EventDatePicker 
        date={date} 
        onChange={handleDateChange} 
        getLabel={getLabel} 
      />

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

      <EventFormActions 
        isEditing={!!event} 
        onCancel={onCancel} 
        onDelete={() => setIsDeleteAlertOpen(true)} 
        getLabel={getLabel} 
      />

      <DeleteEventDialog 
        isOpen={isDeleteAlertOpen} 
        onOpenChange={setIsDeleteAlertOpen} 
        onDelete={handleDelete} 
        getLabel={getLabel} 
      />
    </form>
  );
};

export default AgendaEventForm;
