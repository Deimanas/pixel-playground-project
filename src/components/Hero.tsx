import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, Gamepad2 } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";
import { AnimatedCounter } from "./AnimatedCounter";

interface HeroProps {
  startCounters?: boolean;
}

export const Hero = ({ startCounters = true }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>

      {/* Floating Blocks Decoration */}
      <motion.div
        className="absolute top-32 left-10 w-16 h-16 bg-grass minecraft-block hidden md:block"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-48 right-20 w-12 h-12 bg-dirt minecraft-block hidden md:block"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-32 left-20 w-10 h-10 bg-stone minecraft-block hidden md:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-64 left-1/4 w-8 h-8 bg-diamond minecraft-block hidden lg:block"
        animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Title */}
          <h1 className="font-pixel text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 text-shadow-minecraft leading-relaxed">
            ĮSITRAUK Į MŪSŲ
            <br />
            <span className="text-emerald">BENDRUOMENĘ</span>
          </h1>

          {/* Description */}
          <p className="font-minecraft text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Čia kiekvienas žaidėjas jaučiasi laukiamas ir vertinamas. 
            Draugiška ir aktyvi atmosfera skatina bendradarbiavimą, 
            o pagalba visada šalia – tiek naujokams, tiek patyrusiems žaidėjams.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="emerald" size="xl" className="font-pixel text-sm">
                <Gamepad2 className="w-6 h-6" />
                Pradėti Žaisti
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="xl" className="font-pixel text-sm">
                <Users className="w-6 h-6" />
                Discord Serveris
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <AnimatedCounter value="230+" label="Žaidėjų" startAnimation={startCounters} />
          <AnimatedCounter value="7+" label="Metų" startAnimation={startCounters} />
          <AnimatedCounter value="70+" label="Video" startAnimation={startCounters} />
        </motion.div>
      </div>

      {/* Scroll Indicator - Minecraft Sword Style */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.span 
          className="font-minecraft text-sm text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Slinkite žemyn
        </motion.span>
        <motion.div
          className="relative"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Minecraft Sword pointing down */}
          <svg width="24" height="48" viewBox="0 0 24 48" className="drop-shadow-lg">
            {/* Blade */}
            <rect x="10" y="0" width="4" height="4" fill="hsl(var(--diamond))" />
            <rect x="10" y="4" width="4" height="4" fill="hsl(var(--diamond))" />
            <rect x="10" y="8" width="4" height="4" fill="hsl(var(--emerald))" />
            <rect x="10" y="12" width="4" height="4" fill="hsl(var(--emerald))" />
            <rect x="10" y="16" width="4" height="4" fill="hsl(var(--emerald))" />
            {/* Guard */}
            <rect x="4" y="20" width="4" height="4" fill="hsl(var(--gold))" />
            <rect x="10" y="20" width="4" height="4" fill="hsl(var(--gold))" />
            <rect x="16" y="20" width="4" height="4" fill="hsl(var(--gold))" />
            {/* Handle */}
            <rect x="10" y="24" width="4" height="4" fill="#8B4513" />
            <rect x="10" y="28" width="4" height="4" fill="#654321" />
            {/* Tip glow */}
            <rect x="10" y="0" width="4" height="4" fill="hsl(var(--diamond))" opacity="0.8">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
            </rect>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};
