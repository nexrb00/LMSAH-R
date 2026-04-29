import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, Mail, Phone, Rocket, Store, User } from "lucide-react";
import { useListPlans, getListPlansQueryKey, useListServices, getListServicesQueryKey, useCreateLead } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SiGoogle } from "react-icons/si";

const formSchema = z.object({
  fullName: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phone: z.string().min(6, "رقم الجوال غير صحيح"),
  storeName: z.string().min(2, "اسم المتجر مطلوب"),
  storeUrl: z.string().url("رابط المتجر غير صحيح").optional().or(z.literal("")),
  planId: z.string().min(1, "اختر الباقة المطلوبة"),
  serviceId: z.string().optional(),
  notes: z.string().optional(),
});

export default function Register() {
  const [, setLocation] = useLocation();
  const [successData, setSuccessData] = useState<{ startDate: Date, endDate: Date } | null>(null);
  const [isGoogleDialogOpen, setIsGoogleDialogOpen] = useState(false);
  const [googleEmail, setGoogleEmail] = useState("");

  const { data: plans } = useListPlans({ query: { queryKey: getListPlansQueryKey() } });
  const { data: services } = useListServices({ query: { queryKey: getListServicesQueryKey() } });
  const createLead = useCreateLead();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      storeName: "",
      storeUrl: "",
      planId: "",
      serviceId: "none",
      notes: "",
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const planId = params.get("plan");
    const serviceId = params.get("service");

    if (planId) form.setValue("planId", planId);
    if (serviceId) form.setValue("serviceId", serviceId);
  }, [form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createLead.mutate({
      data: {
        ...values,
        serviceId: values.serviceId === "none" ? undefined : values.serviceId,
      }
    }, {
      onSuccess: () => {
        const today = new Date();
        const end = new Date();
        end.setDate(end.getDate() + 15);
        setSuccessData({ startDate: today, endDate: end });
      }
    });
  };

  const handleGoogleSubmit = () => {
    if (!googleEmail || !googleEmail.includes("@")) return;
    setIsGoogleDialogOpen(false);
    form.setValue("email", googleEmail);
    // Focus the next field to encourage completion
    document.getElementById("fullName")?.focus();
  };

  if (successData) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-screen flex items-center justify-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <Card className="max-w-md w-full bg-background border-primary/30 shadow-[0_0_50px_rgba(168,85,247,0.15)] relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary to-accent" />
            <CardHeader className="text-center pt-10">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-green-500">
                <Rocket className="w-8 h-8" />
              </div>
              <CardTitle className="text-3xl text-primary">تم تفعيل باقتك بنجاح!</CardTitle>
              <CardDescription className="text-lg">متجرك الآن جاهز للانطلاق مع الذكاء الاصطناعي</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-secondary/30 p-4 rounded-xl border border-border/50">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <span className="text-muted-foreground block">تاريخ البدء</span>
                    <span className="font-bold text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      {successData.startDate.toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground block">تاريخ الانتهاء</span>
                    <span className="font-bold text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      {successData.endDate.toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">سيتم التواصل معك قريباً لتأكيد ربط المتجر</p>
                <div className="flex items-center justify-center gap-4 text-sm font-medium">
                  <span className="flex items-center gap-1 text-foreground"><Mail className="w-4 h-4" /> zoooz2426@gmail.com</span>
                  <span className="flex items-center gap-1 text-foreground" dir="ltr"><Phone className="w-4 h-4" /> 0508047159</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full h-12 text-lg" onClick={() => setLocation("/dashboard")}>
                الانتقال للوحة التحكم
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">ابدأ تجربتك المجانية</h1>
          <p className="text-muted-foreground">15 يوماً من القوة المطلقة لمتجرك في سلة، بدون بطاقة ائتمانية.</p>
        </div>

        <Card className="border-border/40 bg-secondary/10">
          <CardContent className="pt-6">
            <div className="mb-8">
              <Dialog open={isGoogleDialogOpen} onOpenChange={setIsGoogleDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full h-14 text-lg border-border/50 hover:bg-secondary/80 gap-3">
                    <SiGoogle className="w-5 h-5 text-muted-foreground" />
                    تسجيل سريع عبر Google
                  </Button>
                </DialogTrigger>
                <DialogContent dir="rtl">
                  <DialogHeader>
                    <DialogTitle>تسجيل الدخول باستخدام Google</DialogTitle>
                    <DialogDescription>أدخل بريدك الإلكتروني للمتابعة (محاكاة)</DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Input 
                      placeholder="email@gmail.com" 
                      type="email" 
                      value={googleEmail}
                      onChange={(e) => setGoogleEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsGoogleDialogOpen(false)}>إلغاء</Button>
                    <Button onClick={handleGoogleSubmit}>متابعة</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border/50" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">أو أدخل بياناتك يدوياً</span></div>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الاسم الكامل</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="محمد عبدالله" className="pr-9" id="fullName" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>البريد الإلكتروني</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="name@example.com" type="email" className="pr-9" dir="ltr" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الجوال</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="05xxxxxxxx" className="pr-9" dir="ltr" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="storeName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>اسم متجرك في سلة</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Store className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="متجر الأحلام" className="pr-9" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="storeUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رابط المتجر (اختياري)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://salla.sa/..." dir="ltr" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="planId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الباقة المطلوبة</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر الباقة..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {plans?.map(p => (
                              <SelectItem key={p.id} value={p.id}>{p.name} - {p.priceSar} ر.س</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="serviceId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>وكيل مفضل (اختياري)</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || "none"}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="لست متأكداً بعد" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">لست متأكداً بعد</SelectItem>
                            {services?.map(s => (
                              <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ملاحظات إضافية</FormLabel>
                      <FormControl>
                        <Textarea placeholder="أخبرنا المزيد عن احتياجاتك..." className="resize-none h-24" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-white mt-8"
                  disabled={createLead.isPending}
                >
                  {createLead.isPending ? "جاري الإنشاء..." : "إنشاء حسابي مجاناً"}
                </Button>
                
                <p className="text-center text-xs text-muted-foreground mt-4">
                  بالتسجيل أنت توافق على شروط الخدمة وسياسة الخصوصية الخاصة بمنصة لمسة رموز.
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
