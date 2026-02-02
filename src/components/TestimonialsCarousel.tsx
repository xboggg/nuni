import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Quote, Star, Play } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { testimonials } from "@/data/testimonials";
import { tiktokVideos } from "@/data/products";

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
        <div ref={sectionRef} className="mb-20">
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
                    className="h-full"
                  >
                    <div className="relative h-full bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-6 md:p-8 mx-2">
                      {/* Quote Icon */}
                      <div className="absolute -top-4 left-6">
                        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-gold">
                          <Quote size={18} className="text-accent-foreground" />
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex gap-1 mb-4 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < testimonial.rating
                                ? "text-accent fill-accent"
                                : "text-muted"
                            }
                          />
                        ))}
                      </div>

                      {/* Quote Text */}
                      <blockquote className="text-base md:text-lg font-serif text-foreground leading-relaxed mb-6 line-clamp-4">
                        "{testimonial.text}"
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center gap-3 mt-auto">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-semibold text-primary">
                            {testimonial.initials}
                          </span>
                        </div>
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
                      <div className="mt-4">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {testimonial.product}
                        </span>
                      </div>
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
