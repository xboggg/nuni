import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { Shield, Leaf, Heart, Sparkles, Package, ArrowRight, Award, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";

// FDA Certificate images
import cert1 from "@/assets/certificates/nuni-cert1.jpeg";
import cert2 from "@/assets/certificates/nuni-cert2.jpeg";
import cert3 from "@/assets/certificates/nuni-cert3.jpeg";
import cert4 from "@/assets/certificates/nuni-cert4.jpeg";
import cert5 from "@/assets/certificates/nuni-cert5.jpeg";
import cert8 from "@/assets/certificates/nuni-cert8.jpeg";

const fdaCertificates = [
  { id: 1, src: cert1, alt: "FDA Certificate 1" },
  { id: 2, src: cert2, alt: "FDA Certificate 2" },
  { id: 3, src: cert3, alt: "FDA Certificate 3" },
  { id: 4, src: cert4, alt: "FDA Certificate 4" },
  { id: 5, src: cert5, alt: "FDA Certificate 5" },
  { id: 6, src: cert8, alt: "FDA Certificate 6" },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  // Lightbox state for FDA certificates
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentCertIndex, setCurrentCertIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentCertIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  const nextCert = useCallback(() => {
    setCurrentCertIndex((prev) => (prev + 1) % fdaCertificates.length);
  }, []);

  const prevCert = useCallback(() => {
    setCurrentCertIndex((prev) => (prev - 1 + fdaCertificates.length) % fdaCertificates.length);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevCert();
      if (e.key === "ArrowRight") nextCert();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, nextCert, prevCert]);

  const features = [
    {
      icon: Shield,
      title: t.about.features.fdaApproved,
      description: t.about.features.fdaDesc,
    },
    {
      icon: Leaf,
      title: t.about.features.natural,
      description: t.about.features.naturalDesc,
    },
    {
      icon: Heart,
      title: t.about.features.allSkinTypes,
      description: t.about.features.allSkinTypesDesc,
    },
    {
      icon: Sparkles,
      title: t.about.features.visibleResults,
      description: t.about.features.visibleResultsDesc,
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-card">
      <div className="container-custom">
        <div ref={ref} className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4"
          >
            {t.about.subtitle}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6"
          >
            {t.about.title} <span className="text-gradient-gold">{t.about.titleHighlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            {t.about.description}
          </motion.p>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="group p-6 bg-background rounded-2xl shadow-soft hover:shadow-card transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon size={28} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* FDA Certificates Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
              <Award size={32} className="text-primary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">
              FDA Certified Products
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All Nuni Global products are registered and approved by the Ghana Food and Drugs Authority (FDA), ensuring the highest standards of safety and quality.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {fdaCertificates.map((cert, index) => (
              <motion.button
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                onClick={() => openLightbox(index)}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 border-2 border-border hover:border-primary"
              >
                <img
                  src={cert.src}
                  alt={cert.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Export Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 md:p-12 border border-primary/10"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Package size={40} className="text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-3">
                {t.about.exportTitle || "Beyond Skincare"}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.about.exportDescription || "NG Cosmetics is also a trusted exporter of premium Ghanaian raw materials. We supply high-quality shea butter, cocoa powder, and traditional African black soap to international markets, connecting the world with Ghana's finest natural resources."}
              </p>
              <Link
                to="/export"
                className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
              >
                {t.about.exportCta || "Learn About Our Exports"}
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* FDA Certificate Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="text-white" size={24} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => { e.stopPropagation(); prevCert(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="text-white" size={28} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextCert(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronRight className="text-white" size={28} />
            </button>

            {/* Certificate Image */}
            <motion.div
              key={currentCertIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl max-h-[85vh] px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={fdaCertificates[currentCertIndex].src}
                alt={fdaCertificates[currentCertIndex].alt}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>

            {/* Certificate Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {currentCertIndex + 1} / {fdaCertificates.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
