import { motion } from "framer-motion";
import { Link } from "wouter";
import { Activity, Bot, ChevronLeft, CreditCard, PlayCircle, Settings, ShoppingBag, Users, Zap } from "lucide-react";
import { useGetStats, getGetStatsQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const { data: stats, isLoading } = useGetStats({ query: { queryKey: getGetStatsQueryKey() } });

  const recentActivity = [
    { id: 1, title: "تم تحليل بيانات مبيعات الأسبوع الماضي", agent: "وكيل التحليل", time: "منذ ساعتين", status: "completed" },
    { id: 2, title: "جاري تصميم 5 منشورات انستقرام للمنتج الجديد", agent: "وكيل التصميم", time: "الآن", status: "processing" },
    { id: 3, title: "تم إطلاق حملة سناب شات المستهدفة", agent: "وكيل الحملات", time: "بالأمس", status: "completed" },
    { id: 4, title: "تحديث نصوص المنتجات لتحسين محركات البحث", agent: "وكيل المحتوى", time: "قبل يومين", status: "completed" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">مرحباً، محمد 👋</h1>
          <p className="text-muted-foreground">إليك نظرة عامة على أداء وكلاء الذكاء الاصطناعي لمتجرك.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/services">
            <Button variant="outline" className="border-primary/30 text-primary bg-primary/5 hover:bg-primary/10">
              <Bot className="w-4 h-4 ml-2" /> توظيف وكيل جديد
            </Button>
          </Link>
          <Button className="bg-secondary text-foreground hover:bg-secondary/80">
            <Settings className="w-4 h-4 ml-2" /> إعدادات المتجر
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: "الخدمات النشطة", value: stats?.activeAgents || "0", icon: Zap, color: "text-accent", bg: "bg-accent/10" },
          { title: "العملاء المستهدفين", value: stats?.totalLeads || "0", icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
          { title: "إجمالي الخدمات المتاحة", value: stats?.totalServices || "0", icon: ShoppingBag, color: "text-green-400", bg: "bg-green-400/10" },
          { title: "سرعة الاستجابة", value: `${stats?.avgResponseSeconds || 0}ث`, icon: Activity, color: "text-primary", bg: "bg-primary/10" },
        ].map((stat, i) => (
          <Card key={i} className="bg-background border-border/40">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`w-8 h-8 rounded-md flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16 bg-secondary" />
              ) : (
                <div className="text-3xl font-bold">{stat.value}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-border/40 bg-secondary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-primary" /> حالة وكلاء الذكاء الاصطناعي
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium flex items-center gap-2"><Bot className="w-4 h-4 text-accent"/> وكيل تصميم المحتوى</span>
                    <span className="text-accent">قيد العمل (75%)</span>
                  </div>
                  <Progress value={75} className="h-2 bg-secondary" />
                  <p className="text-xs text-muted-foreground text-left" dir="ltr">Generating 5 Instagram posts...</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium flex items-center gap-2"><Bot className="w-4 h-4 text-primary"/> وكيل خدمة العملاء</span>
                    <span className="text-primary">نشط (يرد على المحادثات)</span>
                  </div>
                  <Progress value={100} className="h-2 bg-secondary" />
                  <p className="text-xs text-muted-foreground text-left" dir="ltr">Handled 14 inquiries today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-background">
            <CardHeader>
              <CardTitle>سجل النشاطات الأخير</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, i) => (
                  <motion.div 
                    key={activity.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 border border-border/30 hover:border-primary/30 transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${activity.status === 'processing' ? 'bg-accent animate-pulse' : 'bg-primary'}`} />
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-1">{activity.title}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Bot className="w-3 h-3" /> {activity.agent}</span>
                        <span>•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="border-primary/30 bg-background shadow-[0_0_30px_rgba(168,85,247,0.05)]">
            <CardHeader>
              <CardTitle className="text-lg">حالة الباقة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end mb-4">
                <div>
                  <Badge className="bg-primary text-white mb-2">الباقة الاحترافية</Badge>
                  <p className="text-sm font-medium">متبقي 12 يوماً على التجديد</p>
                </div>
                <CreditCard className="w-8 h-8 text-muted-foreground/30" />
              </div>
              <Progress value={60} className="h-1.5 bg-secondary" />
              <Button className="w-full mt-6 bg-secondary hover:bg-secondary/80 text-foreground" variant="outline">
                ترقية الباقة
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-secondary/20">
            <CardHeader>
              <CardTitle className="text-lg">استوديو التصميم السريع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground mb-4">وصول سريع لأدوات التصميم المرتبطة بمتجرك.</p>
              <Button variant="outline" className="w-full justify-between bg-background border-border/50 hover:bg-primary/10 hover:text-primary transition-all" onClick={() => window.open('https://express.adobe.com', '_blank')}>
                Adobe Express
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between bg-background border-border/50 hover:bg-primary/10 hover:text-primary transition-all" onClick={() => window.open('https://www.canva.com', '_blank')}>
                Canva
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Link href="/design-studio" className="block mt-2 text-center text-sm text-primary hover:underline">
                عرض جميع الأدوات
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
