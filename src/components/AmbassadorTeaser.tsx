import { motion } from "framer-motion";
import { Calendar, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import launchLuxFar1 from "@/assets/launch-lux-far-1.jpg";
import launchLuxFar2 from "@/assets/launch-lux-far-2.jpg";

const AmbassadorTeaser = () => {
  const { t } = useLanguage();

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-16 bg-[#0a0a0a] overflow-hidden relative"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)]" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Product Posters */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative grid grid-cols-2 gap-4 max-w-md mx-auto"
          >
            <div className="relative">
              <img
                src={launchLuxFar1}
                alt="NG Cosmetics Luxury and Faraway Body Butter"
                className="w-full rounded-2xl shadow-2xl shadow-yellow-900/30 object-cover aspect-square"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-yellow-500/20 pointer-events-none" />
            </div>
            <div className="relative mt-8">
              <img
                src={launchLuxFar2}
                alt="NG Cosmetics Faraway and Luxury Body Butter"
                className="w-full rounded-2xl shadow-2xl shadow-yellow-900/30 object-cover aspect-square"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-yellow-500/20 pointer-events-none" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-yellow-400 uppercase mb-3">
              <Sparkles size={16} />
              {t.launchBanner.badge}
            </span>

            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3 leading-tight">
              {t.launchBanner.title} <span className="text-yellow-400">{t.launchBanner.titleHighlight}</span> {t.launchBanner.titleEnd}
            </h2>

            <p className="text-white/60 mb-8 text-sm md:text-base leading-relaxed">
              {t.launchBanner.description}
            </p>

            {/* Launch date */}
            <div className="space-y-3 mb-6 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-3 bg-white/5 border border-yellow-500/20 rounded-xl p-3">
                <Calendar className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs text-white/40 uppercase tracking-wider">{t.launchBanner.launchDateLabel}</div>
                  <div className="text-white text-sm font-medium">{t.launchBanner.launchDate}</div>
                </div>
              </div>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-400 text-black rounded-full font-semibold transition-all duration-300 hover:bg-yellow-300 hover:scale-105 shadow-lg"
            >
              {t.launchBanner.cta}
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AmbassadorTeaser;
