
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { handleUppercaseInput } from "@/utils/formatUtils";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";

const Login = () => {
  const { user, login, isLoading } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();
  const t = translations[language];

  // If user is already logged in, redirect to dashboard
  if (user?.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      await login(email, password);
    } catch (error) {
      setError(error instanceof Error ? error.message : "LOGIN FAILED");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 uppercase relative overflow-hidden">
      {/* Agenda image background */}
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none">
        <img 
          src="/lovable-uploads/81156e85-98e1-4e93-a985-76fe34561a6f.png" 
          alt="2025 Agenda" 
          className="object-cover w-full h-full opacity-20"
          style={{ objectPosition: 'left bottom' }}
        />
      </div>

      <div className="w-full max-w-md animate-scale-in z-10">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/23d89839-23e5-4a91-9d1e-ab2a8bb6a03e.png" 
            alt="Apuntea Logo" 
            className="h-20 mx-auto mb-6" 
          />
          <h1 className="text-2xl font-bold text-apuntea-purple">
            YOUR DAILY AGENDA
          </h1>
        </div>
        
        <Card className="bg-white border-gray-200 shadow-md rounded-sm">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle className="text-apuntea-purple uppercase">
              {t.welcomeBack}
            </CardTitle>
            <CardDescription className="text-gray-600 uppercase">
              {t.enterCredentials}
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-6">
              {error && (
                <Alert variant="destructive" className="mb-4 animate-fade-in bg-red-50 border-red-200 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="uppercase">{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="form-group">
                <Label htmlFor="email" className="uppercase">{t.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => handleUppercaseInput(e, setEmail)}
                  placeholder="ADMIN@APUNTEA.COM"
                  required
                  className="bg-white border-gray-200 placeholder:text-gray-400 rounded-sm uppercase"
                />
              </div>
              
              <div className="form-group">
                <Label htmlFor="password" className="uppercase">{t.currentPassword}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-white border-gray-200 rounded-sm"
                />
              </div>
            </CardContent>
            
            <CardFooter className="border-t border-gray-100 pt-4">
              <Button 
                type="submit" 
                className="w-full bg-apuntea-purple hover:bg-apuntea-gold hover:text-black text-white uppercase rounded-sm transition-colors" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t.signingIn}
                  </>
                ) : (
                  t.signIn
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
