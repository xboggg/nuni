import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Leaf, Sparkles } from "lucide-react";
import { getWhatsAppLink, GENERAL_INQUIRY_MESSAGE } from "@/data/products";
import FallingLeaves from "./FallingLeaves";

// Import all hero images
import hero1 from "@/assets/hero-1.jpeg";
import hero2 from "@/assets/hero-2.jpeg";
import hero3 from "@/assets/hero-3.jpeg";
import hero4 from "@/assets/hero-4.png";
import hero5 from "@/assets/hero-5.png";
import hero6 from "@/assets/hero-6.jpeg";

const heroImages = [hero1, hero2, hero3, hero4, hero5, hero6];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-neutral-900">
      {/* Static background to prevent white flash */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-none"
        style={{ backgroundImage: `url(${heroImages[currentIndex]})` }}
      />
      
      {/* Falling Leaves Overlay */}
      <FallingLeaves />

      {/* Background Images with Breathing Effect */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImages[currentIndex]})` }}
            />
            {/* Gradient overlay for text readability - stronger on left side */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Parallax Decorative Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-40 left-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl"
      />

      {/* Content - positioned more to the left on desktop */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container-custom pt-20">
          <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl ml-0 lg:-ml-8 xl:-ml-12">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-white/20 mb-6 shadow-lg"
            >
              <Sparkles size={16} className="text-primary" />
              <span className="text-sm font-medium text-neutral-800">
                Premium African Skincare
              </span>
            </motion.div>

            {/* Headline - with text shadow for better contrast */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white leading-tight mb-6"
              style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5), 0 0 40px rgba(0,0,0,0.3)' }}
            >
              Radiant Skin,{" "}
              <span className="text-gradient-green" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}>
                Naturally Yours
              </span>
            </motion.h1>

            {/* Subheadline - improved contrast */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-xl"
              style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
            >
              Discover the power of African botanicals. Premium skincare crafted
              with 100% natural ingredients for visibly healthier, glowing skin.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-green hover:scale-105 shadow-lg"
              >
                Explore Products
              </a>
              <a
                href={getWhatsAppLink(GENERAL_INQUIRY_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-primary shadow-lg"
              >
                Contact Us
              </a>
            </motion.div>

            {/* Natural Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-3 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg"
            >
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Leaf size={20} className="text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-neutral-800">
                100% Natural Ingredients
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-card transition-all duration-200 shadow-soft"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-card transition-all duration-200 shadow-soft"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary w-8"
                : "bg-card/60 hover:bg-card"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase rotate-90 origin-center">
          Scroll
        </span>
        <div className="w-px h-12 bg-border" />
      </motion.div>
    </section>
  );
};

export default HeroCarousel;
