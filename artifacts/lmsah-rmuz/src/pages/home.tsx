import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Sparkles, Zap, Shield, Cpu, ChevronLeft, Bot, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useListServices, getListServicesQueryKey, useListPlans, getListPlansQueryKey, useListTestimonials, getListTestimonialsQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

import heroImg from "@/assets/hero.png";
import agentsImg from "@/assets/agents.png";
import dashboardImg from "@/assets/dashboard.png";

export default function Home() {
  const { data: services, isLoading: isLoadingServices } = useListServices({ query: { queryKey: getListServicesQueryKey() } });
  const { data: plans, isLoading: isLoadingPlans } = useListPlans({ query: { queryKey: getListPlansQueryKey() } });
  const { data: testimonials, isLoading: isLoadingTestimonials } = useListTestimonials({ query: { queryKey: getListTestimonialsQueryKey() } });

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/80 z-10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
          {heroImg ? (
             <img src={heroImg} alt="Hero Background" className="w-full h-full object-cover opacity-60" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/10" />
          )}
        </div>
        
        <div className="container relative z-20 mx-auto px-4 flex flex-col items-center text-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-1.5 border-primary/50 bg-primary/10 text-primary-foreground text-sm font-medium gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              الجيل القادم من التسويق بالذكاء الاصطناعي
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            حول متجرك في <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent glow-text">سلة</span> إلى آلة مبيعات تعمل بالذكاء الاصطناعي
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            لمسة رموز تقدم لك وكلاء ذكاء اصطناعي متخصصين لإدارة حملاتك، تصميم محتواك، وتحليل بياناتك على مدار الساعة.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/register">
              <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] rounded-xl group w-full sm:w-auto">
                ابدأ تجربتك المجانية
                <ChevronLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-border/50 bg-secondary/50 backdrop-blur-sm hover:bg-secondary rounded-xl w-full sm:w-auto">
                استكشف خدماتنا
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="py-24 bg-background relative border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                التسويق لم يعد كما كان. <br />
                <span className="text-primary">مرحباً بك في المستقبل.</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                في لمسة رموز، نحن لا نقدم أدوات عادية. نحن نوفر لك وكلاء ذكاء اصطناعي متكاملين يفهمون السوق الخليجي، يحللون بيانات متجرك في سلة، ويتخذون قرارات تسويقية ذكية لزيادة مبيعاتك.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Zap, title: "سرعة في التنفيذ", desc: "أطلق حملاتك في دقائق بدلاً من أيام." },
                  { icon: Cpu, title: "دقة مدعومة بالبيانات", desc: "قرارات تعتمد على تحليل سلوك عملائك." },
                  { icon: Shield, title: "أمان وموثوقية", desc: "بيانات متجرك في سلة محمية بأعلى المعايير." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden border border-border/50 glow-box bg-secondary/30"
            >
              {agentsImg ? (
                <img src={agentsImg} alt="AI Agents" className="w-full h-auto object-cover" />
              ) : (
                <div className="w-full aspect-video bg-gradient-to-tr from-secondary to-background flex items-center justify-center">
                  <Bot className="w-24 h-24 text-primary/40" />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-24 bg-secondary/20 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">وكلاء الذكاء الاصطناعي</h2>
              <p className="text-muted-foreground text-lg">اختر الوكيل المناسب لاحتياجات متجرك ودعه يقوم بالعمل الشاق نيابة عنك.</p>
            </div>
            <Link href="/services">
              <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10">
                عرض كل الخدمات <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoadingServices ? (
              Array(3).fill(0).map((_, i) => (
                <Card key={i} className="bg-background/50 border-border/40 overflow-hidden">
                  <CardHeader>
                    <Skeleton className="w-12 h-12 rounded-lg mb-4 bg-secondary" />
                    <Skeleton className="h-6 w-3/4 bg-secondary" />
                    <Skeleton className="h-4 w-full mt-2 bg-secondary" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full bg-secondary" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-full bg-secondary" />
                  </CardFooter>
                </Card>
              ))
            ) : (
              services?.slice(0, 3).map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link href={`/services/${service.slug}`}>
                    <Card className="bg-background border-border/40 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] cursor-pointer h-full flex flex-col group">
                      <CardHeader>
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-4 group-hover:scale-110 transition-transform">
                          <Bot className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">{service.name}</CardTitle>
                        <CardDescription className="text-sm font-medium text-accent">{service.tagline}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <p className="text-muted-foreground text-sm line-clamp-3">{service.description}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {service.features.slice(0, 2).map((feat, j) => (
                            <Badge key={j} variant="secondary" className="bg-secondary/50 text-xs">{feat}</Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                          اكتشف المزيد <ChevronLeft className="w-4 h-4" />
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-24 bg-background relative border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden border border-border/50 glow-box bg-secondary/30 order-2 lg:order-1"
            >
              {dashboardImg ? (
                <img src={dashboardImg} alt="Analytics Dashboard" className="w-full h-auto object-cover" />
              ) : (
                <div className="w-full aspect-video bg-gradient-to-br from-background to-secondary flex items-center justify-center">
                  <div className="text-muted-foreground flex flex-col items-center gap-2">
                    <Sparkles className="w-12 h-12 text-primary" />
                    <span>لوحة تحكم ذكية</span>
                  </div>
                </div>
              )}
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8 order-1 lg:order-2"
            >
              <Badge variant="outline" className="px-4 py-1.5 border-accent/50 text-accent bg-accent/10">التحكم الكامل</Badge>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                لوحة تحكم واحدة <br />
                <span className="text-primary">لكل عملياتك التسويقية</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                تتبع أداء حملاتك، تواصل مع فريق الدعم، وقم بإدارة وكلاء الذكاء الاصطناعي الخاصة بك من مكان واحد مصمم خصيصاً لتجار سلة.
              </p>
              <Link href="/dashboard" className="inline-block mt-4">
                <Button variant="secondary" size="lg" className="h-12 px-6 border border-border/50 hover:bg-secondary">
                  استكشف لوحة التحكم <ExternalLink className="mr-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-24 bg-secondary/10 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">باقات مصممة لنمو متجرك</h2>
            <p className="text-muted-foreground text-lg">اختر الباقة التي تناسب حجم متجرك في سلة. جميع الباقات تتضمن فترة تجريبية مجانية لمدة 15 يوماً.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {isLoadingPlans ? (
              Array(3).fill(0).map((_, i) => (
                <Card key={i} className="bg-background/50 border-border/40">
                  <CardHeader><Skeleton className="h-8 w-1/2 bg-secondary" /></CardHeader>
                  <CardContent><Skeleton className="h-32 w-full bg-secondary" /></CardContent>
                </Card>
              ))
            ) : (
              plans?.map((plan, i) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Card className={`relative h-full flex flex-col bg-background ${plan.highlighted ? 'border-primary shadow-[0_0_30px_rgba(168,85,247,0.15)]' : 'border-border/40'}`}>
                    {plan.highlighted && (
                      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-accent" />
                    )}
                    <CardHeader className="text-center pb-8 pt-8">
                      {plan.highlighted && (
                        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white">الأكثر طلباً</Badge>
                      )}
                      <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                      <CardDescription className="text-sm font-medium">{plan.tagline}</CardDescription>
                      <div className="mt-6 flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-extrabold">{plan.priceSar}</span>
                        <span className="text-muted-foreground font-medium">ر.س / {plan.period}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-4">
                        {plan.features.map((feature, j) => (
                          <li key={j} className="flex items-center gap-3 text-sm">
                            <Sparkles className="w-4 h-4 text-primary shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="pt-6 pb-8">
                      <Link href={`/register?plan=${plan.id}`} className="w-full">
                        <Button className={`w-full h-12 text-md ${plan.highlighted ? 'bg-primary hover:bg-primary/90 text-white' : 'bg-secondary hover:bg-secondary/80 text-foreground'}`}>
                          ابدأ تجربتك المجانية
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">ماذا يقول تجار سلة عنا</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {isLoadingTestimonials ? (
              Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-48 w-full bg-secondary/50 rounded-2xl" />)
            ) : (
              testimonials?.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-secondary/30 border border-border/50 relative"
                >
                  <div className="flex text-accent mb-4">
                    {Array(5).fill(0).map((_, j) => (
                      <Sparkles key={j} className={`w-4 h-4 ${j < t.rating ? 'fill-accent' : 'text-muted/30'}`} />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-6 leading-relaxed">"{t.message}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{t.name}</h4>
                      <p className="text-xs text-primary">{t.store}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto flex flex-col items-center gap-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold">جاهز للانطلاق بمتجرك؟</h2>
            <p className="text-xl text-muted-foreground">
              لا تدع منافسيك يسبقونك. ابدأ استخدام الذكاء الاصطناعي اليوم وشاهد مبيعاتك تنمو.
            </p>
            <Link href="/register">
              <Button size="lg" className="h-16 px-10 text-xl bg-primary hover:bg-primary/90 text-white shadow-[0_0_40px_rgba(168,85,247,0.5)] rounded-xl mt-4">
                سجل الآن - 15 يوم مجاناً
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
