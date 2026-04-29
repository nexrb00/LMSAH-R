import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, MessageSquare, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { useCreateContactMessage, ContactInputKind } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiWhatsapp } from "react-icons/si";

const formSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phone: z.string().optional(),
  subject: z.string().min(2, "الموضوع مطلوب"),
  message: z.string().min(5, "الرسالة قصيرة جداً"),
  kind: z.nativeEnum(ContactInputKind),
});

export default function Admin() {
  const createMessage = useCreateContactMessage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      kind: ContactInputKind.inquiry,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createMessage.mutate({ data: values }, {
      onSuccess: () => {
        toast.success("تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.");
        form.reset();
      },
      onError: () => {
        toast.error("حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.");
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">نحن هنا لمساعدتك</h1>
          <p className="text-muted-foreground text-lg">تواصل معنا لأي استفسار، شكوى، أو اقتراح يخص منصة لمسة رموز.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-secondary/20 border-border/40 text-center hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 mx-auto rounded-full bg-[#25D366]/20 flex items-center justify-center mb-2">
                  <SiWhatsapp className="w-6 h-6 text-[#25D366]" />
                </div>
                <CardTitle className="text-lg">واتساب الدعم الفني</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4" dir="ltr">+966 50 804 7159</p>
                <Button variant="outline" className="w-full border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10" onClick={() => window.open("https://wa.me/966508047159", "_blank")}>
                  مراسلة الآن
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-secondary/20 border-border/40 text-center hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-2">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">البريد الإلكتروني</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 font-mono">zoooz2426@gmail.com</p>
                <Button variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary/10" onClick={() => window.location.href = "mailto:zoooz2426@gmail.com"}>
                  إرسال بريد
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-background border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  نموذج التواصل المباشر
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>الاسم</FormLabel>
                            <FormControl><Input placeholder="الاسم الكامل" {...field} /></FormControl>
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
                            <FormControl><Input type="email" placeholder="name@example.com" dir="ltr" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>رقم الجوال (اختياري)</FormLabel>
                            <FormControl><Input placeholder="05xxxxxxxx" dir="ltr" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="kind"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>نوع الرسالة</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value={ContactInputKind.inquiry}>استفسار عام</SelectItem>
                                <SelectItem value={ContactInputKind.support}>دعم فني</SelectItem>
                                <SelectItem value={ContactInputKind.complaint}>شكوى</SelectItem>
                                <SelectItem value={ContactInputKind.suggestion}>اقتراح</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الموضوع</FormLabel>
                          <FormControl><Input placeholder="عنوان الرسالة" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>تفاصيل الرسالة</FormLabel>
                          <FormControl>
                            <Textarea placeholder="اكتب رسالتك هنا بوضوح لنتمكن من خدمتك بشكل أفضل..." className="min-h-[120px]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full md:w-auto px-8" 
                      disabled={createMessage.isPending}
                    >
                      {createMessage.isPending ? "جاري الإرسال..." : (
                        <span className="flex items-center gap-2">إرسال الرسالة <Send className="w-4 h-4 ml-2" /></span>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
