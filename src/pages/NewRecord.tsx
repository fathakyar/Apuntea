
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scan, PenLine, Waves } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RecordType } from "@/types";
import ScanRecord from "@/components/records/ScanRecord";
import ManualRecord from "@/components/records/ManualRecord";

const NewRecord = () => {
  const [entryMethod, setEntryMethod] = useState<"scan" | "manual">("scan");
  const [recordType, setRecordType] = useState<RecordType>("expense");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Wave background decorations */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-5">
        <div className="absolute top-0 left-0 w-full h-80 bg-wave-pattern animate-wave"></div>
        <div className="absolute bottom-0 left-0 w-full h-80 bg-wave-pattern animate-wave"></div>
      </div>

      {/* Gradient decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-gold rounded-full opacity-20 blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-purple rounded-full opacity-10 blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto p-6 max-w-5xl relative z-10">
        <h1 className="text-3xl font-bold mb-6 text-apuntea-purple flex items-center gap-2">
          <div className="h-8 w-1 bg-apuntea-gold rounded-sm"></div>
          +NEW RECORD
        </h1>

        <div className="grid gap-6">
          <Tabs defaultValue="expense" className="w-full" onValueChange={(value) => setRecordType(value as RecordType)}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger 
                value="income" 
                className="data-[state=active]:bg-apuntea-gold data-[state=active]:text-black"
              >
                Income
              </TabsTrigger>
              <TabsTrigger 
                value="expense" 
                className="data-[state=active]:bg-apuntea-purple data-[state=active]:text-white"
              >
                Expense
              </TabsTrigger>
              <TabsTrigger 
                value="financing" 
                className="data-[state=active]:bg-apuntea-dark data-[state=active]:text-white"
              >
                Financing
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid md:grid-cols-2 gap-6">
            <Card
              className={`cursor-pointer transition-all hover:border-primary glass-card ${
                entryMethod === "scan" ? "border-primary" : ""
              }`}
              onClick={() => setEntryMethod("scan")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scan className="h-5 w-5" />
                  Scan with Quick +New Record
                </CardTitle>
                <CardDescription>
                  Simply scan your document with Apuntea OCR technology. Record information will appear on your screen.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className={`cursor-pointer transition-all hover:border-primary glass-card ${
                entryMethod === "manual" ? "border-primary" : ""
              }`}
              onClick={() => setEntryMethod("manual")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PenLine className="h-5 w-5" />
                  Manual Entry New Record
                </CardTitle>
                <CardDescription>
                  Enter your record information without uploading a document. Add your document later if you wish.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-6">
            {entryMethod === "scan" ? (
              <ScanRecord recordType={recordType} />
            ) : (
              <ManualRecord recordType={recordType} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRecord;
