import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Package, Truck, Globe, ArrowRight } from "lucide-react";
import ExportNavigation from "@/components/ExportNavigation";
import ExportFooter from "@/components/ExportFooter";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

import blackSoapBanner from "@/assets/export/black-soap-banner.jpg";
import containerLoaded from "@/assets/export/container-loading-2.jpg";

const ExportBlackSoap = () => {
  const specifications = [
    { label: "Type", value: "Traditional African Black Soap" },
    { label: "Form", value: "Solid bars, Paste, Liquid" },
    { label: "Color", value: "Dark Brown to Black" },
    { label: "Key Ingredients", value: "Plantain ash, Cocoa pod, Palm kernel oil" },
    { label: "pH Level", value: "8.5-10" },
    { label: "Handcrafted", value: "Yes - Traditional methods" },
    { label: "Additives", value: "None - 100% Natural" },
    { label: "Shelf Life", value: "36 months" },
  ];

  const packaging = [
    "Bulk bars (various weights)",
    "Paste form in buckets",
    "25kg cartons",
    "50kg drums",
    "Custom retail packaging",
    "Private label options",
  ];

  const applications = [
    "Skincare products",
    "Acne treatment formulations",
    "Natural body cleansers",
    "Hair care products",
    "Spa & wellness centers",
    "Retail distribution",
  ];

  return (
    <div className="min-h-screen bg-[#0f1f17]">
      <SEO
        title="African Black Soap Export - Traditional Ghanaian Black Soap"
        description="Export authentic African black soap from Ghana. Handcrafted using traditional methods. Bulk orders, wholesale pricing, worldwide shipping available."
        keywords="African black soap export, Ghana black soap wholesale, traditional black soap bulk, natural black soap export"
        url="/export/black-soap"
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
                <span className="text-sm font-medium text-amber-400">Handcrafted in Ghana</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                African <span className="text-amber-400">Black Soap</span>
              </h1>

              <p className="text-lg text-white/70 leading-relaxed mb-8">
                Authentic traditional African black soap made using centuries-old recipes.
                Handcrafted with plantain ash, cocoa pod, and palm kernel oil - 100% natural
                with no chemical additives.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/export/contact">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 rounded-full text-lg font-semibold">
                    Request Quote
                  </Button>
                </Link>
                <a
                  href="https://wa.me/233554753634?text=Hello!%20I'm%20interested%20in%20ordering%20African%20black%20soap%20for%20export."
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
                src={blackSoapBanner}
                alt="African Black Soap"
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
                alt="Black soap ready for shipping"
                className="w-full h-80 object-cover rounded-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Truck className="text-amber-400" size={28} />
                <h2 className="text-3xl font-serif font-bold text-white">Worldwide Delivery</h2>
              </div>
              <p className="text-white/70 leading-relaxed mb-6">
                Our African black soap is carefully packaged to maintain its natural properties
                during transit. We export to every country and work with reliable logistics
                partners to ensure timely delivery.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white/70">
                  <Check size={16} className="text-amber-400" />
                  Available in bars, paste, or liquid form
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <Check size={16} className="text-amber-400" />
                  Minimum order: 100kg
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <Check size={16} className="text-amber-400" />
                  White label manufacturing available
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <Check size={16} className="text-amber-400" />
                  Product safety certifications provided
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
            <Link to="/export/cocoa">
              <Button variant="outline" className="border-amber-500 text-amber-400 hover:bg-amber-500/20 rounded-full">
                Raw Cocoa Powder
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <ExportFooter />
    </div>
  );
};

export default ExportBlackSoap;
