
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Login = () => {
  const { user, login, isLoading } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

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

  // Helper function to uppercase text input
  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 p-4 uppercase">
      <div className="w-full max-w-md animate-scale-in">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/4d2af4ce-8457-4acd-8aa3-6758e383a21f.png" 
            alt="Apuntea Logo" 
            className="h-20 mx-auto mb-6" 
          />
          <h1 className="text-2xl font-bold text-apuntea-purple uppercase">INVOICE TRACKING SYSTEM</h1>
        </div>
        
        <Card className="bg-black/70 border-apuntea-purple/30 text-white">
          <CardHeader className="border-b border-apuntea-purple/20 pb-4">
            <CardTitle className="text-apuntea-gold uppercase">WELCOME BACK</CardTitle>
            <CardDescription className="text-white/70 uppercase">
              ENTER YOUR CREDENTIALS TO ACCESS YOUR ACCOUNT
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-6">
              {error && (
                <Alert variant="destructive" className="mb-4 animate-fade-in bg-red-950/50 border-red-500/50 text-white">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="uppercase">{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="form-group">
                <Label htmlFor="email" className="text-white uppercase">EMAIL</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => handleTextInput(e, setEmail)}
                  placeholder="ADMIN@APUNTEA.COM"
                  required
                  className="bg-black/50 border-apuntea-purple/30 text-white placeholder:text-white/30 uppercase"
                />
              </div>
              
              <div className="form-group">
                <Label htmlFor="password" className="text-white uppercase">PASSWORD</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => handleTextInput(e, setPassword)}
                  placeholder="••••••••"
                  required
                  className="bg-black/50 border-apuntea-purple/30 text-white"
                />
              </div>
            </CardContent>
            
            <CardFooter className="border-t border-apuntea-purple/20 pt-4">
              <Button 
                type="submit" 
                className="w-full bg-apuntea-purple hover:bg-apuntea-dark text-white uppercase" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    SIGNING IN...
                  </>
                ) : (
                  "SIGN IN"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <p className="text-center text-sm text-white/70 mt-4 uppercase">
          DEMO CREDENTIALS: ADMIN@APUNTEA.COM / 1ADMIN?
        </p>
      </div>
    </div>
  );
};

export default Login;
