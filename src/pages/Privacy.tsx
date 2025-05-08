
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
            {t.privacyInfo}
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">{t.dataCollection}</h2>
          <p className="mb-4">
            {t.dataCollectionInfo}
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">{t.dataUsage}</h2>
          <p className="mb-4">
            {t.dataUsageInfo}
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">{t.dataSharing}</h2>
          <p className="mb-4">
            {t.dataSharingInfo}
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">{t.dataSecurity}</h2>
          <p className="mb-4">
            {t.dataSecurityInfo}
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">{t.cookies}</h2>
          <p className="mb-4">
            {t.cookiesInfo}
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">{t.changes}</h2>
          <p className="mb-4">
            {t.changesInfo}
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">{t.contact}</h2>
          <p className="mb-4">
            {t.contactInfo}
          </p>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Privacy;
