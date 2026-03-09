import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Package, Truck, Globe, ArrowRight } from "lucide-react";
import ExportNavigation from "@/components/ExportNavigation";
import ExportFooter from "@/components/ExportFooter";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

import cocoaBanner from "@/assets/export/cocoa-banner.jpg";
import containerLoaded from "@/assets/export/container-loaded-4.jpg";

const ExportCocoa = () => {
  const specifications = [
    { label: "Type", value: "Raw Cocoa Powder" },
    { label: "Varieties", value: "Natural, Alkalized, Dutch-processed" },
    { label: "Fat Content", value: "10-12% / 20-22%" },
    { label: "Color", value: "Light to Dark Brown" },
    { label: "pH Level", value: "5.0-6.0 (Natural) / 7.0-8.0 (Alkalized)" },
    { label: "Moisture", value: "< 5%" },
    { label: "Fineness", value: "99% through 200 mesh" },
    { label: "Shelf Life", value: "24 months" },
  ];

  const packaging = [
    "12kg drums",
    "24kg drums",
    "Minimum order: 12,000kg",
    "Custom packaging available",
  ];

  const applications = [
    "Chocolate manufacturing",
    "Confectionery industry",
    "Bakery products",
    "Beverage production",
    "Cosmetic formulations",
    "Ice cream & dairy",
  ];

  return (
    <div className="min-h-screen bg-[#0f1f17]">
      <SEO
        title="Raw Cocoa Powder Export - Premium Ghanaian Cocoa"
        description="Export premium raw cocoa powder from Ghana's Ashanti Region. Natural, alkalized, and Dutch-processed varieties. Bulk orders with worldwide shipping."
        keywords="cocoa powder export, Ghana cocoa, raw cocoa wholesale, cocoa powder bulk, Ashanti cocoa"
        url="/export/cocoa"
      />
      <ExportNavigation />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-[#1a3a2a] to-[#0f1f17]">
        <div className="container-custom">
          <Link
            to="/export"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Export</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 rounded-full mb-6">
                <span className="text-sm font-medium text-amber-400">Ashanti Region</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                Raw <span className="text-amber-400">Cocoa Powder</span>
              </h1>

              <p className="text-lg text-white/70 leading-relaxed mb-8">
                Premium Ghanaian cocoa powder from the heart of West Africa's cocoa belt.
                Available in natural, alkalized, and Dutch-processed varieties to meet your
                specific manufacturing requirements.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/export/contact">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 rounded-full text-lg font-semibold">
                    Request Quote
                  </Button>
                </Link>
                <a
                  href="https://wa.me/233554753634?text=Hello!%20I'm%20interested%20in%20ordering%20raw%20cocoa%20powder%20for%20export."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="border-2 border-amber-400 text-amber-400 hover:bg-amber-500/20 px-8 py-6 rounded-full text-lg font-semibold">
                    WhatsApp Inquiry
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src={cocoaBanner}
                alt="Raw Cocoa Powder"
                className="w-full rounded-3xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-20 bg-[#0f1f17]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif font-bold text-white mb-8">
                Product <span className="text-amber-400">Specifications</span>
              </h2>

              <div className="bg-[#1a3a2a] rounded-2xl p-6">
                <table className="w-full">
                  <tbody>
                    {specifications.map((spec, index) => (
                      <tr key={spec.label} className={index !== specifications.length - 1 ? "border-b border-white/10" : ""}>
                        <td className="py-4 text-white/60">{spec.label}</td>
                        <td className="py-4 text-white font-medium text-right">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#1a3a2a] rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Package className="text-amber-400" size={24} />
                  <h3 className="text-xl font-semibold text-white">Packaging Options</h3>
                </div>
                <ul className="space-y-3">
                  {packaging.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/70">
                      <Check size={16} className="text-amber-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-[#1a3a2a] rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="text-amber-400" size={24} />
                  <h3 className="text-xl font-semibold text-white">Applications</h3>
                </div>
                <ul className="space-y-3">
                  {applications.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/70">
                      <Check size={16} className="text-amber-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping */}
      <section className="py-20 bg-[#1a3a2a]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={containerLoaded}
                alt="Cocoa ready for shipping"
                className="w-full rounded-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Truck className="text-amber-400" size={28} />
                <h2 className="text-3xl font-serif font-bold text-white">Export Ready</h2>
              </div>
              <p className="text-white/70 leading-relaxed mb-6">
                Ghana is the world's second-largest cocoa producer, and our cocoa powder
                meets the highest international quality standards. We ensure proper storage,
                handling, and shipping to preserve product integrity.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white/70">
                  <Check size={16} className="text-amber-400" />
                  COCOBOD certified
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <Check size={16} className="text-amber-400" />
                  Temperature-controlled shipping available
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <Check size={16} className="text-amber-400" />
                  Full traceability documentation
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <Check size={16} className="text-amber-400" />
                  Sample shipments available
                </li>
              </ul>
              <Link to="/export/contact">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-semibold">
                  Get Shipping Quote
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other Products */}
      <section className="py-20 bg-[#0f1f17]">
        <div className="container-custom">
          <h2 className="text-2xl font-serif font-bold text-white mb-8 text-center">
            Other Export Products
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/export/shea-butter">
              <Button variant="outline" className="border-amber-500 text-amber-400 hover:bg-amber-500/20 rounded-full">
                Raw Shea Butter
              </Button>
            </Link>
            <Link to="/export/black-soap">
              <Button variant="outline" className="border-amber-500 text-amber-400 hover:bg-amber-500/20 rounded-full">
                African Black Soap
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <ExportFooter />
    </div>
  );
};

export default ExportCocoa;
