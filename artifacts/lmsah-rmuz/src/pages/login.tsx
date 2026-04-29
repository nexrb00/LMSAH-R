import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Bot, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SiGoogle } from "react-icons/si";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    // Simulate auth delay
    setTimeout(() => {
      setLocation("/dashboard");
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-20 min-h-[80vh] flex items-center justify-center relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-border/50 bg-background/60 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center space-y-4 pt-8">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 glow-box">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">تسجيل الدخول</CardTitle>
            <CardDescription>مرحباً بعودتك إلى لوحة تحكم لمسة رموز</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <Button 
              variant="outline" 
              className="w-full h-12 text-md gap-3 border-border hover:bg-secondary/50"
              onClick={() => handleLogin()}
              disabled={isLoading}
            >
              <SiGoogle className="w-5 h-5" />
              تسجيل الدخول عبر Google
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">أو بالبريد الإلكتروني</span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    className="pr-9" 
                    dir="ltr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <a href="#" className="text-xs text-primary hover:underline">نسيت كلمة المرور؟</a>
                </div>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type="password" className="pr-9" required />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 text-lg bg-primary hover:bg-primary/90 mt-2" disabled={isLoading}>
                {isLoading ? "جاري الدخول..." : "دخول"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center pb-8">
            <p className="text-sm text-muted-foreground">
              ليس لديك حساب؟ <a href="/register" className="text-primary hover:underline font-medium">سجل الآن مجاناً</a>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
