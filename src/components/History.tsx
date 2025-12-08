import { motion } from "framer-motion";
import { Sword, Trophy, Star, Sparkles, Crown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const historyEvents = [
  {
    year: "2019",
    title: "Pradžia",
    description: "Serverio idėjos gimimas ir pirmieji žingsniai",
    icon: Sparkles,
    color: "bg-emerald",
  },
  {
    year: "2020",
    title: "Pirmasis eventas",
    description: "Hunger Games renginys, kurį laimėjo Dariuscxz",
    icon: Trophy,
    color: "bg-gold",
  },
  {
    year: "2020",
    title: "Nuotykių žemė",
    description: "Startuoja populiariausias serverio projektas",
    icon: Star,
    color: "bg-diamond",
  },
  {
    year: "2021",
    title: "Vienuolynas",
    description: "Atidarytas Vienuolyno projektas su nauja patirtimi",
    icon: Crown,
    color: "bg-gold",
  },
  {
    year: "2022",
    title: "Mod-pack'ai",
    description: "Pridėti mod-pack'ai, kurie pagyvino serverio patirtį",
    icon: Sword,
    color: "bg-redstone",
  },
  {
    year: "2023",
    title: "Bendruomenės augimas",
    description: "Pasiekėme 500+ žaidėjų bendruomenę",
    icon: Star,
    color: "bg-emerald",
  },
  {
    year: "2024",
    title: "Nauji horizontai",
    description: "Serveris tęsia savo kelionę su naujomis galimybėmis",
    icon: Sparkles,
    color: "bg-diamond",
  },
  {
    year: "2025",
    title: "Šiandien",
    description: "Tęsiame kurti nuostabius nuotykius kartu",
    icon: Crown,
    color: "bg-gold",
  },
];

export const History = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

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
            ARGO <span className="text-gold">PRIEŠISTORĖ</span>
          </h2>
          <p className="font-minecraft text-xl text-muted-foreground max-w-3xl mx-auto">
            Per metus serverio esmė keitėsi daugybę kartų – nuo Hardcore režimo iki rolių žaidimo.
          </p>
        </motion.div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Timeline Container with horizontal scroll */}
          <div 
            ref={scrollRef}
            className="overflow-x-auto pb-8 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-6 min-w-max px-4">
              {historyEvents.map((event, index) => (
                <motion.div
                  key={index}
                  className="relative flex flex-col items-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Card */}
                  <div className="w-56 bg-background border-4 border-border p-5 minecraft-block hover:border-gold/50 transition-colors group">
                    {/* Year Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1 ${event.color}/20 border-2 ${event.color === 'bg-emerald' ? 'border-emerald' : event.color === 'bg-gold' ? 'border-gold' : event.color === 'bg-diamond' ? 'border-diamond' : 'border-redstone'} mb-4`}>
                      <span className={`font-pixel text-xs ${event.color === 'bg-emerald' ? 'text-emerald' : event.color === 'bg-gold' ? 'text-gold' : event.color === 'bg-diamond' ? 'text-diamond' : 'text-redstone'}`}>
                        {event.year}
                      </span>
                    </div>
                    
                    {/* Icon */}
                    <div className={`w-12 h-12 ${event.color} minecraft-block flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <event.icon className="w-6 h-6 text-accent-foreground" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="font-pixel text-xs text-foreground mb-2">{event.title}</h3>
                    <p className="font-minecraft text-base text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Timeline Connector */}
                  {index < historyEvents.length - 1 && (
                    <div className="absolute top-1/2 -right-3 w-6 h-1 bg-border transform -translate-y-1/2" />
                  )}
                  
                  {/* Timeline Dot */}
                  <div className={`mt-6 w-4 h-4 ${event.color} minecraft-block`} />
                </motion.div>
              ))}
            </div>
            
            {/* Timeline Base Line */}
            <div className="absolute bottom-12 left-0 right-0 h-1 bg-border" />
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center gap-4 mt-4">
            <p className="font-minecraft text-muted-foreground text-sm">
              ← Slinkite horizontaliai →
            </p>
          </div>
        </div>

        {/* More Button */}
        <motion.div
          className="text-center mt-12"
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
