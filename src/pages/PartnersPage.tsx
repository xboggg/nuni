import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Phone, ChevronLeft, ChevronRight, Users, Handshake, ArrowLeft, Pause, Play, X } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { partners, regions, getPartnerApplicationWhatsAppLink, Partner } from "@/data/partners";

// Import ambassador images
import ambassador1 from "@/assets/ambassadors/nuni-ambassador1.jpeg";
import ambassador2 from "@/assets/ambassadors/nuni-ambassador2.jpeg";
import ambassador3 from "@/assets/ambassadors/nuni-ambassador3.png";
import ambassador4 from "@/assets/ambassadors/nuni-ambassador4.jpeg";
import ambassador5 from "@/assets/ambassadors/nuni-ambassador5.jpeg";
import ambassador6 from "@/assets/ambassadors/nuni-ambassador6.jpeg";
import ambassador7 from "@/assets/ambassadors/nuni-ambassador7.jpeg";
import ambassador8 from "@/assets/ambassadors/nuni-ambassador8.png";
import ambassador9 from "@/assets/ambassadors/nuni-ambassador9.jpeg";
import ambassador10 from "@/assets/ambassadors/nuni-ambassador10.png";

// Top performing partners/ambassadors carousel data
const topPartners = [
  { id: 1, image: ambassador1 },
  { id: 2, image: ambassador2 },
  { id: 3, image: ambassador3 },
  { id: 4, image: ambassador4 },
  { id: 5, image: ambassador5 },
  { id: 6, image: ambassador6 },
  { id: 7, image: ambassador7 },
  { id: 8, image: ambassador8 },
  { id: 9, image: ambassador9 },
  { id: 10, image: ambassador10 },
];

const PartnersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Application form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    region: "",
  });

  const openLightbox = (image: string) => {
    setLightboxImage(image);
    setIsAutoPlaying(false);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  // Auto-slide carousel
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCarouselIndex((prev) => (prev + 1) % topPartners.length);
      }, 3000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => !prev);
  };

  // Filter partners based on search and region
  const filteredPartners = useMemo(() => {
    return partners.filter((partner) => {
      const matchesSearch =
        partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.locations.some(loc => loc.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRegion =
        selectedRegion === "all" ||
        partner.region === selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  // Group partners by region for display
  const partnersByRegion = useMemo(() => {
    const grouped: Record<string, Partner[]> = {};

    filteredPartners.forEach((partner) => {
      if (!grouped[partner.region]) {
        grouped[partner.region] = [];
      }
      grouped[partner.region].push(partner);
    });

    return grouped;
  }, [filteredPartners]);

  const getRegionName = (regionId: string) => {
    const region = regions.find(r => r.id === regionId);
    return region ? region.name : regionId;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.location && formData.region) {
      window.open(getPartnerApplicationWhatsAppLink(formData), "_blank");
    }
  };

  const nextSlide = () => {
    setCarouselIndex((prev) => {
      // Reset to 0 when reaching the end of the duplicated array
      if (prev >= topPartners.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => {
      if (prev <= 0) {
        return topPartners.length - 1;
      }
      return prev - 1;
    });
  };

  return (
    <div className="min-h-screen bg-background">
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
              <span className="font-medium">Back to Home</span>
            </Link>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
                <Handshake size={18} className="text-accent" />
                <span className="text-sm font-medium text-accent">Our Partner Network</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4">
                Nuni Global <span className="text-gradient-gold">Partners</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find our trusted partners across Ghana. Connect with a partner near you for authentic Nuni Global products.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Top Performers Carousel */}
      <section className="py-12 bg-primary/5 border-y border-border">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold text-foreground flex items-center gap-2">
              <Users size={24} className="text-accent" />
              Top Performing Partners
            </h2>
            <div className="flex gap-2">
              <button
                onClick={toggleAutoPlay}
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
                title={isAutoPlaying ? "Pause" : "Play"}
              >
                {isAutoPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-4"
              animate={{ x: `-${carouselIndex * 204}px` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Duplicate images for infinite loop effect */}
              {[...topPartners, ...topPartners].map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex-shrink-0 w-[200px] h-[280px] rounded-2xl overflow-hidden border border-border shadow-lg group cursor-pointer"
                  onClick={() => openLightbox(item.image)}
                >
                  <img
                    src={item.image}
                    alt={`Partner ${item.id}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={lightboxImage}
              alt="Partner"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and Filter */}
      <section className="py-8 border-b border-border bg-card sticky top-16 z-30">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Region Filter */}
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-6 py-3 rounded-full border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
            >
              <option value="all">All Regions</option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name} {region.isCity ? "(City)" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Results count */}
          <p className="mt-4 text-sm text-muted-foreground">
            Showing {filteredPartners.length} partner{filteredPartners.length !== 1 ? "s" : ""}
            {selectedRegion !== "all" && ` in ${getRegionName(selectedRegion)}`}
          </p>
        </div>
      </section>

      {/* Partners Directory */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            {Object.keys(partnersByRegion).length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-12"
              >
                {Object.entries(partnersByRegion).map(([regionId, regionPartners]) => (
                  <div key={regionId}>
                    <h3 className="text-xl font-serif font-bold text-foreground mb-6 flex items-center gap-2">
                      <MapPin size={20} className="text-primary" />
                      {getRegionName(regionId)}
                      <span className="text-sm font-normal text-muted-foreground">
                        ({regionPartners.length})
                      </span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {regionPartners.map((partner, index) => (
                        <motion.div
                          key={partner.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-card border border-border rounded-xl p-4 hover:shadow-lg hover:border-primary/30 transition-all"
                        >
                          <h4 className="font-semibold text-foreground mb-2">{partner.name}</h4>

                          {/* Locations */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {partner.locations.map((location, i) => (
                              <span
                                key={i}
                                className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                              >
                                {location}
                              </span>
                            ))}
                          </div>

                          {/* Phone Numbers */}
                          <div className="space-y-1">
                            {partner.phone.map((phone, i) => (
                              <a
                                key={i}
                                href={`tel:${phone}`}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                              >
                                <Phone size={14} />
                                {phone}
                                {partner.momoPhone === phone && (
                                  <span className="text-xs bg-accent/20 text-accent px-1.5 py-0.5 rounded">MoMo</span>
                                )}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <Search size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No partners found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Become a Partner Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Become a Nuni Global Partner
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Join our growing network of partners across Ghana. Whether you want to be a vendor or ambassador, we provide full support to help you succeed.
              </p>

              <ul className="space-y-4">
                {[
                  "Competitive wholesale pricing",
                  "Marketing materials provided",
                  "Product training and support",
                  "Flexible ordering options",
                  "Monthly incentives for ambassadors",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Application Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form
                onSubmit={handleFormSubmit}
                className="bg-white rounded-2xl p-8 shadow-elevated"
              >
                <h3 className="text-2xl font-serif font-bold text-foreground mb-6">
                  Apply Now
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="Your city/town"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Region
                    </label>
                    <select
                      required
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                    >
                      <option value="">Select your region</option>
                      {regions.filter(r => !r.isCity).map((region) => (
                        <option key={region.id} value={region.name}>
                          {region.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 px-8 py-4 bg-primary text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:shadow-green hover:scale-[1.02] transition-all"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Submit via WhatsApp
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PartnersPage;
