import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Sparkles } from "lucide-react";
import { getWhatsAppLink } from "@/data/products";

const PromoBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set end date to February 14, 2026, 11:59:59 PM
  const endDate = new Date("2026-02-14T23:59:59").getTime();

  useEffect(() => {
    // Check if promo is expired
    const now = new Date().getTime();
    if (now > endDate) {
      return;
    }

    // Check if user dismissed the popup
    const dismissed = localStorage.getItem("promo-popup-dismissed");
    const dismissedTime = dismissed ? parseInt(dismissed) : 0;
    const oneDayInMs = 24 * 60 * 60 * 1000;

    if (dismissed && now - dismissedTime < oneDayInMs) {
      return;
    }

    // Show popup after 2 seconds delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Update countdown every second
    const countdownTimer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;

      if (distance < 0) {
        clearInterval(countdownTimer);
        setIsVisible(false);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(countdownTimer);
    };
  }, [endDate]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("promo-popup-dismissed", new Date().getTime().toString());
  };

  const handleShopNow = () => {
    const message = "Hi! I'm interested in your Valentine's Day 5% discount offer on all products!";
    window.open(getWhatsAppLink(message), "_blank");
    handleDismiss();
  };

  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 24;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={handleDismiss}
        >
          {/* Popup Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-gradient-to-br from-pink-50 to-red-50 rounded-3xl shadow-2xl overflow-hidden border-4 border-pink-200">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-300/30 to-red-300/30 rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-300/30 to-red-300/30 rounded-full translate-y-12 -translate-x-12" />

              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors shadow-md"
                aria-label="Close"
              >
                <X size={18} className="text-gray-700" />
              </button>

              {/* Content */}
              <div className="relative p-8 text-center">
                {/* Hearts Animation */}
                <motion.div
                  className="flex justify-center mb-4"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex gap-2">
                    <Heart size={32} className="fill-pink-500 text-pink-500" />
                    <Sparkles size={32} className="text-red-500" />
                    <Heart size={32} className="fill-red-500 text-red-500" />
                  </div>
                </motion.div>

                {/* Heading */}
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                  Valentine's Special
                </h2>
                <p className="text-pink-600 font-semibold text-lg mb-6">
                  💝 Get <span className="text-2xl font-bold text-red-600">5% OFF</span> All Products!
                </p>

                {/* Countdown Timer */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-md">
                  <p className="text-sm text-gray-600 mb-3 font-medium">Offer Ends In:</p>
                  <div className="flex justify-center gap-3">
                    <TimeUnit value={timeLeft.days} label="Days" isUrgent={isUrgent} />
                    <span className="text-2xl font-bold text-gray-400 self-center">:</span>
                    <TimeUnit value={timeLeft.hours} label="Hours" isUrgent={isUrgent} />
                    <span className="text-2xl font-bold text-gray-400 self-center">:</span>
                    <TimeUnit value={timeLeft.minutes} label="Min" isUrgent={isUrgent} />
                    <span className="text-2xl font-bold text-gray-400 self-center">:</span>
                    <TimeUnit value={timeLeft.seconds} label="Sec" isUrgent={isUrgent} />
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3">
                  <motion.button
                    onClick={handleShopNow}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-4 bg-gradient-to-r from-pink-600 to-red-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
                  >
                    Shop Now & Save 5%
                  </motion.button>
                  <button
                    onClick={handleDismiss}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Maybe later
                  </button>
                </div>

                {/* Small Print */}
                <p className="text-xs text-gray-500 mt-4">
                  *Valid on all products until Feb 14, 2026
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const TimeUnit = ({
  value,
  label,
  isUrgent,
}: {
  value: number;
  label: string;
  isUrgent: boolean;
}) => {
  return (
    <motion.div
      className="flex flex-col items-center"
      animate={
        isUrgent
          ? {
              scale: [1, 1.1, 1],
            }
          : {}
      }
      transition={
        isUrgent
          ? {
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : {}
      }
    >
      <div className="bg-gradient-to-br from-pink-100 to-red-100 rounded-xl px-3 py-2 min-w-[55px] shadow-sm">
        <span className="text-2xl font-bold font-mono text-gray-900">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] text-gray-600 mt-1 font-medium uppercase">{label}</span>
    </motion.div>
  );
};

export default PromoBar;
