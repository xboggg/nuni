import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Package, Globe, Truck, Shield, Leaf, Award, ArrowRight, Play, Phone, Mail } from "lucide-react";
import ExportNavigation from "@/components/ExportNavigation";
import ExportFooter from "@/components/ExportFooter";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

// Import images
import containerLoaded1 from "@/assets/export/container-loaded-1.jpg";
import containerLoaded2 from "@/assets/export/container-loaded-2.jpg";
import shippingPort from "@/assets/export/shipping-port.jpg";
import sheaButterBanner from "@/assets/export/shea-butter-banner.jpg";
import cocoaBanner from "@/assets/export/cocoa-banner.jpg";
import blackSoapBanner from "@/assets/export/black-soap-banner.jpg";
import exportVideo from "@/assets/export/export-video-1.mp4";

const ExportHome = () => {
  const products = [
    {
      id: "shea-butter",
      name: "Raw Shea Butter",
      description: "Premium unrefined shea butter from Northern Ghana. Grade A quality, cold-pressed, rich in vitamins A & E.",
      image: sheaButterBanner,
      href: "/export/shea-butter",
      origin: "Northern Ghana",
    },
    {
      id: "cocoa",
      name: "Raw Cocoa Powder",
      description: "High-quality Ghanaian cocoa powder. Natural, alkalized, and Dutch-processed varieties available.",
      image: cocoaBanner,
      href: "/export/cocoa",
      origin: "Ashanti Region",
    },
    {
      id: "black-soap",
      name: "African Black Soap",
      description: "Traditional handcrafted black soap made with plantain ash, cocoa pod, and palm kernel oil.",
      image: blackSoapBanner,
      href: "/export/black-soap",
      origin: "Ghana",
    },
  ];

  const stats = [
    { value: "10+", label: "Years Experience" },
    { value: "20+", label: "Countries Served" },
    { value: "500+", label: "Containers Shipped" },
    { value: "100%", label: "Quality Guaranteed" },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Quality Certified",
      description: "All products meet international export standards with proper certifications and documentation.",
    },
    {
      icon: Globe,
      title: "Worldwide Shipping",
      description: "We ship to Europe, North America, Asia, Middle East, and beyond via trusted logistics partners.",
    },
    {
      icon: Truck,
      title: "Flexible Quantities",
      description: "From sample orders to full container loads. LCL and FCL shipping options available.",
    },
    {
      icon: Leaf,
      title: "Ethically Sourced",
      description: "Direct partnerships with local farmers ensuring fair trade and sustainable practices.",
    },
    {
      icon: Award,
      title: "Premium Grade",
      description: "Only the finest Grade A products selected for export to maintain our reputation.",
    },
    {
      icon: Package,
      title: "Custom Packaging",
      description: "Private label and custom packaging options available for your brand requirements.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1f17]">
      <SEO
        title="Kofi Ideas Export - Premium Ghanaian Raw Materials"
        description="Export premium raw shea butter, cocoa powder, and African black soap from Ghana. Bulk orders, worldwide shipping, quality certified. Contact us for wholesale pricing."
        keywords="Ghana export, shea butter wholesale, cocoa powder export, African black soap bulk, B2B cosmetics, raw materials Ghana, Kofi Ideas"
        url="/export"
      />
      <ExportNavigation />

      {/* Hero Section with Video */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={exportVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f1f17]/70 via-[#0f1f17]/50 to-[#0f1f17]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-custom text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full mb-6">
              <Package size={18} className="text-amber-400" />
              <span className="text-sm font-medium text-amber-400">Premium B2B Raw Materials</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              Ghana's Finest
              <br />
              <span className="text-amber-400">Natural Resources</span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10">
              Connecting global businesses with premium Ghanaian raw materials.
              Shea butter, cocoa powder, and African black soap - sourced ethically, shipped worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/export/products">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  View Products
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link to="/export/contact">
                <Button variant="outline" className="border-2 border-amber-400 text-amber-400 hover:bg-amber-500/20 px-8 py-6 rounded-full text-lg font-semibold transition-all">
                  Request Quote
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#1a3a2a]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">{stat.value}</div>
                <div className="text-white/60 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 lg:py-32 bg-[#0f1f17]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-medium tracking-widest text-amber-400 uppercase mb-4">
              Our Products
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
              Premium Export <span className="text-amber-400">Materials</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Sourced directly from Ghanaian farmers and producers. Every product meets international quality standards.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Link to={product.href} className="group block">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
                        {product.origin}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-3">
                    {product.description}
                  </p>
                  <span className="inline-flex items-center text-amber-400 text-sm font-medium group-hover:gap-3 transition-all">
                    Learn More <ArrowRight size={16} className="ml-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Gallery */}
      <section className="py-20 bg-[#1a3a2a]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Ready for <span className="text-amber-400">Global Shipping</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Professional packaging and logistics. Your products arrive safely, on time.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="col-span-2 row-span-2"
            >
              <img
                src={containerLoaded1}
                alt="Container loaded with products"
                className="w-full h-full object-cover rounded-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <img
                src={shippingPort}
                alt="Shipping port"
                className="w-full h-full object-cover rounded-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={containerLoaded2}
                alt="Products ready for export"
                className="w-full h-full object-cover rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-32 bg-[#0f1f17]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-medium tracking-widest text-amber-400 uppercase mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
              Your Trusted <span className="text-amber-400">Export Partner</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1a3a2a] p-6 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-all"
              >
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon size={24} className="text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-600 to-amber-700">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
              Ready to Start Importing?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto text-lg">
              Contact us today for pricing, samples, and shipping options. We respond within 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link to="/export/contact">
                <Button className="bg-white text-amber-700 hover:bg-white/90 px-8 py-6 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  Get a Quote
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <a
                href="https://wa.me/233554753634?text=Hello!%20I'm%20interested%20in%20your%20export%20products.%20Please%20send%20me%20more%20information."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="border-2 border-[#0f1f17] text-[#0f1f17] hover:bg-[#0f1f17]/10 px-8 py-6 rounded-full text-lg font-semibold transition-all">
                  WhatsApp Us
                </Button>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80">
              <a href="tel:+233554753634" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={18} />
                +233 55 475 3634
              </a>
              <a href="mailto:Kofiideas2017@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={18} />
                Kofiideas2017@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <ExportFooter />
    </div>
  );
};

export default ExportHome;
