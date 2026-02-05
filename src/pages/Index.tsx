import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import HeroCarousel from "@/components/HeroCarousel";
import About from "@/components/About";
import Products from "@/components/Products";
import VideoCarousel from "@/components/VideoCarousel";
import StatsCounter from "@/components/StatsCounter";
import HowItWorks from "@/components/HowItWorks";
import IngredientsSpotlight from "@/components/IngredientsSpotlight";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
// import RealResults from "@/components/RealResults"; // Moved to dedicated /testimonials page
// import BeforeAfterSlider from "@/components/BeforeAfterSlider"; // Moved to dedicated /testimonials page
import Partners from "@/components/Partners";
// import { useLanguage } from "@/lib/i18n"; // Only used for BeforeAfterSlider (moved to /testimonials)
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import PageTransition from "@/components/PageTransition";

// Import before/after images - commented out (moved to /testimonials page)
// import beforeImage from "@/assets/hero-1.jpeg";
// import afterImage from "@/assets/transformation-after.jpeg";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  // const { t } = useLanguage(); // Only used for BeforeAfterSlider (moved to /testimonials)

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
            <VideoCarousel />
            <StatsCounter />
            <HowItWorks />
            <IngredientsSpotlight />
            <TestimonialsCarousel />
            {/* <RealResults /> - Moved to dedicated /testimonials page */}
            {/* <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
              testimonial={{
                quote: t.transformation.testimonialQuote,
                author: t.transformation.testimonialAuthor
              }}
            /> - Moved to dedicated /testimonials page */}
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
