import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Phone, Users, Handshake, ArrowLeft, X, Star, Package, Store } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { partners, regions, getPartnerApplicationWhatsAppLink, Partner } from "@/data/partners";
import { useLanguage } from "@/lib/i18n";

type PartnerTab = "all" | "distributors" | "vendors";

const PartnersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [activeTab, setActiveTab] = useState<PartnerTab>("all");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const ambassadorScrollRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Application form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    region: "",
  });

  // Get ambassadors with photos for featured section
  const ambassadors = useMemo(() => {
    return partners.filter(p => p.roles?.includes("ambassador") && p.image);
  }, []);

  const openLightbox = (image: string) => {
    setLightboxImage(image);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  // Filter partners based on search, region, and tab
  const filteredPartners = useMemo(() => {
    return partners.filter((partner) => {
      const matchesSearch =
        partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.locations.some(loc => loc.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRegion =
        selectedRegion === "all" ||
        partner.region === selectedRegion;

      // Tab filtering
      let matchesTab = true;
      if (activeTab === "distributors") {
        matchesTab = partner.roles?.includes("distributor") ?? false;
      } else if (activeTab === "vendors") {
        // Vendors are partners without distributor or ambassador roles
        matchesTab = !partner.roles || partner.roles.length === 0 ||
          (!partner.roles.includes("distributor") && !partner.roles.includes("ambassador"));
      }

      return matchesSearch && matchesRegion && matchesTab;
    });
  }, [searchQuery, selectedRegion, activeTab]);

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

  // Get role badge for partner cards
  const getRoleBadge = (partner: Partner) => {
    if (partner.roles?.includes("distributor") && partner.roles?.includes("ambassador")) {
      return { label: "Distributor & Ambassador", color: "bg-gradient-to-r from-primary to-accent text-white" };
    } else if (partner.roles?.includes("distributor")) {
      return { label: "Distributor", color: "bg-primary/20 text-primary" };
    } else if (partner.roles?.includes("ambassador")) {
      return { label: "Ambassador", color: "bg-accent/20 text-accent" };
    }
    return null;
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
              <span className="font-medium">{t.common.backToHome}</span>
            </Link>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
                <Handshake size={18} className="text-accent" />
                <span className="text-sm font-medium text-accent">{t.partnersPage.badge}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4">
                {t.partnersPage.title} <span className="text-gradient-gold">{t.partnersPage.titleHighlight}</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.partnersPage.description}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Ambassadors Section */}
      <section className="py-12 bg-gradient-to-b from-accent/10 to-transparent border-y border-border">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground flex items-center gap-2">
                <Star size={24} className="text-accent" />
                Our Brand Ambassadors
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Meet the faces behind Nuni Global
              </p>
            </div>
          </div>

          {/* Horizontal scroll on mobile, grid on larger screens */}
          <div
            ref={ambassadorScrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide md:grid md:grid-cols-3 lg:grid-cols-6 md:overflow-visible"
          >
            {ambassadors.map((ambassador, index) => (
              <motion.div
                key={ambassador.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-[160px] md:w-full group cursor-pointer"
                onClick={() => ambassador.image && openLightbox(ambassador.image)}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-accent/30 aspect-[3/4]">
                  <img
                    src={ambassador.image}
                    alt={ambassador.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Ambassador badge */}
                  <div className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                    <Star size={10} className="fill-current" />
                    Ambassador
                  </div>

                  {/* Name and location */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <h3 className="font-semibold text-sm">{ambassador.name}</h3>
                    <p className="text-xs text-white/80 flex items-center gap-1 mt-0.5">
                      <MapPin size={10} />
                      {ambassador.locations[0]}
                    </p>
                  </div>
                </div>

                {/* Phone link below card */}
                <a
                  href={`https://wa.me/233${ambassador.phone[0].slice(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-2 flex items-center justify-center gap-1 text-xs text-green-600 hover:text-green-700 transition-colors"
                >
                  <Phone size={12} />
                  {ambassador.phone[0]}
                </a>
              </motion.div>
            ))}
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

      {/* Partner Type Tabs */}
      <section className="py-6 bg-card border-b border-border">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === "all"
                  ? "bg-primary text-white shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <Users size={16} />
              All Partners
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                {partners.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("distributors")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === "distributors"
                  ? "bg-primary text-white shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <Package size={16} />
              Distributors
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                {partners.filter(p => p.roles?.includes("distributor")).length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("vendors")}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === "vendors"
                  ? "bg-primary text-white shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <Store size={16} />
              Vendors
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                {partners.filter(p => !p.roles || p.roles.length === 0 || (!p.roles.includes("distributor") && !p.roles.includes("ambassador"))).length}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-6 border-b border-border bg-background sticky top-16 z-30">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={t.common.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Region Filter */}
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-6 py-3 rounded-full border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
            >
              <option value="all">{t.common.allRegions}</option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name} {region.isCity ? "(City)" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Results count */}
          <p className="mt-4 text-sm text-muted-foreground">
            {t.common.showing} {filteredPartners.length} {activeTab === "all" ? t.common.partners : activeTab}
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
                      {regionPartners.map((partner, index) => {
                        const roleBadge = getRoleBadge(partner);
                        return (
                          <motion.div
                            key={partner.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-card border border-border rounded-xl p-4 hover:shadow-lg hover:border-primary/30 transition-all"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-foreground">{partner.name}</h4>
                              {partner.image && (
                                <img
                                  src={partner.image}
                                  alt={partner.name}
                                  className="w-10 h-10 rounded-full object-cover border-2 border-accent/30 cursor-pointer"
                                  onClick={() => partner.image && openLightbox(partner.image)}
                                />
                              )}
                            </div>

                            {/* Role Badge */}
                            {roleBadge && (
                              <span className={`inline-block text-xs px-2 py-0.5 rounded-full mb-2 ${roleBadge.color}`}>
                                {roleBadge.label}
                              </span>
                            )}

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

                            {/* Phone Numbers - WhatsApp Links */}
                            <div className="space-y-1">
                              {partner.phone.map((phone, i) => {
                                // Convert phone to WhatsApp format (add 233 prefix, remove leading 0)
                                const whatsappNumber = phone.startsWith('0')
                                  ? `233${phone.slice(1)}`
                                  : phone;
                                return (
                                  <a
                                    key={i}
                                    href={`https://wa.me/${whatsappNumber}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-green-600 transition-colors"
                                  >
                                    <Phone size={14} />
                                    {phone}
                                    {partner.momoPhone === phone && (
                                      <span className="text-xs bg-accent/20 text-accent px-1.5 py-0.5 rounded">MoMo</span>
                                    )}
                                  </a>
                                );
                              })}
                            </div>
                          </motion.div>
                        );
                      })}
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
                <h3 className="text-xl font-semibold text-foreground mb-2">{t.common.noResults}</h3>
                <p className="text-muted-foreground">
                  {t.common.tryAdjusting}
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
                {t.partnersPage.becomePartner}
              </h2>
              <p className="text-white/80 text-lg mb-8">
                {t.partnersPage.becomePartnerDesc}
              </p>

              <ul className="space-y-4">
                {[
                  t.partnersPage.competitivePricing,
                  t.partnersPage.marketingMaterials,
                  t.partnersPage.productTraining,
                  t.partnersPage.flexibleOrdering,
                  t.partnersPage.monthlyIncentives,
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
                  {t.common.applyNow}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t.partnersPage.fullName}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder={t.partnersPage.enterFullName}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t.partnersPage.phoneNumber}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder={t.partnersPage.enterPhone}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t.partnersPage.location}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder={t.partnersPage.yourCity}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t.partnersPage.region}
                    </label>
                    <select
                      required
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                    >
                      <option value="">{t.common.selectRegion}</option>
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
                  {t.common.submitViaWhatsApp}
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
