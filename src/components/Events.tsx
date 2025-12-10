import { motion } from "framer-motion";
import { Calendar, Trophy, Users, Sword, Gift, Star } from "lucide-react";

const events = [
  {
    title: "PvP Turnyras",
    date: "Kiekvieną šeštadienį",
    time: "20:00",
    description: "Kovok prieš kitus žaidėjus ir laimėk vertingus prizus!",
    icon: Sword,
    color: "redstone",
    prize: "500 Coins + Rare Items"
  },
  {
    title: "Build Battle",
    date: "Kiekvieną sekmadienį",
    time: "18:00",
    description: "Parodyk savo kūrybiškumą statybų konkurse.",
    icon: Star,
    color: "gold",
    prize: "VIP rangas 1 mėnesiui"
  },
  {
    title: "Treasure Hunt",
    date: "Kiekvieną penktadienį",
    time: "19:00",
    description: "Surask paslėptus lobius visame serveryje!",
    icon: Gift,
    color: "emerald",
    prize: "Mystery Box x3"
  },
  {
    title: "Clan Wars",
    date: "Kas 2 savaites",
    time: "21:00",
    description: "Klanų mūšiai dėl teritorijų ir garbės.",
    icon: Users,
    color: "diamond",
    prize: "Clan Base Upgrade"
  },
  {
    title: "Boss Raid",
    date: "Kiekvieną trečiadienį",
    time: "20:30",
    description: "Suvienyk jėgas prieš galingus bosus!",
    icon: Trophy,
    color: "lapis",
    prize: "Legendary Gear"
  }
];

const colorClasses = {
  redstone: "border-redstone bg-redstone/10 text-redstone",
  gold: "border-gold bg-gold/10 text-gold",
  emerald: "border-emerald bg-emerald/10 text-emerald",
  diamond: "border-diamond bg-diamond/10 text-diamond",
  lapis: "border-lapis bg-lapis/10 text-lapis"
};

export const Events = () => {
  return (
    <section id="events" className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 32px,
              hsl(var(--border)) 32px,
              hsl(var(--border)) 33px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 32px,
              hsl(var(--border)) 32px,
              hsl(var(--border)) 33px
            )`
          }}
        />
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
          <div className="inline-flex items-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-gold" />
            <h2 className="text-3xl md:text-5xl font-pixel text-foreground">
              Serverio Eventai
            </h2>
          </div>
          <p className="text-lg text-muted-foreground font-minecraft max-w-2xl mx-auto">
            Dalyvauk įvairiuose renginiuose ir laimėk nuostabius prizus!
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => {
            const IconComponent = event.icon;
            const colorClass = colorClasses[event.color as keyof typeof colorClasses];
            
            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <div className="h-full bg-card border-4 border-border minecraft-block p-6 relative overflow-hidden transition-all duration-300 group-hover:border-gold">
                  {/* Icon Badge */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 border-4 ${colorClass} minecraft-block mb-4`}>
                    <IconComponent className="w-7 h-7" />
                  </div>

                  {/* Event Info */}
                  <h3 className="text-xl font-pixel text-foreground mb-2">
                    {event.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-minecraft text-gold">{event.date}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm font-minecraft text-muted-foreground">{event.time}</span>
                  </div>

                  <p className="text-muted-foreground font-minecraft text-sm mb-4">
                    {event.description}
                  </p>

                  {/* Prize */}
                  <div className="mt-auto pt-4 border-t-2 border-border">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-gold" />
                      <span className="text-sm font-minecraft text-gold">{event.prize}</span>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
