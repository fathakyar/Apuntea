
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const Agenda = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 gap-6 animate-slide-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Ajanda</h1>
            <p className="text-muted-foreground">
              Etkinlikleri ve hatırlatmaları düzenleme
            </p>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl">Ajanda</CardTitle>
            <CardDescription>
              Bu özellik yakında kullanıma sunulacaktır.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center py-10">
            <div className="text-center">
              <Calendar className="h-16 w-16 mx-auto text-muted-foreground" />
              <p className="mt-4 text-lg font-medium">Bu bölüm üzerinde çalışıyoruz</p>
              <p className="text-muted-foreground mt-2">
                Ajanda özelliği yakında kullanıma sunulacaktır.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Agenda;
