import { motion } from "framer-motion";
import { Shield, Users, Sparkles, Sword, Map, Trophy } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Draugiška Bendruomenė",
    description: "Prisijunk prie šimtų žaidėjų, kurie mėgsta bendrauti ir padėti vieni kitiems.",
    color: "emerald",
  },
  {
    icon: Sword,
    title: "Rolių Žaidimas",
    description: "Pasirink savo kelią – statybininkas, karys ar diplomatas. Tu sprendi!",
    color: "redstone",
  },
  {
    icon: Map,
    title: "Unikalus Žemėlapis",
    description: "Tyrinėk mūsų specialiai sukurtą pasaulį su slaptomis vietomis ir iššūkiais.",
    color: "diamond",
  },
  {
    icon: Trophy,
    title: "Renginiai",
    description: "Dalyvauk reguliariuose renginiuose ir laimėk įspūdingus prizus!",
    color: "gold",
  },
  {
    icon: Shield,
    title: "Aktyvi Administracija",
    description: "Mūsų komanda visada pasiruošusi padėti ir išspręsti bet kokius klausimus.",
    color: "lapis",
  },
  {
    icon: Sparkles,
    title: "Mod-Pack Parama",
    description: "Žaisk su įvairiais modifikacijomis, kurios praturtina žaidimo patirtį.",
    color: "grass",
  },
];

const colorMap: Record<string, string> = {
  emerald: "bg-emerald",
  redstone: "bg-redstone",
  diamond: "bg-diamond",
  gold: "bg-gold",
  lapis: "bg-lapis",
  grass: "bg-grass",
};

export const Features = () => {
  return (
    <section className="py-24 bg-card relative overflow-hidden" id="features">
      {/* Block Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full creeper-pattern" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-pixel text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 text-shadow-minecraft">
            KODĖL <span className="text-emerald">ARGAS</span>?
          </h2>
          <p className="font-minecraft text-xl text-muted-foreground max-w-2xl mx-auto">
            Mūsų serveris siūlo unikalią patirtį, kurią sukuria atsidavusi bendruomenė ir nuolatiniai patobulinimai.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="h-full bg-background border-4 border-border p-6 minecraft-block transition-all duration-300 hover:translate-y-[-4px] hover:border-emerald/50">
                {/* Icon */}
                <div className={`w-16 h-16 ${colorMap[feature.color]} flex items-center justify-center mb-4 minecraft-block`}>
                  <feature.icon className="w-8 h-8 text-foreground" />
                </div>

                {/* Title */}
                <h3 className="font-pixel text-sm text-foreground mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-minecraft text-lg text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
