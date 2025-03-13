
import React from "react";
import { Calendar, FileText, LineChart } from "lucide-react";
import { translations } from "@/utils/translations";

export const useNavigationConfig = () => {
  const t = translations.en;

  const navigationItems = [
    { name: t.agenda, path: "/agenda", icon: <Calendar className="h-5 w-5" /> },
    { name: t.records, path: "/records", icon: <FileText className="h-5 w-5" /> },
    { name: ".BI", path: "/bi", icon: <LineChart className="h-5 w-5" /> },
  ];

  return { navigationItems };
};
