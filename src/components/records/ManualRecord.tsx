
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecordType } from "@/types";
import RecordForm from "@/components/records/RecordForm";
import { Waves } from "lucide-react";

interface ManualRecordProps {
  recordType: RecordType;
}

const ManualRecord: React.FC<ManualRecordProps> = ({ recordType }) => {
  return (
    <Card className="glass-card border-apuntea-purple/20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -z-10 top-0 left-0 w-full h-full overflow-hidden opacity-5">
        <Waves className="absolute bottom-5 right-5 text-apuntea-gold w-24 h-24" />
        <Waves className="absolute top-5 left-5 text-apuntea-purple w-24 h-24 transform rotate-180" />
        <div className="absolute top-0 left-0 w-full h-12 bg-apuntea-gold/30 transform -skew-y-3"></div>
        <div className="absolute bottom-0 right-0 w-full h-12 bg-apuntea-purple/30 transform skew-y-3"></div>
      </div>
      
      <CardHeader>
        <CardTitle className="text-apuntea-purple flex items-center gap-2">
          <div className="h-6 w-1 bg-apuntea-gold rounded-sm"></div>
          Manual Entry
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RecordForm recordType={recordType} />
      </CardContent>
    </Card>
  );
};

export default ManualRecord;
