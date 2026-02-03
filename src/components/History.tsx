import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useCallback, useEffect } from "react";

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
  const [direction, setDirection] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isTouchDragging, setIsTouchDragging] = useState(false);

  // Auto-scroll to active item
  const scrollToItem = useCallback((index: number) => {
    const item = itemRefs.current[index];
    if (item && scrollRef.current) {
      const containerWidth = scrollRef.current.offsetWidth;
      const itemLeft = item.offsetLeft;
      const itemWidth = item.offsetWidth;
      const scrollPosition = itemLeft - (containerWidth / 2) + (itemWidth / 2);
      
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  // Navigate to event with direction tracking
  const navigateToEvent = useCallback((newIndex: number) => {
    if (newIndex >= 0 && newIndex < historyEvents.length && newIndex !== activeIndex) {
      setDirection(newIndex > activeIndex ? 1 : -1);
      setActiveIndex(newIndex);
      scrollToItem(newIndex);
    }
  }, [activeIndex, scrollToItem]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if section is in view
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (!isInView) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateToEvent(Math.min(activeIndex + 1, historyEvents.length - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateToEvent(Math.max(activeIndex - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, navigateToEvent]);

  // Mouse drag handlers
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

  // Touch handlers for mobile swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsTouchDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isTouchDragging || !scrollRef.current) return;
    const touchX = e.touches[0].clientX;
    const diff = touchStartX - touchX;
    scrollRef.current.scrollLeft += diff * 0.5;
    setTouchStartX(touchX);
  }, [isTouchDragging, touchStartX]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!isTouchDragging) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    // Swipe threshold for navigation
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        navigateToEvent(Math.min(activeIndex + 1, historyEvents.length - 1));
      } else {
        navigateToEvent(Math.max(activeIndex - 1, 0));
      }
    }
    setIsTouchDragging(false);
  }, [isTouchDragging, touchStartX, activeIndex, navigateToEvent]);

  // Animation variants
  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" id="istorija" tabIndex={-1}>
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

        {/* Horizontal Timeline with Navigation Arrows */}
        <div className="relative">
          {/* Left Navigation Arrow */}
          <motion.button
            onClick={() => navigateToEvent(activeIndex - 1)}
            disabled={activeIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 minecraft-block transition-all duration-300 ${
              activeIndex === 0 
                ? 'bg-muted/50 cursor-not-allowed opacity-50' 
                : 'bg-gold hover:bg-gold/80 cursor-pointer'
            }`}
            whileHover={activeIndex !== 0 ? { scale: 1.1, x: -2 } : {}}
            whileTap={activeIndex !== 0 ? { scale: 0.95 } : {}}
            aria-label="Ankstesnis įvykis"
          >
            <ChevronLeft className={`w-6 h-6 ${activeIndex === 0 ? 'text-muted-foreground' : 'text-white'}`} />
          </motion.button>

          {/* Right Navigation Arrow */}
          <motion.button
            onClick={() => navigateToEvent(activeIndex + 1)}
            disabled={activeIndex === historyEvents.length - 1}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 minecraft-block transition-all duration-300 ${
              activeIndex === historyEvents.length - 1 
                ? 'bg-muted/50 cursor-not-allowed opacity-50' 
                : 'bg-gold hover:bg-gold/80 cursor-pointer'
            }`}
            whileHover={activeIndex !== historyEvents.length - 1 ? { scale: 1.1, x: 2 } : {}}
            whileTap={activeIndex !== historyEvents.length - 1 ? { scale: 0.95 } : {}}
            aria-label="Kitas įvykis"
          >
            <ChevronRight className={`w-6 h-6 ${activeIndex === historyEvents.length - 1 ? 'text-muted-foreground' : 'text-white'}`} />
          </motion.button>

          {/* Timeline scroll container */}
          <div 
            ref={scrollRef}
            className="overflow-x-auto pb-8 scrollbar-hide cursor-grab select-none touch-pan-x md:mx-14"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex items-start min-w-max px-8 md:px-16">
              {historyEvents.map((event, index) => {
                const colors = colorClasses[event.color];
                const isActive = activeIndex === index;
                
                return (
                  <motion.div
                    key={index}
                    ref={(el) => (itemRefs.current[index] = el)}
                    className="relative flex flex-col items-center cursor-pointer group"
                    style={{ minWidth: '160px' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => navigateToEvent(index)}
                  >
                    {/* Year badge */}
                    <motion.div
                      className={`px-4 py-1 mb-4 minecraft-block transition-all duration-300 ${
                        isActive ? colors.bg : 'bg-muted'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                      transition={isActive ? { duration: 0.3 } : {}}
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
                      <AnimatePresence>
                        {isActive && (
                          <motion.div 
                            className={`absolute inset-0 ${colors.bg} blur-sm -z-10`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Timeline dot and line */}
                    <div className="relative flex items-center w-full">
                      {/* Left line */}
                      {index > 0 && (
                        <motion.div 
                          className={`absolute right-1/2 h-1 w-full ${
                            index <= activeIndex ? colors.bg : 'bg-border'
                          }`}
                          initial={false}
                          animate={{ 
                            backgroundColor: index <= activeIndex ? undefined : undefined 
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      {/* Right line */}
                      {index < historyEvents.length - 1 && (
                        <motion.div 
                          className={`absolute left-1/2 h-1 w-full ${
                            index < activeIndex ? colorClasses[historyEvents[index + 1].color].bg : 'bg-border'
                          }`}
                          initial={false}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      {/* Dot */}
                      <motion.div
                        className={`relative z-10 mx-auto w-5 h-5 minecraft-block ${
                          isActive ? colors.bg : 'bg-border'
                        }`}
                        whileHover={{ scale: 1.2 }}
                        animate={isActive ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                        transition={isActive ? { duration: 1.5, repeat: Infinity } : { duration: 0.3 }}
                      />
                    </div>

                    {/* Title and description below */}
                    <motion.div 
                      className="mt-6 text-center px-2"
                      animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className={`font-pixel text-xs md:text-sm mb-2 transition-colors duration-300 ${
                        isActive ? colors.text : 'text-muted-foreground'
                      }`}>
                        {event.title}
                      </h3>
                      <p className={`font-minecraft text-xs text-muted-foreground max-w-[140px] transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-60'
                      }`}>
                        {event.description}
                      </p>
                    </motion.div>
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

        {/* Active Event Detail Card with AnimatePresence */}
        <div className="mt-12 max-w-2xl mx-auto relative overflow-hidden" style={{ minHeight: '180px' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.3 
              }}
              className="w-full"
            >
              <div className={`bg-background border-4 ${colorClasses[historyEvents[activeIndex].color].border} minecraft-block p-6 md:p-8`}>
                <div className="flex items-center gap-4 mb-4">
                  <motion.div 
                    className={`px-4 py-2 ${colorClasses[historyEvents[activeIndex].color].bg} minecraft-block`}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                  >
                    <span className="font-pixel text-lg text-white">{historyEvents[activeIndex].year}</span>
                  </motion.div>
                  <motion.h3 
                    className={`font-pixel text-xl md:text-2xl ${colorClasses[historyEvents[activeIndex].color].text}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    {historyEvents[activeIndex].title}
                  </motion.h3>
                </div>
                <motion.p 
                  className="font-minecraft text-lg text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {historyEvents[activeIndex].description}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
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
