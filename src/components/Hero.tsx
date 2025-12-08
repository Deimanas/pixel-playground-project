import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Pickaxe, Users, Gamepad2 } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

export const Hero = () => {
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
          {[
            { value: "500+", label: "Žaidėjų" },
            { value: "5+", label: "Metų" },
            { value: "70+", label: "Video" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="font-pixel text-2xl md:text-3xl text-gold glow-text">{stat.value}</p>
              <p className="font-minecraft text-lg text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-8 h-12 border-4 border-muted-foreground flex items-start justify-center p-1">
          <motion.div
            className="w-2 h-3 bg-emerald"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};
