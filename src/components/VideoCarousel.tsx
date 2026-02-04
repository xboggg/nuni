import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Link } from "react-router-dom";

// Import videos
import video1 from "@/assets/videos/nuni-vid1.mp4";
import video2 from "@/assets/videos/nuni-vid2.mp4";
import video3 from "@/assets/videos/nuni-vid3.mp4";
import video4 from "@/assets/videos/nuni-vid4.mp4";
import video5 from "@/assets/videos/nuni-vid5.mp4";

const videos = [
  { id: 1, src: video1 },
  { id: 2, src: video2 },
  { id: 3, src: video3 },
  { id: 4, src: video4 },
  { id: 5, src: video5 },
];

const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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

  // Play current video when index changes
  useEffect(() => {
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
  }, [currentIndex, isPlaying]);

  // Auto-advance when video ends
  const handleVideoEnd = () => {
    nextSlide();
  };

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-charcoal overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4"
          >
            NG COSMETICS
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-cream mb-6"
          >
            See the <span className="text-gradient-gold">Transformation</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-cream/70 leading-relaxed"
          >
            Watch how NG Cosmetics products are changing lives across Ghana
          </motion.p>
        </div>

        {/* Video Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Video Container */}
          <div className="relative aspect-[9/16] md:aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl">
            {videos.map((video, index) => (
              <video
                key={video.id}
                ref={(el) => (videoRefs.current[index] = el)}
                src={video.src}
                muted={isMuted}
                playsInline
                loop={false}
                onEnded={handleVideoEnd}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

            {/* Controls Overlay */}
            <div className="absolute inset-0 flex items-center justify-between p-4 md:p-8">
              {/* Left Arrow */}
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Center Play/Pause */}
              <button
                onClick={togglePlay}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
              </button>

              {/* Right Arrow */}
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              {/* Mute Button */}
              <button
                onClick={toggleMute}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-8 bg-white"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>

              {/* Video Counter */}
              <span className="text-white/70 text-sm font-medium">
                {currentIndex + 1} / {videos.length}
              </span>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            to="/why-nuni"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold transition-all duration-200 hover:shadow-green hover:scale-105"
          >
            Discover Why Nuni
            <ChevronRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoCarousel;
