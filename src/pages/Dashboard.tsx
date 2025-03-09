
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getInvoices, formatCurrency } from "@/utils/invoiceUtils";
import { Upload, FileText, Calculator, Calendar } from "lucide-react";
import { Invoice } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";

const Dashboard = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [stats, setStats] = useState({
    totalInvoices: 0,
    totalAmount: 0,
    recentInvoices: 0,
  });
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const fetchedInvoices = getInvoices();
    setInvoices(fetchedInvoices);
    
    // Calculate statistics
    const now = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(now.getMonth() - 1);
    
    const recentInvoices = fetchedInvoices.filter(inv => 
      new Date(inv.invoiceDate) >= oneMonthAgo
    ).length;
    
    const totalAmount = fetchedInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
    
    setStats({
      totalInvoices: fetchedInvoices.length,
      totalAmount,
      recentInvoices,
    });
  }, []);

  // Get the 5 most recent invoices
  const recentInvoices = [...invoices]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Dashboard translations
  const dashboardTranslations = {
    welcome: language === 'tr' ? 'Apuntea\'ya Hoşgeldiniz' : 'Welcome to Apuntea',
    intelligentInvoice: language === 'tr' ? 'Akıllı fatura yönetimi basitleştirildi' : 'Intelligent invoice management made simple',
    totalInvoices: language === 'tr' ? 'Toplam Faturalar' : 'Total Invoices',
    recent: language === 'tr' ? 'Son (30 gün)' : 'Recent (30 days)',
    totalAmount: language === 'tr' ? 'Toplam Tutar' : 'Total Amount',
    recentInvoices: language === 'tr' ? 'Son Faturalar' : 'Recent Invoices',
    recentInvoicesDesc: language === 'tr' ? 'En son eklenen faturalarınız' : 'Your most recently added invoices',
    noInvoices: language === 'tr' ? 'Henüz fatura yok' : 'No invoices yet',
    viewAllInvoices: language === 'tr' ? 'Tüm Faturaları Görüntüle' : 'View All Invoices',
    actions: language === 'tr' ? 'İşlemler' : 'Actions',
    quickLinks: language === 'tr' ? 'Hızlı bağlantılar' : 'Quick links to common tasks',
    uploadNew: language === 'tr' ? 'Yeni Fatura Yükle' : 'Upload New Invoice',
    manageRecords: language === 'tr' ? 'Kayıtları Yönet' : 'Manage Records',
    proTip: language === 'tr' ? 'Pro İpucu' : 'Pro Tip',
    proTipDesc: language === 'tr' ? 'Anında veri çıkarma ve işleme için telefonunuzun kamerasıyla bir faturayı tarayın.' : 'Scan an invoice with your phone camera for instant data extraction and processing.',
  };

  return (
    <div className="grid grid-cols-1 gap-8 animate-slide-in">
      <div>
        <h1 className="text-3xl font-bold mb-1">{dashboardTranslations.welcome}</h1>
        <p className="text-muted-foreground">
          {dashboardTranslations.intelligentInvoice}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardDescription>{dashboardTranslations.totalInvoices}</CardDescription>
            <CardTitle className="text-3xl flex items-center">
              {stats.totalInvoices}
              <FileText className="h-6 w-6 ml-2 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardDescription>{dashboardTranslations.recent}</CardDescription>
            <CardTitle className="text-3xl flex items-center">
              {stats.recentInvoices}
              <Calendar className="h-6 w-6 ml-2 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardDescription>{dashboardTranslations.totalAmount}</CardDescription>
            <CardTitle className="text-3xl flex items-center">
              {formatCurrency(stats.totalAmount)}
              <Calculator className="h-6 w-6 ml-2 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2">
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle>{dashboardTranslations.recentInvoices}</CardTitle>
              <CardDescription>
                {dashboardTranslations.recentInvoicesDesc}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentInvoices.length > 0 ? (
                <div className="space-y-4">
                  {recentInvoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background transition-colors">
                      <div>
                        <div className="font-medium">{invoice.companyName}</div>
                        <div className="text-sm text-muted-foreground flex items-center space-x-2">
                          <span>{invoice.invoiceNumber}</span>
                          <span>•</span>
                          <span>{new Date(invoice.invoiceDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="font-medium">
                        {formatCurrency(invoice.totalAmount)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <FileText className="h-10 w-10 mx-auto mb-3 text-muted-foreground opacity-40" />
                  <p className="text-muted-foreground">{dashboardTranslations.noInvoices}</p>
                </div>
              )}
              
              <div className="mt-6 text-center">
                <Button asChild variant="outline">
                  <Link to="/records">{dashboardTranslations.viewAllInvoices}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="glass-card h-full flex flex-col">
            <CardHeader>
              <CardTitle>{dashboardTranslations.actions}</CardTitle>
              <CardDescription>
                {dashboardTranslations.quickLinks}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4 flex-1">
              <Button asChild className="btn-primary">
                <Link to="/upload" className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" />
                  {dashboardTranslations.uploadNew}
                </Link>
              </Button>
              
              <Button asChild variant="outline">
                <Link to="/records" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  {dashboardTranslations.manageRecords}
                </Link>
              </Button>
              
              <div className="mt-auto">
                <div className="rounded-lg bg-apuntea-light p-4">
                  <h3 className="text-sm font-medium mb-2">{dashboardTranslations.proTip}</h3>
                  <p className="text-xs text-muted-foreground">
                    {dashboardTranslations.proTipDesc}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
