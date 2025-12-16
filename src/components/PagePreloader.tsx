import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import argasLogo from "@/assets/argas-logo.png";

// Minecraft explosion particle - authentic sprite-like appearance
// The Minecraft explosion is a series of white/gray cloud puffs that appear as 
// pixelated, blocky clouds expanding outward in a spherical pattern

interface ExplosionSpriteProps {
  delay: number;
  x: number;
  y: number;
  size: number;
}

// Authentic Minecraft explosion sprite - pixelated white/gray cloud
const ExplosionSprite = ({ delay, x, y, size }: ExplosionSpriteProps) => {
  // Minecraft explosion sprite frames - blocky, pixelated appearance
  // Frame animation: small → medium → large → fade
  return (
    <motion.div
      className="absolute"
      style={{
        width: size,
        height: size,
        left: '50%',
        top: '50%',
        marginLeft: -size / 2,
        marginTop: -size / 2,
        imageRendering: 'pixelated',
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
        scale: [0, 0.5, 1, 1.2, 1],
        opacity: [0, 1, 1, 0.7, 0],
      }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: "easeOut",
        times: [0, 0.15, 0.4, 0.7, 1],
      }}
    >
      {/* Pixelated cloud shape - authentic Minecraft style */}
      <div 
        className="w-full h-full relative"
        style={{
          // Create blocky cloud using box shadows for pixel art effect
          background: `
            linear-gradient(135deg, 
              rgba(255,255,255,0.95) 0%, 
              rgba(230,230,230,0.9) 30%,
              rgba(200,200,200,0.85) 60%, 
              rgba(170,170,170,0.7) 100%
            )
          `,
          clipPath: `polygon(
            20% 0%, 35% 5%, 50% 0%, 65% 5%, 80% 0%,
            95% 15%, 100% 30%, 95% 50%, 100% 70%, 95% 85%,
            80% 100%, 65% 95%, 50% 100%, 35% 95%, 20% 100%,
            5% 85%, 0% 70%, 5% 50%, 0% 30%, 5% 15%
          )`,
        }}
      />
    </motion.div>
  );
};

// Smaller particle debris
const PixelDebris = ({ delay, angle, distance }: { 
  delay: number; 
  angle: number; 
  distance: number;
}) => {
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;
  const gray = 180 + Math.random() * 75; // Light gray to white
  
  return (
    <motion.div
      className="absolute"
      style={{
        width: 6,
        height: 6,
        backgroundColor: `rgb(${gray}, ${gray}, ${gray})`,
        left: '50%',
        top: '50%',
        marginLeft: -3,
        marginTop: -3,
        imageRendering: 'pixelated',
      }}
      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      animate={{
        x: [0, x * 0.6, x],
        y: [0, y * 0.4 - 20, y + distance * 0.2],
        scale: [1, 1.2, 0.5],
        opacity: [1, 0.9, 0],
      }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: "easeOut",
      }}
    />
  );
};

export const PagePreloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"loading" | "exploding" | "done">("loading");

  useEffect(() => {
    const loadTimer = setTimeout(() => setPhase("exploding"), 400);
    const completeTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 1400);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Generate explosion sprites in a spherical pattern
  const explosionSprites: ExplosionSpriteProps[] = [];
  
  // Center explosion
  explosionSprites.push({ delay: 0, x: 0, y: 0, size: 48 });
  
  // Inner ring (8 sprites)
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    explosionSprites.push({
      delay: 0.02 + Math.random() * 0.03,
      x: Math.cos(angle) * 35,
      y: Math.sin(angle) * 35,
      size: 36 + Math.random() * 12,
    });
  }
  
  // Outer ring (12 sprites)
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2 + 0.15;
    explosionSprites.push({
      delay: 0.05 + Math.random() * 0.05,
      x: Math.cos(angle) * 70,
      y: Math.sin(angle) * 70,
      size: 28 + Math.random() * 16,
    });
  }

  // Far ring (16 sprites)
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2 + 0.1;
    explosionSprites.push({
      delay: 0.08 + Math.random() * 0.06,
      x: Math.cos(angle) * 110,
      y: Math.sin(angle) * 110,
      size: 20 + Math.random() * 14,
    });
  }

  // Debris particles
  const debrisParticles = [];
  for (let i = 0; i < 24; i++) {
    debrisParticles.push({
      delay: Math.random() * 0.08,
      angle: (i / 24) * Math.PI * 2 + Math.random() * 0.4,
      distance: 60 + Math.random() * 80,
    });
  }

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="relative">
            {/* Loading state - pulsing dot */}
            {phase === "loading" && (
              <motion.div
                className="relative"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.1, 1] }}
                transition={{ duration: 0.25, ease: "backOut" }}
              >
                <motion.div
                  className="w-8 h-8 bg-foreground/60"
                  style={{ imageRendering: 'pixelated' }}
                  animate={{ 
                    scale: [1, 1.15, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{ 
                    duration: 0.15,
                    repeat: 3,
                  }}
                />
              </motion.div>
            )}

            {/* Explosion Phase - Authentic Minecraft style */}
            {phase === "exploding" && (
              <>
                {/* White flash at center */}
                <motion.div
                  className="absolute w-20 h-20 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-white"
                  style={{ imageRendering: 'pixelated' }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 0.12 }}
                />

                {/* Explosion cloud sprites */}
                {explosionSprites.map((sprite, i) => (
                  <ExplosionSprite key={`sprite-${i}`} {...sprite} />
                ))}

                {/* Pixel debris */}
                {debrisParticles.map((particle, i) => (
                  <PixelDebris key={`debris-${i}`} {...particle} />
                ))}

                {/* Logo reveal */}
                <motion.div
                  className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.1, 1], opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.2, ease: "backOut" }}
                >
                  <img 
                    src={argasLogo} 
                    alt="Argas" 
                    className="h-16 md:h-24 w-auto"
                    style={{
                      filter: "drop-shadow(3px 3px 0 rgba(0,0,0,0.5)) drop-shadow(0 0 20px rgba(255,215,0,0.4))",
                    }}
                  />
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
