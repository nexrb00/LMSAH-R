import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { Bot, MessageCircle, X, Send, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: "bot", text: "هلا والله بك، شكثر يسعدني أساعدك اليوم؟" }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    setChatMessages(prev => [...prev, { role: "user", text: currentMessage }]);
    setCurrentMessage("");
    
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: "bot", text: "أبشر، ثواني وبكون معك. فريق الدعم مشغول شوي بس ماراح نتأخر عليك." }]);
    }, 1000);
  };

  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/services", label: "الخدمات" },
    { href: "/design-studio", label: "استوديو التصميم" },
    { href: "/pricing", label: "الباقات" },
    { href: "/dashboard", label: "لوحة التحكم" },
    { href: "/admin", label: "التواصل" },
  ];

  return (
    <div className="min-h-screen flex flex-col relative font-sans text-foreground bg-background selection:bg-primary/30">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50 gold-glow">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <span className="font-bold text-xl tracking-tight">لمسة رموز</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${location === link.href ? "text-primary" : "text-muted-foreground"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-sm">تسجيل الدخول</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box shadow-[0_0_15px_rgba(168,85,247,0.5)]">ابدأ مجاناً</Button>
            </Link>
          </div>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-right">القائمة</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className={`text-lg font-medium transition-colors hover:text-primary ${location === link.href ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="h-px bg-border my-4" />
                <Link href="/login">
                  <Button variant="ghost" className="w-full justify-start text-lg">تسجيل الدخول</Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full justify-start text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(168,85,247,0.5)]">ابدأ مجاناً</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1 w-full">
        {children}
      </main>

      <footer className="border-t border-border/40 bg-secondary/30 mt-auto">
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight">لمسة رموز</span>
          </div>
          
          <div className="text-sm text-muted-foreground text-center md:text-right space-y-1">
            <p>واتساب: <a href="https://wa.me/966508047159" className="hover:text-primary transition-colors" dir="ltr">050 804 7159</a></p>
            <p>البريد: <a href="mailto:zoooz2426@gmail.com" className="hover:text-primary transition-colors">zoooz2426@gmail.com</a></p>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} منصة متخصصة لمتاجر سلة
          </div>
        </div>
      </footer>

      {/* Floating Chat Bubble */}
      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <SheetTrigger asChild>
          <Button 
            className="fixed bottom-6 left-6 h-14 rounded-full px-6 shadow-2xl bg-secondary border border-primary/30 hover:bg-secondary/80 z-50 flex items-center gap-3 glow-box group"
          >
            <MessageCircle className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            <div className="flex flex-col items-start">
              <span className="text-sm font-bold text-foreground">روبوت الدعم 24/7</span>
              <span className="text-xs text-muted-foreground">يتحدث الخليجية</span>
            </div>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[350px] sm:w-[400px] flex flex-col p-0 border-r border-border/40">
          <SheetHeader className="p-4 border-b border-border/40 bg-secondary/50 text-right">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
                    <Bot className="w-6 h-6 text-primary" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                </div>
                <div>
                  <SheetTitle className="text-lg">روبوت لمسة رموز</SheetTitle>
                  <SheetDescription className="text-xs">متصل الآن - جاهز لخدمتك</SheetDescription>
                </div>
              </div>
            </div>
          </SheetHeader>
          
          <ScrollArea className="flex-1 p-4">
            <div className="flex flex-col gap-4">
              {chatMessages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                      msg.role === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-br-sm' 
                        : 'bg-secondary text-secondary-foreground rounded-bl-sm border border-border/50'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t border-border/40 bg-background">
            <div className="flex items-center gap-2">
              <Input 
                placeholder="اكتب رسالتك هنا..." 
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="bg-secondary/50 border-border/50 focus-visible:ring-primary/50"
              />
              <Button size="icon" onClick={handleSendMessage} className="bg-primary hover:bg-primary/90 shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
