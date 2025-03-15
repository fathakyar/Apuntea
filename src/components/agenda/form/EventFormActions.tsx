
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface EventFormActionsProps {
  isEditing: boolean;
  onCancel: () => void;
  onDelete: () => void;
  getLabel: (key: string) => string;
}

const EventFormActions: React.FC<EventFormActionsProps> = ({
  isEditing,
  onCancel,
  onDelete,
  getLabel,
}) => {
  return (
    <div className="flex justify-end pt-2">
      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={onCancel} className="rounded-sm uppercase">
          {getLabel("cancel")}
        </Button>
        {isEditing && (
          <Button
            type="button"
            variant="outline"
            className="text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-sm uppercase"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {getLabel("delete")}
          </Button>
        )}
        <Button type="submit" className="rounded-sm uppercase">
          {isEditing ? getLabel("update") : getLabel("add")}
        </Button>
      </div>
    </div>
  );
};

export default EventFormActions;
