
import React from "react";
import { CalendarIcon, Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

const AgendaToolbar = ({
  selectedDate,
  activeFilter,
  setActiveFilter,
  handleAddNote,
  handleAddRecord,
  onDateSelect,
  t
}: {
  selectedDate: Date;
  activeFilter: string;
  setActiveFilter: (v: string) => void;
  handleAddNote: () => void;
  handleAddRecord: () => void;
  onDateSelect: (date: Date) => void;
  t: any;
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 className="text-3xl font-bold mb-1 flex items-center">
        <CalendarIcon className="mr-2 h-7 w-7" />
        {t.agenda}
      </h1>
      <p className="text-muted-foreground">{t.manageEventsAndReminders || "Manage events and reminders"}</p>
      <h2 className="text-xl font-semibold">{format(selectedDate, 'dd MMMM yyyy, EEEE')}</h2>
    </div>
    <div className="flex flex-col items-end space-y-2">
      <Tabs value={activeFilter} onValueChange={(v) => setActiveFilter(v as "all" | "note" | import("@/types").RecordType)}>
        <TabsList>
          <TabsTrigger value="all">ALL</TabsTrigger>
          <TabsTrigger value="income">INCOME</TabsTrigger>
          <TabsTrigger value="expense">EXPENSE</TabsTrigger>
          <TabsTrigger value="financing">FINANCING</TabsTrigger>
          <TabsTrigger value="note">NOTES</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex space-x-2">
        <button
          onClick={handleAddRecord}
          className="bg-apuntea-purple text-white rounded-md px-4 py-2 flex items-center gap-2 hover:bg-apuntea-purple/90 transition-colors"
        >
          <Plus size={18} />
          RECORD
        </button>
        <button
          onClick={handleAddNote}
          className="bg-apuntea-gold text-black rounded-md px-4 py-2 flex items-center gap-2 hover:bg-apuntea-gold/90 transition-colors"
        >
          <Plus size={18} />
          NOTE
        </button>
      </div>
    </div>
  </div>
);
export default AgendaToolbar;
