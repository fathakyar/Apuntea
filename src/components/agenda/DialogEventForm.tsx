
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AgendaEvent, Subcategory } from "@/types";
import AgendaEventForm from "./AgendaEventForm";
import { Wave } from "lucide-react";

interface DialogEventFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedDate: Date | null;
  editingEvent: AgendaEvent | null;
  subcategories: Subcategory[];
  onSubmit: (event: AgendaEvent | Omit<AgendaEvent, "id">) => void;
  onDelete?: (eventId: string) => void;
}

const DialogEventForm: React.FC<DialogEventFormProps> = ({
  isOpen,
  setIsOpen,
  selectedDate,
  editingEvent,
  subcategories,
  onSubmit,
  onDelete
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-white to-apuntea-light border-apuntea-purple/20 animate-scale-in">
        <div className="absolute -z-10 top-0 left-0 w-full h-full overflow-hidden rounded-sm opacity-10">
          <div className="absolute top-0 left-0 w-full h-12 bg-apuntea-gold/30 transform -skew-y-3"></div>
          <div className="absolute bottom-0 right-0 w-full h-12 bg-apuntea-purple/30 transform skew-y-3"></div>
          <Wave className="absolute bottom-5 right-5 text-apuntea-gold/30 w-24 h-24" />
          <Wave className="absolute top-5 left-5 text-apuntea-purple/30 w-24 h-24 transform rotate-180" />
        </div>
        
        <DialogHeader className="relative">
          <DialogTitle className="text-apuntea-purple flex items-center gap-2">
            <div className="h-6 w-1 bg-apuntea-gold rounded-sm"></div>
            {editingEvent ? "EDIT EVENT" : "ADD NEW EVENT"}
          </DialogTitle>
        </DialogHeader>
        
        <AgendaEventForm
          event={editingEvent}
          onSubmit={onSubmit}
          onDelete={editingEvent ? onDelete : undefined}
          subcategories={subcategories}
          selectedDate={selectedDate}
          onCancel={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DialogEventForm;
