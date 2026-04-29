import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle2, Crown, Sparkles } from "lucide-react";
import { useListPlans, getListPlansQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function Pricing() {
  const { data: plans, isLoading } = useListPlans({ query: { queryKey: getListPlansQueryKey() } });

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="max-w-3xl mx-auto text-center mb-16 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20 gap-2">
            <Crown className="w-4 h-4" />
            استثمارك الأفضل
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">باقات تناسب نمو متجرك</h1>
          <p className="text-xl text-muted-foreground">
            جميع باقاتنا تشمل فترة تجريبية مجانية لمدة 15 يوماً. اختر الباقة المناسبة لحجم أعمالك وانطلق.
          </p>
        </motion.div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Array(3).fill(0).map((_, i) => (
            <Card key={i} className="bg-secondary/20 border-border/40">
              <CardHeader><Skeleton className="h-8 w-1/2 bg-secondary" /></CardHeader>
              <CardContent><Skeleton className="h-48 w-full bg-secondary" /></CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans?.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`relative h-full flex flex-col bg-background ${plan.highlighted ? 'border-primary shadow-[0_0_30px_rgba(168,85,247,0.15)]' : 'border-border/40 hover:border-primary/50'} transition-colors`}>
                {plan.highlighted && (
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary to-accent rounded-t-xl" />
                )}
                <CardHeader className="text-center pb-8 pt-8">
                  {plan.highlighted && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-sm py-1 px-4">
                      الخيار المفضل
                    </Badge>
                  )}
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-base font-medium text-muted-foreground">{plan.tagline}</CardDescription>
                  <div className="mt-8 flex items-baseline justify-center gap-2">
                    <span className="text-6xl font-extrabold text-foreground">{plan.priceSar}</span>
                    <div className="flex flex-col text-right">
                      <span className="text-muted-foreground font-medium text-sm">ر.س</span>
                      <span className="text-muted-foreground font-medium text-sm">/ {plan.period}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-4">
                    <div className="text-sm font-semibold text-foreground mb-4">ماذا تشمل الباقة؟</div>
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-8 pb-8">
                  <Link href={`/register?plan=${plan.id}`} className="w-full">
                    <Button 
                      className={`w-full h-14 text-lg font-bold rounded-xl ${
                        plan.highlighted 
                          ? 'bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]' 
                          : 'bg-secondary hover:bg-secondary/80 text-foreground border border-border/50'
                      }`}
                    >
                      ابدأ تجربتك المجانية
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-20 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">لديك متجر ضخم أو احتياجات خاصة؟</h2>
        <p className="text-muted-foreground mb-8">
          تواصل معنا لتصميم باقة مخصصة تناسب حجم أعمالك وتوفر لك وكلاء ذكاء اصطناعي مخصصين.
        </p>
        <Link href="/admin">
          <Button variant="outline" size="lg" className="h-12 px-8 border-primary/50 text-primary hover:bg-primary/10">
            تواصل مع المبيعات
          </Button>
        </Link>
      </div>
    </div>
  );
}
