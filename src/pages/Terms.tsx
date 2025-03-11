
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";

const Terms = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="grid grid-cols-1 gap-6 animate-slide-in p-6">
      <h1 className="text-3xl font-bold">{t.termsConditions}</h1>
      
      <Card className="rounded-sm">
        <CardHeader>
          <CardTitle>{t.termsConditions}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{t.termsIntro}</p>
          
          <h2 className="text-xl font-semibold mt-6">{t.services}</h2>
          <p>{t.servicesText}</p>
          
          <h2 className="text-xl font-semibold mt-6">{t.userObligations}</h2>
          <p>{t.userObligationsText}</p>
          
          <h2 className="text-xl font-semibold mt-6">{t.intellectualProperty}</h2>
          <p>{t.intellectualPropertyText}</p>
          
          <h2 className="text-xl font-semibold mt-6">{t.termination}</h2>
          <p>{t.terminationText}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Terms;
