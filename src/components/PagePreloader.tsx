import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Minecraft explosion particle - white/gray cloud puff that expands and fades
interface ExplosionPuffProps {
  delay: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

const ExplosionPuff = ({ delay, x, y, size, duration }: ExplosionPuffProps) => (
  <motion.div
    className="absolute"
    style={{
      width: size,
      height: size,
      left: '50%',
      top: '50%',
      marginLeft: -size / 2,
      marginTop: -size / 2,
      // Minecraft explosion is a white/gray cloud sprite
      background: `radial-gradient(circle, 
        rgba(255,255,255,0.95) 0%, 
        rgba(220,220,220,0.85) 25%,
        rgba(180,180,180,0.7) 50%, 
        rgba(140,140,140,0.4) 75%,
        transparent 100%
      )`,
      borderRadius: '50%',
    }}
    initial={{ 
      x: 0, 
      y: 0, 
      scale: 0, 
      opacity: 0 
    }}
    animate={{
      x: x,
      y: y,
      scale: [0, 1.5, 2.5, 3],
      opacity: [0, 1, 0.8, 0],
    }}
    transition={{
      duration: duration,
      delay: delay,
      ease: "easeOut",
      times: [0, 0.2, 0.6, 1],
    }}
  />
);

// Secondary smaller puffs for detail
const SmallPuff = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    className="absolute"
    style={{
      width: 24,
      height: 24,
      left: '50%',
      top: '50%',
      marginLeft: -12,
      marginTop: -12,
      background: `radial-gradient(circle, 
        rgba(240,240,240,0.9) 0%, 
        rgba(200,200,200,0.6) 50%, 
        transparent 100%
      )`,
      borderRadius: '50%',
    }}
    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
    animate={{
      x: x,
      y: y - 20,
      scale: [0, 1.2, 1.8],
      opacity: [0, 0.9, 0],
    }}
    transition={{
      duration: 0.6,
      delay: delay,
      ease: "easeOut",
    }}
  />
);

// Pixelated debris particles (small squares)
const DebrisParticle = ({ delay, angle, distance, color }: { 
  delay: number; 
  angle: number; 
  distance: number;
  color: string;
}) => {
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;
  
  return (
    <motion.div
      className="absolute"
      style={{
        width: 4,
        height: 4,
        backgroundColor: color,
        left: '50%',
        top: '50%',
        marginLeft: -2,
        marginTop: -2,
      }}
      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      animate={{
        x: [0, x * 0.5, x],
        y: [0, y * 0.3 - 30, y + distance * 0.3],
        scale: [1, 1, 0.5],
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: 0.7,
        delay: delay,
        ease: "easeOut",
      }}
    />
  );
};

