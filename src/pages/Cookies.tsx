
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";

const Cookies = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="grid grid-cols-1 gap-6 animate-slide-in p-6">
      <h1 className="text-3xl font-bold">{t.cookiePolicy}</h1>
      
      <Card className="rounded-sm">
        <CardHeader>
          <CardTitle>{t.cookiePolicy}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{t.cookieIntro}</p>
          
          <h2 className="text-xl font-semibold mt-6">{t.whatAreCookies}</h2>
          <p>{t.whatAreCookiesText}</p>
          
          <h2 className="text-xl font-semibold mt-6">{t.cookieTypes}</h2>
          <p>{t.cookieTypesText}</p>
          
          <h2 className="text-xl font-semibold mt-6">{t.cookieControl}</h2>
          <p>{t.cookieControlText}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cookies;
