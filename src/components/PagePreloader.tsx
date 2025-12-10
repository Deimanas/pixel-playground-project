import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const blocks = [
  { color: "#5D8731", delay: 0 },    // Grass
  { color: "#8B5A2B", delay: 0.05 }, // Dirt
  { color: "#7F7F7F", delay: 0.1 },  // Stone
  { color: "#3D3D3D", delay: 0.15 }, // Coal
  { color: "#5DECF5", delay: 0.2 },  // Diamond
  { color: "#FFD700", delay: 0.25 }, // Gold
  { color: "#50C878", delay: 0.3 },  // Emerald
  { color: "#C41E3A", delay: 0.35 }, // Redstone
];

interface BlockParticleProps {
  color: string;
  delay: number;
  index: number;
}

const BlockParticle = ({ color, delay, index }: BlockParticleProps) => {
  const angle = (index / blocks.length) * Math.PI * 2;
  const distance = 150 + Math.random() * 100;
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;
  const rotation = Math.random() * 720 - 360;

  return (
    <motion.div
      className="absolute w-6 h-6 md:w-8 md:h-8"
      style={{
        backgroundColor: color,
        boxShadow: `inset -2px -2px 0 rgba(0,0,0,0.3), inset 2px 2px 0 rgba(255,255,255,0.2)`,
      }}
      initial={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
      animate={{
        x: x,
        y: y,
        scale: 0,
        rotate: rotation,
        opacity: 0,
      }}
      transition={{
        duration: 0.8,
        delay: delay + 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    />
  );
};

export const PagePreloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"loading" | "exploding" | "done">("loading");

  useEffect(() => {
    const loadTimer = setTimeout(() => setPhase("exploding"), 800);
    const completeTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px'
            }}
          />

          {/* Central Block */}
          <div className="relative">
            {phase === "loading" && (
              <motion.div
                className="relative"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, ease: "backOut" }}
              >
                {/* Main Block */}
                <motion.div
                  className="w-20 h-20 md:w-28 md:h-28 relative"
                  animate={{ 
                    rotateY: [0, 360],
                    rotateX: [0, 15, 0, -15, 0]
                  }}
                  transition={{ 
                    rotateY: { duration: 2, repeat: Infinity, ease: "linear" },
                    rotateX: { duration: 1, repeat: Infinity }
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Block faces */}
                  <div 
                    className="absolute inset-0 bg-grass"
                    style={{
                      boxShadow: `
                        inset -4px -4px 0 rgba(0,0,0,0.3), 
                        inset 4px 4px 0 rgba(255,255,255,0.2),
                        0 0 40px rgba(93, 135, 49, 0.5)
                      `,
                    }}
                  />
                  {/* Pixel detail */}
                  <div className="absolute inset-2 grid grid-cols-3 grid-rows-3 gap-1">
                    {[...Array(9)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="bg-white/20"
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ 
                          duration: 0.5, 
                          delay: i * 0.1, 
                          repeat: Infinity 
                        }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Loading Text */}
                <motion.p
                  className="font-pixel text-sm md:text-base text-emerald text-center mt-6"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  LOADING...
                </motion.p>
              </motion.div>
            )}

            {/* Explosion Particles */}
            {phase === "exploding" && (
              <>
                {/* Center flash */}
                <motion.div
                  className="absolute w-32 h-32 md:w-48 md:h-48 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full"
                  style={{ backgroundColor: "#FFD700" }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Block particles */}
                {blocks.map((block, i) => (
                  <BlockParticle
                    key={i}
                    color={block.color}
                    delay={block.delay}
                    index={i}
                  />
                ))}

                {/* Additional small particles */}
                {[...Array(16)].map((_, i) => {
                  const angle = (i / 16) * Math.PI * 2;
                  const distance = 80 + Math.random() * 120;
                  return (
                    <motion.div
                      key={`small-${i}`}
                      className="absolute w-3 h-3 md:w-4 md:h-4"
                      style={{
                        backgroundColor: blocks[i % blocks.length].color,
                        boxShadow: `inset -1px -1px 0 rgba(0,0,0,0.3)`,
                      }}
                      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                      animate={{
                        x: Math.cos(angle) * distance,
                        y: Math.sin(angle) * distance + 50,
                        scale: 0,
                        opacity: 0,
                        rotate: Math.random() * 360,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: 0.55 + i * 0.02,
                        ease: "easeOut",
                      }}
                    />
                  );
                })}

                {/* ARGAS text reveal */}
                <motion.h1
                  className="font-pixel text-3xl md:text-5xl text-gold absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 whitespace-nowrap"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4, ease: "backOut" }}
                  style={{
                    textShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
                  }}
                >
                  ARGAS
                </motion.h1>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
