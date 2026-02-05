import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/nuni-logo.png";
import { products } from "@/data/products";
import { useLanguage } from "@/lib/i18n";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const { t } = useLanguage();

  const handleNavClick = (href: string) => {
    if (location.pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const footerLinks = {
    products: products.map((p) => ({ name: p.name, href: `/products/${p.id}`, isRoute: true })),
    company: [
      { name: t.footer.about, href: "/why-nuni", isRoute: true },
      { name: t.footer.gallery, href: "/gallery", isRoute: true },
      { name: t.footer.partners, href: "/partners", isRoute: true },
      { name: t.footer.export || "Raw Materials Export", href: "/export", isRoute: true },
      { name: t.footer.contact, href: "/contact", isRoute: true },
    ],
    support: [
      { name: t.footer.faq, href: "/contact", isRoute: true },
      { name: t.footer.shipping, href: "/contact", isRoute: true },
      { name: t.footer.returns, href: "/contact", isRoute: true },
    ],
  };

  const socialLinks = [
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@nuniglobalc",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "#",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-charcoal text-cream pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Nuni Global" className="h-10 w-10 rounded-full object-cover" />
              <span className="font-serif font-semibold text-lg">
                NUNI GLOBAL
              </span>
            </div>
            <p className="text-sm text-cream/60 leading-relaxed mb-4">
              {t.footer.tagline}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-cream/10 rounded-full flex items-center justify-center text-cream/60 hover:bg-cream/20 hover:text-cream transition-all duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-cream mb-4">{t.footer.products}</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-cream/60 hover:text-cream transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-cream mb-4">{t.footer.company}</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="text-sm text-cream/60 hover:text-cream transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-sm text-cream/60 hover:text-cream transition-colors"
                    >
                      {link.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-cream mb-4">{t.footer.support}</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      className="text-sm text-cream/60 hover:text-cream transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-sm text-cream/60 hover:text-cream transition-colors"
                    >
                      {link.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cream/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-cream/60">
              © {currentYear} Nuni Global. {t.footer.copyright}
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy-policy"
                className="text-sm text-cream/60 hover:text-cream transition-colors"
              >
                {t.footer.privacyPolicy}
              </Link>
              <Link
                to="/terms-of-service"
                className="text-sm text-cream/60 hover:text-cream transition-colors"
              >
                {t.footer.termsOfService}
              </Link>
            </div>
          </div>
          <div className="text-center mt-6">
            <a
              href="https://wa.me/233245817973"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cream/40 hover:text-cream/70 transition-colors"
            >
              {t.footer.designedBy}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
