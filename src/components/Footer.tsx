import { motion } from "framer-motion";
import { Heart, ExternalLink } from "lucide-react";

const footerLinks = [
  { name: "Discord", href: "https://discord.gg/argashub" },
  { name: "YouTube", href: "https://www.youtube.com/@ArgoYT" },
  { name: "Istorija", href: "https://argashub.lt/istorija" },
  { name: "Galerija", href: "https://argashub.lt/galerija" },
  { name: "Žemėlapis", href: "#map" },
];

export const Footer = () => {
  return (
    <footer className="bg-obsidian border-t-4 border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-grass flex items-center justify-center minecraft-block">
                <span className="font-pixel text-primary-foreground text-lg">A</span>
              </div>
              <span className="font-pixel text-foreground text-sm">
                ARGAS<span className="text-emerald">HUB</span>
              </span>
            </div>
            <p className="font-minecraft text-lg text-muted-foreground">
              Lietuviškas Minecraft serveris, kuriame kiekvienas žaidėjas randa savo vietą.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-pixel text-xs text-foreground mb-4">NUORODOS</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="font-minecraft text-lg text-muted-foreground hover:text-emerald transition-colors flex items-center gap-2"
                  >
                    {link.name}
                    {link.href.startsWith("http") && <ExternalLink className="w-4 h-4" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-pixel text-xs text-foreground mb-4">BENDRUOMENĖ</h4>
            <div className="bg-card border-4 border-border p-4 minecraft-block">
              <p className="font-minecraft text-muted-foreground mb-4">
                Prisijunk prie mūsų Discord serverio ir tapk bendruomenės dalimi!
              </p>
              <a
                href="https://discord.gg/argashub"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-minecraft text-lg text-emerald hover:text-gold transition-colors"
              >
                <span className="w-3 h-3 bg-emerald animate-pulse" />
                Discord Serveris
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-4 border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-minecraft text-muted-foreground text-center md:text-left">
              © 2020-2025 ArgasHub. Visos teisės saugomos.
            </p>
            <motion.p
              className="font-minecraft text-muted-foreground flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              Sukurta su <Heart className="w-4 h-4 text-redstone fill-redstone" /> Lietuvoje
            </motion.p>
          </div>
        </div>

        {/* Creeper Face Easter Egg */}
        <motion.div
          className="mt-8 flex justify-center opacity-20 hover:opacity-100 transition-opacity cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          <div className="grid grid-cols-4 gap-0.5 w-16 h-16">
            {/* Creeper face pattern */}
            {[
              0, 1, 1, 0,
              1, 1, 1, 1,
              0, 1, 1, 0,
              1, 0, 0, 1,
            ].map((filled, i) => (
              <div
                key={i}
                className={`w-4 h-4 ${filled ? "bg-grass" : "bg-emerald"}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
