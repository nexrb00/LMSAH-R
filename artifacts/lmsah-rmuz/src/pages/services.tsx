import { motion } from "framer-motion";
import { Link } from "wouter";
import { Bot, ChevronLeft, Search, Sparkles } from "lucide-react";
import { useListServices, getListServicesQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Services() {
  const { data: services, isLoading } = useListServices({ query: { queryKey: getListServicesQueryKey() } });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services?.filter(s => 
    s.name.includes(searchQuery) || 
    s.description.includes(searchQuery) ||
    s.category.includes(searchQuery)
  );

  const categories = [...new Set(services?.map(s => s.category) || [])];

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <div className="max-w-3xl mx-auto text-center mb-16 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20">استكشف خدماتنا</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">وكلاء الذكاء الاصطناعي لمتجرك</h1>
          <p className="text-xl text-muted-foreground">
            اختر من بين مجموعة واسعة من الخدمات المصممة خصيصاً لتلبية احتياجات المتاجر الإلكترونية في السوق السعودي.
          </p>
        </motion.div>
        
        <motion.div 
          className="relative max-w-xl mx-auto mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input 
            className="w-full h-14 pr-12 pl-4 rounded-xl bg-secondary/50 border-border/50 text-lg focus-visible:ring-primary"
            placeholder="ابحث عن خدمة (مثال: تصميم، تسويق، تحليل...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <Card key={i} className="bg-secondary/20 border-border/40 h-[300px]">
              <CardHeader>
                <Skeleton className="w-12 h-12 rounded-xl mb-4 bg-secondary" />
                <Skeleton className="h-6 w-3/4 bg-secondary" />
              </CardHeader>
              <CardContent><Skeleton className="h-20 w-full bg-secondary" /></CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-16">
          {categories.map((category, catIdx) => {
            const categoryServices = filteredServices?.filter(s => s.category === category);
            if (!categoryServices?.length) return null;

            return (
              <div key={category} className="space-y-8">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold">{category}</h2>
                  <div className="flex-1 h-px bg-border/50" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryServices.map((service, i) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link href={`/services/${service.slug}`}>
                        <Card className="bg-background border-border/40 hover:border-primary/50 hover:bg-secondary/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] cursor-pointer h-full flex flex-col group">
                          <CardHeader>
                            <div className="flex justify-between items-start mb-4">
                              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                                <Bot className="w-6 h-6 text-primary" />
                              </div>
                              <Badge variant="secondary" className="bg-secondary/50 font-normal opacity-0 group-hover:opacity-100 transition-opacity">
                                قراءة المزيد
                              </Badge>
                            </div>
                            <CardTitle className="text-xl group-hover:text-primary transition-colors">{service.name}</CardTitle>
                            <CardDescription className="text-sm font-medium text-accent">{service.tagline}</CardDescription>
                          </CardHeader>
                          <CardContent className="flex-1">
                            <p className="text-muted-foreground text-sm line-clamp-3">{service.description}</p>
                          </CardContent>
                          <CardFooter className="border-t border-border/40 pt-4 mt-auto">
                            <div className="flex items-center text-sm font-medium text-primary w-full justify-between">
                              <span>استكشف الوكيل</span>
                              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
                            </div>
                          </CardFooter>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
          
          {filteredServices?.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-2">لا توجد نتائج</h3>
              <p className="text-muted-foreground">لم نتمكن من العثور على خدمات تطابق بحثك. جرب كلمات مفتاحية أخرى.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
