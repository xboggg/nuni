import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ArrowLeft, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";

// Import gallery images
// Cocoa Butter (JPEG)
import cocoaButter1 from "@/assets/gallery/nuni-cocoabutter1.jpeg";
// Cocoa Butter (PNG)
import cocoaButter2 from "@/assets/gallery/nuni-cocoabutter2.png";
import cocoaButter3 from "@/assets/gallery/nuni-cocoabutter3.png";
import cocoaButter4 from "@/assets/gallery/nuni-cocoabutter4.png";
import cocoaButter6 from "@/assets/gallery/nuni-cocoabutter6.jpeg";
import cocoaButter7 from "@/assets/gallery/nuni-cocoabutter7.jpeg";
import cocoaButter8 from "@/assets/gallery/nuni-cocoabutter8.jpeg";
import cocoaButter9 from "@/assets/gallery/nuni-cocoabutter9.jpeg";
import cocoaButter10 from "@/assets/gallery/nuni-cocoabutter10.jpeg";
import cocoaButter11 from "@/assets/gallery/nuni-cocoabutter11.jpeg";
import cocoaButter12 from "@/assets/gallery/nuni-cocoabutter12.jpeg";
import cocoaButter13 from "@/assets/gallery/nuni-cocoabutter13.jpeg";
import cocoaButter14 from "@/assets/gallery/nuni-cocoabutter14.jpeg";
import cocoaButter15 from "@/assets/gallery/nuni-cocoabutter15.jpeg";
import cocoaButter16 from "@/assets/gallery/nuni-cocoabutter16.jpeg";
import cocoaButter17 from "@/assets/gallery/nuni-cocoabutter17.jpeg";
import cocoaButter18 from "@/assets/gallery/nuni-cocoabutter18.jpeg";
import cocoaButter19 from "@/assets/gallery/nuni-cocoabutter19.png";
import cocoaButter20 from "@/assets/gallery/nuni-cocoabutter20.png";
import cocoaButter21 from "@/assets/gallery/nuni-cocoabutter21.png";
import cocoaButter22 from "@/assets/gallery/nuni-cocoabutter22.png";
import cocoaButter23 from "@/assets/gallery/nuni-cocoabutter23.png";
import cocoaButter24 from "@/assets/gallery/nuni-cocoabutter24.png";
import cocoaButter25 from "@/assets/gallery/nuni-cocoabutter25.jpeg";
import cocoaButter26 from "@/assets/gallery/nuni-cocoabutter26.jpeg";

// Soap (PNG)
import soap1 from "@/assets/gallery/nuni-darksoap1.png";
// Soap (JPEG)
import soap2 from "@/assets/gallery/nuni-darksoap2.jpeg";
import soap3 from "@/assets/gallery/nuni-darksoap3.jpeg";
import soap4 from "@/assets/gallery/nuni-darksoap4.jpeg";
import soap5 from "@/assets/gallery/nuni-darksoap5.jpeg";
import soap6 from "@/assets/gallery/nuni-darksoap6.jpeg";
import soap7 from "@/assets/gallery/nuni-darksoap7.png";
import soap8 from "@/assets/gallery/nuni-darksoap8.png";
import soap9 from "@/assets/gallery/nuni-darksoap9.png";
import soap10 from "@/assets/gallery/nuni-darksoap10.png";
import soap11 from "@/assets/gallery/nuni-darksoap11.jpeg";
import soap12 from "@/assets/gallery/nuni-darksoap12.png";
import soap13 from "@/assets/gallery/nuni-darksoap13.jpeg";
import soap14 from "@/assets/gallery/nuni-darksoap14.jpeg";
import soap15 from "@/assets/gallery/nuni-darksoap15.jpeg";
import soap16 from "@/assets/gallery/nuni-darksoap16.jpeg";
import soap17 from "@/assets/gallery/nuni-darksoap17.jpeg";
import soap18 from "@/assets/gallery/nuni-darksoap18.jpeg";
import soap19 from "@/assets/gallery/nuni-darksoap19.jpeg";
import soap20 from "@/assets/gallery/nuni-darksoap20.jpeg";
import soap21 from "@/assets/gallery/nuni-darksoap21.jpeg";
import soap22 from "@/assets/gallery/nuni-darksoap22.jpeg";
import soap23 from "@/assets/gallery/nuni-darksoap23.jpeg";
import soap24 from "@/assets/gallery/nuni-darksoap24.jpeg";
import soap25 from "@/assets/gallery/nuni-darksoap25.jpeg";

