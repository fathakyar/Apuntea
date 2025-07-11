import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import AuthLayout from "@/components/AuthLayout";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { language } = useLanguage();
  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (password !== confirmPassword) {
      setError("PASSWORDS DO NOT MATCH");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      alert(`Sign up functionality will be implemented with backend integration. Submitted email: ${email}`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <AuthLayout>
      <div className="flex-1 flex items-center justify-center relative">
        {/* Wave background decorations */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-5">
          <div className="absolute top-0 left-0 w-full h-80 bg-wave-pattern animate-wave"></div>
          <div className="absolute bottom-0 left-0 w-full h-80 bg-wave-pattern animate-wave"></div>
        </div>

        {/* Gradient decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-gold rounded-full opacity-20 blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-purple rounded-full opacity-10 blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="w-full max-w-md animate-scale-in">
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
          
          <Card className="glass-card border-apuntea-purple/10 shadow-xl">
            <CardHeader className="border-b border-apuntea-purple/10 pb-4">
              <CardTitle className="text-apuntea-purple flex items-center gap-2">
                <div className="h-6 w-1 bg-apuntea-gold rounded-sm"></div>
                CREATE ACCOUNT
              </CardTitle>
              <CardDescription className="text-foreground/70">
                ENTER YOUR DETAILS TO SIGN UP
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-6">
                {error && (
                  <Alert variant="destructive" className="mb-4 animate-fade-in">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="form-group">
                  <Label htmlFor="name">FULL NAME</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => handleUppercaseInput(e, setName)}
                    placeholder="YOUR NAME"
                    required
                    className="bg-white/50 border-apuntea-purple/20 text-foreground placeholder:text-foreground/40"
                  />
                </div>
                
                <div className="form-group">
                  <Label htmlFor="email">{t.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => handleUppercaseInput(e, setEmail)}
                    placeholder="YOUR@EMAIL.COM"
                    required
                    className="bg-white/50 border-apuntea-purple/20 text-foreground placeholder:text-foreground/40"
                  />
                </div>
                
                <div className="form-group">
                  <Label htmlFor="password">PASSWORD</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="bg-white/50 border-apuntea-purple/20"
                    minLength={6}
                  />
                </div>
                
                <div className="form-group">
                  <Label htmlFor="confirmPassword">CONFIRM PASSWORD</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="bg-white/50 border-apuntea-purple/20"
                    minLength={6}
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4 border-t border-apuntea-purple/10 pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-apuntea-purple hover:bg-apuntea-gold hover:text-black text-white" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      CREATING ACCOUNT...
                    </>
                  ) : (
                    "SIGN UP"
                  )}
                </Button>
                
                <div className="flex items-center w-full">
                  <Separator className="flex-1 bg-apuntea-purple/20" />
                  <span className="px-4 text-xs text-foreground/60">OR</span>
                  <Separator className="flex-1 bg-apuntea-purple/20" />
                </div>
                
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => alert("Google sign up will be implemented with backend integration")}
                  className="w-full border-apuntea-purple/20 text-foreground hover:bg-apuntea-purple/10 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m15 9-6 6"></path>
                    <path d="m9 9 6 6"></path>
                  </svg>
                  SIGN UP WITH GOOGLE
                </Button>
                
                <p className="text-center text-sm text-foreground/70 mt-2">
                  ALREADY HAVE AN ACCOUNT?{" "}
                  <Link to="/login" className="text-apuntea-gold hover:text-apuntea-purple font-medium">
                    {t.signIn}
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
