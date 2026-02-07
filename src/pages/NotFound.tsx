import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Pickaxe } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background blocks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 minecraft-block bg-grass/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="text-center z-10">
        {/* 404 Number with Minecraft styling */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <h1 className="text-[120px] md:text-[180px] font-minecraft text-transparent bg-clip-text bg-gradient-to-b from-gold to-gold/60 leading-none">
              404
            </h1>
            <motion.div
              className="absolute -top-4 -right-4"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Pickaxe className="w-12 h-12 md:w-16 md:h-16 text-stone" />
            </motion.div>
          </div>
        </motion.div>

        {/* Error message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-minecraft text-foreground mb-4">
            Blokas <span className="text-emerald">Nerastas</span>!
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Atrodo, kad šis blokas buvo sunaikintas arba niekada neegzistavo mūsų pasaulyje.
          </p>
        </motion.div>

        {/* Minecraft-style block decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-2 mb-8"
        >
          {['bg-grass', 'bg-stone', 'bg-diamond', 'bg-gold', 'bg-emerald'].map((color, i) => (
            <motion.div
              key={i}
              className={`w-8 h-8 md:w-12 md:h-12 minecraft-block ${color}`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              whileHover={{ y: -5, scale: 1.1 }}
            />
          ))}
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button asChild variant="emerald" size="lg">
            <Link to="/">
              <Home className="w-5 h-5 mr-2" />
              Grįžti Namo
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" onClick={() => window.history.back()}>
            <button onClick={() => window.history.back()}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Grįžti Atgal
            </button>
          </Button>
        </motion.div>

        {/* Path info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-sm text-muted-foreground font-mono"
        >
          Ieškota: <span className="text-foreground">{location.pathname}</span>
        </motion.p>
      </div>
    </div>
  );
};

export default NotFound;
