import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, X, ChevronLeft, ChevronRight, Camera, Video, Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/lib/i18n";
import { testimonials, visualTestimonials, videoTestimonials, imageTestimonials } from "@/data/testimonials";

const REVIEWS_PER_PAGE = 6;
const IMAGES_PER_PAGE = 8;

const TestimonialsPage = () => {
  const { t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<"all" | "images" | "videos">("all");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pagination states
  const [reviewsPage, setReviewsPage] = useState(1);
  const [imagesPage, setImagesPage] = useState(1);

  const filteredTestimonials = activeFilter === "all"
    ? visualTestimonials
    : activeFilter === "videos"
      ? videoTestimonials
      : imageTestimonials;

  // Reset images page when filter changes
  useEffect(() => {
    setImagesPage(1);
  }, [activeFilter]);

  // Pagination calculations for text reviews
  const totalReviewsPages = Math.ceil(testimonials.length / REVIEWS_PER_PAGE);
  const paginatedReviews = testimonials.slice(
    (reviewsPage - 1) * REVIEWS_PER_PAGE,
    reviewsPage * REVIEWS_PER_PAGE
  );

  // Pagination calculations for visual testimonials
  const totalImagesPages = Math.ceil(filteredTestimonials.length / IMAGES_PER_PAGE);
  const paginatedImages = filteredTestimonials.slice(
    (imagesPage - 1) * IMAGES_PER_PAGE,
    imagesPage * IMAGES_PER_PAGE
  );

  const openLightbox = (index: number) => {
    // Calculate the actual index in the full filtered array
    const actualIndex = (imagesPage - 1) * IMAGES_PER_PAGE + index;
    setCurrentIndex(actualIndex);
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

  // Pagination component
  const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    itemsPerPage,
    label
  }: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems: number;
    itemsPerPage: number;
    label: string;
  }) => {
    if (totalPages <= 1) return null;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
        <p className="text-sm text-muted-foreground">
          Showing {startItem}-{endItem} of {totalItems} {label}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-card disabled:hover:text-foreground disabled:hover:border-border transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                  page === currentPage
                    ? "bg-primary text-white"
                    : "bg-card border border-border text-foreground hover:border-primary/50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-card disabled:hover:text-foreground disabled:hover:border-border transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Testimonials - Real Results from Real Customers"
        description="See real testimonials and before/after results from Nuni Global customers. Discover how our natural skincare products have transformed skin across Ghana."
        keywords="Nuni Global reviews, skincare testimonials, before after results, customer reviews Ghana"
        url="/testimonials"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-cream">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">{t.common?.backToHome || "Back to Home"}</span>
            </Link>

            <div className="text-center">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4"
              >
                {t.testimonials?.subtitle || "Customer Love"}
              </motion.span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4">
                {t.testimonials?.pageTitle || "What Our Customers"} <span className="text-gradient-gold">{t.testimonials?.pageTitleHighlight || "Say"}</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.testimonials?.description || "Real results from real people. See why thousands trust Nuni Global for their skincare journey."}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Text Reviews Section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
              Customer <span className="text-gradient-green">Reviews</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {paginatedReviews.map((review, index) => (
                <motion.div
                  key={`${reviewsPage}-${review.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-card transition-shadow"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={18} className="text-accent fill-accent" />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative mb-4">
                    <Quote size={24} className="absolute -top-1 -left-1 text-primary/20" />
                    <p className="text-foreground/80 leading-relaxed pl-5">
                      {review.text}
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm">
                      {review.initials}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{review.name}</p>
                      <p className="text-sm text-muted-foreground">{review.location}</p>
                    </div>
                  </div>

                  {/* Product Tag */}
                  <div className="mt-4">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {review.product}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Reviews Pagination */}
          <Pagination
            currentPage={reviewsPage}
            totalPages={totalReviewsPages}
            onPageChange={setReviewsPage}
            totalItems={testimonials.length}
            itemsPerPage={REVIEWS_PER_PAGE}
            label="reviews"
          />
        </div>
      </section>

      {/* Visual Testimonials Section */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4">
              {t.realResults?.badge || "Real Results"}
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
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

          {/* Gallery Grid - Larger on dedicated page */}
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="wait">
              {paginatedImages.map((item, index) => (
                <motion.div
                  key={`${imagesPage}-${item.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  onClick={() => openLightbox(index)}
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                >
                  <img
                    src={item.type === "video" && item.thumbnail ? item.thumbnail : item.src}
                    alt={`Customer testimonial ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play size={24} className="text-primary ml-1" fill="currentColor" />
                      </div>
                    </div>
                  )}

                  {item.type === "image" && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                        <Camera size={20} className="text-primary" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Images Pagination */}
          <Pagination
            currentPage={imagesPage}
            totalPages={totalImagesPages}
            onPageChange={setImagesPage}
            totalItems={filteredTestimonials.length}
            itemsPerPage={IMAGES_PER_PAGE}
            label={activeFilter === "videos" ? "videos" : activeFilter === "images" ? "photos" : "items"}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/90 to-primary">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              {t.testimonials?.readyToJoin || "Ready to Join Our"} <span className="text-accent">{t.testimonials?.happyCustomers || "Happy Customers?"}</span>
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              {t.testimonials?.readyToJoinDesc || "Start your skincare journey today and experience the transformation for yourself."}
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary rounded-full font-semibold transition-all duration-200 hover:bg-white/90 hover:scale-105"
            >
              {t.testimonials?.shopNow || "Shop Now"}
            </Link>
          </motion.div>
        </div>
      </section>

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
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X size={24} />
            </button>

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

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {currentIndex + 1} / {filteredTestimonials.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default TestimonialsPage;
