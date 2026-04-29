import { motion } from "framer-motion";
import { ExternalLink, Palette, Video, Wand2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DesignStudio() {
  const graphicTools = [
    { name: "Adobe Firefly", desc: "توليد صور واقعية وتعديل احترافي", url: "https://firefly.adobe.com", tags: ["صور", "تعديل"] },
    { name: "MidJourney", desc: "أقوى أداة لتوليد الصور الفنية والإبداعية", url: "https://www.midjourney.com", tags: ["فن", "توليد"] },
    { name: "DALL·E", desc: "توليد صور دقيقة بناءً على الوصف النصي", url: "https://chat.openai.com", tags: ["صور", "دقة"] },
    { name: "Adobe Express", desc: "تصميم سريع لمنشورات السوشيال ميديا", url: "https://express.adobe.com", tags: ["سوشيال", "سريع"] },
    { name: "Canva", desc: "أداة التصميم الأشهر والأسهل استخداماً", url: "https://www.canva.com", tags: ["قوالب", "سوشيال"] },
  ];

  const motionTools = [
    { name: "CapCut", desc: "تحرير ومونتاج الفيديوهات القابلة للنشر", url: "https://www.capcut.com", tags: ["فيديو", "تيك توك"] },
    { name: "Runway ML", desc: "توليد وتعديل الفيديو بالذكاء الاصطناعي", url: "https://runwayml.com", tags: ["فيديو AI", "تأثيرات"] },
    { name: "Figma", desc: "تصميم واجهات المستخدم والنماذج التفاعلية", url: "https://www.figma.com", tags: ["UI/UX", "مواقع"] },
  ];

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <div className="max-w-3xl mx-auto text-center mb-16 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge variant="outline" className="mb-4 bg-accent/10 text-accent border-accent/20 gap-2">
            <Wand2 className="w-4 h-4" />
            استوديو التصميم
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">أدوات الإبداع بين يديك</h1>
          <p className="text-xl text-muted-foreground">
            مجموعة مختارة من أفضل أدوات الذكاء الاصطناعي للتصميم الجرافيكي والمونتاج، مجمعة في مكان واحد لخدمة متجرك.
          </p>
        </motion.div>
      </div>

      <div className="space-y-20">
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
              <Palette className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">أدوات التصميم الجرافيكي والصور</h2>
              <p className="text-muted-foreground text-sm mt-1">توليد وتعديل الصور لتناسب هويتك البصرية</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {graphicTools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-background border-border/40 hover:border-primary/50 transition-colors h-full flex flex-col group">
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                    <CardDescription>{tool.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      {tool.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-secondary/50">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between hover:bg-primary hover:text-white hover:border-primary transition-all"
                      onClick={() => window.open(tool.url, '_blank')}
                    >
                      تشغيل الأداة
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/30">
              <Video className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">أدوات المونتاج والفيديو</h2>
              <p className="text-muted-foreground text-sm mt-1">إنشاء محتوى مرئي متحرك يجذب الانتباه</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {motionTools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-background border-border/40 hover:border-accent/50 transition-colors h-full flex flex-col group">
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-accent transition-colors">{tool.name}</CardTitle>
                    <CardDescription>{tool.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      {tool.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-secondary/50">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between hover:bg-accent hover:text-background hover:border-accent transition-all"
                      onClick={() => window.open(tool.url, '_blank')}
                    >
                      تشغيل الأداة
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
