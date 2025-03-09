
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
      {/* Neural network background */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="#888" strokeWidth="1.5">
            <path d="M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63" />
            <path d="M-31 229L237 261 390 382 731 737M520 660L309 538 295 764 731 737M520 660L309 538 40 599 731 737" />
            <path d="M520 660L309 538 295 764M520 660L309 538 40 599M520 660L731 737M309 538L295 764M309 538L40 599M295 764L731 737M295 764L40 599M731 737L40 599" />
          </g>
          <g fill="#888">
            <circle cx="769" cy="229" r="5" />
            <circle cx="539" cy="269" r="5" />
            <circle cx="603" cy="493" r="5" />
            <circle cx="731" cy="737" r="5" />
            <circle cx="520" cy="660" r="5" />
            <circle cx="309" cy="538" r="5" />
            <circle cx="295" cy="764" r="5" />
            <circle cx="40" cy="599" r="5" />
          </g>
        </svg>
      </div>

      <div className="w-full max-w-md animate-scale-in z-10">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/23d89839-23e5-4a91-9d1e-ab2a8bb6a03e.png" 
            alt="Apuntea Logo" 
            className="h-20 mx-auto mb-6" 
          />
          <h1 className="text-2xl font-bold text-apuntea-purple">
            Smart Daily Management
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
                className="w-full bg-apuntea-purple hover:bg-apuntea-dark text-white uppercase rounded-sm" 
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
        
        <p className="text-center text-sm text-gray-600 mt-4 uppercase">
          {t.demoCredentials}
        </p>
      </div>
    </div>
  );
};

export default Login;
