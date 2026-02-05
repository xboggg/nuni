import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight, Camera, Video } from "lucide-react";
import { visualTestimonials, videoTestimonials, imageTestimonials } from "@/data/testimonials";
import { useLanguage } from "@/lib/i18n";

const RealResults = () => {
  const { t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<"all" | "images" | "videos">("all");
  const videoRef = useRef<HTMLVideoElement>(null);

  const filteredTestimonials = activeFilter === "all"
    ? visualTestimonials
    : activeFilter === "videos"
      ? videoTestimonials
      : imageTestimonials;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const goToPrevious = () => {
    if (videoRef.current) videoRef.current.pause();
    setCurrentIndex((prev) => (prev === 0 ? filteredTestimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    if (videoRef.current) videoRef.current.pause();
    setCurrentIndex((prev) => (prev === filteredTestimonials.length - 1 ? 0 : prev + 1));
  };

  const currentItem = filteredTestimonials[currentIndex];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4">
            {t.realResults?.badge || "Real Results"}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            {t.realResults?.title || "See the"} <span className="text-gradient-gold">{t.realResults?.titleHighlight || "Transformation"}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.realResults?.description || "Real photos and videos from our customers showing their amazing skin transformations with Nuni Global products."}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveFilter("all")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeFilter === "all"
                ? "bg-primary text-white"
                : "bg-card border border-border text-foreground hover:border-primary/50"
            }`}
          >
            All ({visualTestimonials.length})
          </button>
          <button
            onClick={() => setActiveFilter("images")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeFilter === "images"
                ? "bg-primary text-white"
                : "bg-card border border-border text-foreground hover:border-primary/50"
            }`}
          >
            <Camera size={16} />
            Photos ({imageTestimonials.length})
          </button>
          <button
            onClick={() => setActiveFilter("videos")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeFilter === "videos"
                ? "bg-primary text-white"
                : "bg-card border border-border text-foreground hover:border-primary/50"
            }`}
          >
            <Video size={16} />
            Videos ({videoTestimonials.length})
          </button>
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredTestimonials.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => openLightbox(index)}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
              >
                <img
                  src={item.type === "video" && item.thumbnail ? item.thumbnail : item.src}
                  alt={`Customer testimonial ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

                {/* Video play icon */}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={20} className="text-primary ml-1" fill="currentColor" />
                    </div>
                  </div>
                )}

                {/* Hover zoom indicator for images */}
                {item.type === "image" && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                      <Camera size={18} className="text-primary" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxOpen && currentItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
              onClick={closeLightbox}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X size={24} />
              </button>

              {/* Navigation arrows */}
              <button
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight size={28} />
              </button>

              {/* Content */}
              <motion.div
                key={currentItem.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="max-w-4xl max-h-[85vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {currentItem.type === "video" ? (
                  <video
                    ref={videoRef}
                    src={currentItem.src}
                    controls
                    autoPlay
                    className="w-full max-h-[85vh] rounded-lg object-contain"
                    poster={currentItem.thumbnail}
                  />
                ) : (
                  <img
                    src={currentItem.src}
                    alt={`Customer testimonial ${currentIndex + 1}`}
                    className="w-full max-h-[85vh] rounded-lg object-contain"
                  />
                )}
              </motion.div>

              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
                {currentIndex + 1} / {filteredTestimonials.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RealResults;
