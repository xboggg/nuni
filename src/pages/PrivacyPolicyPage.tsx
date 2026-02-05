import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Lock, Eye, UserCheck, Mail, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import { useLanguage } from "@/lib/i18n";

const PrivacyPolicyPage = () => {
  const { t } = useLanguage();
  const lastUpdated = "February 5, 2026";

  const sections = [
    {
      icon: Eye,
      title: t.privacyPolicy?.infoWeCollect || "Information We Collect",
      content: [
        {
          subtitle: t.privacyPolicy?.personalInfo || "Personal Information",
          text: t.privacyPolicy?.personalInfoText || "When you place an order or contact us, we may collect your name, email address, phone number, and delivery address. This information is necessary to process your orders and communicate with you about your purchases.",
        },
        {
          subtitle: t.privacyPolicy?.communicationData || "Communication Data",
          text: t.privacyPolicy?.communicationDataText || "When you contact us via WhatsApp, phone, or email, we keep records of our conversations to provide better customer service and address any issues with your orders.",
        },
        {
          subtitle: t.privacyPolicy?.websiteUsage || "Website Usage",
          text: t.privacyPolicy?.websiteUsageText || "We may collect non-personal information about how you use our website, including pages visited and time spent on the site, to improve our services and user experience.",
        },
      ],
    },
    {
      icon: Lock,
      title: t.privacyPolicy?.howWeUse || "How We Use Your Information",
      content: [
        {
          subtitle: t.privacyPolicy?.orderProcessing || "Order Processing",
          text: t.privacyPolicy?.orderProcessingText || "Your personal information is used to process and fulfill your orders, including shipping products to your specified address and sending order confirmations.",
        },
        {
          subtitle: t.privacyPolicy?.customerSupport || "Customer Support",
          text: t.privacyPolicy?.customerSupportText || "We use your contact information to respond to your inquiries, provide product information, and resolve any issues with your orders.",
        },
        {
          subtitle: t.privacyPolicy?.productUpdates || "Product Updates",
          text: t.privacyPolicy?.productUpdatesText || "With your consent, we may send you information about new products, special offers, and promotions. You can opt out of these communications at any time.",
        },
      ],
    },
    {
      icon: Shield,
      title: t.privacyPolicy?.howWeProtect || "How We Protect Your Information",
      content: [
        {
          subtitle: t.privacyPolicy?.dataSecurity || "Data Security",
          text: t.privacyPolicy?.dataSecurityText || "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
        },
        {
          subtitle: t.privacyPolicy?.limitedAccess || "Limited Access",
          text: t.privacyPolicy?.limitedAccessText || "Access to your personal information is restricted to authorized personnel who need it to perform their job functions.",
        },
        {
          subtitle: t.privacyPolicy?.noThirdParty || "No Third-Party Sales",
          text: t.privacyPolicy?.noThirdPartyText || "We do not sell, trade, or rent your personal information to third parties. Your data is used solely for the purposes stated in this policy.",
        },
      ],
    },
    {
      icon: UserCheck,
      title: t.privacyPolicy?.yourRights || "Your Rights",
      content: [
        {
          subtitle: t.privacyPolicy?.accessCorrection || "Access & Correction",
          text: t.privacyPolicy?.accessCorrectionText || "You have the right to access your personal information and request corrections if any data is inaccurate or incomplete.",
        },
        {
          subtitle: t.privacyPolicy?.dataDeletion || "Data Deletion",
          text: t.privacyPolicy?.dataDeletionText || "You may request the deletion of your personal data, subject to any legal obligations we may have to retain certain information.",
        },
        {
          subtitle: t.privacyPolicy?.withdrawConsent || "Withdraw Consent",
          text: t.privacyPolicy?.withdrawConsentText || "You can withdraw your consent to receive marketing communications at any time by contacting us or using the opt-out options provided.",
        },
      ],
    },
  ];

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
                  {t.common?.backToHome?.replace("Back to ", "") || "Home"}
                </Link>
                <span>/</span>
                <span className="text-foreground">{t.footer?.privacyPolicy || "Privacy Policy"}</span>
              </nav>

              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield size={32} className="text-primary" />
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
                {t.privacyPolicy?.title || "Privacy"} <span className="text-gradient-green">{t.privacyPolicy?.titleHighlight || "Policy"}</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                {t.privacyPolicy?.description || "Your privacy is important to us. This policy explains how Nuni Global collects, uses, and protects your personal information."}
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                {t.privacyPolicy?.lastUpdated || "Last updated"}: {lastUpdated}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 bg-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-soft">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                  {t.privacyPolicy?.introduction || "Introduction"}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t.privacyPolicy?.introText1 || "Nuni Global (\"we\", \"us\", or \"our\") is committed to protecting your privacy. This Privacy Policy describes how we collect, use, and safeguard your personal information when you visit our website, make a purchase, or contact us."}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t.privacyPolicy?.introText2 || "By using our website and services, you consent to the data practices described in this policy. If you do not agree with our practices, please do not use our services."}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Policy Sections */}
        <section className="py-12 bg-muted/30">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-card rounded-3xl p-8 md:p-10 shadow-soft"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <section.icon size={24} className="text-primary" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-foreground">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {section.content.map((item, idx) => (
                      <div key={idx}>
                        <h3 className="font-semibold text-foreground mb-2">
                          {item.subtitle}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Cookies Section */}
        <section className="py-12 bg-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-soft">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                  {t.privacyPolicy?.cookies || "Cookies & Tracking"}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t.privacyPolicy?.cookiesText1 || "Our website may use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small files stored on your device that help us remember your preferences and understand how you use our site."}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t.privacyPolicy?.cookiesText2 || "You can control cookie settings through your browser. However, disabling cookies may affect certain features of our website."}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-muted/30">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                {t.privacyPolicy?.questions || "Questions About This Policy?"}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t.privacyPolicy?.questionsText || "If you have any questions or concerns about our Privacy Policy, please contact us."}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="mailto:Kofiideas2017@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
                >
                  <Mail size={18} />
                  {t.privacyPolicy?.emailUs || "Email Us"}
                </a>
                <a
                  href="https://wa.me/233554753634"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-full font-medium hover:bg-[#20BA5A] transition-colors"
                >
                  <Phone size={18} />
                  {t.privacyPolicy?.whatsAppUs || "WhatsApp Us"}
                </a>
              </div>
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

export default PrivacyPolicyPage;
