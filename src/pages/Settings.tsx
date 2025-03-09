
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, User, Shield, CreditCard, HelpCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [themeMode, setThemeMode] = useState("light");
  const [language, setLanguage] = useState("en");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const { toast } = useToast();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profil güncellendi",
      description: "Profiliniz başarıyla güncellendi."
    });
  };

  const handleSaveSecuritySettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Güvenlik ayarları güncellendi",
      description: "Güvenlik ayarlarınız başarıyla güncellendi."
    });
  };

  const handleSendHelpMessage = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mesaj gönderildi",
      description: "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız."
    });
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-6 animate-slide-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1 flex items-center">
              <SettingsIcon className="mr-2 h-6 w-6" />
              Ayarlar
            </h1>
            <p className="text-muted-foreground">
              Hesap ve uygulama ayarlarını yönetin
            </p>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <Tabs 
              defaultValue={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full justify-start mb-6 overflow-x-auto">
                <TabsTrigger value="profile" className="px-4 py-2 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  PROFİL
                </TabsTrigger>
                <TabsTrigger value="accountSettings" className="px-4 py-2 flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  HESAP AYARLARI
                </TabsTrigger>
                <TabsTrigger value="plansAndPricing" className="px-4 py-2 flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  PLANLAR & ÜCRETLENDİRME
                </TabsTrigger>
                <TabsTrigger value="help" className="px-4 py-2 flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  YARDIM
                </TabsTrigger>
              </TabsList>
              
              {/* PROFİL */}
              <TabsContent value="profile" className="mt-0 space-y-4">
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-2xl">UA</AvatarFallback>
                    </Avatar>
                    <Button type="button" variant="outline">
                      Resim Yükle
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">İsim</Label>
                      <Input id="name" placeholder="İsminizi girin" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Şirket Adı</Label>
                      <Input id="company" placeholder="Şirket adını girin" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="city">Şehir</Label>
                      <Input id="city" placeholder="Şehrinizi girin" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="country">Ülke</Label>
                      <Input id="country" placeholder="Ülkenizi girin" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="position">Pozisyon</Label>
                      <Input id="position" placeholder="Pozisyonunuzu girin" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Kaydet</Button>
                  </div>
                </form>
              </TabsContent>
              
              {/* HESAP AYARLARI */}
              <TabsContent value="accountSettings" className="mt-0 space-y-8">
                {/* STİLLER */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">STİLLER</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Gece Modu</h4>
                      <p className="text-sm text-muted-foreground">
                        Arayüzün karanlık modunu etkinleştirin.
                      </p>
                    </div>
                    <Switch
                      checked={themeMode === "dark"}
                      onCheckedChange={(checked) =>
                        setThemeMode(checked ? "dark" : "light")
                      }
                    />
                  </div>
                </div>
                
                {/* DİLLER */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">DİLLER</h3>
                  <RadioGroup 
                    value={language} 
                    onValueChange={setLanguage}
                    className="grid grid-cols-1 md:grid-cols-3 gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="en" id="en" />
                      <Label htmlFor="en">İngilizce</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tr" id="tr" />
                      <Label htmlFor="tr">Türkçe</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="es" id="es" />
                      <Label htmlFor="es">İspanyolca</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="de" id="de" />
                      <Label htmlFor="de">Almanca</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fr" id="fr" />
                      <Label htmlFor="fr">Fransızca</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="it" id="it" />
                      <Label htmlFor="it">İtalyanca</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pt" id="pt" />
                      <Label htmlFor="pt">Portekizce</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ar" id="ar" />
                      <Label htmlFor="ar">Arapça</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="zh" id="zh" />
                      <Label htmlFor="zh">Çince</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {/* GÜVENLİK */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">GÜVENLİK</h3>
                  <form onSubmit={handleSaveSecuritySettings} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <Input id="email" type="email" placeholder="email@example.com" defaultValue="user@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Mevcut Şifre</Label>
                      <Input id="current-password" type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Yeni Şifre</Label>
                      <Input id="new-password" type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Şifre Tekrar</Label>
                      <Input id="confirm-password" type="password" placeholder="••••••••" />
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit">Kaydet</Button>
                    </div>
                  </form>
                </div>
              </TabsContent>
              
              {/* PLANLAR & ÜCRETLENDİRME */}
              <TabsContent value="plansAndPricing" className="mt-0 space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="bg-muted p-1 rounded-lg inline-flex">
                    <Button
                      variant={billingCycle === "monthly" ? "default" : "ghost"}
                      className="rounded-md"
                      onClick={() => setBillingCycle("monthly")}
                    >
                      Aylık
                    </Button>
                    <Button
                      variant={billingCycle === "yearly" ? "default" : "ghost"}
                      className="rounded-md"
                      onClick={() => setBillingCycle("yearly")}
                    >
                      Yıllık
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* ÜCRETSİZ PLAN */}
                  <div className="border rounded-lg p-6 flex flex-col">
                    <h3 className="text-xl font-bold">ÜCRETSİZ</h3>
                    <div className="text-3xl font-bold my-4">
                      0€ <span className="text-lg font-normal text-muted-foreground">/ ay</span>
                    </div>
                    <ul className="space-y-2 mb-6 flex-grow">
                      <li className="flex items-center">
                        <span className="mr-2">✓</span> Temel hesap özellikleri
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">✓</span> Sınırlı kayıt sayısı
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">✓</span> Topluluk desteği
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">✓</span> Temel raporlama
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">✓</span> Tek kullanıcı
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full">Mevcut Plan</Button>
                  </div>
                  
                  {/* STANDART PLAN */}
                  <div className="border rounded-lg p-6 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs">
                      Popüler
                    </div>
                    <h3 className="text-xl font-bold">STANDART</h3>
                    <div className="text-3xl font-bold my-4">
                      {billingCycle === "monthly" ? "6€" : "4€"} <span className="text-lg font-normal text-muted-foreground">/ ay</span>
                    </div>
                    <ul className="space-y-2 mb-6 flex-grow">
                      <li className="flex items-center">
                        <span className="mr-2">✓</span> Tüm ücretsiz özellikler
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">✓</span> Sınırsız kayıt
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">✓</span> E-posta desteği
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">✓</span> Gelişmiş raporlama
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">✓</span> Veri yedekleme
                      </li>
                    </ul>
                    <Button className="w-full">Yükselt</Button>
                  </div>
                  
                  {/* İŞLETME PLAN */}
                  <div className="border rounded-lg p-6 flex flex-col">
                    <h3 className="text-xl font-bold">İŞLETME</h3>
                    <div className="text-3xl font-bold my-4">
                      {billingCycle === "monthly" ? "14€" : "10€"} <span className="text-lg font-normal text-muted-foreground">/ ay</span>
                    </div>
                    <ul className="space-y-2 mb-6 flex-grow">
                      <li className="flex items-center">
                        <span className="mr-2">✓</span> Tüm standart özellikler
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">✓</span> 7/24 öncelikli destek
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">✓</span> Özelleştirilebilir raporlar
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">✓</span> API erişimi
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">✓</span> Çoklu kullanıcı erişimi
                      </li>
                    </ul>
                    <Button className="w-full">Yükselt</Button>
                    <p className="text-sm text-muted-foreground mt-4">
                      Bu plan, maksimum 5 kullanıcıya kadar izin vermektedir. Daha yüksek sayıda kullanıcı ihtiyacınızda lütfen bizimle iletişime geçiniz.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              {/* YARDIM */}
              <TabsContent value="help" className="mt-0">
                <form onSubmit={handleSendHelpMessage} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="help-email">E-posta Adresi</Label>
                    <Input id="help-email" type="email" placeholder="Email adresiniz" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="help-subject">Konu</Label>
                    <Input id="help-subject" placeholder="Konu" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="help-message">Mesaj</Label>
                    <Textarea 
                      id="help-message" 
                      placeholder="Mesajınız..." 
                      rows={5}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Gönder</Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
