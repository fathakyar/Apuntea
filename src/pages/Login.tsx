
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { handleUppercaseInput } from "@/utils/formatUtils";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";
import { Separator } from "@/components/ui/separator";

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

  const handleGoogleLogin = () => {
    // For now, just show an alert - would be replaced with actual Google auth
    alert("Google login will be implemented with backend integration");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#7030A0] via-[#5a267f] to-[#354C42] p-4">
      {/* Login form */}
      <div className="w-full max-w-md animate-scale-in">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/23d89839-23e5-4a91-9d1e-ab2a8bb6a03e.png" 
            alt="Apuntea Logo" 
            className="h-20 mx-auto mb-6" 
          />
          <h1 className="text-2xl font-bold text-white">
            YOUR DAILY AGENDA
          </h1>
        </div>
        
        <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-sm overflow-hidden">
          <CardHeader className="border-b border-white/10 pb-4">
            <CardTitle className="text-white uppercase">
              {t.welcomeBack}
            </CardTitle>
            <CardDescription className="text-white/70 uppercase">
              {t.enterCredentials}
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-6">
              {error && (
                <Alert variant="destructive" className="mb-4 animate-fade-in bg-red-900/30 border-red-500/30 text-white">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="uppercase">{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="form-group">
                <Label htmlFor="email" className="uppercase text-white">{t.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => handleUppercaseInput(e, setEmail)}
                  placeholder="ADMIN@APUNTEA.COM"
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-sm uppercase"
                />
              </div>
              
              <div className="form-group">
                <Label htmlFor="password" className="uppercase text-white">{t.currentPassword}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-white/10 border-white/20 text-white rounded-sm"
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 border-t border-white/10 pt-4">
              <Button 
                type="submit" 
                className="w-full bg-[#7030A0] hover:bg-[#F0B50F] hover:text-black text-white uppercase rounded-sm transition-colors" 
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
              
              <div className="flex items-center w-full">
                <Separator className="flex-1 bg-white/20" />
                <span className="px-4 text-xs text-white/60 uppercase">{t.orSignInWith}</span>
                <Separator className="flex-1 bg-white/20" />
              </div>
              
              <Button 
                type="button"
                variant="outline" 
                onClick={handleGoogleLogin}
                className="w-full border-white/20 text-white hover:bg-white/10 uppercase flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m15 9-6 6"></path>
                  <path d="m9 9 6 6"></path>
                </svg>
                {t.signInWithGoogle}
              </Button>
              
              <p className="text-center text-sm text-white/70 mt-2">
                {t.dontHaveAccount}{" "}
                <Link to="/signup" className="text-[#F0B50F] hover:text-white font-medium uppercase">
                  {t.signUp}
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
