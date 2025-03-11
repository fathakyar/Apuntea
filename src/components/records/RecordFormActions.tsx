
import React from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

const RecordFormActions: React.FC = () => {
  return (
    <div className="flex justify-end pt-4">
      <Button type="submit" className="w-full md:w-auto">
        <Save className="w-4 h-4 mr-2" />
        Save Record
      </Button>
    </div>
  );
};

export default RecordFormActions;
