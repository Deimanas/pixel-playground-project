import { motion } from "framer-motion";
import { Calendar, Trophy, Sword, Gift, Star, Users, Zap, Crown } from "lucide-react";

const events = [
  {
    title: "PvP Turnyras",
    date: "Kiekvieną šeštadienį",
    time: "20:00",
    description: "Kovok prieš kitus žaidėjus ir laimėk vertingus prizus!",
    icon: Sword,
    prize: "500 Coins + Rare Items",
    gradient: "from-redstone to-redstone/60",
    accent: "redstone"
  },
  {
    title: "Build Battle",
    date: "Kiekvieną sekmadienį",
    time: "18:00",
    description: "Parodyk savo kūrybiškumą statybų konkurse.",
    icon: Star,
    prize: "VIP rangas 1 mėnesiui",
    gradient: "from-gold to-gold/60",
    accent: "gold"
  },
  {
    title: "Treasure Hunt",
    date: "Kiekvieną penktadienį",
    time: "19:00",
    description: "Surask paslėptus lobius visame serveryje!",
    icon: Gift,
    prize: "Mystery Box x3",
    gradient: "from-emerald to-emerald/60",
    accent: "emerald"
  },
  {
    title: "Clan Wars",
    date: "Kas 2 savaites",
    time: "21:00",
    description: "Klanų mūšiai dėl teritorijų ir garbės.",
    icon: Crown,
    prize: "Clan Base Upgrade",
    gradient: "from-diamond to-diamond/60",
    accent: "diamond"
  },
];

export const Events = () => {
  return (
    <section id="events" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      {/* Animated grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-3 mb-6"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="w-14 h-14 bg-gold flex items-center justify-center minecraft-block"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Calendar className="w-7 h-7 text-accent-foreground" />
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-pixel text-foreground">
              Serverio Eventai
            </h2>
          </motion.div>
          <p className="text-lg text-muted-foreground font-minecraft max-w-2xl mx-auto">
            Dalyvauk įvairiuose renginiuose ir laimėk nuostabius prizus!
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {events.map((event, index) => {
            const IconComponent = event.icon;
            
            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <motion.div
                  className="relative h-full bg-card border-4 border-border minecraft-block overflow-hidden"
                  whileHover={{ y: -8, borderColor: `hsl(var(--${event.accent}))` }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient Header */}
                  <div className={`h-2 bg-gradient-to-r ${event.gradient}`} />
                  
                  {/* Content */}
                  <div className="p-6">
                    {/* Icon & Title */}
                    <div className="flex items-start gap-4 mb-4">
                      <motion.div 
                        className={`w-14 h-14 bg-${event.accent} flex items-center justify-center minecraft-block shrink-0`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <IconComponent className="w-7 h-7 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl font-pixel text-foreground mb-1">
                          {event.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-sm font-minecraft">
                          <span className={`text-${event.accent}`}>{event.date}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">{event.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground font-minecraft text-sm mb-5 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Prize Box */}
                    <div className={`flex items-center gap-3 p-4 bg-${event.accent}/10 border-2 border-${event.accent}/30 minecraft-block`}>
                      <Trophy className={`w-5 h-5 text-${event.accent} shrink-0`} />
                      <div>
                        <p className="text-xs font-minecraft text-muted-foreground uppercase tracking-wider">Prizas</p>
                        <p className={`text-sm font-minecraft text-${event.accent} font-bold`}>
                          {event.prize}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-t from-${event.accent}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
                  />

                  {/* Corner Decoration */}
                  <div className="absolute top-4 right-4">
                    <motion.div
                      className={`w-3 h-3 bg-${event.accent}`}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-card border-2 border-border minecraft-block">
            <Zap className="w-5 h-5 text-gold" />
            <span className="font-minecraft text-muted-foreground">
              Prisijunk prie <span className="text-gold">Discord</span> ir gauk pranešimus apie eventus!
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};