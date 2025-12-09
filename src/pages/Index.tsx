import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { History } from "@/components/History";
import { Videos } from "@/components/Videos";
import { Discord } from "@/components/Discord";
import { ApplicationForm } from "@/components/ApplicationForm";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <History />
        <Videos />
        <Discord />
        <ApplicationForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
