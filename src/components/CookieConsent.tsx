import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const COOKIE_STORAGE_KEY = "nuni-cookie-consent";

type ConsentStatus = "accepted" | "declined" | null;

const CookieConsent = () => {
  const [consent, setConsent] = useState<ConsentStatus>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_STORAGE_KEY) as ConsentStatus;
    if (!stored) {
      // Delay showing banner slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
    setConsent(stored);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_STORAGE_KEY, "accepted");
    setConsent("accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_STORAGE_KEY, "declined");
    setConsent("declined");
    setIsVisible(false);
  };

  if (consent) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl shadow-elevated border border-border p-4 md:p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full hidden md:block">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h4 className="font-medium text-foreground mb-1 flex items-center gap-2">
                    <Cookie className="w-5 h-5 text-primary md:hidden" />
                    We Value Your Privacy
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.{" "}
                    <a
                      href="/privacy-policy"
                      className="text-primary hover:underline"
                    >
                      Learn more
                    </a>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 w-full md:w-auto flex-shrink-0">
                  <Button
                    variant="outline"
                    onClick={handleDecline}
                    className="flex-1 md:flex-initial rounded-full"
                  >
                    Decline
                  </Button>
                  <Button
                    onClick={handleAccept}
                    className="flex-1 md:flex-initial bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
                  >
                    Accept All
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
