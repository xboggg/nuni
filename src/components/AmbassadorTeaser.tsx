import { motion } from "framer-motion";
import { Calendar, MapPin, Phone, Radio } from "lucide-react";

const AmbassadorTeaser = () => {
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
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="/media/bigface-reveal.jpg"
              alt="NG Cosmetics New Big Face - Unveiling Event"
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl shadow-yellow-900/30"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-yellow-500/20 pointer-events-none" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-red-500 uppercase mb-3">
              <Radio size={16} className="animate-pulse" />
              ADOM TV LIVE COVERAGE
            </span>

            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3 leading-tight">
              The New <span className="text-yellow-400">Big Face</span>
            </h2>

            <p className="text-white/60 mb-8 text-sm md:text-base leading-relaxed">
              Experience the moment, the excitement, and the big unveiling live on your screens.
              Join us as media, guests, and supporters gather for a remarkable launch event.
            </p>

            {/* Event details */}
            <div className="space-y-3 mb-6 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-3 bg-white/5 border border-yellow-500/20 rounded-xl p-3">
                <Calendar className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs text-white/40 uppercase tracking-wider">Date & Time</div>
                  <div className="text-white text-sm font-medium">29th May · 9:00 AM Sharp</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 border border-yellow-500/20 rounded-xl p-3">
                <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs text-white/40 uppercase tracking-wider">Location</div>
                  <div className="text-white text-sm font-medium">Ablekuma Joma</div>
                </div>
              </div>

              <a
                href="tel:+233591782488"
                className="flex items-center gap-3 bg-white/5 border border-yellow-500/20 rounded-xl p-3 hover:bg-white/10 transition-colors"
              >
                <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs text-white/40 uppercase tracking-wider">Contact for Direction</div>
                  <div className="text-white text-sm font-medium">0591782488</div>
                </div>
              </a>
            </div>

            <p className="text-yellow-400 text-sm font-semibold tracking-wide">
              Be There. Be Seen. Be Part of the Big Face Launch.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AmbassadorTeaser;
