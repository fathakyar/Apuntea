
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RecordFormActionsProps {
  onCancel?: () => void;
}

const RecordFormActions: React.FC<RecordFormActionsProps> = ({ onCancel }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate("/records");
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
      <Button type="submit" className="w-full md:w-auto">
        <Save className="w-4 h-4 mr-2" />
        Save Record
      </Button>
    </div>
  );
};

export default RecordFormActions;
