import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Globe, ArrowLeft, Mail, Phone } from "lucide-react";

const ExportComingSoon = () => {
  return (
    <div className="min-h-screen bg-[#0f1f17] flex flex-col items-center justify-center text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <Globe className="w-10 h-10 text-amber-400" />
        </div>

        <span className="inline-block text-xs font-semibold tracking-widest text-amber-400 uppercase mb-4">
          Kofi Ideas Import & Export
        </span>

        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
          Coming to Its Own <span className="text-amber-400">Home</span>
        </h1>

        <p className="text-white/60 text-lg mb-4 leading-relaxed">
          Our export division is moving to a dedicated website. We'll be back bigger and better very soon.
        </p>

        <p className="text-white/40 text-sm mb-10">
          In the meantime, reach us directly for export inquiries.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="https://wa.me/233554753634"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-semibold transition-colors"
          >
            <Phone size={18} />
            WhatsApp Us
          </a>
          <a
            href="mailto:Kofiideas2017@gmail.com"
            className="inline-flex items-center gap-2 border-2 border-amber-400 text-amber-400 hover:bg-amber-500/20 px-8 py-4 rounded-full font-semibold transition-colors"
          >
            <Mail size={18} />
            Kofiideas2017@gmail.com
          </a>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Back to NG Cosmetics
        </Link>
      </motion.div>
    </div>
  );
};

export default ExportComingSoon;
