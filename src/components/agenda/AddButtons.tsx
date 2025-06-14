
import React from "react";
import { Plus } from "lucide-react";

interface AddButtonsProps {
  onAddNote: () => void;
  onAddRecord: () => void;
}
const AddButtons: React.FC<AddButtonsProps> = ({ onAddNote, onAddRecord }) => (
  <div className="flex space-x-2">
    <button
      onClick={onAddRecord}
      className="bg-apuntea-purple text-white rounded-md px-4 py-2 flex items-center gap-2 hover:bg-apuntea-purple/90 transition-colors"
    >
      <Plus size={18} />
      RECORD
    </button>
    <button
      onClick={onAddNote}
      className="bg-apuntea-gold text-black rounded-md px-4 py-2 flex items-center gap-2 hover:bg-apuntea-gold/90 transition-colors"
    >
      <Plus size={18} />
      NOTE
    </button>
  </div>
);
export default AddButtons;
