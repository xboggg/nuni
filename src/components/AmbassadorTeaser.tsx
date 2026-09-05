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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative z-40 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Cinematic backdrop image, blended into the dark section */}
      <div className="absolute inset-0">
        <img
          src={launchLuxFar1}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-40 md:opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/85 to-[#0a0a0a]/60 md:bg-gradient-to-r md:from-[#0a0a0a] md:via-[#0a0a0a]/90 md:to-[#0a0a0a]/50" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.12),transparent_60%)]" />

      <div className="container-custom relative z-10 py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:order-1 lg:text-left"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-yellow-400 uppercase mb-5">
              <Sparkles size={14} />
              {t.launchBanner.badge}
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4 leading-[1.1] text-balance">
              {t.launchBanner.title}{" "}
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                {t.launchBanner.titleHighlight}
              </span>{" "}
              {t.launchBanner.titleEnd}
            </h2>

            <p className="text-white/60 mb-8 text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
              {t.launchBanner.description}
            </p>

            {/* Launch date + CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-3 bg-white/5 border border-yellow-500/20 rounded-xl px-4 py-3 backdrop-blur-sm">
                <Calendar className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-[11px] text-white/40 uppercase tracking-wider">{t.launchBanner.launchDateLabel}</div>
                  <div className="text-white text-sm font-medium">{t.launchBanner.launchDate}</div>
                </div>
              </div>

              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-400 text-black rounded-full font-semibold transition-all duration-300 hover:bg-yellow-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-yellow-500/20 whitespace-nowrap"
              >
                {t.launchBanner.cta}
              </Link>
            </div>
          </motion.div>

          {/* Product imagery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-md lg:order-2 lg:max-w-none"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-2xl shadow-black/60 ring-1 ring-white/10">
              <img
                src={launchLuxFar2}
                alt="NG Cosmetics Luxury and Faraway Body Butter"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Floating detail card, desktop only */}
            <div className="hidden lg:block absolute -bottom-6 -left-6 w-40 overflow-hidden rounded-2xl shadow-xl shadow-black/50 ring-1 ring-white/10">
              <img
                src={launchLuxFar1}
                alt="NG Cosmetics Body Butter jars close-up"
                className="h-full w-full object-cover aspect-square"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AmbassadorTeaser;
