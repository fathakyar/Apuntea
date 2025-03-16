
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, X, Trash2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { RecordType } from "@/types";

interface RecordFormActionsProps {
  onCancel?: () => void;
  onDelete?: () => void;
  recordType?: RecordType;
  isEditing?: boolean;
}

const RecordFormActions: React.FC<RecordFormActionsProps> = ({ 
  onCancel, 
  onDelete,
  recordType = "expense",
  isEditing = false
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate("/records");
    }
  };

  // Determine button style based on record type
  const getButtonStyle = () => {
    switch (recordType) {
      case "income":
        return "bg-apuntea-gold text-black hover:bg-apuntea-gold/90";
      case "expense":
        return "bg-apuntea-purple text-white hover:bg-apuntea-purple/90";
      case "financing":
        return "bg-apuntea-dark text-white hover:bg-apuntea-dark/90";
      default:
        return "";
    }
  };

  return (
    <div className="flex justify-between gap-4 pt-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={handleCancel}
        className="uppercase"
      >
        <X className="w-4 h-4 mr-2" />
        CANCEL
      </Button>
      
      <div className="flex gap-2">
        {isEditing && onDelete && (
          <Button 
            type="button" 
            variant="outline"
            onClick={onDelete}
            className="uppercase text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            DELETE
          </Button>
        )}
        
        <Button 
          type="submit" 
          className={`uppercase ${getButtonStyle()}`}
        >
          <Save className="w-4 h-4 mr-2" />
          SAVE RECORD
        </Button>
      </div>
    </div>
  );
};

export default RecordFormActions;
