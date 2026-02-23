import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, Package, Leaf, Globe, Truck, Shield, MessageCircle, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";
import { WHATSAPP_NUMBER } from "@/data/products";

// Import placeholder images - using existing assets
import sheaButterImg from "@/assets/raw-shea-butter.png";
import cocoaPowderImg from "@/assets/cocoa-powder.png";
import blackSoapImg from "@/assets/acne-soap-1.png";

const ExportPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const exportProducts = [
    {
      id: "shea-butter",
      name: t.export?.sheaButter || "Raw Shea Butter",
      description: t.export?.sheaButterDesc || "Premium unrefined shea butter sourced from Northern Ghana. Rich in vitamins A & E, perfect for cosmetic manufacturing and skincare formulations.",
      image: sheaButterImg,
      origin: "Northern Ghana",
      qualities: ["Unrefined", "Grade A", "Cold-pressed"],
      packaging: ["25kg drums", "50kg drums", "Custom bulk"],
    },
    {
      id: "cocoa-powder",
      name: t.export?.cocoaPowder || "Cocoa Powder",
      description: t.export?.cocoaPowderDesc || "High-quality Ghanaian cocoa powder from the Ashanti Region. Ideal for food production, cosmetics, and confectionery industries.",
      image: cocoaPowderImg,
      origin: "Ashanti Region",
      qualities: ["Natural", "Alkalized", "Dutch-processed"],
      packaging: ["25kg bags", "50kg bags", "Container loads"],
    },
    {
      id: "black-soap",
      name: t.export?.blackSoap || "African Black Soap",
      description: t.export?.blackSoapDesc || "Traditional African black soap made with plantain ash, cocoa pod, and palm kernel oil. Authentic recipe passed down through generations.",
      image: blackSoapImg,
      origin: "Ghana",
      qualities: ["Traditional recipe", "Handcrafted", "All-natural"],
      packaging: ["Bulk bars", "Paste form", "Custom sizes"],
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: t.export?.qualityAssured || "Quality Assured",
      description: t.export?.qualityAssuredDesc || "All products meet international export standards and quality certifications.",
    },
    {
      icon: Globe,
      title: t.export?.globalReach || "Global Reach",
      description: t.export?.globalReachDesc || "We ship to Europe, North America, Asia, and beyond with reliable logistics partners.",
    },
    {
      icon: Truck,
      title: t.export?.flexibleShipping || "Flexible Shipping",
      description: t.export?.flexibleShippingDesc || "Container loads, palletized shipments, or smaller quantities to suit your needs.",
    },
    {
      icon: Leaf,
      title: t.export?.sustainablySourced || "Sustainably Sourced",
      description: t.export?.sustainablySourcedDesc || "Direct partnerships with local farmers ensure fair trade and sustainable practices.",
    },
  ];

  const handleInquiry = () => {
    const message = encodeURIComponent(
      "Hello! I'm interested in your B2B raw materials export services. Please send me more information about:\n\n" +
      "- Product(s) of interest:\n" +
      "- Estimated quantity:\n" +
      "- Destination country:\n\n" +
      "Looking forward to your response."
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="B2B Raw Materials Export - Shea Butter, Cocoa, Black Soap"
        description="Export premium Ghanaian raw materials worldwide. Quality shea butter, cocoa powder, and African black soap for cosmetic manufacturers and businesses."
        keywords="Ghana export, shea butter wholesale, cocoa powder export, African black soap bulk, B2B cosmetics, raw materials Ghana"
        url="/export"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-cream">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">{t.common?.backToHome || "Back to Home"}</span>
            </Link>

            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
              >
                <Package size={18} className="text-primary" />
                <span className="text-sm font-medium text-primary">
                  {t.export?.badge || "B2B Raw Materials"}
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4">
                {t.export?.title || "Premium Ghanaian"}{" "}
                <span className="text-gradient-gold">{t.export?.titleHighlight || "Raw Materials"}</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                {t.export?.heroDescription || "NG Cosmetics connects global businesses with Ghana's finest natural resources. We export premium shea butter, cocoa powder, and traditional African black soap to international markets."}
              </p>

              <Button
                onClick={handleInquiry}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-full text-lg font-semibold shadow-green hover:shadow-elevated transition-all"
              >
                <MessageCircle size={20} className="mr-2" />
                {t.export?.inquireNow || "Inquire Now"}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section ref={ref} className="py-20 lg:py-32 bg-card">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4">
              {t.export?.productsSubtitle || "Our Export Products"}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t.export?.productsTitle || "Premium Natural"}{" "}
              <span className="text-gradient-gold">{t.export?.productsTitleHighlight || "Resources"}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.export?.productsDescription || "Sourced directly from Ghanaian farmers and producers, our raw materials meet the highest international quality standards."}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {exportProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-background rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
                      {product.origin}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {product.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      {t.export?.availableQualities || "Available Qualities"}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.qualities.map((quality, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {quality}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      {t.export?.packaging || "Packaging Options"}
                    </h4>
                    <ul className="space-y-1">
                      {product.packaging.map((pkg, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check size={14} className="text-primary" />
                          {pkg}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {t.export?.whyChooseUs || "Why Partner"}{" "}
              <span className="text-gradient-gold">{t.export?.whyChooseUsHighlight || "With Us"}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.export?.whyChooseUsDesc || "We make sourcing premium Ghanaian raw materials simple, reliable, and sustainable."}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-6 rounded-2xl shadow-soft hover:shadow-card transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                  <benefit.icon size={28} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              {t.export?.ctaTitle || "Ready to Source Premium Ghanaian Raw Materials?"}
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              {t.export?.ctaDescription || "Contact us today to discuss your requirements. We offer competitive pricing, reliable shipping, and excellent customer service."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleInquiry}
                className="bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-full font-semibold shadow-lg hover:scale-105 transition-all"
              >
                <MessageCircle size={20} className="mr-2" />
                {t.export?.contactUs || "Contact Us on WhatsApp"}
              </Button>
              <Link
                to="/#about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 text-white rounded-full font-semibold transition-all duration-200 hover:bg-white/30"
              >
                {t.export?.learnMore || "Learn More About NG Cosmetics"}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ExportPage;
