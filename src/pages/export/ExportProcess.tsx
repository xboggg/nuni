import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, FileText, Package, Truck, CheckCircle, ArrowRight } from "lucide-react";
import ExportNavigation from "@/components/ExportNavigation";
import ExportFooter from "@/components/ExportFooter";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

import containerLoaded from "@/assets/export/container-loaded-1.jpg";
import shippingPort from "@/assets/export/shipping-port.jpg";

const ExportProcess = () => {
  const steps = [
    {
      number: "01",
      icon: MessageCircle,
      title: "Initial Inquiry",
      description: "Contact us via WhatsApp, email, or our contact form. Tell us about your product requirements, quantities needed, and destination country.",
      details: [
        "Product selection assistance",
        "Quantity recommendations",
        "Initial pricing discussion",
        "Sample availability check",
      ],
    },
    {
      number: "02",
      icon: FileText,
      title: "Quotation & Agreement",
      description: "We provide a detailed quotation including product costs, packaging, shipping options, and delivery timeline. Once approved, we proceed with a proforma invoice.",
      details: [
        "Detailed price breakdown",
        "Shipping cost calculation",
        "Payment terms discussion",
        "Proforma invoice issuance",
      ],
    },
    {
      number: "03",
      icon: Package,
      title: "Production & Packaging",
      description: "Upon payment confirmation, we source and prepare your order. Products are carefully packaged according to international export standards.",
      details: [
        "Quality inspection",
        "Custom packaging if required",
        "Certificate of Analysis preparation",
        "Export documentation",
      ],
    },
    {
      number: "04",
      icon: Truck,
      title: "Shipping & Delivery",
      description: "We handle all logistics, customs clearance, and shipping arrangements. Track your shipment in real-time until it arrives at your destination.",
      details: [
        "Customs clearance handling",
        "Bill of Lading preparation",
        "Real-time tracking provided",
        "Delivery confirmation",
      ],
    },
    {
      number: "05",
      icon: CheckCircle,
      title: "After-Sales Support",
      description: "Our relationship doesn't end at delivery. We provide ongoing support, handle any concerns, and help with repeat orders.",
      details: [
        "Quality feedback review",
        "Repeat order assistance",
        "Long-term partnership building",
        "Continuous improvement",
      ],
    },
  ];

  const shippingOptions = [
    {
      title: "FOB (Free on Board)",
      description: "Price includes all costs up to loading the goods onto the ship at Tema Port, Ghana.",
    },
    {
      title: "CIF (Cost, Insurance, Freight)",
      description: "All-inclusive price covering product, insurance, and freight to your destination port.",
    },
    {
      title: "LCL (Less Container Load)",
      description: "Ideal for smaller orders. Share container space with other shipments.",
    },
    {
      title: "FCL (Full Container Load)",
      description: "Dedicated 20ft or 40ft containers for large volume orders.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1f17]">
      <SEO
        title="Export Process - How We Work | Kofi Ideas Export"
        description="Learn about our export process from inquiry to delivery. We handle sourcing, quality control, packaging, documentation, and shipping for Ghanaian raw materials."
        keywords="export process Ghana, how to import from Ghana, Ghana export procedure, shea butter import process"
        url="/export/process"
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
              How We <span className="text-amber-400">Work</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              From initial inquiry to final delivery, we make importing Ghanaian raw materials
              simple and hassle-free. Here's our step-by-step process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-[#0f1f17]">
        <div className="container-custom">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="grid lg:grid-cols-12 gap-8 items-start"
              >
                {/* Step Number */}
                <div className="lg:col-span-2">
                  <div className="text-6xl md:text-8xl font-bold text-amber-500/20">{step.number}</div>
                </div>

                {/* Content */}
                <div className="lg:col-span-10">
                  <div className="bg-[#1a3a2a] rounded-2xl p-8 border border-white/5">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                        <step.icon size={24} className="text-amber-400" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-white/70 leading-relaxed mb-6">{step.description}</p>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-2 text-white/60 text-sm">
                          <CheckCircle size={14} className="text-amber-400 flex-shrink-0" />
                          {detail}
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

      {/* Shipping Images */}
      <section className="py-20 bg-[#1a3a2a]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Professional <span className="text-amber-400">Logistics</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              We partner with leading shipping lines to ensure your products arrive safely and on time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={containerLoaded}
                alt="Loaded container"
                className="w-full h-64 md:h-80 object-cover rounded-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={shippingPort}
                alt="Shipping port"
                className="w-full h-64 md:h-80 object-cover rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-20 bg-[#0f1f17]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Shipping <span className="text-amber-400">Options</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              We offer flexible shipping terms to suit your business needs.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {shippingOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1a3a2a] p-6 rounded-2xl border border-white/5"
              >
                <h3 className="text-lg font-semibold text-amber-400 mb-3">{option.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{option.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-amber-600 to-amber-700">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Contact us today with your requirements. We'll guide you through the entire process.
            </p>
            <Link to="/export/contact">
              <Button className="bg-white text-amber-700 hover:bg-white/90 px-8 py-6 rounded-full text-lg font-semibold shadow-lg">
                Start Your Order
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

export default ExportProcess;