// Cream (PNG)
import cream1 from "@/assets/gallery/nuni-facialacne1.png";
import cream2 from "@/assets/gallery/nuni-facialacne2.png";
import cream3 from "@/assets/gallery/nuni-facialacne3.png";
import cream4 from "@/assets/gallery/nuni-facialacne4.png";
import cream5 from "@/assets/gallery/nuni-facialacne5.png";
// Cream (JPEG)
import cream6 from "@/assets/gallery/nuni-facialacne6.jpeg";
import cream7 from "@/assets/gallery/nuni-facialacne7.jpeg";
import cream8 from "@/assets/gallery/nuni-facialacne8.png";
import cream9 from "@/assets/gallery/nuni-facialacne9.png";
import cream10 from "@/assets/gallery/nuni-facialacne10.png";
import cream11 from "@/assets/gallery/nuni-facialacne11.jpeg";
import cream12 from "@/assets/gallery/nuni-facialacne12.jpeg";
import cream13 from "@/assets/gallery/nuni-facialacne13.jpeg";
import cream14 from "@/assets/gallery/nuni-facialacne14.jpeg";
import cream15 from "@/assets/gallery/nuni-facialacne15.jpeg";
import cream16 from "@/assets/gallery/nuni-facialacne16.jpeg";
import cream17 from "@/assets/gallery/nuni-facialacne17.jpeg";
import cream18 from "@/assets/gallery/nuni-facialacne18.jpeg";
import cream19 from "@/assets/gallery/nuni-facialacne19.jpeg";
import cream20 from "@/assets/gallery/nuni-facialacne20.jpeg";
import cream21 from "@/assets/gallery/nuni-facialacne21.jpeg";
import cream22 from "@/assets/gallery/nuni-facialacne22.jpeg";
import cream23 from "@/assets/gallery/nuni-facialacne23.jpeg";
import cream24 from "@/assets/gallery/nuni-facialacne24.jpeg";
import cream25 from "@/assets/gallery/nuni-facialacne25.jpeg";
import cream26 from "@/assets/gallery/nuni-facialacne26.png";
import cream27 from "@/assets/gallery/nuni-facialacne27.jpeg";
import cream28 from "@/assets/gallery/nuni-facialacne28.jpeg";

import ambassador50 from "@/assets/gallery/nuni-ambassador50.jpeg";
import ambassador52 from "@/assets/gallery/nuni-ambassador52.jpeg";
import ambassador53 from "@/assets/gallery/nuni-ambassador53.jpeg";

import products1 from "@/assets/gallery/nuni-products1.jpeg";
import products2 from "@/assets/gallery/nuni-products2.png";
import products3 from "@/assets/gallery/nuni-products3.png";
import products4 from "@/assets/gallery/nuni-products4.jpeg";
import products5 from "@/assets/gallery/nuni-products5.png";
import products6 from "@/assets/gallery/nuni-products6.jpeg";
import products7 from "@/assets/gallery/nuni-products7.png";
import products8 from "@/assets/gallery/nuni-products8.jpeg";
import products9 from "@/assets/gallery/nuni-products9.png";
import products10 from "@/assets/gallery/nuni-products10.jpeg";
import products11 from "@/assets/gallery/nuni-products11.png";
import products12 from "@/assets/gallery/nuni-products12.jpeg";
import products13 from "@/assets/gallery/nuni-products13.png";
import products14 from "@/assets/gallery/nuni-products14.jpeg";
import products15 from "@/assets/gallery/nuni-products15.png";
import products16 from "@/assets/gallery/nuni-products16.jpeg";
import products17 from "@/assets/gallery/nuni-products17.png";
import products18 from "@/assets/gallery/nuni-products18.png";

import kid1 from "@/assets/gallery/nuni-kid1.jpeg";
import kid2 from "@/assets/gallery/nuni-kid2.jpeg";
import kid3 from "@/assets/gallery/nuni-kid3.jpeg";
import kid4 from "@/assets/gallery/nuni-kid4.jpeg";
import kid5 from "@/assets/gallery/nuni-kid5.jpeg";

