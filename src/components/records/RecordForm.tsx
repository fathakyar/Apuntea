
import React from "react";
import { RecordType } from "@/types";
import RecordFormFields from "./RecordFormFields";
import RecordFormActions from "./RecordFormActions";
import { useRecordForm, RecordFormData } from "@/hooks/useRecordForm";

interface RecordFormProps {
  initialData?: RecordFormData;
  recordType: RecordType;
  onSubmit?: (data: RecordFormData) => void;
}

const RecordForm: React.FC<RecordFormProps> = ({ initialData, recordType, onSubmit }) => {
  const { formData, setFormData, handleSubmit } = useRecordForm(initialData, recordType, onSubmit);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <RecordFormFields 
        formData={formData} 
        setFormData={setFormData} 
        recordType={recordType}
      />
      <RecordFormActions recordType={recordType} />
    </form>
  );
};

export default RecordForm;
