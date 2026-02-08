import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Leaf, Heart, Sparkles, Package, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

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

        {/* Export Section - Artistic Design */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-accent/70" />

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 0.1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.9 }}
            className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-white/20 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 0.1, x: 0 } : {}}
            transition={{ duration: 1, delay: 1.1 }}
            className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-accent/30 blur-3xl"
          />

          {/* Floating Decorative Shapes */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-8 right-12 w-16 h-16 border-2 border-white/20 rounded-2xl"
          />
          <motion.div
            animate={{
              y: [0, 10, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-12 left-16 w-12 h-12 border-2 border-white/15 rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 right-1/4 w-8 h-8 bg-white/10 rounded-lg rotate-45"
          />

          {/* Content */}
          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Icon with Glow Effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.9, type: "spring", stiffness: 200 }}
                className="relative flex-shrink-0"
              >
                <div className="absolute inset-0 bg-white/30 rounded-3xl blur-xl scale-150" />
                <div className="relative w-24 h-24 lg:w-28 lg:h-28 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/30 shadow-2xl">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Package size={48} className="text-white" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Text Content */}
              <div className="flex-1 text-center lg:text-left">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="inline-block text-white/70 text-sm font-medium tracking-widest uppercase mb-3"
                >
                  Global Export Partner
                </motion.span>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="text-3xl md:text-4xl font-serif font-bold text-white mb-4"
                >
                  {t.about.exportTitle || "Beyond Skincare"}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="text-white/85 leading-relaxed text-lg mb-6 max-w-2xl"
                >
                  {t.about.exportDescription || "NG Cosmetics is also a trusted exporter of premium Ghanaian raw materials. We supply high-quality shea butter, cocoa powder, and traditional African black soap to international markets, connecting the world with Ghana's finest natural resources."}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.3 }}
                >
                  <Link
                    to="/export"
                    className="group inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    {t.about.exportCta || "Learn About Our Exports"}
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                    </motion.span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
