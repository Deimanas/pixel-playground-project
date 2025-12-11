import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { History } from "@/components/History";
import { Events } from "@/components/Events";
import { Videos } from "@/components/Videos";
import { Discord } from "@/components/Discord";
import { ApplicationForm } from "@/components/ApplicationForm";
import { Footer } from "@/components/Footer";
import { PagePreloader } from "@/components/PagePreloader";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <PagePreloader onComplete={() => setIsLoading(false)} />}
      <div className={`min-h-screen bg-background ${isLoading ? 'overflow-hidden' : ''}`}>
        <Navbar />
        <main>
          <Hero startCounters={!isLoading} />
          <Gallery />
          <History />
          <Events />
          <Videos />
          <Discord />
          <ApplicationForm />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
