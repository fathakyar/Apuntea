
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { handleUppercaseInput } from "@/utils/formatUtils";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { language } = useLanguage();
  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      alert(`Sign up functionality will be implemented with backend integration. Submitted email: ${email}`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-white relative overflow-hidden">
      {/* Left side with background image */}
      <div className="hidden md:block md:w-1/2 h-screen relative">
        <img 
          src="/lovable-uploads/76ddfddc-83a9-4083-8b90-9088889034cd.png" 
          alt="Apuntea Background" 
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right side with signup form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md animate-scale-in">
          <div className="text-center mb-8 md:hidden">
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
                CREATE ACCOUNT
              </CardTitle>
              <CardDescription className="text-gray-600 uppercase">
                ENTER YOUR DETAILS TO SIGN UP
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-6">
                <div className="form-group">
                  <Label htmlFor="name" className="uppercase">FULL NAME</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => handleUppercaseInput(e, setName)}
                    placeholder="YOUR NAME"
                    required
                    className="bg-white border-gray-200 placeholder:text-gray-400 rounded-sm uppercase"
                  />
                </div>
                
                <div className="form-group">
                  <Label htmlFor="email" className="uppercase">{t.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => handleUppercaseInput(e, setEmail)}
                    placeholder="YOUR@EMAIL.COM"
                    required
                    className="bg-white border-gray-200 placeholder:text-gray-400 rounded-sm uppercase"
                  />
                </div>
                
                <div className="form-group">
                  <Label htmlFor="password" className="uppercase">PASSWORD</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="bg-white border-gray-200 rounded-sm"
                    minLength={6}
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4 border-t border-gray-100 pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-apuntea-purple hover:bg-apuntea-gold hover:text-black text-white uppercase rounded-sm transition-colors" 
                  disabled={isLoading}
                >
                  {isLoading ? "CREATING ACCOUNT..." : "SIGN UP"}
                </Button>
                
                <p className="text-center text-sm text-gray-600 mt-2">
                  ALREADY HAVE AN ACCOUNT?{" "}
                  <Link to="/login" className="text-apuntea-purple hover:text-apuntea-gold font-medium uppercase">
                    {t.signIn}
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
