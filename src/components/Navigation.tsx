import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/nuni-logo.png";
import { getWhatsAppLink, GENERAL_INQUIRY_MESSAGE } from "@/data/products";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/lib/i18n";

// Haptic feedback utility
const triggerHaptic = (style: 'light' | 'medium' | 'heavy' = 'light') => {
  if ('vibrate' in navigator) {
    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30],
    };
    navigator.vibrate(patterns[style]);
  }
};

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const { t } = useLanguage();

  const navLinks = [
    { name: t.nav.about, href: "#about" },
    { name: t.nav.products, href: "#products" },
    { name: t.nav.benefits, href: "#benefits" },
    { name: t.nav.gallery, href: "/gallery", isRoute: true },
    { name: t.nav.partners, href: "#partners" },
    { name: t.nav.contact, href: "/contact", isRoute: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const location = useLocation();

  const handleNavClick = useCallback((href: string, isRoute?: boolean) => {
    triggerHaptic('medium');
    setIsMobileMenuOpen(false);
    if (isRoute) return;
    
    if (location.pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.pathname]);

  const handleMenuToggle = () => {
    triggerHaptic('light');
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleItemPress = (name: string) => {
    setActiveItem(name);
    triggerHaptic('light');
  };

  const handleItemRelease = () => {
    setActiveItem(null);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-card/95 backdrop-blur-md shadow-soft"
            : "bg-black/20 backdrop-blur-sm"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <img src={logo} alt="Nuni Global" className="h-10 md:h-12 w-10 md:w-12 rounded-full object-cover" />
              <span className={`font-serif font-semibold text-lg md:text-xl transition-colors duration-300 ${
                isScrolled ? "text-primary" : "text-white"
              }`}
              style={{ textShadow: isScrolled ? 'none' : '1px 1px 3px rgba(0,0,0,0.5)' }}
              >
                NUNI GLOBAL
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                      isScrolled ? "text-foreground" : "text-white"
                    }`}
                    style={{ textShadow: isScrolled ? 'none' : '1px 1px 3px rgba(0,0,0,0.5)' }}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                      isScrolled ? "text-foreground" : "text-white"
                    }`}
                    style={{ textShadow: isScrolled ? 'none' : '1px 1px 3px rgba(0,0,0,0.5)' }}
                  >
                    {link.name}
                  </button>
                )
              ))}
            </div>

            {/* Language Switcher, Theme Toggle & CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher />
              <ThemeToggle />
              <a
                href={getWhatsAppLink(GENERAL_INQUIRY_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-medium text-sm transition-all duration-200 hover:shadow-green hover:scale-105"
              >
                {t.nav.orderNow}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={handleMenuToggle}
              whileTap={{ scale: 0.9 }}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? "text-foreground hover:bg-muted" : "text-white"
              }`}
              style={{ textShadow: isScrolled ? 'none' : '1px 1px 3px rgba(0,0,0,0.5)' }}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm z-50 bg-card shadow-2xl md:hidden"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-5 border-b border-border">
                <div className="flex items-center gap-2">
                  <img src={logo} alt="Nuni Global" className="h-10 w-10 rounded-full object-cover" />
                  <span className="font-serif font-semibold text-lg text-primary">
                    NUNI GLOBAL
                  </span>
                </div>
                <motion.button
                  onClick={() => {
                    triggerHaptic('light');
                    setIsMobileMenuOpen(false);
                  }}
                  whileTap={{ scale: 0.9, rotate: 90 }}
                  className="p-2 rounded-full hover:bg-muted transition-colors text-foreground"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col p-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        onClick={() => handleNavClick(link.href, true)}
                        onTouchStart={() => handleItemPress(link.name)}
                        onTouchEnd={handleItemRelease}
                        onMouseDown={() => handleItemPress(link.name)}
                        onMouseUp={handleItemRelease}
                        onMouseLeave={handleItemRelease}
                        className="relative overflow-hidden"
                      >
                        <motion.div
                          animate={{
                            scale: activeItem === link.name ? 0.98 : 1,
                            backgroundColor: activeItem === link.name ? 'hsl(var(--muted))' : 'transparent',
                          }}
                          transition={{ duration: 0.1 }}
                          className="flex items-center justify-between py-4 px-3 text-foreground font-medium text-lg border-b border-border/50 rounded-lg"
                        >
                          <span>{link.name}</span>
                          <motion.div
                            animate={{ x: activeItem === link.name ? 4 : 0 }}
                            transition={{ duration: 0.1 }}
                          >
                            <ChevronRight size={18} className="text-muted-foreground" />
                          </motion.div>
                        </motion.div>
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleNavClick(link.href)}
                        onTouchStart={() => handleItemPress(link.name)}
                        onTouchEnd={handleItemRelease}
                        onMouseDown={() => handleItemPress(link.name)}
                        onMouseUp={handleItemRelease}
                        onMouseLeave={handleItemRelease}
                        className="relative overflow-hidden w-full text-left"
                      >
                        <motion.div
                          animate={{
                            scale: activeItem === link.name ? 0.98 : 1,
                            backgroundColor: activeItem === link.name ? 'hsl(var(--muted))' : 'transparent',
                          }}
                          transition={{ duration: 0.1 }}
                          className="flex items-center justify-between py-4 px-3 text-foreground font-medium text-lg border-b border-border/50 rounded-lg"
                        >
                          <span>{link.name}</span>
                          <motion.div
                            animate={{ x: activeItem === link.name ? 4 : 0 }}
                            transition={{ duration: 0.1 }}
                          >
                            <ChevronRight size={18} className="text-muted-foreground" />
                          </motion.div>
                        </motion.div>
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Bottom Section */}
              <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-border bg-muted/30">
                <div className="flex items-center justify-between mb-4">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
                <motion.a
                  href={getWhatsAppLink(GENERAL_INQUIRY_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    triggerHaptic('heavy');
                    setIsMobileMenuOpen(false);
                  }}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-green"
                >
                  <motion.span
                    animate={{ x: [0, 2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {t.nav.orderNow}
                  </motion.span>
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
