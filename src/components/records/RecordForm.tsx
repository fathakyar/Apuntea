
import React from "react";
import { RecordType } from "@/types";
import RecordFormFields from "./RecordFormFields";
import RecordFormActions from "./RecordFormActions";
import { useRecordForm, RecordFormData } from "@/hooks/useRecordForm";

interface RecordFormProps {
  initialData?: RecordFormData;
  recordType: RecordType;
  onSubmit?: (data: RecordFormData) => void;
  onDelete?: () => void;
  isEditing?: boolean;
}

const RecordForm: React.FC<RecordFormProps> = ({ 
  initialData, 
  recordType, 
  onSubmit,
  onDelete,
  isEditing = false
}) => {
  const { formData, setFormData, handleSubmit } = useRecordForm(initialData, recordType, onSubmit);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <RecordFormFields 
        formData={formData} 
        setFormData={setFormData} 
        recordType={recordType}
      />
      <RecordFormActions 
        recordType={recordType} 
        onDelete={onDelete}
        isEditing={isEditing}
      />
    </form>
  );
};

export default RecordForm;
