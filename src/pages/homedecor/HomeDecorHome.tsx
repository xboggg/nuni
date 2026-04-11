import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sofa, Paintbrush, Lamp, Sparkles, Star, ArrowRight, Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

const HomeDecorHome = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    {
      icon: Sofa,
      title: "New Home Decoration & Setup",
      description: "Complete decoration packages for newly built or purchased homes. We bring your vision to life from scratch.",
    },
    {
      icon: Paintbrush,
      title: "Complete Home Styling & Finishing",
      description: "Professional styling and finishing touches that transform ordinary spaces into extraordinary living areas.",
    },
    {
      icon: Sofa,
      title: "Interior Furnishing & Space Arrangement",
      description: "Strategic furniture placement and space planning to maximize comfort and visual appeal.",
    },
    {
      icon: Lamp,
      title: "Curtain, Lighting & Decorative Installations",
      description: "Expert installation of curtains, modern lighting fixtures, and decorative elements for the perfect ambiance.",
    },
    {
      icon: Sparkles,
      title: "Room Transformations",
      description: "Dramatic makeovers for bedrooms, living rooms, and all living areas. Before and after results that wow.",
    },
    {
      icon: Star,
      title: "Luxury Home Touch-Ups & Upgrades",
      description: "Elegant upgrades and finishing touches that elevate your home to the next level of luxury.",
    },
  ];

  const whyChooseUs = [
    "Clean, Modern & Elegant Finishing",
    "Attention to Every Detail",
    "Designs Tailored to Your Lifestyle",
    "Trusted & Professional Service",
  ];

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      <SEO
        title="Kofi Ideas Home Decor - Turning Houses Into Beautiful Homes"
        description="Professional home decoration, interior furnishing, room transformations, and luxury upgrades. We care about turning your house into a beautiful home."
        keywords="home decor Ghana, interior decoration Accra, home styling, room transformation, curtain installation, lighting setup"
        url="/home-decor"
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/95 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/home-decor" className="flex items-center gap-3">
            <span className="font-serif font-bold text-xl text-white">
              KOFI IDEAS
            </span>
            <span className="text-purple-400 text-sm font-medium">HOME DECOR</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-sm text-white/70 hover:text-white transition-colors">Services</a>
            <a href="#why-us" className="text-sm text-white/70 hover:text-white transition-colors">Why Us</a>
            <a href="#contact" className="text-sm text-white/70 hover:text-white transition-colors">Contact</a>
            <Link to="/" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              ← Skincare
            </Link>
            <Link to="/export" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              Export
            </Link>
            <a
              href="https://wa.me/233554753634"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors"
            >
              Get Quote
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />

        {/* Poster as background */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block opacity-20">
          <img
            src="/media/kofi-homedecor-poster.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a1a] to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-sm font-medium tracking-widest text-purple-400 uppercase mb-4">
                Kofi Ideas Home Decor
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                Turning Houses Into{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Beautiful Homes
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/60 mb-8 max-w-2xl leading-relaxed">
                We CARE about your space. From complete home decoration to luxury touch-ups,
                we transform your living spaces into stunning, personalized environments you'll love.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://wa.me/233554753634" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold">
                    Get Free Consultation
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                </a>
                <a href="#services">
                  <Button variant="outline" className="border-2 border-purple-400 text-purple-400 hover:bg-purple-500/20 px-8 py-4 rounded-full text-lg font-semibold">
                    Our Services
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Poster Showcase */}
      <section className="py-20 bg-gradient-to-b from-[#0a0a1a] to-[#1a0a2e]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <img
              src="/media/kofi-homedecor-poster.jpg"
              alt="Kofi Ideas Home Decor Services"
              className="w-full rounded-2xl shadow-2xl shadow-purple-500/10"
            />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-[#1a0a2e]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-medium tracking-widest text-purple-400 uppercase mb-4">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Services</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Comprehensive home decoration and styling services to make your space uniquely yours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                  <service.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-20 bg-gradient-to-b from-[#1a0a2e] to-[#0a0a1a]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-sm font-medium tracking-widest text-purple-400 uppercase mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                We Deliver{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Excellence
                </span>
              </h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                A new home deserves a beautiful beginning — let's create it together.
                We bring professionalism, creativity, and attention to detail to every project.
              </p>
              <div className="space-y-4">
                {whyChooseUs.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-purple-500/20">
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-10 h-10 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">We CARE</h3>
                  <p className="text-purple-300 text-sm mb-6">Creative • Attentive • Reliable • Elegant</p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-2xl font-bold text-purple-400">100+</p>
                      <p className="text-white/50 text-xs">Homes Transformed</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-2xl font-bold text-purple-400">100%</p>
                      <p className="text-white/50 text-xs">Client Satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900/30 to-pink-900/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Ready to Transform Your Home?
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Contact us today for a free consultation. Let's discuss your vision and make it a reality.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/233554753634" target="_blank" rel="noopener noreferrer">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold">
                  WhatsApp Us
                  <Phone size={20} className="ml-2" />
                </Button>
              </a>
              <a href="tel:+233554753634">
                <Button variant="outline" className="border-2 border-purple-400 text-purple-400 hover:bg-purple-500/20 px-8 py-4 rounded-full text-lg font-semibold">
                  Call Now: 0554753634
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-[#0a0a1a]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-white/60">
            <a href="tel:+233554753634" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
              <Phone size={18} />
              0554753634
            </a>
            <a href="mailto:Kofiideas2017@gmail.com" className="flex items-center gap-2 hover:text-purple-400 transition-colors">
              <Mail size={18} />
              Kofiideas2017@gmail.com
            </a>
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              Ablekuma Joma, Accra
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050510] text-white py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">
              © {currentYear} Kofi Ideas Home Decor. All rights reserved.
            </p>
            <a
              href="https://www.novastreamdigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/40 hover:text-white/60 transition-colors"
            >
              Designed by <span className="text-purple-400 hover:text-purple-300">NovaStream</span>
            </a>
            <div className="flex items-center gap-6">
              <Link to="/privacy-policy" className="text-sm text-white/40 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-sm text-white/40 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeDecorHome;
