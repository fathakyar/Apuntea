
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AgendaEvent, Subcategory } from "@/types";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Trash2 } from "lucide-react";
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
  const [formData, setFormData] = useState<Omit<AgendaEvent, "id"> & { id?: string }>({
    title: "",
    description: "",
    type: "NOT",
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

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Başlık</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Başlık giriniz"
          required
          className="rounded-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Tür</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => handleSelectChange("type", value)}
          >
            <SelectTrigger id="type" className="rounded-sm">
              <SelectValue placeholder="Tür seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NOT">NOT</SelectItem>
              <SelectItem value="GÖREV">GÖREV</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subcategoryId">Alt Kategori</Label>
          <Select
            value={formData.subcategoryId}
            onValueChange={(value) => handleSelectChange("subcategoryId", value)}
          >
            <SelectTrigger id="subcategoryId" className="rounded-sm">
              <SelectValue placeholder="Alt kategori seçiniz" />
            </SelectTrigger>
            <SelectContent>
              {subcategories.map((subcategory) => (
                <SelectItem key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Tarih</Label>
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
              {date ? format(date, "PPP") : <span>Tarih seçiniz</span>}
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
        <Label htmlFor="description">Açıklama</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Açıklama giriniz"
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
              Sil
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onCancel} className="rounded-sm">
            İptal
          </Button>
          <Button type="submit" className="rounded-sm">
            {event ? "Güncelle" : "Ekle"}
          </Button>
        </div>
      </div>

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bu etkinliği silmek istediğinizden emin misiniz?</AlertDialogTitle>
            <AlertDialogDescription>
              Bu işlem geri alınamaz. Etkinlik tamamen silinecektir.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-sm">İptal</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-sm"
            >
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
};

export default AgendaEventForm;
