
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";

const Privacy = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="grid grid-cols-1 gap-6 animate-slide-in p-6">
      <h1 className="text-3xl font-bold">{t.privacyStatement}</h1>
      
      <Card className="rounded-sm">
        <CardHeader>
          <CardTitle>{t.privacyStatement}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{t.privacyIntro}</p>
          
          <h2 className="text-xl font-semibold mt-6">{t.dataCollection}</h2>
          <p>{t.dataCollectionText}</p>
          
          <h2 className="text-xl font-semibold mt-6">{t.dataUse}</h2>
          <p>{t.dataUseText}</p>
          
          <h2 className="text-xl font-semibold mt-6">{t.dataSecurity}</h2>
          <p>{t.dataSecurityText}</p>
          
          <h2 className="text-xl font-semibold mt-6">{t.contactInfo}</h2>
          <p>{t.contactInfoText}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Privacy;
