import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Package, Truck, Globe, ArrowRight } from "lucide-react";
import ExportNavigation from "@/components/ExportNavigation";
import ExportFooter from "@/components/ExportFooter";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

import sheaButterBanner from "@/assets/export/shea-butter-banner.jpg";
import containerLoaded from "@/assets/export/container-loaded-3.jpg";

const ExportSheaButter = () => {
  const specifications = [
    { label: "Type", value: "Raw Unrefined Shea Butter" },
    { label: "Grade", value: "Grade A (Premium)" },
    { label: "Color", value: "Ivory to Light Yellow" },
    { label: "Odor", value: "Characteristic Nutty" },
    { label: "Moisture", value: "< 0.05%" },
    { label: "Free Fatty Acid", value: "< 3%" },
    { label: "Peroxide Value", value: "< 10 meq/kg" },
    { label: "Shelf Life", value: "24 months" },
  ];

  const packaging = [
    "25kg cartons",
    "50kg drums",
    "200kg drums",
    "Custom bulk packaging",
    "Private label available",
  ];

  const applications = [
    "Cosmetic manufacturing",
    "Skincare formulations",
    "Hair care products",
    "Soap making",
    "Pharmaceutical preparations",
    "Food industry (cocoa butter alternative)",
  ];

  return (
    <div className="min-h-screen bg-[#0f1f17]">
      <SEO
        title="Raw Shea Butter Export - Premium Grade A from Ghana"
        description="Export premium raw unrefined shea butter from Northern Ghana. Grade A quality, cold-pressed, wholesale pricing. Contact for bulk orders and international shipping."
        keywords="shea butter export, raw shea butter wholesale, Ghana shea butter, unrefined shea butter bulk, Grade A shea butter"
        url="/export/shea-butter"
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
                <span className="text-sm font-medium text-amber-400">Northern Ghana</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                Raw <span className="text-amber-400">Shea Butter</span>
              </h1>

              <p className="text-lg text-white/70 leading-relaxed mb-8">
                Premium unrefined shea butter sourced directly from women's cooperatives in Northern Ghana.
                Our Grade A shea butter is cold-pressed, retaining all natural vitamins and healing properties.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/export/contact">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 rounded-full text-lg font-semibold">
                    Request Quote
                  </Button>
                </Link>
                <a
                  href="https://wa.me/233554753634?text=Hello!%20I'm%20interested%20in%20ordering%20raw%20shea%20butter%20for%20export."
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
                src={sheaButterBanner}
                alt="Raw Shea Butter"
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

      {/* Shipping Image */}
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
                alt="Shea butter ready for shipping"
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
                <h2 className="text-3xl font-serif font-bold text-white">Ready to Ship</h2>
              </div>
              <p className="text-white/70 leading-relaxed mb-6">
                Our shea butter is professionally packaged and ready for international shipping.
                We handle all export documentation, customs clearance, and logistics to ensure
                your order arrives safely and on time.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white/70">
                  <Check size={16} className="text-amber-400" />
                  FOB & CIF shipping terms available
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <Check size={16} className="text-amber-400" />
                  Full container loads (FCL) or LCL
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <Check size={16} className="text-amber-400" />
                  Certificate of Analysis provided
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <Check size={16} className="text-amber-400" />
                  Phytosanitary certificates included
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
            <Link to="/export/cocoa">
              <Button variant="outline" className="border-amber-500 text-amber-400 hover:bg-amber-500/20 rounded-full">
                Raw Cocoa Powder
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

export default ExportSheaButter;
