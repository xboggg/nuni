import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import ExportNavigation from "@/components/ExportNavigation";
import ExportFooter from "@/components/ExportFooter";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ExportContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    product: "",
    quantity: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*New Export Inquiry*%0A%0A*Name:* ${formData.name}%0A*Company:* ${formData.company}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Country:* ${formData.country}%0A*Product:* ${formData.product}%0A*Quantity:* ${formData.quantity}%0A%0A*Message:*%0A${formData.message}`;
    window.open(`https://wa.me/233554753634?text=${message}`, "_blank");
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone / WhatsApp",
      value: "+233 55 475 3634",
      secondary: "+233 54 050 1872",
      href: "tel:+233554753634",
    },
    {
      icon: Mail,
      title: "Email",
      value: "Kofiideas2017@gmail.com",
      href: "mailto:Kofiideas2017@gmail.com",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Ablekuma Agape, GC-161-2675",
      secondary: "Accra, Ghana",
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: "Mon - Sat: 8:00 AM - 6:00 PM",
      secondary: "GMT+0",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1f17]">
      <SEO
        title="Contact Us - Export Inquiry | Kofi Ideas Export"
        description="Get in touch for export inquiries, pricing, and orders. Contact Kofi Ideas Import & Export for premium Ghanaian raw materials."
        keywords="contact Ghana export, export inquiry, Ghana raw materials contact, shea butter supplier contact"
        url="/export/contact"
      />
      <ExportNavigation />

      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-[#1a3a2a] to-[#0f1f17]">
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
              Get a <span className="text-amber-400">Quote</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Ready to import premium Ghanaian raw materials? Fill out the form below or contact us
              directly. We respond to all inquiries within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#0f1f17]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-serif font-bold text-white mb-6">Contact Information</h2>

              {contactInfo.map((info) => (
                <div key={info.title} className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <info.icon size={22} className="text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">{info.title}</h3>
                    {info.href ? (
                      <a href={info.href} className="text-white/60 hover:text-amber-400 transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white/60">{info.value}</p>
                    )}
                    {info.secondary && <p className="text-white/40 text-sm">{info.secondary}</p>}
                  </div>
                </div>
              ))}

              {/* Quick WhatsApp */}
              <div className="pt-6">
                <a
                  href="https://wa.me/233554753634?text=Hello!%20I'm%20interested%20in%20your%20export%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-xl font-semibold transition-colors"
                >
                  <MessageCircle size={20} />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-[#1a3a2a] rounded-2xl p-8">
                <h2 className="text-2xl font-serif font-bold text-white mb-6">Send an Inquiry</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-white/80 mb-2 block">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-amber-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company" className="text-white/80 mb-2 block">Company Name</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-amber-500"
                        placeholder="Your company"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email" className="text-white/80 mb-2 block">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-amber-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-white/80 mb-2 block">Phone / WhatsApp *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-amber-500"
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="country" className="text-white/80 mb-2 block">Country *</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-amber-500"
                        placeholder="Your country"
                      />
                    </div>
                    <div>
                      <Label htmlFor="product" className="text-white/80 mb-2 block">Product Interest *</Label>
                      <select
                        id="product"
                        name="product"
                        value={formData.product}
                        onChange={handleChange}
                        required
                        className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white focus:border-amber-500 focus:outline-none"
                      >
                        <option value="" className="bg-[#1a3a2a]">Select a product</option>
                        <option value="Shea Butter" className="bg-[#1a3a2a]">Raw Shea Butter</option>
                        <option value="Cocoa Powder" className="bg-[#1a3a2a]">Raw Cocoa Powder</option>
                        <option value="Black Soap" className="bg-[#1a3a2a]">African Black Soap</option>
                        <option value="Multiple Products" className="bg-[#1a3a2a]">Multiple Products</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="quantity" className="text-white/80 mb-2 block">Estimated Quantity</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-amber-500"
                      placeholder="e.g., 500kg, 1 container, etc."
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white/80 mb-2 block">Additional Details</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-amber-500 resize-none"
                      placeholder="Tell us more about your requirements, packaging preferences, delivery timeline, etc."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white py-6 rounded-xl text-lg font-semibold"
                  >
                    <Send size={20} className="mr-2" />
                    Send Inquiry via WhatsApp
                  </Button>

                  <p className="text-white/40 text-sm text-center">
                    By submitting this form, your inquiry will be sent to us via WhatsApp for faster response.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ExportFooter />
    </div>
  );
};

export default ExportContact;
