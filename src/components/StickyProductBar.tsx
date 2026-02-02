import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import { getWhatsAppLink, GENERAL_INQUIRY_MESSAGE } from "@/data/products";
import { useLanguage } from "@/lib/i18n";

const StickyProductBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const productsSection = document.getElementById("products");
      if (productsSection && !isDismissed) {
        const rect = productsSection.getBoundingClientRect();
        // Show bar when products section is above the viewport
        setIsVisible(rect.bottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-primary shadow-elevated"
        >
          <div className="container-custom py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Text */}
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center"
                >
                  <ShoppingBag size={20} className="text-primary-foreground" />
                </motion.div>
                <span className="text-primary-foreground font-medium hidden sm:block">
                  {t.stickyBar.text}
                </span>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-3">
                <a
                  href={getWhatsAppLink(GENERAL_INQUIRY_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-foreground text-primary rounded-full font-semibold text-sm transition-all duration-200 hover:bg-primary-foreground/90 hover:scale-105"
                >
                  {t.stickyBar.cta}
                </a>
                <button
                  onClick={handleDismiss}
                  className="p-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  aria-label="Dismiss"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyProductBar;
