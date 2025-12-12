import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sword, Map, Video, Calendar, MessageSquare, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import argasLogo from "@/assets/argas-logo.png";

const navItems = [
  { name: "Discord", href: "#discord", icon: MessageSquare },
  { name: "Istorija", href: "#istorija", icon: Sword },
  { name: "Vaizdo įrašai", href: "#videos", icon: Video },
  { name: "Renginiai", href: "#events", icon: Calendar },
  { name: "Žemėlapis", href: "#map", icon: Map },
  { name: "Anketa", href: "#anketa", icon: Users },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b-4 border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src={argasLogo} 
              alt="Argas" 
              className="h-10 md:h-12 w-auto"
            />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground font-minecraft text-lg transition-colors hover:bg-muted"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </motion.a>
            ))}
          </div>


          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t-4 border-border"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted font-minecraft text-xl"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-6 h-6" />
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
