import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Leaf, TrendingUp, Users } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const Benefits = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const benefits = [
    {
      icon: ShieldCheck,
      title: t.benefits.items.fdaCertified,
      description: t.benefits.items.fdaCertifiedDesc,
      iconBg: "linear-gradient(to bottom right, #3b82f6, #2563eb)",
      cardBg: "#eff6ff",
      borderColor: "#bfdbfe",
    },
    {
      icon: Leaf,
      title: t.benefits.items.natural,
      description: t.benefits.items.naturalDesc,
      iconBg: "linear-gradient(to bottom right, #10b981, #059669)",
      cardBg: "#d1fae5",
      borderColor: "#a7f3d0",
    },
    {
      icon: TrendingUp,
      title: t.benefits.items.visibleResults,
      description: t.benefits.items.visibleResultsDesc,
      iconBg: "linear-gradient(to bottom right, #a855f7, #9333ea)",
      cardBg: "#faf5ff",
      borderColor: "#e9d5ff",
    },
    {
      icon: Users,
      title: t.benefits.items.forEveryone,
      description: t.benefits.items.forEveryoneDesc,
      iconBg: "linear-gradient(to bottom right, #f97316, #ea580c)",
      cardBg: "#ffedd5",
      borderColor: "#fed7aa",
    },
  ];

  return (
    <section id="benefits" className="py-20 lg:py-32 bg-card">
      <div className="container-custom">
        <div ref={ref} className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4"
          >
            {t.benefits.subtitle}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6"
          >
            {t.benefits.title} <span className="text-gradient-gold">{t.benefits.titleHighlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            {t.benefits.description}
          </motion.p>
        </div>

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
              className="group relative p-8 rounded-3xl border-2 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              style={{
                backgroundColor: benefit.cardBg,
                borderColor: benefit.borderColor,
              }}
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
                  className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                  style={{
                    background: benefit.iconBg,
                  }}
                >
                  <benefit.icon size={36} className="text-white" strokeWidth={2.5} />
                </motion.div>
                <div className="flex-1">
                  <motion.h3
                    className="text-xl font-serif font-bold text-foreground mb-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.15, duration: 0.5 }}
                  >
                    {benefit.title}
                  </motion.h3>
                  <motion.p
                    className="text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.15, duration: 0.5 }}
                  >
                    {benefit.description}
                  </motion.p>
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
  );
};

export default Benefits;
