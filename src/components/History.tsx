import { motion } from "framer-motion";
import { Sword, Calendar, Trophy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const historyEvents = [
  {
    date: "2020-03-20",
    title: "Pirmasis serverio renginys",
    description: 'Klasikinis „Minecraft" minižaidimas – „Hunger Games", kurį organizavo žaidėjas Adikas. Pergalę pirmajame serverio istorijos renginyje iškovojo Dariuscxz.',
    icon: Trophy,
  },
  {
    date: "2020-04-17",
    title: "Trečiasis Argo serverio renginys",
    description: "Balance Game organizuotas Paulito. Tai reakcijos ir strategijos žaidimas, kuriame geriausiai šiomis savybėmis pasižymėjo Ekgame.",
    icon: Sword,
  },
  {
    date: "2020-04-27",
    title: "Antrasis serverio renginys",
    description: '„Golden Banner" žaidimas – komandinis renginys, sukurtas remiantis „Capture the Flag" ir „King of the Hill" žaidimų idėjomis.',
    icon: Trophy,
  },
];

export const History = () => {
  return (
    <section className="py-24 bg-card relative overflow-hidden" id="istorija">
      {/* Stone Texture Background */}
      <div className="absolute inset-0 stone-texture opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 border-2 border-gold mb-6">
            <Sword className="w-5 h-5 text-gold" />
            <span className="font-minecraft text-gold text-lg">ISTORIJA</span>
          </div>
          <h2 className="font-pixel text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 text-shadow-minecraft">
            ARGO <span className="text-gold">ISTORIJA</span>
          </h2>
          <p className="font-minecraft text-xl text-muted-foreground max-w-3xl mx-auto">
            Per metus serverio esmė keitėsi daugybę kartų – nuo Hardcore režimo iki rolių žaidimo. 
            Siekiant paįvairinti žaidimą, buvo pridėti mod-pack'ai, kurie pagyvino serverio patirtį.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-border transform md:-translate-x-1/2" />

            {historyEvents.map((event, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-gold minecraft-block transform md:-translate-x-1/2 flex items-center justify-center z-10">
                  <event.icon className="w-4 h-4 text-accent-foreground" />
                </div>

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="bg-background border-4 border-border p-6 minecraft-block hover:border-gold/50 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-gold" />
                      <span className="font-minecraft text-gold text-lg">{event.date}</span>
                    </div>
                    <h3 className="font-pixel text-sm text-foreground mb-3">{event.title}</h3>
                    <p className="font-minecraft text-lg text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* More Button */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Button variant="gold" size="lg" asChild>
            <a href="https://argashub.lt/istorija" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-5 h-5" />
              Daugiau Istorijos
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
