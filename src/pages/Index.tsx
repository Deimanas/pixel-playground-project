import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Gallery } from "@/components/Gallery";
import { History } from "@/components/History";
import { Videos } from "@/components/Videos";
import { Discord } from "@/components/Discord";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Gallery />
        <History />
        <Videos />
        <Discord />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
