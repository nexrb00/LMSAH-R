import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { useListServices, getListServicesQueryKey } from "@workspace/api-client-react";
import { ArrowRight, Bot, CheckCircle2, ChevronLeft, Sparkles, Zap, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function ServiceDetail() {
  const params = useParams();
  const slug = params.slug;
  
  const { data: services, isLoading } = useListServices({ query: { queryKey: getListServicesQueryKey() } });
  
  const service = services?.find(s => s.slug === slug);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 space-y-8">
        <Skeleton className="h-8 w-32 bg-secondary" />
        <Skeleton className="h-20 w-3/4 bg-secondary" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2 space-y-4"><Skeleton className="h-64 w-full bg-secondary" /></div>
          <div className="space-y-4"><Skeleton className="h-96 w-full bg-secondary" /></div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-bold mb-4 text-destructive">الخدمة غير موجودة</h1>
        <p className="text-muted-foreground mb-8">عذراً، لم نتمكن من العثور على الخدمة المطلوبة.</p>
        <Link href="/services">
          <Button>العودة للخدمات</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header Section */}
      <section className="relative pt-20 pb-16 border-b border-border/40 bg-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 mix-blend-screen" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/services" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowRight className="mr-2 w-4 h-4" />
            العودة للخدمات
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 rounded-2xl bg-primary/10 border-2 border-primary/30 flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(168,85,247,0.2)]"
            >
              <Bot className="w-12 h-12 text-primary" />
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex-1"
            >
              <Badge variant="outline" className="mb-3 bg-secondary border-border">{service.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{service.name}</h1>
              <p className="text-xl text-accent font-medium">{service.tagline}</p>
            </motion.div>
            
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full md:w-auto"
            >
              <Link href={`/register?service=${service.id}`}>
                <Button size="lg" className="w-full md:w-auto h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  ابدأ مع هذا الوكيل <ChevronLeft className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" /> عن الخدمة
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </section>

            <Separator className="bg-border/50" />

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-accent" /> المميزات الأساسية
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feature, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30 border border-border/50"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </section>
            
            <Separator className="bg-border/50" />

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Wrench className="w-6 h-6 text-muted-foreground" /> الأدوات المستخدمة
              </h2>
              <div className="flex flex-wrap gap-3">
                {service.tools.map((tool, i) => (
                  <Badge key={i} variant="secondary" className="px-4 py-2 text-sm bg-secondary border border-border/50">
                    {tool}
                  </Badge>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="sticky top-24 p-6 rounded-2xl bg-card border border-primary/20 shadow-[0_0_40px_rgba(168,85,247,0.1)] flex flex-col gap-6"
            >
              <h3 className="text-xl font-bold">جاهز لتوظيف هذا الوكيل؟</h3>
              <p className="text-muted-foreground text-sm">
                يمكنك ربط هذا الوكيل بمتجرك في سلة والبدء فوراً. جميع باقاتنا تتيح لك الوصول للوكلاء.
              </p>
              
              <div className="space-y-3">
                <Link href={`/register?service=${service.id}`} className="block w-full">
                  <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white">
                    تسجيل حساب جديد
                  </Button>
                </Link>
                <Link href="/pricing" className="block w-full">
                  <Button variant="outline" className="w-full h-12">
                    الاطلاع على الباقات
                  </Button>
                </Link>
              </div>
              
              <div className="pt-4 border-t border-border/50 text-xs text-center text-muted-foreground">
                تحتاج مساعدة في اختيار الوكيل المناسب؟ تواصل مع الدعم الفني.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
