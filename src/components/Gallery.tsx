import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera, ExternalLink } from "lucide-react";

const galleryImages = [
  {
    url: "https://argashub.lt/wp-content/uploads/2025/03/Snapchat-239645547-1630x860.jpg.webp",
    title: "Argas 2020 nominacijos",
  },
  {
    url: "https://argashub.lt/wp-content/uploads/2024/10/2021-01-16_22.29.57-1536x864.png.webp",
    title: "Serverio akimirka",
  },
  {
    url: "https://argashub.lt/wp-content/uploads/2024/10/2020-05-22_17.20.04-1536x864.png.webp",
    title: "Nuotykių žemė",
  },
  {
    url: "https://argashub.lt/wp-content/uploads/2024/10/2020-05-22_17.20.56-1536x864.png.webp",
    title: "Bendruomenės statyba",
  },
  {
    url: "https://argashub.lt/wp-content/uploads/2024/10/2020-05-22_15.57.19-1536x864.png.webp",
    title: "Žaidėjų renginys",
  },
  {
    url: "https://argashub.lt/wp-content/uploads/2024/10/2020-08-11_00.59.27-1536x864.png.webp",
    title: "Serverio panorama",
  },
];

export const Gallery = () => {
  return (
    <section className="py-24 bg-background relative" id="galerija">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-diamond/20 border-2 border-diamond mb-6">
            <Camera className="w-5 h-5 text-diamond" />
            <span className="font-minecraft text-diamond text-lg">GALERIJA</span>
          </div>
          <h2 className="font-pixel text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 text-shadow-minecraft">
            SERVERIO <span className="text-diamond">AKIMIRKOS</span>
          </h2>
          <p className="font-minecraft text-xl text-muted-foreground max-w-2xl mx-auto">
            Mūsų žaidėjai mėgsta fiksuoti įdomiausias, juokingiausias ar tiesiog gražiausias akimirkas iš serverio gyvenimo.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="group relative aspect-video overflow-hidden border-4 border-border minecraft-block"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-minecraft text-lg text-foreground">{image.title}</p>
                </div>
              </div>
              {/* Pixel Corner Decoration */}
              <div className="absolute top-0 right-0 w-6 h-6 bg-emerald opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Button variant="diamond" size="lg" asChild>
            <a href="https://argashub.lt/galerija" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-5 h-5" />
              Daugiau Galerijos
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
