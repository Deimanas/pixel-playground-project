import { motion } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useCallback } from "react";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = 'grabbing';
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      if (scrollRef.current) {
        scrollRef.current.style.cursor = 'grab';
      }
    }
  }, [isDragging]);

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

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Timeline scroll container */}
          <div 
            ref={scrollRef}
            className="overflow-x-auto pb-8 scrollbar-hide cursor-grab select-none"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-start min-w-max px-8 md:px-16">
              {historyEvents.map((event, index) => {
                const colors = colorClasses[event.color];
                const isActive = activeIndex === index;
                
                return (
                  <motion.div
                    key={index}
                    className="relative flex flex-col items-center cursor-pointer group"
                    style={{ minWidth: '160px' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setActiveIndex(index)}
                  >
                    {/* Year badge */}
                    <motion.div
                      className={`px-4 py-1 mb-4 minecraft-block transition-all duration-300 ${
                        isActive ? colors.bg : 'bg-muted'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className={`font-pixel text-sm ${isActive ? 'text-white' : 'text-muted-foreground'}`}>
                        {event.year}
                      </span>
                    </motion.div>

                    {/* Character image */}
                    <motion.div
                      className={`relative p-3 border-2 minecraft-block bg-background mb-4 transition-all duration-300 ${
                        isActive ? colors.border : 'border-border'
                      }`}
                      whileHover={{ y: -5 }}
                      animate={isActive ? { y: [0, -5, 0] } : {}}
                      transition={isActive ? { duration: 2, repeat: Infinity } : {}}
                    >
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-16 h-24 object-contain"
                        style={{ imageRendering: 'pixelated' }}
                      />
                      {/* Glow effect for active */}
                      {isActive && (
                        <div className={`absolute inset-0 ${colors.bg} opacity-20 blur-sm -z-10`} />
                      )}
                    </motion.div>

                    {/* Timeline dot and line */}
                    <div className="relative flex items-center w-full">
                      {/* Left line */}
                      {index > 0 && (
                        <div className={`absolute right-1/2 h-1 w-full transition-colors duration-300 ${
                          index <= activeIndex ? colors.bg : 'bg-border'
                        }`} />
                      )}
                      {/* Right line */}
                      {index < historyEvents.length - 1 && (
                        <div className={`absolute left-1/2 h-1 w-full transition-colors duration-300 ${
                          index < activeIndex ? colorClasses[historyEvents[index + 1].color].bg : 'bg-border'
                        }`} />
                      )}
                      {/* Dot */}
                      <motion.div
                        className={`relative z-10 mx-auto w-5 h-5 minecraft-block transition-all duration-300 ${
                          isActive ? colors.bg : 'bg-border'
                        }`}
                        whileHover={{ scale: 1.2 }}
                        animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                        transition={isActive ? { duration: 1.5, repeat: Infinity } : {}}
                      />
                    </div>

                    {/* Title and description below */}
                    <div className="mt-6 text-center px-2">
                      <h3 className={`font-pixel text-xs md:text-sm mb-2 transition-colors duration-300 ${
                        isActive ? colors.text : 'text-muted-foreground'
                      }`}>
                        {event.title}
                      </h3>
                      <p className={`font-minecraft text-xs text-muted-foreground transition-opacity duration-300 max-w-[140px] ${
                        isActive ? 'opacity-100' : 'opacity-60'
                      }`}>
                        {event.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Scroll hint for mobile */}
          <div className="md:hidden flex justify-center mt-4">
            <motion.p 
              className="font-minecraft text-xs text-muted-foreground flex items-center gap-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronLeft className="w-4 h-4" />
              Slinkite horizontaliai
              <ChevronRight className="w-4 h-4" />
            </motion.p>
          </div>
        </div>

        {/* Active Event Detail Card */}
        <motion.div
          key={activeIndex}
          className="mt-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`bg-background border-4 ${colorClasses[historyEvents[activeIndex].color].border} minecraft-block p-6 md:p-8`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`px-4 py-2 ${colorClasses[historyEvents[activeIndex].color].bg} minecraft-block`}>
                <span className="font-pixel text-lg text-white">{historyEvents[activeIndex].year}</span>
              </div>
              <h3 className={`font-pixel text-xl md:text-2xl ${colorClasses[historyEvents[activeIndex].color].text}`}>
                {historyEvents[activeIndex].title}
              </h3>
            </div>
            <p className="font-minecraft text-lg text-muted-foreground leading-relaxed">
              {historyEvents[activeIndex].description}
            </p>
          </div>
        </motion.div>

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
