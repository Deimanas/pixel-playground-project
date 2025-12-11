import { motion } from "framer-motion";
import { Calendar, Trophy, Sword, Gift, Star, Crown, Clock } from "lucide-react";

const events = [
  {
    title: "PvP Turnyras",
    date: "Kiekvieną šeštadienį",
    time: "20:00",
    description: "Kovok prieš kitus žaidėjus ir laimėk vertingus prizus!",
    icon: Sword,
    prize: "500 Coins + Rare Items",
    color: "redstone",
  },
  {
    title: "Build Battle",
    date: "Kiekvieną sekmadienį",
    time: "18:00",
    description: "Parodyk savo kūrybiškumą statybų konkurse.",
    icon: Star,
    prize: "VIP rangas 1 mėnesiui",
    color: "gold",
  },
  {
    title: "Treasure Hunt",
    date: "Kiekvieną penktadienį",
    time: "19:00",
    description: "Surask paslėptus lobius visame serveryje!",
    icon: Gift,
    prize: "Mystery Box x3",
    color: "emerald",
  },
  {
    title: "Clan Wars",
    date: "Kas 2 savaites",
    time: "21:00",
    description: "Klanų mūšiai dėl teritorijų ir garbės.",
    icon: Crown,
    prize: "Clan Base Upgrade",
    color: "diamond",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  redstone: { 
    bg: "bg-redstone", 
    text: "text-redstone", 
    border: "border-redstone",
    glow: "shadow-[0_0_20px_rgba(255,0,0,0.3)]"
  },
  gold: { 
    bg: "bg-gold", 
    text: "text-gold", 
    border: "border-gold",
    glow: "shadow-[0_0_20px_rgba(255,215,0,0.3)]"
  },
  emerald: { 
    bg: "bg-emerald", 
    text: "text-emerald", 
    border: "border-emerald",
    glow: "shadow-[0_0_20px_rgba(80,200,120,0.3)]"
  },
  diamond: { 
    bg: "bg-diamond", 
    text: "text-diamond", 
    border: "border-diamond",
    glow: "shadow-[0_0_20px_rgba(93,236,245,0.3)]"
  },
};

export const Events = () => {
  return (
    <section id="events" className="py-24 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gold/30"
            style={{
              left: `${10 + (i * 7)}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-4 mb-4">
            <motion.div 
              className="w-12 h-12 bg-gold flex items-center justify-center minecraft-block"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Calendar className="w-6 h-6 text-background" />
            </motion.div>
            <h2 className="font-pixel text-2xl md:text-4xl text-foreground text-shadow-minecraft">
              SERVERIO <span className="text-gold">EVENTAI</span>
            </h2>
          </div>
          <p className="font-minecraft text-xl text-muted-foreground max-w-xl mx-auto">
            Dalyvauk renginiuose ir laimėk nuostabius prizus!
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {events.map((event, index) => {
            const IconComponent = event.icon;
            const colors = colorMap[event.color];
            
            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <motion.div
                  className={`relative h-full bg-card border-4 border-border minecraft-block overflow-hidden transition-all duration-300 group-hover:${colors.border} group-hover:${colors.glow}`}
                  whileHover={{ y: -8 }}
                >
                  {/* Color bar */}
                  <div className={`h-2 ${colors.bg}`} />
                  
                  {/* Icon */}
                  <div className="pt-6 px-5 flex justify-center">
                    <motion.div 
                      className={`w-16 h-16 ${colors.bg} flex items-center justify-center minecraft-block`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-5 text-center">
                    <h3 className={`font-pixel text-sm mb-3 ${colors.text}`}>
                      {event.title}
                    </h3>
                    
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="font-minecraft text-base text-muted-foreground">
                        {event.date} • {event.time}
                      </span>
                    </div>

                    <p className="font-minecraft text-sm text-muted-foreground mb-4 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Prize */}
                    <div className={`flex items-center justify-center gap-2 py-3 px-4 bg-muted/50 border-2 ${colors.border}/30 minecraft-block`}>
                      <Trophy className={`w-4 h-4 ${colors.text}`} />
                      <span className={`font-minecraft text-sm ${colors.text} font-bold`}>
                        {event.prize}
                      </span>
                    </div>
                  </div>

                  {/* Corner decorations */}
                  <motion.div
                    className={`absolute top-4 right-4 w-2 h-2 ${colors.bg}`}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  />
                  <motion.div
                    className={`absolute bottom-4 left-4 w-2 h-2 ${colors.bg}`}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 + 1 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Discord CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-card border-2 border-border minecraft-block">
            <span className="font-minecraft text-lg text-muted-foreground">
              Prisijunk prie <span className="text-gold font-bold">Discord</span> ir gauk pranešimus!
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
