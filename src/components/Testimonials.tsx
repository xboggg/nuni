import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Star, Play } from "lucide-react";
import { tiktokVideos } from "@/data/products";

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Extract video IDs for embedding
  const getVideoId = (url: string) => {
    const match = url.match(/video\/(\d+)/);
    return match ? match[1] : null;
  };

  return (
    <section className="py-20 lg:py-32 bg-background overflow-hidden">
      <div className="container-custom">
        {/* Testimonial Quote */}
        <div ref={ref} className="max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
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
                  className="text-accent fill-accent"
                />
              ))}
            </div>

            {/* Quote Text */}
            <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif text-foreground leading-relaxed mb-8">
              "I've struggled with acne and dark spots for years. After using
              Nuni Global products for just 6 weeks, my skin has never looked
              better. The natural ingredients are gentle but so effective!"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-primary">AM</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">Akosua M.</p>
                <p className="text-sm text-muted-foreground">Accra, Ghana</p>
              </div>
            </div>
          </motion.div>
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
          {tiktokVideos.slice(0, 6).map((url, index) => {
            const videoId = getVideoId(url);
            return (
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
                    <Play size={20} className="text-primary ml-1" fill="currentColor" />
                  </div>
                </div>
                
                {/* TikTok branding */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-2 text-card text-xs font-medium">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                    </svg>
                    Watch
                  </div>
                </div>
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
