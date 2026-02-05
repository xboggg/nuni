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

        {/* Export Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
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
    </section>
  );
};

export default About;