interface GalleryImage {
  id: number | string;
  src: string;
  alt: string;
  category: "events" | "partnership" | "soap" | "cream" | "cocoa-butter" | "products" | "ambassadors" | "vendors" | "kids";
}

interface UploadedImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  createdAt: number;
}

const defaultGalleryImages: GalleryImage[] = [
  // Ambassadors (3 images)
  { id: "amb50", src: ambassador50, alt: "Nuni Global Ambassador", category: "ambassadors" },
  { id: "amb52", src: ambassador52, alt: "Nuni Global Ambassador", category: "ambassadors" },
  { id: "amb53", src: ambassador53, alt: "Nuni Global Ambassador", category: "ambassadors" },

  // Cocoa Butter (25 images)
  { id: "cb25", src: cocoaButter25, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },
  { id: "cb26", src: cocoaButter26, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },
  { id: "cb1", src: cocoaButter1, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },
  { id: "cb2", src: cocoaButter2, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },
  { id: "cb3", src: cocoaButter3, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },
  { id: "cb4", src: cocoaButter4, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },
  { id: "cb6", src: cocoaButter6, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },
  { id: "cb7", src: cocoaButter7, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },
  { id: "cb8", src: cocoaButter8, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },
  { id: "cb9", src: cocoaButter9, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },
  { id: "cb10", src: cocoaButter10, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },
  { id: "cb11", src: cocoaButter11, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },
  { id: "cb12", src: cocoaButter12, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },
  { id: "cb13", src: cocoaButter13, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },
  { id: "cb14", src: cocoaButter14, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },
  { id: "cb15", src: cocoaButter15, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },
  { id: "cb16", src: cocoaButter16, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },
  { id: "cb17", src: cocoaButter17, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },
  { id: "cb18", src: cocoaButter18, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },
  { id: "cb19", src: cocoaButter19, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },
  { id: "cb20", src: cocoaButter20, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },
  { id: "cb21", src: cocoaButter21, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },
  { id: "cb22", src: cocoaButter22, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },
  { id: "cb23", src: cocoaButter23, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },
  { id: "cb24", src: cocoaButter24, alt: "Nuni Global Cocoa Butter", category: "cocoa-butter" },

  // Acne Dark Soap (25 images)
  { id: "soap25", src: soap25, alt: "Nuni Global Acne Dark Soap", category: "soap" },
  { id: "soap1", src: soap1, alt: "Nuni Global Acne Dark Soap", category: "soap" },
  { id: "soap2", src: soap2, alt: "Nuni Global Acne Dark Soap", category: "soap" },
  { id: "soap3", src: soap3, alt: "Nuni Global Acne Dark Soap", category: "soap" },
  { id: "soap4", src: soap4, alt: "Nuni Global Acne Dark Soap", category: "soap" },
  { id: "soap5", src: soap5, alt: "Nuni Global Acne Dark Soap", category: "soap" },
  { id: "soap6", src: soap6, alt: "Nuni Global Acne Dark Soap", category: "soap" },
  { id: "soap7", src: soap7, alt: "Nuni Global Acne Dark Soap", category: "soap" },
  { id: "soap8", src: soap8, alt: "Nuni Global Acne Dark Soap", category: "soap" },
  { id: "soap9", src: soap9, alt: "Nuni Global Acne Dark Soap", category: "soap" },
  { id: "soap10", src: soap10, alt: "Nuni Global Acne Dark Soap", category: "soap" },
  { id: "soap11", src: soap11, alt: "Nuni Global Acne Dark Soap", category: "soap" },
  { id: "soap12", src: soap12, alt: "Nuni Global Acne Dark Soap", category: "soap" },
  { id: "soap13", src: soap13, alt: "Nuni Global Acne Dark Soap", category: "soap" },
  { id: "soap14", src: soap14, alt: "Nuni Global Acne Dark Soap", category: "soap" },
  { id: "soap15", src: soap15, alt: "Nuni Global Acne Dark Soap", category: "soap" },
  { id: "soap16", src: soap16, alt: "Nuni Global Acne Dark Soap", category: "soap" },
  { id: "soap17", src: soap17, alt: "Nuni Global Acne Dark Soap", category: "soap" },
  { id: "soap18", src: soap18, alt: "Nuni Global Acne Dark Soap", category: "soap" },
  { id: "soap19", src: soap19, alt: "Nuni Global Acne Dark Soap", category: "soap" },
  { id: "soap20", src: soap20, alt: "Nuni Global Acne Dark Soap", category: "soap" },
  { id: "soap21", src: soap21, alt: "Nuni Global Acne Dark Soap", category: "soap" },
  { id: "soap22", src: soap22, alt: "Nuni Global Acne Dark Soap", category: "soap" },
  { id: "soap23", src: soap23, alt: "Nuni Global Acne Dark Soap", category: "soap" },
  { id: "soap24", src: soap24, alt: "Nuni Global Acne Dark Soap", category: "soap" },

  // Acne Facial Cream (28 images)
  { id: "cream28", src: cream28, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream1", src: cream1, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream2", src: cream2, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream3", src: cream3, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream4", src: cream4, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream5", src: cream5, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream6", src: cream6, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream7", src: cream7, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream8", src: cream8, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream9", src: cream9, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream10", src: cream10, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream11", src: cream11, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream12", src: cream12, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream13", src: cream13, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream14", src: cream14, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream15", src: cream15, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream16", src: cream16, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream17", src: cream17, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream18", src: cream18, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream19", src: cream19, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream20", src: cream20, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream21", src: cream21, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream22", src: cream22, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream23", src: cream23, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream24", src: cream24, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream25", src: cream25, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream26", src: cream26, alt: "Nuni Global Acne Facial Cream", category: "cream" },
  { id: "cream27", src: cream27, alt: "Nuni Global Acne Facial Cream", category: "cream" },

  // All Products (18 images)
  { id: "prod1", src: products1, alt: "Nuni Global Products", category: "products" },
  { id: "prod2", src: products2, alt: "Nuni Global Products", category: "products" },
  { id: "prod3", src: products3, alt: "Nuni Global Products", category: "products" },
  { id: "prod4", src: products4, alt: "Nuni Global Products", category: "products" },
  { id: "prod5", src: products5, alt: "Nuni Global Products", category: "products" },
  { id: "prod6", src: products6, alt: "Nuni Global Products", category: "products" },
  { id: "prod7", src: products7, alt: "Nuni Global Products", category: "products" },
  { id: "prod8", src: products8, alt: "Nuni Global Products", category: "products" },
  { id: "prod9", src: products9, alt: "Nuni Global Products", category: "products" },
  { id: "prod10", src: products10, alt: "Nuni Global Products", category: "products" },
  { id: "prod11", src: products11, alt: "Nuni Global Products", category: "products" },
  { id: "prod12", src: products12, alt: "Nuni Global Products", category: "products" },
  { id: "prod13", src: products13, alt: "Nuni Global Products", category: "products" },
  { id: "prod14", src: products14, alt: "Nuni Global Products", category: "products" },
  { id: "prod15", src: products15, alt: "Nuni Global Products", category: "products" },
  { id: "prod16", src: products16, alt: "Nuni Global Products", category: "products" },
  { id: "prod17", src: products17, alt: "Nuni Global Products", category: "products" },
  { id: "prod18", src: products18, alt: "Nuni Global Products", category: "products" },

  // Kids (5 images)
  { id: "kid1", src: kid1, alt: "Nuni Global Kids", category: "kids" },
  { id: "kid2", src: kid2, alt: "Nuni Global Kids", category: "kids" },
  { id: "kid3", src: kid3, alt: "Nuni Global Kids", category: "kids" },
  { id: "kid4", src: kid4, alt: "Nuni Global Kids", category: "kids" },
  { id: "kid5", src: kid5, alt: "Nuni Global Kids", category: "kids" },
];

