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
import { useLanguage } from "@/lib/i18n";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const getContactMethods = (t: any) => [
  {
    icon: Phone,
    title: t.contactPage.phoneWhatsApp,
    value: "+233 55 475 3634",
    href: "tel:+233554753634",
    whatsappHref: getWhatsAppLink("Hello! I'd like to inquire about your products."),
    isWhatsApp: true,
    callLabel: t.contactPage.call,
    whatsappLabel: t.contactPage.whatsApp,
  },
  {
    icon: Mail,
    title: t.contactPage.email,
    value: "Kofiideas2017@gmail.com",
    href: "mailto:Kofiideas2017@gmail.com",
    isWhatsApp: false,
    linkLabel: t.contactPage.emailUs,
  },
  {
    icon: MapPin,
    title: t.contactPage.locationLabel,
    value: "Accra, Ghana",
    href: "#",
    isWhatsApp: false,
    linkLabel: t.contactPage.viewLocation,
  },
];

const getInterestOptions = (t: any) => [
  { value: "buying", label: t.contactPage.buyingProducts },
  { value: "wholesale", label: t.contactPage.wholesaleReseller },
  { value: "partnership", label: t.contactPage.partnership },
  { value: "other", label: t.contactPage.other },
];

const ContactPage = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
    message: "",
  });

  const contactMethods = getContactMethods(t);
  const interestOptions = getInterestOptions(t);

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
                  {t.contactPage.breadcrumbHome}
                </Link>
                <span>/</span>
                <span className="text-foreground">{t.contactPage.breadcrumbContact}</span>
              </nav>

              <span className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4">
                {t.contactPage.badge}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
                {t.contactPage.title} <span className="text-gradient-green">{t.contactPage.titleHighlight}</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                {t.contactPage.description}
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
              {contactMethods.map((method, index) => (
                <div
                  key={method.title + index}
                  className="group p-6 bg-card rounded-2xl shadow-soft hover:shadow-card transition-all duration-300 text-center"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <method.icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {method.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{method.value}</p>

                  {method.isWhatsApp ? (
                    <div className="flex flex-col gap-2">
                      <a
                        href={method.href}
                        className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        <Phone size={14} />
                        {method.callLabel}
                      </a>
                      <a
                        href={method.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-3 py-2 bg-[#25D366] text-white rounded-lg text-xs font-medium hover:bg-[#20BA5A] transition-colors"
                      >
                        <WhatsAppIcon />
                        {method.whatsappLabel}
                      </a>
                    </div>
                  ) : (
                    <a
                      href={method.href}
                      className="inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      {method.linkLabel}
                    </a>
                  )}
                </div>
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
                  {t.contactPage.sendMessage}
                </h2>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {t.contactPage.name} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      placeholder={t.contactPage.yourName}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {t.contactPage.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      placeholder={t.contactPage.yourEmail}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="interest"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    {t.contactPage.interestedIn}
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none cursor-pointer"
                  >
                    <option value="">{t.common.selectOption}</option>
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
                    {t.contactPage.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    placeholder={t.contactPage.messagePlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-green hover:scale-[1.02]"
                >
                  <Send size={20} />
                  {t.common.sendViaWhatsApp}
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
                {t.contactPage.faqBadge}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
                {t.contactPage.faqTitle} <span className="text-gradient-green">{t.contactPage.faqTitleHighlight}</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.contactPage.faqDescription}
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
