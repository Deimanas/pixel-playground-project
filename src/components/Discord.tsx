import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Mic, Hash, ExternalLink } from "lucide-react";

export const Discord = () => {
  return (
    <section className="py-24 bg-card relative overflow-hidden" id="discord">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-lapis/20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-lapis/20 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-lapis/20 border-2 border-lapis mb-6">
              <MessageSquare className="w-5 h-5 text-lapis" />
              <span className="font-minecraft text-lapis text-lg">DISCORD</span>
            </div>
            <h2 className="font-pixel text-2xl md:text-3xl lg:text-4xl text-foreground mb-6 text-shadow-minecraft leading-relaxed">
              PRISIJUNK PRIE <span className="text-lapis">DISKUSIJŲ</span>
            </h2>
            <p className="font-minecraft text-xl text-muted-foreground mb-8 leading-relaxed">
              Mūsų Discord serveris yra vieta, kur bendruomenė susitinka, planuoja renginius, 
              dalijasi akimirkomis ir tiesiog puikiai leidžia laiką. Čia visada rasi su kuo pasikalbėti!
            </p>

            {/* Discord Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: Users, value: "500+", label: "Narių" },
                { icon: Hash, value: "20+", label: "Kanalų" },
                { icon: Mic, value: "5+", label: "Voice" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center bg-background border-4 border-border p-4 minecraft-block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <stat.icon className="w-6 h-6 text-lapis mx-auto mb-2" />
                  <p className="font-pixel text-lg text-lapis">{stat.value}</p>
                  <p className="font-minecraft text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="default" size="xl" className="bg-lapis hover:bg-lapis/90 font-pixel text-sm" asChild>
                <a href="https://discord.gg/argashub" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-6 h-6" />
                  Prisijungti į Discord
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Discord Preview Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-background border-4 border-border p-6 minecraft-block">
              {/* Server Header */}
              <div className="flex items-center gap-4 pb-4 border-b-4 border-border mb-4">
                <div className="w-16 h-16 bg-grass flex items-center justify-center minecraft-block">
                  <span className="font-pixel text-primary-foreground text-xl">A</span>
                </div>
                <div>
                  <h3 className="font-pixel text-sm text-foreground">ArgasHub</h3>
                  <p className="font-minecraft text-muted-foreground">Oficialus Discord serveris</p>
                </div>
              </div>

              {/* Channels Preview */}
              <div className="space-y-2">
                {[
                  { name: "📢 skelbimai", active: false },
                  { name: "💬 bendras-chatas", active: true },
                  { name: "🎮 minecraft", active: false },
                  { name: "🎵 Muzikos kanalas", active: false, voice: true },
                  { name: "🎙️ Bendras", active: true, voice: true },
                ].map((channel, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-center gap-2 px-3 py-2 ${
                      channel.active ? "bg-lapis/20 border-l-4 border-lapis" : "hover:bg-muted"
                    } transition-colors cursor-pointer`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {channel.voice ? (
                      <Mic className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Hash className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className={`font-minecraft text-lg ${channel.active ? "text-foreground" : "text-muted-foreground"}`}>
                      {channel.name}
                    </span>
                    {channel.active && (
                      <span className="ml-auto w-2 h-2 bg-emerald animate-pulse" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Online Count */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t-4 border-border">
                <span className="w-3 h-3 bg-emerald" />
                <span className="font-minecraft text-muted-foreground">127 online dabar</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
