
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AgendaEvent, Subcategory } from "@/types";
import AgendaEventForm from "./AgendaEventForm";

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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editingEvent ? "Edit Event" : "Add New Event"}
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
