import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ExportNavigation from "@/components/ExportNavigation";
import ExportFooter from "@/components/ExportFooter";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

import sheaButterBanner from "@/assets/export/shea-butter-banner.jpg";
import cocoaBanner from "@/assets/export/cocoa-banner.jpg";
import blackSoapBanner from "@/assets/export/black-soap-banner.jpg";

const ExportProducts = () => {
  const products = [
    {
      id: "shea-butter",
      name: "Raw Shea Butter",
      description: "Premium unrefined shea butter from Northern Ghana. Cold-pressed, Grade A quality, rich in vitamins A & E. Perfect for cosmetic manufacturing, skincare formulations, and pharmaceutical preparations.",
      image: sheaButterBanner,
      href: "/export/shea-butter",
      origin: "Northern Ghana",
      minOrder: "100kg",
      packaging: ["25kg cartons", "50kg drums", "200kg drums"],
    },
    {
      id: "cocoa",
      name: "Raw Cocoa Powder",
      description: "High-quality Ghanaian cocoa powder from the Ashanti Region. Available in natural, alkalized, and Dutch-processed varieties. Ideal for chocolate, confectionery, bakery, and beverage production.",
      image: cocoaBanner,
      href: "/export/cocoa",
      origin: "Ashanti Region",
      minOrder: "12,000kg",
      packaging: ["12kg drums", "24kg drums"],
    },
    {
      id: "black-soap",
      name: "African Black Soap",
      description: "Traditional handcrafted black soap made with plantain ash, cocoa pod, and palm kernel oil. 100% natural with no chemical additives. Available in bars, paste, or liquid form.",
      image: blackSoapBanner,
      href: "/export/black-soap",
      origin: "Ghana",
      minOrder: "100kg",
      packaging: ["Bulk bars", "Paste buckets", "Custom packaging"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1f17]">
      <SEO
        title="Export Products - Shea Butter, Cocoa, Black Soap | Kofi Ideas"
        description="View our full range of export products: raw shea butter, cocoa powder, and African black soap. Premium quality from Ghana with worldwide shipping."
        keywords="Ghana export products, shea butter wholesale, cocoa powder export, African black soap bulk"
        url="/export/products"
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
              Our <span className="text-amber-400">Products</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Premium Ghanaian raw materials sourced directly from local farmers and producers.
              All products meet international quality standards and are ready for export.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 bg-[#0f1f17]">
        <div className="container-custom">
          <div className="space-y-16">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <Link to={product.href} className="block group">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded-full">
                          {product.origin}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                    {product.name}
                  </h2>
                  <p className="text-white/70 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <div className="bg-[#1a3a2a] p-4 rounded-xl">
                      <p className="text-white/50 text-sm mb-1">Minimum Order</p>
                      <p className="text-white font-semibold">{product.minOrder}</p>
                    </div>
                    <div className="bg-[#1a3a2a] p-4 rounded-xl">
                      <p className="text-white/50 text-sm mb-1">Packaging</p>
                      <p className="text-white font-semibold text-sm">{product.packaging.join(", ")}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link to={product.href}>
                      <Button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-semibold">
                        View Details
                        <ArrowRight size={18} className="ml-2" />
                      </Button>
                    </Link>
                    <Link to="/export/contact">
                      <Button variant="outline" className="border-amber-500 text-amber-400 hover:bg-amber-500/20 px-6 py-3 rounded-full font-semibold">
                        Get Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1a3a2a]">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Need Custom Products?
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              We can source additional Ghanaian products based on your requirements.
              Contact us to discuss your specific needs.
            </p>
            <Link to="/export/contact">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold">
                Contact Us
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <ExportFooter />
    </div>
  );
};

export default ExportProducts;
