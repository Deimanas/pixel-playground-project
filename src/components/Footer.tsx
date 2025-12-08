import { motion } from "framer-motion";
import { Youtube, MessageSquare, Camera, BookOpen, ExternalLink } from "lucide-react";

const socialLinks = [
  { 
    name: "Discord", 
    href: "https://discord.gg/argashub", 
    icon: MessageSquare,
    color: "hover:bg-lapis hover:border-lapis",
    description: "Prisijunk prie diskusijų"
  },
  { 
    name: "YouTube", 
    href: "https://www.youtube.com/@ArgoYT", 
    icon: Youtube,
    color: "hover:bg-redstone hover:border-redstone",
    description: "70+ video įrašų"
  },
  { 
    name: "Galerija", 
    href: "https://argashub.lt/galerija", 
    icon: Camera,
    color: "hover:bg-diamond hover:border-diamond",
    description: "Serverio akimirkos"
  },
  { 
    name: "Istorija", 
    href: "https://argashub.lt/istorija", 
    icon: BookOpen,
    color: "hover:bg-gold hover:border-gold",
    description: "Argo priešistorė"
  },
];

export const Footer = () => {
  return (
    <footer className="bg-obsidian relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 20px,
            hsl(var(--border)) 20px,
            hsl(var(--border)) 21px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 20px,
            hsl(var(--border)) 20px,
            hsl(var(--border)) 21px
          )`
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          {/* Logo Section */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="inline-flex items-center gap-4 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-grass flex items-center justify-center minecraft-block relative group">
                <span className="font-pixel text-primary-foreground text-2xl">A</span>
                <motion.div 
                  className="absolute inset-0 bg-emerald/50 minecraft-block"
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <span className="font-pixel text-foreground text-lg block">
                  ARGAS<span className="text-emerald">HUB</span>
                </span>
                <span className="font-minecraft text-muted-foreground text-sm">
                  Nuo 2020 m.
                </span>
              </div>
            </motion.div>
            <p className="font-minecraft text-lg text-muted-foreground max-w-md mx-auto">
              Lietuviškas Minecraft serveris, kuriame kiekvienas žaidėjas randa savo vietą.
            </p>
          </motion.div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-card border-4 border-border p-6 minecraft-block text-center transition-all duration-300 ${link.color}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="w-12 h-12 bg-background/50 border-2 border-border mx-auto mb-3 flex items-center justify-center minecraft-block group-hover:bg-background/80 transition-colors"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <link.icon className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                </motion.div>
                <h4 className="font-pixel text-xs text-foreground mb-1 flex items-center justify-center gap-1">
                  {link.name}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
                <p className="font-minecraft text-sm text-muted-foreground">
                  {link.description}
                </p>
              </motion.a>
            ))}
          </div>

          {/* Decorative Minecraft Blocks */}
          <div className="flex justify-center gap-2 mb-8">
            {['bg-grass', 'bg-dirt', 'bg-stone', 'bg-diamond', 'bg-gold', 'bg-redstone', 'bg-emerald', 'bg-lapis'].map((color, i) => (
              <motion.div
                key={i}
                className={`w-4 h-4 ${color} minecraft-block`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.3, rotate: 45 }}
              />
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-4 border-border py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p 
              className="font-minecraft text-muted-foreground text-center md:text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              © 2020-2025 ArgasHub. Visos teisės saugomos.
            </motion.p>
            
            {/* Creeper Face Easter Egg */}
            <motion.div
              className="flex items-center gap-3 cursor-pointer group"
              whileHover={{ scale: 1.05 }}
            >
              <span className="font-minecraft text-muted-foreground group-hover:text-emerald transition-colors">
                Sukurta Lietuvoje
              </span>
              <div className="grid grid-cols-4 gap-px w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity">
                {/* Creeper face pattern */}
                {[
                  0, 1, 1, 0,
                  1, 1, 1, 1,
                  0, 1, 1, 0,
                  1, 0, 0, 1,
                ].map((filled, i) => (
                  <motion.div
                    key={i}
                    className={`w-2 h-2 ${filled ? "bg-grass" : "bg-emerald"}`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};
