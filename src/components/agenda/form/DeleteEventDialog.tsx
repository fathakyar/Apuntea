
import React from "react";
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

interface DeleteEventDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  getLabel: (key: string) => string;
}

const DeleteEventDialog: React.FC<DeleteEventDialogProps> = ({
  isOpen,
  onOpenChange,
  onDelete,
  getLabel,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
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
            onClick={onDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-sm"
          >
            {getLabel("delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEventDialog;
