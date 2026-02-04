import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Leaf, TrendingUp, Users, ArrowLeft, Award, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import ceoImage from "@/assets/nuni-kofi.png";

const WhyNuniPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

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
                  <div className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl">
                    <img
                      src={ceoImage}
                      alt="Kofi Ideas - CEO of Nuni Global"
                      className="w-full h-full object-cover"
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
                  <span className="block text-3xl font-bold text-primary">68+</span>
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

      {/* Benefits Cards Section */}
      <section ref={ref} className="py-20 lg:py-32 bg-background">
        <div className="container-custom">
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
      <section className="py-20 lg:py-32 bg-charcoal">
        <div className="container-custom">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-serif font-bold text-cream mb-4"
            >
              {t.whyNuni.moreReasons} <span className="text-gradient-gold">{t.whyNuni.trustUs}</span>
            </motion.h2>
            <p className="text-cream/70 max-w-2xl mx-auto">
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
                className="bg-cream/5 border border-cream/10 rounded-2xl p-8 text-center hover:bg-cream/10 transition-colors"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
                  <reason.icon size={28} className="text-primary" />
                </div>
                <h3 className="text-xl font-serif font-bold text-cream mb-3">{reason.title}</h3>
                <p className="text-cream/60 leading-relaxed">{reason.description}</p>
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
