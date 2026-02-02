import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { testimonials } from "@/data/testimonials";

const TestimonialsCarousel = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const autoplayPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      breakpoints: {
        "(min-width: 768px)": { slidesToScroll: 1 },
      },
    },
    [autoplayPlugin.current]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = (index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  };

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

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

        {/* Testimonial Carousel - 3 cards visible */}
        <div ref={sectionRef} className="mb-20 relative">
          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-card rounded-full shadow-soft flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors hidden md:flex"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-card rounded-full shadow-soft flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors hidden md:flex"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>

          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex touch-pan-y">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4 first:pl-0 md:first:pl-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="h-full"
                  >
                    <div className="relative h-full bg-card rounded-3xl p-6 md:p-8 mx-2 shadow-soft hover:shadow-card transition-all duration-300 border border-border/50 overflow-hidden group">
                      {/* Animated background on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Stars */}
                      <div className="flex gap-1 mb-4 relative z-10">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.5 + i * 0.1 }}
                          >
                            <Star
                              size={18}
                              className={
                                i < testimonial.rating
                                  ? "text-accent fill-accent"
                                  : "text-muted"
                              }
                            />
                          </motion.div>
                        ))}
                      </div>

                      {/* Quote Text with prominent quotation marks */}
                      <blockquote className="text-base md:text-lg font-serif text-foreground leading-relaxed mb-6 line-clamp-4 relative z-10">
                        <span className="text-3xl text-accent font-serif font-bold leading-none align-top mr-1">"</span>
                        {testimonial.text}
                        <span className="text-3xl text-accent font-serif font-bold leading-none align-bottom ml-1">"</span>
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center gap-3 mt-auto relative z-10">
                        <motion.div 
                          className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0 shadow-soft"
                          whileHover={{ scale: 1.1 }}
                        >
                          <span className="text-sm font-semibold text-primary-foreground">
                            {testimonial.initials}
                          </span>
                        </motion.div>
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground text-sm truncate">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {testimonial.location}
                          </p>
                        </div>
                      </div>

                      {/* Product Tag */}
                      <motion.div 
                        className="mt-4 relative z-10"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                          {testimonial.product}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "bg-primary w-8"
                    : "bg-muted hover:bg-muted-foreground/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* TikTok Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <span className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4">
            Follow Our Journey
          </span>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-6">
            See Our Products in Action
          </h3>
          <motion.a
            href="https://www.tiktok.com/@nuniglobalc"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-card"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
            </svg>
            Follow @nuniglobalc
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
