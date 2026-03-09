import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Package, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/nuni-logo.png";

const ExportNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Products", href: "/export/products" },
    { name: "Shea Butter", href: "/export/shea-butter" },
    { name: "Cocoa", href: "/export/cocoa" },
    { name: "Black Soap", href: "/export/black-soap" },
    { name: "Our Process", href: "/export/process" },
    { name: "Contact", href: "/export/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#1a3a2a]/95 backdrop-blur-md shadow-lg"
            : "bg-[#1a3a2a]/80 backdrop-blur-sm"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo & Brand */}
            <Link to="/export" className="flex items-center gap-3">
              <div className="relative">
                <img src={logo} alt="Kofi Ideas Export" className="h-10 md:h-12 w-10 md:w-12 rounded-full object-cover border-2 border-amber-500/50" />
                <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-0.5">
                  <Package size={12} className="text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg md:text-xl text-white leading-tight">
                  KOFI IDEAS
                </span>
                <span className="text-[10px] md:text-xs text-amber-400 font-medium tracking-wider">
                  IMPORTS & EXPORTS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(link.href)
                      ? "text-amber-400"
                      : "text-white/80 hover:text-amber-400"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA & Back to Skincare */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-white/70 hover:text-white text-sm transition-colors"
              >
                <ArrowLeft size={16} />
                Skincare
              </Link>
              <Link
                to="/export/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium text-sm transition-all duration-200 hover:shadow-lg"
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-2 rounded-lg text-white"
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm z-50 bg-[#1a3a2a] shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <img src={logo} alt="Kofi Ideas" className="h-10 w-10 rounded-full object-cover" />
                  <div className="flex flex-col">
                    <span className="font-serif font-bold text-white">KOFI IDEAS</span>
                    <span className="text-[10px] text-amber-400">IMPORTS & EXPORTS</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between py-4 px-3 font-medium text-lg border-b border-white/10 rounded-lg transition-colors ${
                      isActive(link.href)
                        ? "text-amber-400 bg-white/5"
                        : "text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight size={18} className="text-white/50" />
                  </Link>
                ))}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-white/10 bg-[#152a20]">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 mb-3 border border-white/20 text-white rounded-xl font-medium transition-colors hover:bg-white/10"
                >
                  <ArrowLeft size={18} />
                  Back to Skincare
                </Link>
                <Link
                  to="/export/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold text-lg transition-all"
                >
                  Get a Quote
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExportNavigation;
