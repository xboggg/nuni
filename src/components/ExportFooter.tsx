import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const ExportFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { name: "Raw Shea Butter", href: "/export/shea-butter" },
      { name: "Raw Cocoa Powder", href: "/export/cocoa" },
      { name: "African Black Soap", href: "/export/black-soap" },
    ],
    company: [
      { name: "About Kofi Ideas", href: "/export" },
      { name: "Our Process", href: "/export/process" },
      { name: "All Products", href: "/export/products" },
      { name: "Contact", href: "/export/contact" },
    ],
    support: [
      { name: "Request Quote", href: "/export/contact" },
      { name: "Shipping Info", href: "/export/process" },
      { name: "Quality Certifications", href: "/export/process" },
    ],
  };

  return (
    <footer className="bg-[#0a1810] text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <span className="font-serif font-bold text-xl text-white">
                KOFI IDEAS
              </span>
              <p className="text-amber-400 text-sm font-medium">IMPORTS & EXPORTS</p>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Premium Ghanaian raw materials for global businesses. Shea butter, cocoa, and African black soap - ethically sourced, quality certified.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+233554753634"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-amber-400 transition-colors"
              >
                <Phone size={16} />
                +233 55 475 3634
              </a>
              <a
                href="mailto:Kofiideas2017@gmail.com"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-amber-400 transition-colors"
              >
                <Mail size={16} />
                Kofiideas2017@gmail.com
              </a>
              <div className="flex items-start gap-2 text-sm text-white/70">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>Ablekuma Agape, GC-161-2675, Accra</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-white mb-4">Products</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/60 hover:text-amber-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/60 hover:text-amber-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/60 hover:text-amber-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors"
              >
                ← Back to Nuni Skincare
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60">
              © {currentYear} Kofi Ideas Import & Export. All rights reserved.
            </p>
            <a
              href="https://wa.me/233245817973"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Designed by <span className="text-amber-400 hover:text-amber-300">NovaStream</span>
            </a>
            <div className="flex items-center gap-6">
              <Link
                to="/privacy-policy"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ExportFooter;
