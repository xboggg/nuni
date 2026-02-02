import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/nuni-logo.png";
import { getWhatsAppLink, GENERAL_INQUIRY_MESSAGE } from "@/data/products";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Products", href: "#products" },
  { name: "Benefits", href: "#benefits" },
  { name: "Gallery", href: "/gallery", isRoute: true },
  { name: "Partners", href: "#partners" },
  { name: "Contact", href: "/contact", isRoute: true },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const location = useLocation();

  const handleNavClick = (href: string, isRoute?: boolean) => {
    setIsMobileMenuOpen(false);
    if (isRoute) return; // Let Link handle routing
    
    // If we're not on home page, we need to navigate first
    if (location.pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
            : "bg-transparent"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <img src={logo} alt="Nuni Global" className="h-10 md:h-12 w-10 md:w-12 rounded-full object-cover" />
              <span className={`font-serif font-semibold text-lg md:text-xl transition-colors duration-300 ${
                isScrolled ? "text-primary" : "text-primary"
              }`}>
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
                      isScrolled ? "text-foreground" : "text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                      isScrolled ? "text-foreground" : "text-foreground"
                    }`}
                  >
                    {link.name}
                  </button>
                )
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a
                href={getWhatsAppLink(GENERAL_INQUIRY_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-medium text-sm transition-all duration-200 hover:shadow-green hover:scale-105"
              >
                Order Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-card/98 backdrop-blur-lg shadow-elevated md:hidden"
          >
            <div className="container-custom py-6">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  link.isRoute ? (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-left py-3 px-4 text-foreground font-medium rounded-lg hover:bg-muted transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      key={link.name}
                      onClick={() => handleNavClick(link.href)}
                      className="text-left py-3 px-4 text-foreground font-medium rounded-lg hover:bg-muted transition-colors"
                    >
                      {link.name}
                    </button>
                  )
                ))}
                <a
                  href={getWhatsAppLink(GENERAL_INQUIRY_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium transition-all duration-200 hover:shadow-green"
                >
                  Order Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
