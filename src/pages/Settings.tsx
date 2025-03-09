import React, { useState, useEffect, useRef } from "react";
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
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";
import { handleUppercaseInput } from "@/utils/formatUtils";

const Settings = () => {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  
  const [activeTab, setActiveTab] = useState("profile");
  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem("apuntea_theme") || "light";
    return savedTheme;
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (themeMode === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("apuntea_theme", themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem("apuntea_billing_cycle", billingCycle);
  }, [billingCycle]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setProfileData({
      ...profileData,
      [e.target.id]: value
    });
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.id === 'email' ? e.target.value.toUpperCase() : e.target.value;
    setSecurityData({
      ...securityData,
      [e.target.id]: value
    });
  };

  const handleHelpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value.toUpperCase();
    setHelpData({
      ...helpData,
      [e.target.id]: value
    });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("apuntea_profile", JSON.stringify(profileData));
    toast({
      title: t.profileUpdated,
      description: t.profileUpdatedDescription
    });
  };

  const handleSaveSecuritySettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (securityData.newPassword !== securityData.confirmPassword) {
      toast({
        title: t.error,
        description: t.passwordsDontMatch,
        variant: "destructive"
      });
      return;
    }
    localStorage.setItem("apuntea_security", JSON.stringify(securityData));
    toast({
      title: t.securityUpdated,
      description: t.securityUpdatedDescription
    });
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
        title: t.error,
        description: t.fillAllFields,
        variant: "destructive"
      });
      return;
    }
    toast({
      title: t.messageSent,
      description: t.messageSentDescription
    });
    setHelpData({
      email: "",
      subject: "",
      message: ""
    });
  };

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({
          ...profileData,
          avatarUrl: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 animate-slide-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1 flex items-center">
            <SettingsIcon className="mr-2 h-6 w-6" />
            {t.settings}
          </h1>
          <p className="text-muted-foreground">
            {t.accountSettings}
          </p>
        </div>
      </div>

      <Card className="rounded-sm">
        <CardContent className="p-6">
          <Tabs 
            defaultValue={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full justify-start mb-6 overflow-x-auto rounded-sm">
              <TabsTrigger value="profile" className="px-4 py-2 flex items-center rounded-sm">
                <User className="h-4 w-4 mr-2" />
                {t.profile}
              </TabsTrigger>
              <TabsTrigger value="accountSettings" className="px-4 py-2 flex items-center rounded-sm">
                <Shield className="h-4 w-4 mr-2" />
                {t.accountSettings}
              </TabsTrigger>
              <TabsTrigger value="plansAndPricing" className="px-4 py-2 flex items-center rounded-sm">
                <CreditCard className="h-4 w-4 mr-2" />
                {t.plansAndPricing}
              </TabsTrigger>
              <TabsTrigger value="help" className="px-4 py-2 flex items-center rounded-sm">
                <HelpCircle className="h-4 w-4 mr-2" />
                {t.help}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-0 space-y-4">
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="flex items-center space-x-4">
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileData.avatarUrl} />
                    <AvatarFallback className="text-2xl">UA</AvatarFallback>
                  </Avatar>
                  <Button type="button" variant="outline" onClick={handleImageUpload} className="rounded-sm">
                    {t.uploadImage}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.profile}</Label>
                    <Input 
                      id="name" 
                      placeholder={t.enterName}
                      value={profileData.name}
                      onChange={handleProfileChange}
                      className="rounded-sm"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">{t.company}</Label>
                    <Input 
                      id="company" 
                      placeholder={t.enterCompany}
                      value={profileData.company}
                      onChange={handleProfileChange}
                      className="rounded-sm"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">{t.city}</Label>
                    <Input 
                      id="city" 
                      placeholder={t.enterCity}
                      value={profileData.city}
                      onChange={handleProfileChange}
                      className="rounded-sm"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">{t.country}</Label>
                    <Input 
                      id="country" 
                      placeholder={t.enterCountry}
                      value={profileData.country}
                      onChange={handleProfileChange}
                      className="rounded-sm"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="position">{t.position}</Label>
                    <Input 
                      id="position" 
                      placeholder={t.enterPosition}
                      value={profileData.position}
                      onChange={handleProfileChange}
                      className="rounded-sm"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="rounded-sm">{t.save}</Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="accountSettings" className="mt-0 space-y-8">
              <div className="space-y-4 border p-4 rounded-sm">
                <h3 className="text-lg font-medium">{t.styles}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{t.darkMode}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t.enableDarkMode}
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
              
              <div className="space-y-4 border p-4 rounded-sm">
                <h3 className="text-lg font-medium">{t.languages}</h3>
                <RadioGroup 
                  value={language} 
                  onValueChange={setLanguage}
                  className="grid grid-cols-1 md:grid-cols-3 gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="en" id="en" />
                    <Label htmlFor="en">ENGLISH</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="es" id="es" />
                    <Label htmlFor="es">ESPAÑOL</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="de" id="de" />
                    <Label htmlFor="de">DEUTSCH</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fr" id="fr" />
                    <Label htmlFor="fr">FRANÇAIS</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="it" id="it" />
                    <Label htmlFor="it">ITALIANO</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pt" id="pt" />
                    <Label htmlFor="pt">PORTUGUÊS</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ar" id="ar" />
                    <Label htmlFor="ar">العربية</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="zh" id="zh" />
                    <Label htmlFor="zh">中文</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tr" id="tr" />
                    <Label htmlFor="tr">TÜRKÇE</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-4 border p-4 rounded-sm">
                <h3 className="text-lg font-medium">{t.security}</h3>
                <form onSubmit={handleSaveSecuritySettings} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.email}</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="email@example.com" 
                      value={securityData.email}
                      onChange={handleSecurityChange}
                      className="rounded-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">{t.currentPassword}</Label>
                    <Input 
                      id="currentPassword" 
                      type="password" 
                      placeholder="••••••••" 
                      value={securityData.currentPassword}
                      onChange={handleSecurityChange}
                      className="rounded-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">{t.newPassword}</Label>
                    <Input 
                      id="newPassword" 
                      type="password" 
                      placeholder="••••••••" 
                      value={securityData.newPassword}
                      onChange={handleSecurityChange}
                      className="rounded-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      placeholder="••••••••" 
                      value={securityData.confirmPassword}
                      onChange={handleSecurityChange}
                      className="rounded-sm"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" className="rounded-sm">{t.save}</Button>
                  </div>
                </form>
              </div>
            </TabsContent>
            
            <TabsContent value="plansAndPricing" className="mt-0 space-y-6">
              <div className="flex justify-center mb-6">
                <div className="bg-muted p-1 rounded-sm inline-flex">
                  <Button
                    variant={billingCycle === "monthly" ? "default" : "ghost"}
                    className="rounded-sm"
                    onClick={() => setBillingCycle("monthly")}
                  >
                    {t.monthly}
                  </Button>
                  <Button
                    variant={billingCycle === "yearly" ? "default" : "ghost"}
                    className="rounded-sm"
                    onClick={() => setBillingCycle("yearly")}
                  >
                    {t.yearly}
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border rounded-sm p-6 flex flex-col">
                  <h3 className="text-xl font-bold">{t.free}</h3>
                  <div className="text-3xl font-bold my-4">
                    0€ <span className="text-lg font-normal text-muted-foreground">/ {billingCycle === "monthly" ? t.monthly.toLowerCase() : t.yearly.toLowerCase()}</span>
                  </div>
                  <ul className="space-y-2 mb-6 flex-grow">
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> Basic account features
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> Limited records
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> Community support
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> Basic reporting
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> Single user
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full rounded-sm">{t.currentPlan}</Button>
                </div>
                
                <div className="border rounded-sm p-6 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs">
                    Popular
                  </div>
                  <h3 className="text-xl font-bold">{t.standard}</h3>
                  <div className="text-3xl font-bold my-4">
                    {billingCycle === "monthly" ? "6€" : "4€"} <span className="text-lg font-normal text-muted-foreground">/ {billingCycle === "monthly" ? t.monthly.toLowerCase() : t.yearly.toLowerCase()}</span>
                  </div>
                  <ul className="space-y-2 mb-6 flex-grow">
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> All free features
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> Unlimited records
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> Email support
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> Advanced reporting
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> Data backup
                    </li>
                  </ul>
                  <Button className="w-full bg-apuntea-gold text-black hover:bg-apuntea-gold/90 rounded-sm">{t.upgrade}</Button>
                </div>
                
                <div className="border rounded-sm p-6 flex flex-col">
                  <h3 className="text-xl font-bold">{t.business}</h3>
                  <div className="text-3xl font-bold my-4">
                    {billingCycle === "monthly" ? "14€" : "10€"} <span className="text-lg font-normal text-muted-foreground">/ {billingCycle === "monthly" ? t.monthly.toLowerCase() : t.yearly.toLowerCase()}</span>
                  </div>
                  <ul className="space-y-2 mb-6 flex-grow">
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> All standard features
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> 24/7 priority support
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> Custom reports
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> API access
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span> Multi-user access
                    </li>
                  </ul>
                  <Button className="w-full rounded-sm">{t.upgrade}</Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    This plan allows up to 5 users. Please contact us for higher user needs.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="help" className="mt-0">
              <form onSubmit={handleSendHelpMessage} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t.email}</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    value={helpData.email}
                    onChange={handleHelpChange}
                    className="rounded-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">{t.subject}</Label>
                  <Input 
                    id="subject" 
                    placeholder="Subject" 
                    value={helpData.subject}
                    onChange={handleHelpChange}
                    className="rounded-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t.message}</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Your message..." 
                    rows={5}
                    value={helpData.message}
                    onChange={handleHelpChange}
                    className="rounded-sm"
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" className="rounded-sm">{t.send}</Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