const ITEMS_PER_PAGE = 12;

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useLanguage();

  const categories = [
    { id: "all", label: t.galleryPage.all },
    { id: "ambassadors", label: t.galleryPage.ambassadors },
    { id: "soap", label: t.galleryPage.soap },
    { id: "cream", label: t.galleryPage.cream },
    { id: "cocoa-butter", label: t.galleryPage.cocoaButter },
    { id: "products", label: t.galleryPage.products },
    { id: "kids", label: t.galleryPage.kids },
  ];

  // Load uploaded images from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("gallery-images");
    if (stored) {
      setUploadedImages(JSON.parse(stored));
    }
  }, []);

  // Combine default and uploaded images
  const allImages: GalleryImage[] = [
    ...defaultGalleryImages,
    ...uploadedImages.map((img) => ({
      id: img.id,
      src: img.src,
      alt: img.alt,
      category: img.category as GalleryImage["category"],
    })),
  ];

  const filteredImages =
    activeCategory === "all"
      ? allImages
      : allImages.filter((img) => img.category === activeCategory);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedImages = filteredImages.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setIsZoomed(false);
    document.body.style.overflow = "unset";
  };

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
    setIsZoomed(false);
  }, [filteredImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    setIsZoomed(false);
  }, [filteredImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-gradient-cream">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-between mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="font-medium">{t.common.backToHome}</span>
              </Link>
              <Link
                to="/gallery/admin"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Settings size={20} />
                <span className="font-medium">{t.galleryPage.admin}</span>
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4">
              {t.galleryPage.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.galleryPage.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 border-b border-border bg-card">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-green"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container-custom">
          {/* Results count */}
          <div className="mb-6 text-center">
            <p className="text-muted-foreground">
              {t.galleryPage.showing} {startIndex + 1}-{Math.min(endIndex, filteredImages.length)} {t.galleryPage.of} {filteredImages.length} {t.galleryPage.images}
            </p>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {paginatedImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                    index % 3 === 0 ? "row-span-2" : ""
                  }`}
                  onClick={() => openLightbox(startIndex + index)}
                >
                  <div
                    className={`relative ${
                      index % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
                    } overflow-hidden`}
                    style={{ backgroundColor: '#ffffff' }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundColor: '#ffffff' }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Zoom Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <ZoomIn size={24} className="text-primary" />
                      </div>
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-medium text-primary-foreground bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full capitalize">
                        {image.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-card border border-border text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Page Numbers */}
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage =
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1);

                  // Show ellipsis
                  const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                  const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;

                  if (showEllipsisBefore || showEllipsisAfter) {
                    return (
                      <span key={page} className="px-4 py-2 text-muted-foreground">
                        ...
                      </span>
                    );
                  }

                  if (!showPage) return null;

                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`min-w-[40px] px-4 py-2 rounded-lg font-medium transition-all ${
                        currentPage === page
                          ? "bg-primary text-primary-foreground shadow-green"
                          : "bg-card border border-border text-foreground hover:bg-muted"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-card border border-border text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-card/20 backdrop-blur-sm rounded-full flex items-center justify-center text-card hover:bg-card/30 transition-colors"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-card/20 backdrop-blur-sm rounded-full flex items-center justify-center text-card hover:bg-card/30 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-card/20 backdrop-blur-sm rounded-full flex items-center justify-center text-card hover:bg-card/30 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image Container */}
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`relative max-w-[90vw] max-h-[85vh] ${
                isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(!isZoomed);
              }}
            >
              <img
                src={filteredImages[currentImageIndex]?.src}
                alt={filteredImages[currentImageIndex]?.alt}
                className={`max-w-full max-h-[85vh] object-contain transition-transform duration-300 rounded-lg ${
                  isZoomed ? "scale-150" : "scale-100"
                }`}
                style={{ backgroundColor: '#ffffff' }}
              />
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-card/80 text-sm font-medium">
              {currentImageIndex + 1} / {filteredImages.length}
            </div>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
              {filteredImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                    setIsZoomed(false);
                  }}
                  className={`w-12 h-12 rounded-lg overflow-hidden transition-all duration-200 ${
                    index === currentImageIndex
                      ? "ring-2 ring-card opacity-100"
                      : "opacity-50 hover:opacity-80"
                  }`}
                  style={{ backgroundColor: '#ffffff' }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    style={{ backgroundColor: '#ffffff' }}
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Gallery;
