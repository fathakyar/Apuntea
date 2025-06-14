
import React from "react";
import PublicLayout from "@/components/PublicLayout";
import { Separator } from "@/components/ui/separator";
import { translations } from "@/utils/translations";

const Privacy: React.FC = () => {
  const t = translations.en;
  
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{t.privacyStatement}</h1>
        <Separator className="mb-6" />
        
        <div className="prose max-w-none">
          <p className="mb-4">
            {t.privacyIntro}
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">{t.dataCollection}</h2>
          <p className="mb-4">
            {t.dataCollectionText}
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">{t.dataUse}</h2>
          <p className="mb-4">
            {t.dataUseText}
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">{t.dataSecurity}</h2>
          <p className="mb-4">
            {t.dataSecurityText}
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">{t.cookiePolicy}</h2>
          <p className="mb-4">
            {t.cookieIntro}
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">{t.contactUs}</h2>
          <p className="mb-4">
            {t.contactInfoText}
          </p>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Privacy;
