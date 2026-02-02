import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import HeroCarousel from "@/components/HeroCarousel";
import About from "@/components/About";
import Products from "@/components/Products";
import Benefits from "@/components/Benefits";
import StatsCounter from "@/components/StatsCounter";
import HowItWorks from "@/components/HowItWorks";
import IngredientsSpotlight from "@/components/IngredientsSpotlight";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import PageTransition from "@/components/PageTransition";

// Import before/after images (using existing hero images as placeholders)
import beforeImage from "@/assets/hero-1.jpeg";
import afterImage from "@/assets/hero-2.jpeg";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      
      <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
        <Navigation />
        <PageTransition>
          <main>
            <HeroCarousel />
            <About />
            <Products />
            <Benefits />
            <StatsCounter />
            <HowItWorks />
            <IngredientsSpotlight />
            <TestimonialsCarousel />
            <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
              beforeLabel="Before"
              afterLabel="After"
              testimonial={{
                quote: "After just 4 weeks of using Nuni products, my skin has completely transformed. The natural glow is incredible!",
                author: "Akua M., Accra"
              }}
            />
            <Partners />
          </main>
        </PageTransition>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </div>
    </>
  );
};

export default Index;
