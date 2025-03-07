
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "lucide-react";

const BusinessIntelligence = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 gap-6 animate-slide-in">
        <div>
          <h1 className="text-3xl font-bold mb-1">Business Intelligence</h1>
          <p className="text-muted-foreground">
            Analytics and insights for your invoice data
          </p>
        </div>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Business Intelligence Dashboard</CardTitle>
              <CardDescription>
                This feature will be available soon
              </CardDescription>
            </div>
            <LineChart className="h-8 w-8 text-primary opacity-70" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-center max-w-md">
                <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">
                  The Business Intelligence dashboard is currently under development. 
                  Soon you'll be able to visualize and analyze your invoice data with 
                  charts, trends, and insights.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default BusinessIntelligence;
