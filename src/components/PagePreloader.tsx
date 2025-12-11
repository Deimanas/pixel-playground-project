import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Minecraft TNT explosion particles - small square blocks flying outward
const explosionParticles = [
  { color: "#FFD700", size: 8 },  // Gold/fire
  { color: "#FF6B00", size: 6 },  // Orange
  { color: "#FF4500", size: 10 }, // Red-orange
  { color: "#FFFFFF", size: 4 },  // White flash
  { color: "#8B5A2B", size: 8 },  // Brown debris
  { color: "#5D8731", size: 6 },  // Green
  { color: "#3D3D3D", size: 8 },  // Dark gray
  { color: "#7F7F7F", size: 6 },  // Gray
];

interface ExplosionParticleProps {
  color: string;
  size: number;
  angle: number;
  distance: number;
  delay: number;
}

const ExplosionParticle = ({ color, size, angle, distance, delay }: ExplosionParticleProps) => {
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;
  const rotation = Math.random() * 720 - 360;
  const gravity = distance * 0.5;

  return (
    <motion.div
      className="absolute"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        left: '50%',
        top: '50%',
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      initial={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
      animate={{
        x: [0, x * 0.3, x],
        y: [0, y * 0.3 - 20, y + gravity],
        scale: [1, 1.2, 0],
        rotate: [0, rotation / 2, rotation],
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: "easeOut",
        times: [0, 0.3, 1],
      }}
    />
  );
};

// Smoke puff component
const SmokePuff = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: 40,
      height: 40,
      background: 'radial-gradient(circle, rgba(128,128,128,0.8) 0%, rgba(64,64,64,0.4) 50%, transparent 70%)',
      left: '50%',
      top: '50%',
      marginLeft: -20,
      marginTop: -20,
    }}
    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
    animate={{
      x: x,
      y: y - 30,
      scale: [0, 2, 3],
      opacity: [0, 0.8, 0],
    }}
    transition={{
      duration: 0.8,
      delay: delay,
      ease: "easeOut",
    }}
  />
);

export const PagePreloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"loading" | "exploding" | "done">("loading");

  useEffect(() => {
    const loadTimer = setTimeout(() => setPhase("exploding"), 600);
    const completeTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 1800);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Generate explosion particles
  const particles: ExplosionParticleProps[] = [];
  for (let i = 0; i < 48; i++) {
    const angle = (i / 48) * Math.PI * 2 + Math.random() * 0.3;
    const distance = 60 + Math.random() * 140;
    const particleType = explosionParticles[i % explosionParticles.length];
    particles.push({
      color: particleType.color,
      size: particleType.size + Math.random() * 4,
      angle,
      distance,
      delay: Math.random() * 0.1,
    });
  }

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Dark vignette */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, hsl(var(--background)) 70%)',
            }}
          />

          <div className="relative">
            {/* TNT Block before explosion */}
            {phase === "loading" && (
              <motion.div
                className="relative"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ 
                  scale: [0, 1.1, 1],
                  rotate: [-45, 5, 0],
                }}
                transition={{ duration: 0.4, ease: "backOut" }}
              >
                {/* TNT Block */}
                <motion.div
                  className="w-20 h-20 md:w-24 md:h-24 relative"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 0.15,
                    repeat: 4,
                  }}
                >
                  {/* Red TNT base */}
                  <div 
                    className="absolute inset-0 bg-redstone"
                    style={{
                      boxShadow: `
                        inset 4px 4px 0 rgba(255,255,255,0.3), 
                        inset -4px -4px 0 rgba(0,0,0,0.4),
                        0 0 30px rgba(255,0,0,0.5)
                      `,
                    }}
                  />
                  {/* TNT label */}
                  <div className="absolute inset-2 flex items-center justify-center">
                    <span className="font-pixel text-xs md:text-sm text-white text-shadow-minecraft">
                      TNT
                    </span>
                  </div>
                  {/* Fuse spark */}
                  <motion.div
                    className="absolute -top-2 left-1/2 -ml-1 w-2 h-2 bg-gold rounded-full"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1],
                      boxShadow: [
                        '0 0 8px #FFD700, 0 0 16px #FF6B00',
                        '0 0 16px #FFD700, 0 0 32px #FF6B00',
                        '0 0 8px #FFD700, 0 0 16px #FF6B00',
                      ]
                    }}
                    transition={{ duration: 0.1, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
            )}

            {/* Explosion Phase */}
            {phase === "exploding" && (
              <>
                {/* Initial white flash */}
                <motion.div
                  className="absolute w-40 h-40 md:w-56 md:h-56 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
                  style={{ backgroundColor: "#FFFFFF" }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 4, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                />

                {/* Orange/yellow explosion core */}
                <motion.div
                  className="absolute w-32 h-32 md:w-44 md:h-44 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
                  style={{ 
                    background: 'radial-gradient(circle, #FFD700 0%, #FF6B00 40%, #FF4500 70%, transparent 100%)'
                  }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: [0, 2.5, 3], opacity: [1, 0.8, 0] }}
                  transition={{ duration: 0.4 }}
                />

                {/* Secondary explosion ring */}
                <motion.div
                  className="absolute w-24 h-24 md:w-32 md:h-32 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full border-4"
                  style={{ borderColor: "#FF6B00" }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 5, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                />

                {/* Smoke puffs */}
                <SmokePuff delay={0.1} x={-40} y={-20} />
                <SmokePuff delay={0.15} x={40} y={-30} />
                <SmokePuff delay={0.2} x={0} y={-50} />
                <SmokePuff delay={0.12} x={-60} y={10} />
                <SmokePuff delay={0.18} x={60} y={0} />

                {/* Square block particles */}
                {particles.map((particle, i) => (
                  <ExplosionParticle key={i} {...particle} />
                ))}

                {/* ARGAS text reveal */}
                <motion.div
                  className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.2, 1], opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3, ease: "backOut" }}
                >
                  <h1
                    className="font-pixel text-4xl md:text-6xl text-gold whitespace-nowrap"
                    style={{
                      textShadow: "4px 4px 0 rgba(0,0,0,0.5), 0 0 30px rgba(255,215,0,0.6)",
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