export const PagePreloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"loading" | "exploding" | "done">("loading");

  useEffect(() => {
    const loadTimer = setTimeout(() => setPhase("exploding"), 500);
    const completeTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 1600);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Generate main explosion puffs - the core Minecraft explosion effect
  const mainPuffs: ExplosionPuffProps[] = [
    // Center burst
    { delay: 0, x: 0, y: 0, size: 80, duration: 0.5 },
    // Primary ring
    { delay: 0.02, x: -50, y: -30, size: 60, duration: 0.55 },
    { delay: 0.04, x: 50, y: -35, size: 65, duration: 0.5 },
    { delay: 0.03, x: -40, y: 40, size: 55, duration: 0.52 },
    { delay: 0.05, x: 45, y: 35, size: 58, duration: 0.48 },
    { delay: 0.02, x: 0, y: -55, size: 50, duration: 0.5 },
    { delay: 0.04, x: 0, y: 50, size: 52, duration: 0.53 },
    // Secondary ring
    { delay: 0.08, x: -80, y: 0, size: 45, duration: 0.5 },
    { delay: 0.1, x: 80, y: 5, size: 48, duration: 0.48 },
    { delay: 0.09, x: -60, y: -60, size: 42, duration: 0.52 },
    { delay: 0.11, x: 65, y: -55, size: 44, duration: 0.5 },
    { delay: 0.1, x: -55, y: 65, size: 40, duration: 0.55 },
    { delay: 0.12, x: 60, y: 60, size: 43, duration: 0.48 },
    // Outer puffs
    { delay: 0.15, x: -100, y: -40, size: 35, duration: 0.45 },
    { delay: 0.16, x: 95, y: -45, size: 38, duration: 0.48 },
    { delay: 0.14, x: -90, y: 50, size: 36, duration: 0.5 },
    { delay: 0.17, x: 100, y: 45, size: 34, duration: 0.47 },
  ];

  // Small detail puffs
  const smallPuffs = [
    { delay: 0.05, x: -30, y: -60 },
    { delay: 0.07, x: 35, y: -65 },
    { delay: 0.06, x: -70, y: 20 },
    { delay: 0.08, x: 75, y: 15 },
    { delay: 0.09, x: 0, y: 70 },
    { delay: 0.1, x: -45, y: 55 },
    { delay: 0.11, x: 50, y: 50 },
  ];

  // Debris particles
  const debrisColors = ['#8B8B8B', '#A0A0A0', '#6B6B6B', '#C0C0C0', '#505050'];
  const debrisParticles = [];
  for (let i = 0; i < 20; i++) {
    debrisParticles.push({
      delay: Math.random() * 0.1,
      angle: (i / 20) * Math.PI * 2 + Math.random() * 0.5,
      distance: 80 + Math.random() * 60,
      color: debrisColors[i % debrisColors.length],
    });
  }

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            {/* Loading state - Minecraft block icon */}
            {phase === "loading" && (
              <motion.div
                className="relative"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ 
                  scale: [0, 1.1, 1],
                  rotate: [-20, 5, 0],
                }}
                transition={{ duration: 0.3, ease: "backOut" }}
              >
                {/* Simple grass block */}
                <motion.div
                  className="w-16 h-16 md:w-20 md:h-20 relative"
                  animate={{ 
                    scale: [1, 1.03, 1],
                  }}
                  transition={{ 
                    duration: 0.12,
                    repeat: 4,
                  }}
                >
                  {/* Grass top */}
                  <div 
                    className="absolute inset-x-0 top-0 h-1/3"
                    style={{
                      backgroundColor: '#5D8731',
                      boxShadow: 'inset 2px 2px 0 rgba(255,255,255,0.2), inset -2px 0 0 rgba(0,0,0,0.2)',
                    }}
                  />
                  {/* Dirt */}
                  <div 
                    className="absolute inset-x-0 bottom-0 h-2/3"
                    style={{
                      backgroundColor: '#8B5A2B',
                      boxShadow: 'inset 2px 0 0 rgba(255,255,255,0.1), inset -2px -2px 0 rgba(0,0,0,0.3)',
                    }}
                  />
                </motion.div>
              </motion.div>
            )}

            {/* Explosion Phase - Authentic Minecraft white/gray cloud puffs */}
            {phase === "exploding" && (
              <>
                {/* Main white/gray explosion puffs */}
                {mainPuffs.map((puff, i) => (
                  <ExplosionPuff key={`main-${i}`} {...puff} />
                ))}

                {/* Small detail puffs */}
                {smallPuffs.map((puff, i) => (
                  <SmallPuff key={`small-${i}`} {...puff} />
                ))}

                {/* Debris particles */}
                {debrisParticles.map((particle, i) => (
                  <DebrisParticle key={`debris-${i}`} {...particle} />
                ))}

                {/* ARGAS text reveal */}
                <motion.div
                  className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.15, 1], opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.25, ease: "backOut" }}
                >
                  <h1
                    className="font-pixel text-4xl md:text-6xl text-gold whitespace-nowrap"
                    style={{
                      textShadow: "3px 3px 0 rgba(0,0,0,0.6), 0 0 20px rgba(255,215,0,0.5)",
                    }}
                  >
                    ARGAS
                  </h1>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
