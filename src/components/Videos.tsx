import { motion } from "framer-motion";
import { Play, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

const videos = [
  {
    title: "PRADEDAM STATYTI KAIMELĮ! 🍉",
    subtitle: "Nuotykių žemė #01",
    duration: "19:27",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    title: "MANO KELIONĖ NUOTYKIŲ ŽEMĖJE 😮🌎",
    subtitle: "Nuotykių žemė #02",
    duration: "21:58",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    title: "KĄ RADAU PO VANDENIU MANE NUSTEBINO! 😮",
    subtitle: "Nuotykių žemė #03",
    duration: "28:03",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    title: "NUO VIENO SMŪGIO VOS NEMIRIAU 🔥",
    subtitle: "Nuotykių žemė #04",
    duration: "24:07",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    title: "TOKIO POKŠTO DAR NEMAČIAU! 😂⭐",
    subtitle: "Nuotykių žemė #05",
    duration: "14:59",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    title: "NEGALI BŪTI, KAD MANO NAMAS VĖL PO ŽEME 😅",
    subtitle: "Nuotykių žemė #06",
    duration: "16:46",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    title: "STATAU DIDŽIAUSIĄ TVIRTOVĘ! 🏰",
    subtitle: "Nuotykių žemė #07",
    duration: "22:15",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    title: "PIRATŲ LOBIŲ MEDŽIOKLĖ! 💎",
    subtitle: "Nuotykių žemė #08",
    duration: "18:42",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    title: "PASLAPTINGAS POŽEMIS! 👻",
    subtitle: "Nuotykių žemė #09",
    duration: "25:33",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
];

export const Videos = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const videosPerPage = 6;
  const totalPages = Math.ceil(videos.length / videosPerPage);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentVideos = videos.slice(
    currentPage * videosPerPage,
    (currentPage + 1) * videosPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="py-24 bg-background relative" id="videos">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-pixel text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 text-shadow-minecraft">
            VAIZDO <span className="text-redstone">ĮRAŠAI</span>
          </h2>
          <p className="font-minecraft text-xl text-muted-foreground max-w-2xl mx-auto">
            Peržiūrėk nuotykius iš Argas serverio – nuo epinių statybų iki linksmų momentų su draugais.
          </p>
        </motion.div>

        {/* Videos Carousel Container */}
        <div className="relative" ref={containerRef}>
          {/* Navigation Arrows */}
          <motion.button
            className="absolute -left-2 md:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-background/80 backdrop-blur-sm border-4 border-border flex items-center justify-center minecraft-block hover:border-redstone transition-colors"
            onClick={prevPage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </motion.button>
          
          <motion.button
            className="absolute -right-2 md:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-background/80 backdrop-blur-sm border-4 border-border flex items-center justify-center minecraft-block hover:border-redstone transition-colors"
            onClick={nextPage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </motion.button>

          {/* Videos Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-8 md:mx-16"
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            {currentVideos.map((video, index) => (
              <motion.div
                key={`${currentPage}-${index}`}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="bg-card border-4 border-border overflow-hidden minecraft-block hover:border-redstone/50 transition-colors">
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-grass/30 to-emerald/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-16 h-16 bg-redstone flex items-center justify-center minecraft-block"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Play className="w-8 h-8 text-primary-foreground ml-1" />
                      </motion.div>
                    </div>
                    {/* Duration Badge */}
                    <div className="absolute bottom-2 right-2 bg-background/90 px-2 py-1">
                      <span className="font-minecraft text-foreground text-sm">{video.duration}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-minecraft text-lg text-foreground mb-1 line-clamp-2 group-hover:text-redstone transition-colors">
                      {video.title}
                    </h3>
                    <p className="font-minecraft text-muted-foreground">{video.subtitle}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Page Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {[...Array(totalPages)].map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 minecraft-block transition-colors ${
                  index === currentPage ? "bg-redstone" : "bg-border hover:bg-muted-foreground"
                }`}
                onClick={() => setCurrentPage(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        {/* More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Button variant="redstone" size="lg" asChild>
            <a href="https://www.youtube.com/@ArgoYT" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-5 h-5" />
              Visi Vaizdo Įrašai
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
