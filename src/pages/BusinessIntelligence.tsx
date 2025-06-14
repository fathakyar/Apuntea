
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, BarChart, AreaChart, PieChart } from "@/components/ui/charts";

const BusinessIntelligence = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="grid grid-cols-1 gap-6 animate-slide-in max-w-screen-xl px-4 sm:px-8 mx-auto w-full mt-8">
      <div>
        <h1 className="text-3xl font-bold mb-1">{t.businessIntelligence || "Business Intelligence"}</h1>
        <p className="text-muted-foreground">
          {t.analyticsAndInsights || "Analytics and insights for your business"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>{t.revenueOverview || "Revenue Overview"}</CardTitle>
            <CardDescription>
              {t.monthlyRevenueTrends || "Monthly revenue trends"}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <LineChart 
              data={[
                { month: "Jan", revenue: 2400 },
                { month: "Feb", revenue: 1398 },
                { month: "Mar", revenue: 9800 },
                { month: "Apr", revenue: 3908 },
                { month: "May", revenue: 4800 },
                { month: "Jun", revenue: 3800 },
              ]}
              index="month"
              categories={["revenue"]}
              colors={["#8884d8"]}
            />
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>{t.expenseBreakdown || "Expense Breakdown"}</CardTitle>
            <CardDescription>
              {t.expensesByCategory || "Expenses by category"}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <PieChart
              data={[
                { name: t.office || "Office", value: 400 },
                { name: t.salary || "Salary", value: 300 },
                { name: t.marketing || "Marketing", value: 300 },
                { name: t.travel || "Travel", value: 200 },
                { name: t.other || "Other", value: 100 },
              ]}
              index="name"
              categories={["value"]}
              colors={["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"]}
            />
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>{t.salesByProduct || "Sales by Product"}</CardTitle>
            <CardDescription>
              {t.quarterlyProductSales || "Quarterly product sales"}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <BarChart
              data={[
                { quarter: "Q1", productA: 4000, productB: 2400 },
                { quarter: "Q2", productA: 3000, productB: 1398 },
                { quarter: "Q3", productA: 2000, productB: 9800 },
                { quarter: "Q4", productA: 2780, productB: 3908 },
              ]}
              index="quarter"
              categories={["productA", "productB"]}
              colors={["#8884d8", "#82ca9d"]}
            />
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>{t.customerGrowth || "Customer Growth"}</CardTitle>
            <CardDescription>
              {t.monthlyNewCustomers || "Monthly new customer acquisition"}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <AreaChart
              data={[
                { month: "Jan", customers: 40 },
                { month: "Feb", customers: 30 },
                { month: "Mar", customers: 20 },
                { month: "Apr", customers: 27 },
                { month: "May", customers: 18 },
                { month: "Jun", customers: 23 },
                { month: "Jul", customers: 34 },
              ]}
              index="month"
              categories={["customers"]}
              colors={["#8884d8"]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessIntelligence;
