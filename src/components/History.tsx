import { motion } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const historyEvents = [
  {
    year: "2019",
    title: "Pradžia",
    description: "Serverio idėjos gimimas ir pirmieji žingsniai",
    image: "https://mc-heads.net/body/MHF_Steve/128",
    color: "emerald",
  },
  {
    year: "2020",
    title: "Pirmasis eventas",
    description: "Hunger Games renginys, kurį laimėjo Dariuscxz",
    image: "https://mc-heads.net/body/MHF_Herobrine/128",
    color: "gold",
  },
  {
    year: "2020",
    title: "Nuotykių žemė",
    description: "Startuoja populiariausias serverio projektas",
    image: "https://mc-heads.net/body/MHF_Alex/128",
    color: "diamond",
  },
  {
    year: "2021",
    title: "Vienuolynas",
    description: "Atidarytas Vienuolyno projektas su nauja patirtimi",
    image: "https://mc-heads.net/body/MHF_Villager/128",
    color: "gold",
  },
  {
    year: "2022",
    title: "Mod-pack'ai",
    description: "Pridėti mod-pack'ai, kurie pagyvino serverio patirtį",
    image: "https://mc-heads.net/body/MHF_Enderman/128",
    color: "redstone",
  },
  {
    year: "2023",
    title: "Bendruomenės augimas",
    description: "Pasiekėme 500+ žaidėjų bendruomenę",
    image: "https://mc-heads.net/body/MHF_Creeper/128",
    color: "emerald",
  },
  {
    year: "2024",
    title: "Nauji horizontai",
    description: "Serveris tęsia savo kelionę su naujomis galimybėmis",
    image: "https://mc-heads.net/body/MHF_Pig/128",
    color: "diamond",
  },
  {
    year: "2025",
    title: "Šiandien",
    description: "Tęsiame kurti nuostabius nuotykius kartu",
    image: "https://mc-heads.net/body/MHF_Skeleton/128",
    color: "gold",
  },
];

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  emerald: { bg: "bg-emerald", border: "border-emerald", text: "text-emerald" },
  gold: { bg: "bg-gold", border: "border-gold", text: "text-gold" },
  diamond: { bg: "bg-diamond", border: "border-diamond", text: "text-diamond" },
  redstone: { bg: "bg-redstone", border: "border-redstone", text: "text-redstone" },
};

export const History = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? historyEvents.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === historyEvents.length - 1 ? 0 : prev + 1));
  };

  const activeEvent = historyEvents[activeIndex];
  const colors = colorClasses[activeEvent.color];

  return (
    <section className="py-24 relative overflow-hidden" id="istorija">
      {/* Background */}
      <div className="absolute inset-0 bg-card" />
      <div className="absolute inset-0 stone-texture opacity-20" />
      
      {/* Floating blocks decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-muted/30 minecraft-block"
            style={{
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 2) * 70}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-pixel text-2xl md:text-4xl text-foreground mb-4 text-shadow-minecraft">
            ARGO <span className="text-gold">ISTORIJA</span>
          </h2>
          <p className="font-minecraft text-xl text-muted-foreground max-w-2xl mx-auto">
            Per metus serverio esmė keitėsi daugybę kartų – nuo Hardcore režimo iki rolių žaidimo.
          </p>
        </motion.div>

        {/* Main Content - Book Style */}
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="relative bg-background border-4 border-border minecraft-block"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {/* Book spine decoration */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border -ml-0.5 hidden md:block" />
            
            <div className="grid md:grid-cols-2 min-h-[400px]">
              {/* Left page - Character display */}
              <div className="relative p-8 flex flex-col items-center justify-center bg-muted/20">
                {/* Character frame */}
                <motion.div
                  key={activeIndex}
                  className={`relative p-6 border-4 ${colors.border} minecraft-block bg-background`}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Corner decorations */}
                  <div className={`absolute -top-2 -left-2 w-4 h-4 ${colors.bg}`} />
                  <div className={`absolute -top-2 -right-2 w-4 h-4 ${colors.bg}`} />
                  <div className={`absolute -bottom-2 -left-2 w-4 h-4 ${colors.bg}`} />
                  <div className={`absolute -bottom-2 -right-2 w-4 h-4 ${colors.bg}`} />
                  
                  <motion.img 
                    src={activeEvent.image} 
                    alt={activeEvent.title}
                    className="w-24 h-36 md:w-32 md:h-48 object-contain"
                    style={{ imageRendering: 'pixelated' }}
                    animate={{ 
                      y: [0, -5, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Year badge below character */}
                <motion.div
                  key={`year-${activeIndex}`}
                  className={`mt-6 px-6 py-2 ${colors.bg} minecraft-block`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="font-pixel text-lg text-white">
                    {activeEvent.year}
                  </span>
                </motion.div>
              </div>

              {/* Right page - Content */}
              <div className="p-8 flex flex-col justify-center">
                <motion.div
                  key={`content-${activeIndex}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className={`font-pixel text-xl md:text-2xl mb-4 ${colors.text}`}>
                    {activeEvent.title}
                  </h3>
                  <p className="font-minecraft text-xl text-muted-foreground leading-relaxed mb-8">
                    {activeEvent.description}
                  </p>

                  {/* Navigation */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={goToPrev}
                      className="minecraft-block"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>

                    {/* Page indicator */}
                    <div className="flex items-center gap-2">
                      {historyEvents.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveIndex(i)}
                          className={`w-3 h-3 minecraft-block transition-colors ${
                            i === activeIndex 
                              ? colorClasses[historyEvents[i].color].bg 
                              : 'bg-border hover:bg-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={goToNext}
                      className="minecraft-block"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Progress bar at bottom */}
            <div className="h-1 bg-border">
              <motion.div
                className={`h-full ${colors.bg}`}
                animate={{ width: `${((activeIndex + 1) / historyEvents.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        </div>

        {/* More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
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
