import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Pickaxe, Skull, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Minecraft grid background */}
      <div 
        className="absolute inset-0 opacity-10"
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
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-background to-background opacity-80" />

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
              delay: block.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Glowing orbs in background */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald/20 rounded-full blur-[100px]"
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
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gold/20 rounded-full blur-[80px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        style={{
          transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)`,
        }}
      />

      {/* Main content */}
      <div className="text-center z-10 max-w-2xl mx-auto">
        {/* Ghost/Skull decoration */}
        <motion.div
          className="flex justify-center gap-8 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Ghost className="w-12 h-12 text-muted-foreground/50" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [5, -5, 5] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          >
            <Skull className="w-10 h-10 text-muted-foreground/40" />
          </motion.div>
        </motion.div>

        {/* 404 Number with Minecraft styling */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
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
              className="absolute text-[100px] md:text-[160px] font-minecraft text-diamond/30 leading-none select-none"
              animate={{ x: [2, -2, 2], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
            >
              404
            </motion.h1>
            <h1 className="relative text-[100px] md:text-[160px] font-minecraft text-transparent bg-clip-text bg-gradient-to-b from-gold via-gold to-gold/40 leading-none drop-shadow-[0_0_30px_rgba(255,215,0,0.3)]">
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
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h2 className="text-xl md:text-3xl font-minecraft text-foreground mb-3">
            Blokas <span className="text-emerald">Nerastas</span>!
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto leading-relaxed">
            Atrodo, kad šis blokas buvo sunaikintas arba niekada neegzistavo mūsų pasaulyje.
          </p>
        </motion.div>

        {/* Minecraft-style block decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
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
              transition={{ delay: 0.6 + i * 0.08, type: "spring" }}
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
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button asChild variant="emerald" size="lg" className="group">
            <Link to="/">
              <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Grįžti Namo
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="group" onClick={() => window.history.back()}>
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Grįžti Atgal
          </Button>
        </motion.div>

        {/* Path info with copy functionality */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8"
        >
          <p className="text-sm text-muted-foreground font-mono bg-muted/30 inline-block px-4 py-2 rounded-lg border border-border/50">
            Ieškota: <span className="text-foreground">{location.pathname}</span>
          </p>
        </motion.div>

        {/* Fun Easter egg hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-6 text-xs text-muted-foreground/50 italic"
        >
          💡 Patarimas: Pabandyk paspausti ant blokų viršuje!
        </motion.p>
      </div>
    </div>
  );
};

export default NotFound;
