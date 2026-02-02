import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import { getWhatsAppLink, WHATSAPP_NUMBER } from "@/data/products";
import { faqData, categoryLabels } from "@/data/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const contactMethods = [
  {
    icon: Phone,
    title: "Phone",
    value: "+233 54 050 1872",
    href: `tel:+${WHATSAPP_NUMBER}`,
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@nuniglobal.com",
    href: "mailto:info@nuniglobal.com",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Accra, Ghana",
    href: "#",
  },
];

const interestOptions = [
  { value: "buying", label: "Buying Products" },
  { value: "wholesale", label: "Wholesale/Reseller" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const interestLabel =
      interestOptions.find((opt) => opt.value === formData.interest)?.label ||
      formData.interest;

    const whatsappMessage = `Hello Nuni Global!

Name: ${formData.name}
Email: ${formData.email}
Interest: ${interestLabel}

Message: ${formData.message}`;

    window.open(getWhatsAppLink(whatsappMessage), "_blank");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              {/* Breadcrumb */}
              <nav className="flex justify-center items-center gap-2 text-sm text-muted-foreground mb-8">
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
                <span>/</span>
                <span className="text-foreground">Contact</span>
              </nav>

              <span className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4">
                Get in Touch
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
                Contact <span className="text-gradient-green">Us</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Have questions? We'd love to hear from you. Send us a message
                and we'll respond as soon as possible.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-12 bg-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {contactMethods.map((method) => (
                <a
                  key={method.title}
                  href={method.href}
                  className="group p-6 bg-card rounded-2xl shadow-soft hover:shadow-card transition-all duration-300 text-center"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <method.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {method.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{method.value}</p>
                </a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-3xl p-8 md:p-10 shadow-soft"
              >
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6 text-center">
                  Send Us a Message
                </h2>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="interest"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    I'm interested in
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select an option</option>
                    {interestOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-green hover:scale-[1.02]"
                >
                  <Send size={20} />
                  Send via WhatsApp
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4">
                FAQ
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
                Frequently Asked <span className="text-gradient-green">Questions</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about our products, shipping, and
                partnership opportunities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              <Accordion type="single" collapsible className="space-y-4">
                {faqData.map((faq, index) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="bg-card rounded-2xl px-6 shadow-soft border-none"
                  >
                    <AccordionTrigger className="py-5 text-left hover:no-underline group">
                      <div className="flex items-start gap-4 w-full pr-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                faq.category === "products"
                                  ? "bg-primary/10 text-primary"
                                  : faq.category === "shipping"
                                  ? "bg-secondary/20 text-secondary-foreground"
                                  : faq.category === "partnership"
                                  ? "bg-accent/20 text-accent"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {categoryLabels[faq.category]}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                            {faq.question}
                          </h3>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </>
  );
};

export default ContactPage;
