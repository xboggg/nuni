import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import { useHomepageContent } from "@/hooks/useHomepageContent";

// Import videos
import video1 from "@/assets/videos/nuni-vid1.mp4";
import video2 from "@/assets/videos/nuni-vid2.mp4";
import video3 from "@/assets/videos/nuni-vid3.mp4";
import video4 from "@/assets/videos/nuni-vid4.mp4";
import video5 from "@/assets/videos/nuni-vid5.mp4";
import video6 from "@/assets/videos/nuni-vid6.mp4";

const videos = [
  { id: 1, src: video1 },
  { id: 2, src: video2 },
  { id: 3, src: video3 },
  { id: 4, src: video4 },
  { id: 5, src: video5 },
  { id: 6, src: video6 },
];

// Many mobile browsers never paint a frame for a muted <video> with
// preload="metadata" until it's told to seek — without this it just
// renders black. Seeking slightly into the clip forces a real frame
// to decode and show as the thumbnail.
const ThumbnailVideo = ({ src, className }: { src: string; className?: string }) => {
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <video
      ref={ref}
      src={src}
      muted
      playsInline
      preload="metadata"
      onLoadedMetadata={(e) => {
        const video = e.currentTarget;
        try {
          video.currentTime = Math.min(1, video.duration / 4 || 1);
        } catch {
          /* ignore */
        }
      }}
      className={className}
    />
  );
};

const VideoCarousel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const videoContent = useHomepageContent("videoCarousel");
  const vcBadge = videoContent?.badge ?? t.videoCarousel.badge;
  const vcTitle = videoContent?.title ?? t.videoCarousel.title;
  const vcTitleHighlight = videoContent?.titleHighlight ?? t.videoCarousel.titleHighlight;
  const vcDescription = videoContent?.description ?? t.videoCarousel.description;
  const vcDiscoverWhy = videoContent?.discoverWhyNuni ?? t.videoCarousel.discoverWhyNuni;

  const openModal = (index: number) => {
    setStartIndex(index);
    setCurrentIndex(index);
    setIsPlaying(true);
    setIsOpen(true);
  };

  const closeModal = () => {
    videoRefs.current.forEach((video) => video?.pause());
    setIsOpen(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const togglePlay = () => {
    const video = videoRefs.current[currentIndex];
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = !isMuted;
      }
    });
    setIsMuted(!isMuted);
  };

  // Play current video when index changes (only while modal is open)
  useEffect(() => {
    if (!isOpen) return;
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.currentTime = 0;
          if (isPlaying) {
            video.play().catch(() => {});
          }
        } else {
          video.pause();
        }
      }
    });
  }, [currentIndex, isPlaying, isOpen]);

  // Auto-advance when video ends
  const handleVideoEnd = () => {
    nextSlide();
  };

  // Lock page scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <section ref={sectionRef} className="py-16 lg:py-20 bg-charcoal overflow-hidden">
      <div className="container-custom">
        {/* ============ MOBILE / TABLET (below lg): "Three-up Film Strip" teaser ============ */}
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-end justify-between gap-3 mb-5"
          >
            <div>
              <span className="inline-block text-xs font-medium tracking-widest text-accent uppercase mb-2">
                {vcBadge}
              </span>
              <h2 className="font-serif font-bold text-2xl text-cream leading-tight">
                {vcTitle} <span className="text-gradient-gold">{vcTitleHighlight}</span>
              </h2>
            </div>
            <span className="text-cream/50 text-xs font-medium whitespace-nowrap">
              {t.videoCarousel.clipsCount}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory scroll-px-0 -mx-4 px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => openModal(index)}
                className={`relative flex-shrink-0 w-[30%] aspect-[9/16] rounded-xl overflow-hidden bg-black/40 snap-start ${index > 0 ? "opacity-70" : ""}`}
              >
                <ThumbnailVideo src={video.src} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`${index === 0 ? "w-11 h-11" : "w-9 h-9"} rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center`}>
                    <Play size={index === 0 ? 16 : 14} className="text-white ml-0.5" fill="white" />
                  </div>
                </div>
              </button>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-cream/60 text-sm text-center mt-4"
          >
            {vcDescription}
          </motion.p>
        </div>

        {/* ============ DESKTOP (lg and up): "Edge-to-edge Teaser Band" ============ */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          onClick={() => openModal(0)}
          className="hidden lg:flex w-full items-stretch rounded-3xl overflow-hidden bg-background/5 hover:bg-background/10 transition-colors group text-left"
        >
          <div className="flex-1 flex flex-col justify-center px-12 py-10">
            <span className="text-xs font-medium tracking-widest text-accent uppercase mb-3">
              {vcBadge}
            </span>
            <h2 className="font-serif font-bold text-3xl xl:text-4xl text-cream mb-2">
              {vcTitle} <span className="text-gradient-gold">{vcTitleHighlight}</span>
            </h2>
            <span className="text-cream/60 text-sm">
              {vcDescription} &middot; {t.videoCarousel.tapToWatch}
            </span>
          </div>
          <div className="relative w-64 xl:w-80 flex-shrink-0 bg-black overflow-hidden">
            <ThumbnailVideo
              src={videos[0].src}
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-charcoal/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <Play size={22} className="text-white ml-1" fill="white" />
              </div>
            </div>
          </div>
        </motion.button>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8"
        >
          <Link
            to="/about-us"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold transition-all duration-200 hover:shadow-green hover:scale-105"
          >
            {vcDiscoverWhy}
            <ChevronRight size={20} />
          </Link>
        </motion.div>
      </div>

      {/* ============ Lightbox Modal (shared by both layouts) ============ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl"
            >
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 sm:-right-2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="relative aspect-video max-h-[80vh] rounded-2xl overflow-hidden bg-black shadow-2xl">
                {videos.map((video, index) => (
                  <video
                    key={video.id}
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={video.src}
                    muted={isMuted}
                    playsInline
                    loop={false}
                    onEnded={handleVideoEnd}
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
                      index === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                <div className="absolute inset-0 flex items-center justify-between p-3 sm:p-4">
                  <button
                    onClick={prevSlide}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <button
                    onClick={togglePlay}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
                  </button>

                  <button
                    onClick={nextSlide}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <button
                    onClick={toggleMute}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>

                  <div className="flex gap-1.5">
                    {videos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1.5 rounded-full transition-all ${
                          index === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-white/70 text-xs font-medium">
                    {currentIndex + 1} / {videos.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoCarousel;
