
import React, { useState, useEffect } from "react";
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
  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem("apuntea_theme") || "light";
    return savedTheme;
  });
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("apuntea_language") || "tr";
    return savedLanguage;
  });
  const [billingCycle, setBillingCycle] = useState(() => {
    const savedBillingCycle = localStorage.getItem("apuntea_billing_cycle") || "yearly";
    return savedBillingCycle;
  });
  const [profileData, setProfileData] = useState(() => {
    const savedProfile = localStorage.getItem("apuntea_profile");
    return savedProfile ? JSON.parse(savedProfile) : {
      name: "",
      company: "",
      city: "",
      country: "",
      position: "",
      avatarUrl: ""
    };
  });
  const [securityData, setSecurityData] = useState(() => {
    const savedSecurity = localStorage.getItem("apuntea_security");
    return savedSecurity ? JSON.parse(savedSecurity) : {
      email: "admin@apuntea.com",
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    };
  });
  const [helpData, setHelpData] = useState({
    email: "",
    subject: "",
    message: ""
  });
  
  const { toast } = useToast();

  // Effect to update theme when it changes
  useEffect(() => {
    const html = document.documentElement;
    if (themeMode === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("apuntea_theme", themeMode);
  }, [themeMode]);

  // Effect to save language when it changes
  useEffect(() => {
    localStorage.setItem("apuntea_language", language);
  }, [language]);

  // Effect to save billing cycle when it changes
  useEffect(() => {
    localStorage.setItem("apuntea_billing_cycle", billingCycle);
  }, [billingCycle]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.id]: e.target.value
    });
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecurityData({
      ...securityData,
      [e.target.id]: e.target.value
    });
  };

  const handleHelpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHelpData({
      ...helpData,
      [e.target.id]: e.target.value
    });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("apuntea_profile", JSON.stringify(profileData));
    toast({
      title: "Profil güncellendi",
      description: "Profiliniz başarıyla güncellendi."
    });
  };

  const handleSaveSecuritySettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (securityData.newPassword !== securityData.confirmPassword) {
      toast({
        title: "Hata",
        description: "Yeni şifre ve tekrarı eşleşmiyor.",
        variant: "destructive"
      });
      return;
    }
    localStorage.setItem("apuntea_security", JSON.stringify(securityData));
    toast({
      title: "Güvenlik ayarları güncellendi",
      description: "Güvenlik ayarlarınız başarıyla güncellendi."
    });
    // Şifre alanlarını temizle
    setSecurityData({
      ...securityData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handleSendHelpMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!helpData.email || !helpData.subject || !helpData.message) {
      toast({
        title: "Hata",
        description: "Lütfen tüm alanları doldurun.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Mesaj gönderildi",
      description: "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız."
    });
    setHelpData({
      email: "",
      subject: "",
      message: ""
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
                      <AvatarImage src={profileData.avatarUrl} />
                      <AvatarFallback className="text-2xl">UA</AvatarFallback>
                    </Avatar>
                    <Button type="button" variant="outline">
                      Resim Yükle
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">İsim</Label>
                      <Input 
                        id="name" 
                        placeholder="İsminizi girin" 
                        value={profileData.name}
                        onChange={handleProfileChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Şirket Adı</Label>
                      <Input 
                        id="company" 
                        placeholder="Şirket adını girin" 
                        value={profileData.company}
                        onChange={handleProfileChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="city">Şehir</Label>
                      <Input 
                        id="city" 
                        placeholder="Şehrinizi girin" 
                        value={profileData.city}
                        onChange={handleProfileChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="country">Ülke</Label>
                      <Input 
                        id="country" 
                        placeholder="Ülkenizi girin" 
                        value={profileData.country}
                        onChange={handleProfileChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="position">Pozisyon</Label>
                      <Input 
                        id="position" 
                        placeholder="Pozisyonunuzu girin" 
                        value={profileData.position}
                        onChange={handleProfileChange}
                      />
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
                <div className="space-y-4 border p-4 rounded-sm">
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
                      onCheckedChange={(checked) => {
                        setThemeMode(checked ? "dark" : "light");
                      }}
                    />
                  </div>
                </div>
                
                {/* DİLLER */}
                <div className="space-y-4 border p-4 rounded-sm">
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
                <div className="space-y-4 border p-4 rounded-sm">
                  <h3 className="text-lg font-medium">GÜVENLİK</h3>
                  <form onSubmit={handleSaveSecuritySettings} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="email@example.com" 
                        value={securityData.email}
                        onChange={handleSecurityChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                      <Input 
                        id="currentPassword" 
                        type="password" 
                        placeholder="••••••••" 
                        value={securityData.currentPassword}
                        onChange={handleSecurityChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Yeni Şifre</Label>
                      <Input 
                        id="newPassword" 
                        type="password" 
                        placeholder="••••••••" 
                        value={securityData.newPassword}
                        onChange={handleSecurityChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        placeholder="••••••••" 
                        value={securityData.confirmPassword}
                        onChange={handleSecurityChange}
                      />
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
                  <div className="bg-muted p-1 rounded-sm inline-flex">
                    <Button
                      variant={billingCycle === "monthly" ? "default" : "ghost"}
                      className="rounded-sm"
                      onClick={() => setBillingCycle("monthly")}
                    >
                      Aylık
                    </Button>
                    <Button
                      variant={billingCycle === "yearly" ? "default" : "ghost"}
                      className="rounded-sm"
                      onClick={() => setBillingCycle("yearly")}
                    >
                      Yıllık
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* ÜCRETSİZ PLAN */}
                  <div className="border rounded-sm p-6 flex flex-col">
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
                  <div className="border rounded-sm p-6 flex flex-col relative overflow-hidden">
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
                    <Button className="w-full bg-apuntea-gold text-black hover:bg-apuntea-gold/90">Yükselt</Button>
                  </div>
                  
                  {/* İŞLETME PLAN */}
                  <div className="border rounded-sm p-6 flex flex-col">
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
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Email adresiniz" 
                      value={helpData.email}
                      onChange={handleHelpChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Konu</Label>
                    <Input 
                      id="subject" 
                      placeholder="Konu" 
                      value={helpData.subject}
                      onChange={handleHelpChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Mesaj</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Mesajınız..." 
                      rows={5}
                      value={helpData.message}
                      onChange={handleHelpChange}
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
