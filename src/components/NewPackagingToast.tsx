import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import cocoaButterNew from "@/assets/cocoa-butter-new.jpg";

const DISMISS_KEY = "cocoa-packaging-toast-dismissed";

const NewPackagingToast = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY)) return;
    if (location.pathname === "/products/cocoa-butter") return;

    const showTimer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(showTimer);
  }, [location.pathname]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(DISMISS_KEY, "1");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, x: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 z-50"
        >
          <div className="relative bg-card border border-border rounded-2xl shadow-elevated p-4 flex items-center gap-3">
            <button
              onClick={handleDismiss}
              aria-label={t.newPackagingToast.closeLabel}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors"
            >
              <X size={14} className="text-muted-foreground" />
            </button>

            <img
              src={cocoaButterNew}
              alt=""
              aria-hidden="true"
              className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
            />

            <div className="pr-4">
              <p className="text-sm font-semibold text-foreground leading-tight">
                {t.newPackagingToast.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">
                {t.newPackagingToast.message}
              </p>
              <Link
                to="/products/cocoa-butter"
                onClick={handleDismiss}
                className="inline-block text-xs font-semibold text-primary hover:text-primary/80 mt-2 transition-colors"
              >
                {t.newPackagingToast.cta} →
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewPackagingToast;
