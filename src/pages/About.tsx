
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="grid grid-cols-1 gap-6 animate-slide-in">
      <h1 className="text-3xl font-bold">{t.aboutApuntea}</h1>
      
      <Card className="rounded-sm">
        <CardHeader>
          <CardTitle>{t.aboutApuntea}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Page content coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
