import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ShieldCheck, Leaf, TrendingUp, Users, ArrowLeft, Award, Heart, Sparkles, Trophy, Star, X } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";

// CEO and Family Images
import ceoImage from "@/assets/nuni-kofi.png";
import ceoImage2 from "@/assets/ceo/nuni-ceo1.jpeg";
import wifeImage1 from "@/assets/ceo/nuni-ceo7.jpeg";
import coupleImage from "@/assets/ceo/nuni-ceo9.jpeg";

// Award Images
import awardImage1 from "@/assets/ceo/nuni-award1.jpeg";
import awardImage2 from "@/assets/ceo/nuni-award2.jpeg";
import awardImage3 from "@/assets/ceo/nuni-ceo2.jpeg";
import awardImage4 from "@/assets/ceo/nuni-ceo3.jpeg";
import awardImage5 from "@/assets/ceo/nuni-ceo4.jpeg";

// Animated floating card component
const FloatingCard = ({
  image,
  alt,
  size = "md",
  delay = 0,
  onClick
}: {
  image: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  delay?: number;
  onClick?: () => void;
}) => {
  const sizeClasses = {
    sm: "w-32 h-32 md:w-40 md:h-40",
    md: "w-40 h-40 md:w-48 md:h-48",
    lg: "w-48 h-48 md:w-56 md:h-56",
    xl: "w-56 h-56 md:w-64 md:h-64",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative cursor-pointer"
      onClick={onClick}
    >
      {/* Pulsating rings */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/20"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.2, 0.5],
        }}
        transition={{
          duration: 2 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ margin: "-12px" }}
      />
      <motion.div
        className="absolute inset-0 rounded-full bg-accent/20"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 2.5 + delay,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
        style={{ margin: "-24px" }}
      />

      {/* Floating animation */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10"
      >
        <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl hover:border-accent/50 transition-colors duration-300`}>
          <img
            src={image}
            alt={alt}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
        </div>
      </motion.div>

      {/* Decorative glow */}
      <div className="absolute -top-2 -right-2 w-12 h-12 bg-accent/30 rounded-full blur-xl" />
      <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-primary/30 rounded-full blur-xl" />
    </motion.div>
  );
};

// Rectangular card for couple photo
const CoupleCard = ({ image, alt, onClick }: { image: string; alt: string; onClick?: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="relative cursor-pointer"
    onClick={onClick}
  >
    {/* Animated border */}
    <motion.div
      className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary via-accent to-primary opacity-70"
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{ backgroundSize: "200% 200%" }}
    />

    {/* Floating animation */}
    <motion.div
      animate={{
        y: [0, -6, 0],
        rotate: [0, 1, 0, -1, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative"
    >
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        <img
          src={image}
          alt={alt}
          className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white font-serif text-lg md:text-xl font-semibold">The Power Couple</p>
          <p className="text-white/80 text-sm">Building NG Cosmetics & Nuni Global together</p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const WhyNuniPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const benefits = [
    {
      icon: ShieldCheck,
      title: t.benefits.items.fdaCertified,
      description: t.benefits.items.fdaCertifiedDesc,
      cardClass: "benefit-card-blue",
      iconClass: "benefit-icon-blue",
    },
    {
      icon: Leaf,
      title: t.benefits.items.natural,
      description: t.benefits.items.naturalDesc,
      cardClass: "benefit-card-green",
      iconClass: "benefit-icon-green",
    },
    {
      icon: TrendingUp,
      title: t.benefits.items.visibleResults,
      description: t.benefits.items.visibleResultsDesc,
      cardClass: "benefit-card-purple",
      iconClass: "benefit-icon-purple",
    },
    {
      icon: Users,
      title: t.benefits.items.forEveryone,
      description: t.benefits.items.forEveryoneDesc,
      cardClass: "benefit-card-orange",
      iconClass: "benefit-icon-orange",
    },
  ];

  const additionalReasons = [
    {
      icon: Award,
      title: t.whyNuni.qualityAssurance,
      description: t.whyNuni.qualityAssuranceDesc,
    },
    {
      icon: Heart,
      title: t.whyNuni.madeWithLove,
      description: t.whyNuni.madeWithLoveDesc,
    },
    {
      icon: Sparkles,
      title: t.whyNuni.provenTrackRecord,
      description: t.whyNuni.provenTrackRecordDesc,
    },
  ];

  const awardImages = [awardImage1, awardImage2, awardImage3, awardImage4, awardImage5];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Lightbox Modal */}
      {lightboxImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X size={24} />
          </button>
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={lightboxImage}
            alt="Enlarged view"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}

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
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4"
              >
                {t.whyNuni.badge}
              </motion.span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4">
                {t.whyNuni.title} <span className="text-gradient-gold">{t.whyNuni.titleHighlight}</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.whyNuni.description}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CEO Section - About Style */}
      <section className="py-20 lg:py-32 bg-card overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* CEO Image with Animation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center"
            >
              <div className="relative">
                {/* Pulsating ring animation */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/20"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.2, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ margin: "-20px" }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full bg-accent/20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  style={{ margin: "-40px" }}
                />

                {/* Image container with floating animation */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10"
                >
                  <div
                    className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl cursor-pointer"
                    onClick={() => setLightboxImage(ceoImage)}
                  >
                    <img
                      src={ceoImage}
                      alt="Kofi Ideas - CEO of NG Cosmetics"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/30 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/30 rounded-full blur-xl" />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4">
                {t.whyNuni.meetVisionary}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
                {t.whyNuni.ceoName}
                <span className="block text-xl md:text-2xl text-primary mt-2 font-normal">
                  {t.whyNuni.ceoRole}
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {t.whyNuni.ceoBio}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {t.whyNuni.ceoQuote}
              </p>

              <div className="flex flex-wrap gap-6">
                <div className="text-center">
                  <span className="block text-3xl font-bold text-primary">72+</span>
                  <span className="text-sm text-muted-foreground">{t.whyNuni.partnersNationwide}</span>
                </div>
                <div className="text-center">
                  <span className="block text-3xl font-bold text-primary">3</span>
                  <span className="text-sm text-muted-foreground">{t.whyNuni.premiumProducts}</span>
                </div>
                <div className="text-center">
                  <span className="block text-3xl font-bold text-primary">12</span>
                  <span className="text-sm text-muted-foreground">{t.whyNuni.regionsCovered}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Gallery Section - CEO & Wife */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-card overflow-hidden">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4">
              The Faces Behind NG Cosmetics
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Meet the <span className="text-gradient-gold">Leadership</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Behind every successful brand is a dedicated team. At NG Cosmetics, creators of the Nuni Global product line, it's a family united by passion, purpose, and the commitment to transform African skincare.
            </p>
          </motion.div>

          {/* Artistic Layout of Photos - CEO on left, Couple in center (big), Wife on right */}
          <div className="relative">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-6 lg:gap-12">
              {/* CEO - Left side (smaller) */}
              <div className="order-2 md:order-1">
                <FloatingCard
                  image={ceoImage2}
                  alt="Kofi Ideas - CEO"
                  size="md"
                  delay={0}
                  onClick={() => setLightboxImage(ceoImage2)}
                />
              </div>

              {/* Couple - Center (biggest) */}
              <div className="order-1 md:order-2 w-full max-w-md md:max-w-lg">
                <CoupleCard
                  image={coupleImage}
                  alt="The Power Couple"
                  onClick={() => setLightboxImage(coupleImage)}
                />
              </div>

              {/* Wife - Right side (smaller) */}
              <div className="order-3">
                <FloatingCard
                  image={wifeImage1}
                  alt="CEO's Wife"
                  size="md"
                  delay={0.3}
                  onClick={() => setLightboxImage(wifeImage1)}
                />
              </div>
            </div>

            {/* Decorative floating elements */}
            <motion.div
              className="absolute top-1/4 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
              animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/4 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl"
              animate={{ x: [0, -20, 0], y: [0, 10, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </div>
        </div>
      </section>

      {/* Awards & Recognition Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-charcoal via-charcoal to-charcoal/95 overflow-hidden">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full mb-6">
              <Trophy size={18} className="text-accent" />
              <span className="text-sm font-medium text-accent">Awards & Recognition</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-cream mb-4">
              Excellence <span className="text-gradient-gold">Recognized</span>
            </h2>
            <p className="text-cream/70 max-w-3xl mx-auto leading-relaxed">
              Kofi Ideas' unwavering dedication to quality, innovation, and community empowerment has not gone unnoticed.
              His tireless efforts in building NG Cosmetics and its flagship Nuni Global product line from the ground up, while creating opportunities for over 72 partners
              across Ghana, earned him the prestigious <strong className="text-accent">Outstanding CEO of the Year 2025</strong> award.
              This recognition celebrates his visionary leadership, commitment to African excellence, and the positive impact
              NG Cosmetics and Nuni Global continue to make in communities nationwide.
            </p>
          </motion.div>

          {/* Award Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Trophy, label: "Outstanding CEO 2025", value: "Winner" },
              { icon: Star, label: "Industry Citation", value: "Received" },
              { icon: Award, label: "Years of Excellence", value: "5+" },
              { icon: Heart, label: "Lives Impacted", value: "10K+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-cream/5 border border-cream/10 rounded-2xl p-6 text-center hover:bg-cream/10 transition-colors"
              >
                <stat.icon size={32} className="text-accent mx-auto mb-3" />
                <div className="text-2xl font-bold text-cream mb-1">{stat.value}</div>
                <div className="text-cream/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Award Images Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {awardImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="relative group cursor-pointer"
                onClick={() => setLightboxImage(image)}
              >
                <div className="aspect-square rounded-2xl overflow-hidden border-2 border-cream/20 hover:border-accent/50 transition-colors shadow-lg">
                  <img
                    src={image}
                    alt={`Award ceremony ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Star size={20} className="text-white" />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Cards Section */}
      <section ref={ref} className="py-20 lg:py-32 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Why Choose <span className="text-gradient-gold">Nuni Global</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our commitment to quality, nature, and your skin's health sets us apart.
            </p>
          </motion.div>

          {/* Benefit Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className={`group relative p-8 rounded-3xl border-2 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${benefit.cardClass}`}
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, currentColor 0%, transparent 70%)`
                  }}
                />

                <div className="relative flex items-start gap-5">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${benefit.iconClass}`}
                  >
                    <benefit.icon size={36} className="text-white" strokeWidth={2.5} />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>

                {/* Decorative corner accent */}
                <motion.div
                  className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    background: `radial-gradient(circle, currentColor 0%, transparent 70%)`
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Reasons Section */}
      <section className="py-20 lg:py-32 bg-card">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4"
            >
              {t.whyNuni.moreReasons} <span className="text-gradient-gold">{t.whyNuni.trustUs}</span>
            </motion.h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.whyNuni.moreReasonsDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {additionalReasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background border border-border rounded-2xl p-8 text-center hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <reason.icon size={28} className="text-primary" />
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-3">{reason.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              {t.whyNuni.readyToTransform}
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              {t.whyNuni.readyToTransformDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary rounded-full font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                {t.common.exploreProducts}
              </Link>
              <Link
                to="/partners"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 text-white rounded-full font-semibold transition-all duration-200 hover:bg-white/30"
              >
                {t.common.findPartner}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhyNuniPage;
