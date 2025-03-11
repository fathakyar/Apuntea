
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RecordType } from "@/types";

interface RecordFormActionsProps {
  onCancel?: () => void;
  recordType?: RecordType;
}

const RecordFormActions: React.FC<RecordFormActionsProps> = ({ onCancel, recordType = "expense" }) => {
  const navigate = useNavigate();

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
        className="w-full md:w-auto"
      >
        <X className="w-4 h-4 mr-2" />
        Cancel
      </Button>
      <Button 
        type="submit" 
        className={`w-full md:w-auto ${getButtonStyle()}`}
      >
        <Save className="w-4 h-4 mr-2" />
        Save Record
      </Button>
    </div>
  );
};

export default RecordFormActions;
