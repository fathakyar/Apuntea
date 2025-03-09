
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-6 animate-slide-in">
        <h1 className="text-3xl font-bold">{t.contactUs}</h1>
        
        <Card className="rounded-sm">
          <CardHeader>
            <CardTitle>{t.contactUs}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Page content coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Contact;
