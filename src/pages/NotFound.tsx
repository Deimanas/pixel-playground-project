import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, ArrowLeft, Pickaxe, Skull, Ghost, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showDeathScreen, setShowDeathScreen] = useState(true);
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  // Check time of day for day/night theme
  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      // Night time: 8 PM (20:00) to 6 AM (06:00)
      setIsNight(hour >= 20 || hour < 6);
    };
    checkTime();
    const interval = setInterval(checkTime, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Auto-hide death screen after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDeathScreen(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Parallax effect for background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate random blocks for the "broken world" effect
  const brokenBlocks = [...Array(30)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 8 + Math.random() * 24,
    color: ['bg-grass', 'bg-stone', 'bg-dirt', 'bg-obsidian', 'bg-gold/50'][Math.floor(Math.random() * 5)],
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 4,
  }));

  // Stars for night mode
  const stars = [...Array(50)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 60,
    size: 1 + Math.random() * 2,
    delay: Math.random() * 3,
  }));

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-1000 ${
      isNight ? 'bg-[#0a0a1a]' : 'bg-background'
    }`}>
      {/* "You Died" Death Screen Overlay */}
      <AnimatePresence>
        {showDeathScreen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#4a0000]/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <motion.h1
                className="text-5xl md:text-7xl font-minecraft text-[#aa0000] mb-6"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", damping: 10 }}
              >
                You Died!
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-gray-400 font-minecraft mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                Puslapis neegzistuoja
              </motion.p>
              <motion.div
                className="flex flex-col gap-4 items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <motion.div
                  className="text-lg text-gray-500 font-minecraft"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Respawning...
                </motion.div>
                {/* Progress bar */}
                <div className="w-64 h-2 bg-gray-800 rounded overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.5, ease: "linear" }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Day/Night indicator */}
      <motion.div
        className="fixed top-4 right-4 z-40 flex items-center gap-2 bg-muted/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-border/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5 }}
      >
        {isNight ? (
          <>
            <Moon className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-muted-foreground font-minecraft">Naktis</span>
          </>
        ) : (
          <>
            <Sun className="w-4 h-4 text-gold" />
            <span className="text-sm text-muted-foreground font-minecraft">Diena</span>
          </>
        )}
      </motion.div>

      {/* Night mode stars */}
      {isNight && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: star.delay,
              }}
            />
          ))}
          {/* Moon */}
          <motion.div
            className="absolute top-10 right-20 w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 shadow-[0_0_60px_rgba(200,200,255,0.4)]"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.2, type: "spring" }}
            style={{
              transform: `translate(${-mousePos.x * 0.3}px, ${-mousePos.y * 0.3}px)`,
            }}
          >
            {/* Moon craters */}
            <div className="absolute top-3 left-4 w-3 h-3 rounded-full bg-gray-300/50" />
            <div className="absolute top-8 right-3 w-4 h-4 rounded-full bg-gray-300/50" />
            <div className="absolute bottom-4 left-6 w-2 h-2 rounded-full bg-gray-300/50" />
          </motion.div>
        </div>
      )}

      {/* Day mode sun */}
      {!isNight && (
        <motion.div
          className="absolute top-10 right-20 w-20 h-20 md:w-28 md:h-28"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 3.2, type: "spring" }}
          style={{
            transform: `translate(${-mousePos.x * 0.3}px, ${-mousePos.y * 0.3}px)`,
          }}
        >
          <div className="w-full h-full rounded-sm bg-gradient-to-br from-yellow-300 to-orange-400 shadow-[0_0_80px_rgba(255,200,0,0.5)] minecraft-block" />
        </motion.div>
      )}

      {/* Minecraft grid background */}
      <div 
        className={`absolute inset-0 ${isNight ? 'opacity-5' : 'opacity-10'}`}
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
        }}
      />

      {/* Gradient overlay */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${
        isNight 
          ? 'bg-gradient-to-b from-[#0a0a2a] via-[#0a0a1a] to-[#0a0a1a] opacity-90' 
          : 'bg-gradient-to-b from-obsidian via-background to-background opacity-80'
      }`} />

      {/* Animated falling blocks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {brokenBlocks.map((block) => (
          <motion.div
            key={block.id}
            className={`absolute minecraft-block ${block.color}`}
            style={{
              left: `${block.x}%`,
              width: block.size,
              height: block.size,
            }}
            initial={{ y: -100, rotate: 0, opacity: 0 }}
            animate={{
              y: ['0%', '120%'],
              rotate: [0, 360],
              opacity: [0, 0.6, 0.6, 0],
            }}
            transition={{
              duration: block.duration,
              repeat: Infinity,
              delay: block.delay + 3, // Start after death screen
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Glowing orbs in background */}
      <motion.div
        className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-[100px] ${
          isNight ? 'bg-blue-500/10' : 'bg-emerald/20'
        }`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
        }}
      />
      <motion.div
        className={`absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-[80px] ${
          isNight ? 'bg-purple-500/10' : 'bg-gold/20'
        }`}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        style={{
          transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)`,
        }}
      />

      {/* Main content - appears after death screen */}
      <motion.div 
        className="text-center z-10 max-w-2xl mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showDeathScreen ? 0 : 1, scale: showDeathScreen ? 0.8 : 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {/* Ghost/Skull decoration */}
        <motion.div
          className="flex justify-center gap-8 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Ghost className={`w-12 h-12 ${isNight ? 'text-blue-400/50' : 'text-muted-foreground/50'}`} />
          </motion.div>
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [5, -5, 5] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          >
            <Skull className={`w-10 h-10 ${isNight ? 'text-purple-400/40' : 'text-muted-foreground/40'}`} />
          </motion.div>
        </motion.div>

        {/* 404 Number with Minecraft styling */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8, delay: 3.2 }}
          className="mb-6"
        >
          <div className="relative inline-block">
            {/* Glitch effect layers */}
            <motion.h1 
              className="absolute text-[100px] md:text-[160px] font-minecraft text-redstone/30 leading-none select-none"
              animate={{ x: [-2, 2, -2], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              404
            </motion.h1>
            <motion.h1 
              className={`absolute text-[100px] md:text-[160px] font-minecraft leading-none select-none ${
                isNight ? 'text-blue-400/30' : 'text-diamond/30'
              }`}
              animate={{ x: [2, -2, 2], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
            >
              404
            </motion.h1>
            <h1 className={`relative text-[100px] md:text-[160px] font-minecraft text-transparent bg-clip-text leading-none ${
              isNight 
                ? 'bg-gradient-to-b from-blue-300 via-blue-400 to-blue-600 drop-shadow-[0_0_30px_rgba(100,150,255,0.4)]'
                : 'bg-gradient-to-b from-gold via-gold to-gold/40 drop-shadow-[0_0_30px_rgba(255,215,0,0.3)]'
            }`}>
              404
            </h1>
            <motion.div
              className="absolute -top-2 -right-2 md:-top-4 md:-right-4"
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Pickaxe className="w-10 h-10 md:w-14 md:h-14 text-stone drop-shadow-lg" />
            </motion.div>
          </div>
        </motion.div>

        {/* Error message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5 }}
          className="mb-6"
        >
          <h2 className="text-xl md:text-3xl font-minecraft text-foreground mb-3">
            Blokas <span className={isNight ? 'text-blue-400' : 'text-emerald'}>Nerastas</span>!
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto leading-relaxed">
            Atrodo, kad šis blokas buvo sunaikintas arba niekada neegzistavo mūsų pasaulyje.
          </p>
        </motion.div>

        {/* Minecraft-style block decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.7 }}
          className="flex justify-center gap-2 md:gap-3 mb-8"
        >
          {[
            { color: 'bg-grass', label: 'Grass' },
            { color: 'bg-stone', label: 'Stone' },
            { color: 'bg-diamond', label: 'Diamond' },
            { color: 'bg-gold', label: 'Gold' },
            { color: 'bg-emerald', label: 'Emerald' },
            { color: 'bg-redstone', label: 'Redstone' },
          ].map((block, i) => (
            <motion.div
              key={i}
              className={`w-8 h-8 md:w-10 md:h-10 minecraft-block ${block.color} cursor-pointer`}
              initial={{ y: 50, opacity: 0, rotate: -180 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ delay: 3.8 + i * 0.08, type: "spring" }}
              whileHover={{ 
                y: -8, 
                scale: 1.2,
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              }}
              whileTap={{ scale: 0.9 }}
              title={block.label}
            />
          ))}
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button asChild variant="emerald" size="lg" className="group">
            <Link to="/">
              <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Respawn
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="group" onClick={() => window.history.back()}>
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Grįžti Atgal
          </Button>
        </motion.div>

        {/* Path info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2 }}
          className="mt-8"
        >
          <p className={`text-sm font-mono inline-block px-4 py-2 rounded-lg border ${
            isNight 
              ? 'text-blue-300/70 bg-blue-900/20 border-blue-500/30' 
              : 'text-muted-foreground bg-muted/30 border-border/50'
          }`}>
            Ieškota: <span className="text-foreground">{location.pathname}</span>
          </p>
        </motion.div>

        {/* Time-based message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5 }}
          className="mt-6 text-xs text-muted-foreground/50 italic"
        >
          {isNight 
            ? "🌙 Atsargiai! Naktį zombiai ir skelonai aktyvūs..." 
            : "☀️ Diena - saugus laikas tyrinėti pasaulį!"}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NotFound;
