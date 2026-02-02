import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { tiktokVideos } from "@/data/products";

const TestimonialsCarousel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextTestimonial, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextTestimonial]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 lg:py-32 bg-background overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4">
            Customer Love
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from real people. See why thousands trust Nuni Global for
            their skincare journey.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div ref={ref} className="max-w-4xl mx-auto mb-20">
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={() => {
                prevTestimonial();
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-10 h-10 bg-card rounded-full flex items-center justify-center text-foreground hover:bg-muted transition-all duration-200 shadow-soft"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => {
                nextTestimonial();
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-10 h-10 bg-card rounded-full flex items-center justify-center text-foreground hover:bg-muted transition-all duration-200 shadow-soft"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>

            {/* Testimonial Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="relative bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 md:p-12"
              >
                {/* Quote Icon */}
                <div className="absolute -top-6 left-8 md:left-12">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-gold">
                    <Quote size={24} className="text-accent-foreground" />
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < currentTestimonial.rating
                          ? "text-accent fill-accent"
                          : "text-muted"
                      }
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif text-foreground leading-relaxed mb-8">
                  "{currentTestimonial.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary">
                        {currentTestimonial.initials}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {currentTestimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {currentTestimonial.location}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {currentTestimonial.product}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-muted hover:bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* TikTok Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4">
            Follow Our Journey
          </span>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
            See Our Products in Action
          </h3>
          <a
            href="https://www.tiktok.com/@nuniglobalc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
            </svg>
            @nuniglobalc
          </a>
        </motion.div>

        {/* Video Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {tiktokVideos.slice(0, 6).map((url, index) => (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[9/16] bg-muted rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300"
            >
              {/* Placeholder with play button */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="w-12 h-12 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play
                    size={20}
                    className="text-primary ml-1"
                    fill="currentColor"
                  />
                </div>
              </div>

              {/* TikTok branding */}
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center gap-2 text-card text-xs font-medium">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                  </svg>
                  Watch
                </div>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
