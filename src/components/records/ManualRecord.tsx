
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecordType } from "@/types";
import RecordForm from "@/components/records/RecordForm";

interface ManualRecordProps {
  recordType: RecordType;
}

const ManualRecord: React.FC<ManualRecordProps> = ({ recordType }) => {
  return (
    <Card className="glass-card border-apuntea-purple/20">
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
