
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  User, 
  Settings as SettingsIcon, 
  CreditCard, 
  HelpCircle, 
  SunMoon, 
  Languages, 
  Lock, 
  Building, 
  MapPin, 
  Briefcase, 
  Mail, 
  Check 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  
  // Profile state
  const [profile, setProfile] = useState({
    name: "",
    city: "",
    country: "",
    company: "",
    position: ""
  });

  // Account settings state
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Contact form state
  const [contactForm, setContactForm] = useState({
    email: "",
    subject: "",
    message: ""
  });

  // Handle profile changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  // Handle contact form changes
  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submissions
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the profile changes
    console.log("Profile updated:", profile);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically update the password
    console.log("Password updated");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the contact message
    console.log("Contact form submitted:", contactForm);
    setContactForm({ email: "", subject: "", message: "" });
  };

  // Plans data
  const plans = [
    {
      name: "ÜCRETSİZ",
      monthlyPrice: "0€",
      yearlyPrice: "0€",
      features: [
        "1 kullanıcı için erişim",
        "Temel raporlama özellikleri",
        "7 günlük veri depolama",
        "Sınırlı kategorilendirme",
        "Email desteği"
      ],
      popular: false
    },
    {
      name: "STANDART",
      monthlyPrice: "6€",
      yearlyPrice: "4€",
      features: [
        "3 kullanıcı için erişim",
        "Gelişmiş raporlama özellikleri",
        "30 günlük veri depolama",
        "Sınırsız kategorilendirme",
        "Öncelikli email desteği"
      ],
      popular: true
    },
    {
      name: "İŞLETME",
      monthlyPrice: "14€",
      yearlyPrice: "10€",
      features: [
        "5 kullanıcı için erişim",
        "Özel raporlama özellikleri",
        "Sınırsız veri depolama",
        "API erişimi",
        "7/24 öncelikli destek"
      ],
      note: "Bu plan, maksimum 5 kullanıcıya kadar izin vermektedir. Daha yüksek sayıda kullanıcı ihtiyacınızda lütfen bizimle iletişime geçiniz.",
      popular: false
    }
  ];

  // Languages data
  const languages = [
    { code: "en", name: "İngilizce" },
    { code: "es", name: "İspanyolca" },
    { code: "tr", name: "Türkçe" },
    { code: "de", name: "Almanca" },
    { code: "it", name: "İtalyanca" },
    { code: "pt", name: "Portekizce" },
    { code: "fr", name: "Fransızca" },
    { code: "ar", name: "Arapça" },
    { code: "zh", name: "Çince" }
  ];

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
              Hesap ayarlarınızı ve tercihlerinizi yönetin
            </p>
          </div>
        </div>

        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full justify-start mb-6 overflow-x-auto">
            <TabsTrigger value="profile" className="px-4 py-2 flex items-center">
              <User className="mr-2 h-4 w-4" />
              PROFİL
            </TabsTrigger>
            <TabsTrigger value="account" className="px-4 py-2 flex items-center">
              <SettingsIcon className="mr-2 h-4 w-4" />
              HESAP AYARLARI
            </TabsTrigger>
            <TabsTrigger value="plans" className="px-4 py-2 flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              PLANLAR & ÜCRETLENDİRME
            </TabsTrigger>
            <TabsTrigger value="help" className="px-4 py-2 flex items-center">
              <HelpCircle className="mr-2 h-4 w-4" />
              YARDIM
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Profil Bilgileri</CardTitle>
                <CardDescription>
                  Kişisel ve şirket bilgilerinizi güncelleyin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="" alt="Profile" />
                        <AvatarFallback className="text-lg">
                          {profile.name.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Fotoğraf Değiştir
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                      <div className="space-y-2">
                        <Label htmlFor="name">İsim</Label>
                        <div className="flex">
                          <User className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                          <Input
                            id="name"
                            name="name"
                            value={profile.name}
                            onChange={handleProfileChange}
                            placeholder="Adınız Soyadınız"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city">Şehir</Label>
                        <div className="flex">
                          <MapPin className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                          <Input
                            id="city"
                            name="city"
                            value={profile.city}
                            onChange={handleProfileChange}
                            placeholder="Şehir"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Ülke</Label>
                        <div className="flex">
                          <MapPin className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                          <Input
                            id="country"
                            name="country"
                            value={profile.country}
                            onChange={handleProfileChange}
                            placeholder="Ülke"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Şirket Adı</Label>
                        <div className="flex">
                          <Building className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                          <Input
                            id="company"
                            name="company"
                            value={profile.company}
                            onChange={handleProfileChange}
                            placeholder="Şirket Adı"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="position">Pozisyon</Label>
                        <div className="flex">
                          <Briefcase className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                          <Input
                            id="position"
                            name="position"
                            value={profile.position}
                            onChange={handleProfileChange}
                            placeholder="Pozisyonunuz"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">Değişiklikleri Kaydet</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Settings Tab */}
          <TabsContent value="account" className="mt-0 space-y-6">
            {/* Styles Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <SunMoon className="mr-2 h-5 w-5" />
                  Stiller
                </CardTitle>
                <CardDescription>
                  Arayüz görünümünü tercihlerinize göre özelleştirin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Karanlık Mod</h3>
                    <p className="text-sm text-muted-foreground">
                      Arayüzü karanlık tema ile görüntüleyin
                    </p>
                  </div>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Languages Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Languages className="mr-2 h-5 w-5" />
                  Diller
                </CardTitle>
                <CardDescription>
                  Tercih ettiğiniz dili seçin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={language} 
                  onValueChange={setLanguage}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2"
                >
                  {languages.map(lang => (
                    <div key={lang.code} className="flex items-center space-x-2">
                      <RadioGroupItem value={lang.name} id={`lang-${lang.code}`} />
                      <Label htmlFor={`lang-${lang.code}`}>{lang.name}</Label>
                      {lang.name === "İngilizce" && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          Varsayılan
                        </Badge>
                      )}
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Security Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="mr-2 h-5 w-5" />
                  Güvenlik
                </CardTitle>
                <CardDescription>
                  Hesap güvenlik ayarlarınızı yönetin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Adresi</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ornek@mail.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Mevcut Şifre</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Yeni Şifre</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Yeni Şifre (Tekrar)</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Değişiklikleri Kaydet</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Plans & Pricing Tab */}
          <TabsContent value="plans" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Planlar & Ücretlendirme</CardTitle>
                <CardDescription>
                  İhtiyaçlarınıza uygun planı seçin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-8">
                  <div className="flex items-center border rounded-lg p-1">
                    <Button
                      variant={billingCycle === "monthly" ? "default" : "outline"}
                      className="rounded-r-none"
                      onClick={() => setBillingCycle("monthly")}
                    >
                      Aylık
                    </Button>
                    <Button
                      variant={billingCycle === "yearly" ? "default" : "outline"}
                      className="rounded-l-none"
                      onClick={() => setBillingCycle("yearly")}
                    >
                      Yıllık
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <Card key={plan.name} className={`flex flex-col ${plan.popular ? 'border-primary shadow-md' : ''}`}>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>{plan.name}</CardTitle>
                          {plan.popular && (
                            <Badge>Popüler</Badge>
                          )}
                        </div>
                        <div className="mt-2">
                          <span className="text-3xl font-bold">
                            {billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                          </span>
                          <span className="text-muted-foreground"> / ay</span>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <ul className="space-y-3">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {plan.note && (
                          <div className="mt-4 text-sm text-muted-foreground">
                            {plan.note}
                          </div>
                        )}
                      </CardContent>
                      <div className="p-6 pt-0 mt-auto">
                        <Button 
                          variant={plan.name === "ÜCRETSİZ" ? "outline" : "default"} 
                          className="w-full"
                        >
                          {plan.name === "ÜCRETSİZ" ? "Mevcut Plan" : "Seç"}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Help Tab */}
          <TabsContent value="help" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Yardım & Destek</CardTitle>
                <CardDescription>
                  Sorularınız veya önerileriniz için bize ulaşın
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email Adresi</Label>
                    <div className="flex">
                      <Mail className="mr-2 h-4 w-4 mt-3 text-muted-foreground" />
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="Email adresiniz"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact-subject">Konu</Label>
                    <Input
                      id="contact-subject"
                      name="subject"
                      placeholder="Mesajınızın konusu"
                      value={contactForm.subject}
                      onChange={handleContactChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Mesaj</Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      placeholder="Mesajınızı buraya yazın..."
                      rows={5}
                      value={contactForm.message}
                      onChange={handleContactChange}
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">
                      Gönder
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
