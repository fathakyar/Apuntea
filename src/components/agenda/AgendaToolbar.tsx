
import React from "react";
import { CalendarIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import AddButtons from "./AddButtons";

type AgendaFilter = "all" | "note" | import("@/types").RecordType;

const isValidAgendaFilter = (v: string): v is AgendaFilter =>
  ["all", "note", "income", "expense", "financing"].includes(v);

type AgendaToolbarProps = {
  selectedDate: Date;
  activeFilter: AgendaFilter;
  setActiveFilter: (v: AgendaFilter) => void;
  handleAddNote: () => void;
  handleAddRecord: () => void;
  onDateSelect: (date: Date) => void;
  t: any;
};

function AgendaToolbar({
  selectedDate,
  activeFilter,
  setActiveFilter,
  handleAddNote,
  handleAddRecord,
  onDateSelect,
  t,
}: AgendaToolbarProps) {
  const handleTabChange = (v: string) => {
    if (isValidAgendaFilter(v)) setActiveFilter(v);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold mb-1 flex items-center">
          <CalendarIcon className="mr-2 h-7 w-7" />
          {t.agenda}
        </h1>
        <p className="text-muted-foreground">
          {t.manageEventsAndReminders || "Manage events and reminders"}
        </p>
        <h2 className="text-xl font-semibold">
          {format(selectedDate, "dd MMMM yyyy, EEEE")}
        </h2>
      </div>
      <div className="flex flex-col items-end space-y-2">
        <Tabs value={activeFilter} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="all">ALL</TabsTrigger>
            <TabsTrigger value="income">INCOME</TabsTrigger>
            <TabsTrigger value="expense">EXPENSE</TabsTrigger>
            <TabsTrigger value="financing">FINANCING</TabsTrigger>
            <TabsTrigger value="note">NOTES</TabsTrigger>
          </TabsList>
        </Tabs>
        <AddButtons onAddNote={handleAddNote} onAddRecord={handleAddRecord} />
      </div>
    </div>
  );
}

export default AgendaToolbar;
