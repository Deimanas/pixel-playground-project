import { motion } from "framer-motion";
import { Calendar, Trophy, Users, Sword, Gift, Star, Clock } from "lucide-react";

const events = [
  {
    title: "PvP Turnyras",
    date: "Kiekvieną šeštadienį",
    time: "20:00",
    description: "Kovok prieš kitus žaidėjus ir laimėk vertingus prizus!",
    icon: Sword,
    prize: "500 Coins + Rare Items",
    color: "redstone"
  },
  {
    title: "Build Battle",
    date: "Kiekvieną sekmadienį",
    time: "18:00",
    description: "Parodyk savo kūrybiškumą statybų konkurse.",
    icon: Star,
    prize: "VIP rangas 1 mėnesiui",
    color: "gold"
  },
  {
    title: "Treasure Hunt",
    date: "Kiekvieną penktadienį",
    time: "19:00",
    description: "Surask paslėptus lobius visame serveryje!",
    icon: Gift,
    prize: "Mystery Box x3",
    color: "emerald"
  },
  {
    title: "Clan Wars",
    date: "Kas 2 savaites",
    time: "21:00",
    description: "Klanų mūšiai dėl teritorijų ir garbės.",
    icon: Users,
    prize: "Clan Base Upgrade",
    color: "diamond"
  },
];

export const Events = () => {
  return (
    <section id="events" className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Animated background blocks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 bg-emerald/10 border border-emerald/20"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

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
            className="inline-flex items-center gap-3 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-12 h-12 bg-gold flex items-center justify-center minecraft-block">
              <Calendar className="w-6 h-6 text-accent-foreground" />
            </div>
            <h2 className="text-3xl md:text-5xl font-pixel text-foreground">
              Serverio Eventai
            </h2>
          </motion.div>
          <p className="text-lg text-muted-foreground font-minecraft max-w-2xl mx-auto">
            Dalyvauk įvairiuose renginiuose ir laimėk nuostabius prizus!
          </p>
        </motion.div>

        {/* Events Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Central Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-border md:-translate-x-1/2">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-emerald via-gold to-diamond"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              style={{ transformOrigin: "top" }}
            />
          </div>

          {/* Event Cards */}
          <div className="space-y-8 md:space-y-12">
            {events.map((event, index) => {
              const IconComponent = event.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-row`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 md:-translate-x-1/2 z-10">
                    <motion.div
                      className={`w-full h-full bg-${event.color} minecraft-block`}
                      whileHover={{ scale: 1.5 }}
                      animate={{ 
                        boxShadow: [
                          `0 0 0 0 hsl(var(--${event.color}) / 0.4)`,
                          `0 0 0 8px hsl(var(--${event.color}) / 0)`,
                        ]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>

                  {/* Card */}
                  <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-8" : "md:pl-8"}`}>
                    <motion.div
                      className="group bg-card border-4 border-border minecraft-block p-5 relative overflow-hidden hover:border-gold transition-colors"
                      whileHover={{ y: -5 }}
                    >
                      {/* Background Pattern */}
                      <div 
                        className="absolute inset-0 opacity-5"
                        style={{
                          backgroundImage: `repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 10px,
                            hsl(var(--foreground)) 10px,
                            hsl(var(--foreground)) 11px
                          )`
                        }}
                      />

                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-3">
                          <div className={`w-12 h-12 bg-${event.color} flex items-center justify-center minecraft-block shrink-0`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-pixel text-foreground truncate">
                              {event.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <span className="text-sm font-minecraft text-gold flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {event.date}
                              </span>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-sm font-minecraft text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {event.time}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground font-minecraft text-sm mb-4">
                          {event.description}
                        </p>

                        {/* Prize */}
                        <div className="flex items-center gap-2 p-3 bg-gold/10 border-2 border-gold/30 minecraft-block">
                          <Trophy className="w-5 h-5 text-gold shrink-0" />
                          <span className="text-sm font-minecraft text-gold">
                            {event.prize}
                          </span>
                        </div>
                      </div>

                      {/* Hover Shine Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* End Node */}
          <motion.div 
            className="absolute left-4 md:left-1/2 -bottom-4 md:-translate-x-1/2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-8 h-8 bg-emerald minecraft-block flex items-center justify-center">
              <Trophy className="w-4 h-4 text-white" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
