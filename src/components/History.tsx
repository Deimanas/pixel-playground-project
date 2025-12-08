import { motion, useMotionValue, useTransform, useSpring, PanInfo } from "framer-motion";
import { Sword, Trophy, Star, Sparkles, Crown, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

const historyEvents = [
  {
    year: "2019",
    title: "Pradžia",
    description: "Serverio idėjos gimimas ir pirmieji žingsniai",
    icon: Sparkles,
    color: "emerald",
  },
  {
    year: "2020",
    title: "Pirmasis eventas",
    description: "Hunger Games renginys, kurį laimėjo Dariuscxz",
    icon: Trophy,
    color: "gold",
  },
  {
    year: "2020",
    title: "Nuotykių žemė",
    description: "Startuoja populiariausias serverio projektas",
    icon: Star,
    color: "diamond",
  },
  {
    year: "2021",
    title: "Vienuolynas",
    description: "Atidarytas Vienuolyno projektas su nauja patirtimi",
    icon: Crown,
    color: "gold",
  },
  {
    year: "2022",
    title: "Mod-pack'ai",
    description: "Pridėti mod-pack'ai, kurie pagyvino serverio patirtį",
    icon: Sword,
    color: "redstone",
  },
  {
    year: "2023",
    title: "Bendruomenės augimas",
    description: "Pasiekėme 500+ žaidėjų bendruomenę",
    icon: Star,
    color: "emerald",
  },
  {
    year: "2024",
    title: "Nauji horizontai",
    description: "Serveris tęsia savo kelionę su naujomis galimybėmis",
    icon: Sparkles,
    color: "diamond",
  },
  {
    year: "2025",
    title: "Šiandien",
    description: "Tęsiame kurti nuostabius nuotykius kartu",
    icon: Crown,
    color: "gold",
  },
];

const colorClasses: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  emerald: { bg: "bg-emerald", border: "border-emerald", text: "text-emerald", glow: "shadow-[0_0_20px_rgba(80,200,120,0.4)]" },
  gold: { bg: "bg-gold", border: "border-gold", text: "text-gold", glow: "shadow-[0_0_20px_rgba(255,215,0,0.4)]" },
  diamond: { bg: "bg-diamond", border: "border-diamond", text: "text-diamond", glow: "shadow-[0_0_20px_rgba(185,242,255,0.4)]" },
  redstone: { bg: "bg-redstone", border: "border-redstone", text: "text-redstone", glow: "shadow-[0_0_20px_rgba(255,0,0,0.4)]" },
};

export const History = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });

  const cardWidth = 280;
  const gap = 24;
  const totalWidth = (cardWidth + gap) * historyEvents.length - gap;

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const velocity = info.velocity.x;
    const offset = info.offset.x;
    
    let newIndex = activeIndex;
    if (Math.abs(velocity) > 500) {
      newIndex = velocity > 0 ? activeIndex - 1 : activeIndex + 1;
    } else if (Math.abs(offset) > cardWidth / 3) {
      newIndex = offset > 0 ? activeIndex - 1 : activeIndex + 1;
    }
    
    newIndex = Math.max(0, Math.min(historyEvents.length - 1, newIndex));
    setActiveIndex(newIndex);
    setIsDragging(false);
  };

  const goToIndex = (index: number) => {
    const newIndex = Math.max(0, Math.min(historyEvents.length - 1, index));
    setActiveIndex(newIndex);
  };

  const getTranslateX = () => {
    const containerWidth = containerRef.current?.clientWidth || 0;
    const centerOffset = (containerWidth - cardWidth) / 2;
    return centerOffset - activeIndex * (cardWidth + gap);
  };

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
          <h2 className="font-pixel text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 text-shadow-minecraft">
            ARGO <span className="text-gold">PRIEŠISTORĖ</span>
          </h2>
          <p className="font-minecraft text-xl text-muted-foreground max-w-3xl mx-auto">
            Per metus serverio esmė keitėsi daugybę kartų – nuo Hardcore režimo iki rolių žaidimo.
          </p>
        </motion.div>

        {/* Interactive Timeline */}
        <div className="relative" ref={containerRef}>
          {/* Navigation Arrows */}
          <motion.button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-background/80 backdrop-blur-sm border-4 border-border flex items-center justify-center minecraft-block hover:border-gold transition-colors disabled:opacity-30"
            onClick={() => goToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </motion.button>
          
          <motion.button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-background/80 backdrop-blur-sm border-4 border-border flex items-center justify-center minecraft-block hover:border-gold transition-colors disabled:opacity-30"
            onClick={() => goToIndex(activeIndex + 1)}
            disabled={activeIndex === historyEvents.length - 1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </motion.button>

          {/* Cards Container */}
          <div className="overflow-hidden mx-16 py-8">
            <motion.div
              className="flex gap-6 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: -totalWidth, right: 0 }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              animate={{ x: getTranslateX() }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {historyEvents.map((event, index) => {
                const colors = colorClasses[event.color];
                const isActive = index === activeIndex;
                
                return (
                  <motion.div
                    key={index}
                    className={`relative flex-shrink-0 w-[280px] cursor-pointer`}
                    onClick={() => !isDragging && goToIndex(index)}
                    animate={{
                      scale: isActive ? 1.05 : 0.9,
                      opacity: isActive ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Card */}
                    <motion.div 
                      className={`bg-background border-4 ${isActive ? colors.border : 'border-border'} p-6 minecraft-block transition-all duration-300 ${isActive ? colors.glow : ''}`}
                      whileHover={{ y: -5 }}
                    >
                      {/* Year Badge */}
                      <motion.div 
                        className={`inline-flex items-center gap-2 px-4 py-2 ${colors.bg}/20 border-2 ${colors.border} mb-4`}
                        animate={{ scale: isActive ? [1, 1.05, 1] : 1 }}
                        transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 2 }}
                      >
                        <span className={`font-pixel text-sm ${colors.text}`}>
                          {event.year}
                        </span>
                      </motion.div>
                      
                      {/* Icon */}
                      <motion.div 
                        className={`w-14 h-14 ${colors.bg} minecraft-block flex items-center justify-center mb-4`}
                        animate={{ 
                          rotate: isActive ? [0, 5, -5, 0] : 0,
                          scale: isActive ? [1, 1.1, 1] : 1 
                        }}
                        transition={{ duration: 0.6, repeat: isActive ? Infinity : 0, repeatDelay: 3 }}
                      >
                        <event.icon className="w-7 h-7 text-accent-foreground" />
                      </motion.div>
                      
                      {/* Content */}
                      <h3 className={`font-pixel text-sm mb-3 transition-colors ${isActive ? colors.text : 'text-foreground'}`}>
                        {event.title}
                      </h3>
                      <p className="font-minecraft text-base text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </motion.div>

                    {/* Timeline Dot */}
                    <motion.div 
                      className={`mx-auto mt-6 w-4 h-4 ${colors.bg} minecraft-block`}
                      animate={{ scale: isActive ? [1, 1.3, 1] : 1 }}
                      transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 1 }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Timeline Progress Bar */}
          <div className="relative h-1 bg-border mx-16 mt-4">
            <motion.div
              className="absolute h-full bg-gold"
              initial={{ width: 0 }}
              animate={{ width: `${((activeIndex + 1) / historyEvents.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-3 mt-6">
            {historyEvents.map((event, index) => {
              const colors = colorClasses[event.color];
              return (
                <motion.button
                  key={index}
                  className={`w-3 h-3 minecraft-block transition-colors ${index === activeIndex ? colors.bg : 'bg-border hover:bg-muted-foreground'}`}
                  onClick={() => goToIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              );
            })}
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
