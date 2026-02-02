import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  testimonial?: {
    quote: string;
    author: string;
  };
}

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  testimonial,
}: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, percentage)));
    },
    []
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleStart = () => setIsDragging(true);
  const handleEnd = () => setIsDragging(false);

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            {t.transformation.subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            {t.transformation.title} <span className="text-gradient-gold">{t.transformation.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.transformation.description}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            ref={containerRef}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize shadow-elevated select-none"
            onMouseMove={handleMouseMove}
            onMouseDown={handleStart}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchMove={handleTouchMove}
            onTouchStart={handleStart}
            onTouchEnd={handleEnd}
          >
            {/* After Image (Background) */}
            <img
              src={afterImage}
              alt={t.transformation.after}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />

            {/* Before Image (Clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={beforeImage}
                alt={t.transformation.before}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ width: `${100 / (sliderPosition / 100)}%` }}
                draggable={false}
              />
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-card cursor-ew-resize"
              style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-card rounded-full shadow-elevated flex items-center justify-center">
                <div className="flex items-center gap-0.5">
                  <svg
                    className="w-3 h-3 text-primary -rotate-180"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                  <svg
                    className="w-3 h-3 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-card/90 backdrop-blur-sm rounded-full text-sm font-medium text-foreground">
              {t.transformation.before}
            </div>
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-medium">
              {t.transformation.after}
            </div>
          </motion.div>

          {/* Testimonial */}
          {testimonial && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-8 text-center"
            >
              <blockquote className="text-lg md:text-xl italic text-muted-foreground mb-3">
                "{testimonial.quote}"
              </blockquote>
              <cite className="text-sm font-medium text-foreground not-italic">
                — {testimonial.author}
              </cite>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
