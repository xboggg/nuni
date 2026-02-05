import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText, ShoppingCart, Truck, RefreshCw, AlertCircle, Scale, Mail, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import { useLanguage } from "@/lib/i18n";

const TermsOfServicePage = () => {
  const { t } = useLanguage();
  const lastUpdated = "February 5, 2026";

  const sections = [
    {
      icon: ShoppingCart,
      title: t.termsOfService?.ordersPayments || "Orders & Payments",
      content: [
        {
          subtitle: t.termsOfService?.placingOrders || "Placing Orders",
          text: t.termsOfService?.placingOrdersText || "Orders can be placed through our website or via WhatsApp. By placing an order, you confirm that you are at least 18 years old or have parental/guardian consent.",
        },
        {
          subtitle: t.termsOfService?.paymentMethods || "Payment Methods",
          text: t.termsOfService?.paymentMethodsText || "We accept mobile money payments (MTN MoMo, Vodafone Cash, AirtelTigo Money) and cash on delivery for orders within Accra. Payment must be completed before or upon delivery.",
        },
        {
          subtitle: t.termsOfService?.orderConfirmation || "Order Confirmation",
          text: t.termsOfService?.orderConfirmationText || "After placing an order, you will receive a confirmation via WhatsApp. Please review your order details and contact us immediately if there are any errors.",
        },
        {
          subtitle: t.termsOfService?.pricing || "Pricing",
          text: t.termsOfService?.pricingText || "All prices are listed in Ghanaian Cedis (GH₵) and are subject to change without notice. Wholesale pricing is available for bulk orders - contact us for details.",
        },
      ],
    },
    {
      icon: Truck,
      title: t.termsOfService?.shippingDelivery || "Shipping & Delivery",
      content: [
        {
          subtitle: t.termsOfService?.deliveryAreas || "Delivery Areas",
          text: t.termsOfService?.deliveryAreasText || "We currently deliver within Ghana. Delivery times vary depending on your location - typically 1-3 days within Accra and 3-7 days for other regions.",
        },
        {
          subtitle: t.termsOfService?.shippingCosts || "Shipping Costs",
          text: t.termsOfService?.shippingCostsText || "Shipping costs are calculated based on your location and order size. We may offer free shipping on orders above a certain amount - check with us for current promotions.",
        },
        {
          subtitle: t.termsOfService?.deliveryResponsibility || "Delivery Responsibility",
          text: t.termsOfService?.deliveryResponsibilityText || "Please ensure someone is available to receive your order at the delivery address. If delivery fails due to incorrect address or unavailability, additional delivery charges may apply.",
        },
      ],
    },
    {
      icon: RefreshCw,
      title: t.termsOfService?.returnsRefunds || "Returns & Refunds",
      content: [
        {
          subtitle: t.termsOfService?.returnPolicy || "Return Policy",
          text: t.termsOfService?.returnPolicyText || "Due to the nature of skincare products, we cannot accept returns of opened products. Unopened products may be returned within 7 days of delivery in their original packaging.",
        },
        {
          subtitle: t.termsOfService?.damagedProducts || "Damaged Products",
          text: t.termsOfService?.damagedProductsText || "If you receive a damaged or defective product, please contact us within 48 hours of delivery with photos of the damage. We will arrange a replacement or refund.",
        },
        {
          subtitle: t.termsOfService?.refundProcess || "Refund Process",
          text: t.termsOfService?.refundProcessText || "Approved refunds will be processed within 7-14 business days via the original payment method. Shipping costs are non-refundable unless the return is due to our error.",
        },
      ],
    },
    {
      icon: AlertCircle,
      title: t.termsOfService?.productUse || "Product Use & Disclaimer",
      content: [
        {
          subtitle: t.termsOfService?.intendedUse || "Intended Use",
          text: t.termsOfService?.intendedUseText || "Our products are intended for external use only. Always read product labels and instructions before use. Perform a patch test before applying any new skincare product.",
        },
        {
          subtitle: t.termsOfService?.individualResults || "Individual Results",
          text: t.termsOfService?.individualResultsText || "Results may vary from person to person. The testimonials and before/after photos on our website represent individual experiences and are not guarantees of specific results.",
        },
        {
          subtitle: t.termsOfService?.allergies || "Allergies & Sensitivities",
          text: t.termsOfService?.allergiesText || "If you have known allergies or skin sensitivities, please review product ingredients before purchase. Discontinue use if irritation occurs and consult a dermatologist.",
        },
        {
          subtitle: t.termsOfService?.medicalAdvice || "Medical Advice",
          text: t.termsOfService?.medicalAdviceText || "Our products are not intended to diagnose, treat, cure, or prevent any disease. For serious skin conditions, please consult a qualified healthcare professional.",
        },
      ],
    },
    {
      icon: Scale,
      title: t.termsOfService?.intellectualProperty || "Intellectual Property",
      content: [
        {
          subtitle: t.termsOfService?.trademarks || "Trademarks",
          text: t.termsOfService?.trademarksText || "Nuni Global, our logo, and product names are trademarks of Nuni Global. You may not use these without our written permission.",
        },
        {
          subtitle: t.termsOfService?.content || "Content",
          text: t.termsOfService?.contentText || "All content on this website, including text, images, and videos, is the property of Nuni Global and protected by copyright laws. Unauthorized use is prohibited.",
        },
        {
          subtitle: t.termsOfService?.userContent || "User Content",
          text: t.termsOfService?.userContentText || "By submitting testimonials, reviews, or photos to us, you grant Nuni Global permission to use this content for marketing purposes.",
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
                <span className="text-foreground">{t.footer?.termsOfService || "Terms of Service"}</span>
              </nav>

              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText size={32} className="text-primary" />
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
                {t.termsOfService?.title || "Terms of"} <span className="text-gradient-green">{t.termsOfService?.titleHighlight || "Service"}</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                {t.termsOfService?.description || "Please read these terms carefully before using our website or purchasing our products."}
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                {t.termsOfService?.lastUpdated || "Last updated"}: {lastUpdated}
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
                  {t.termsOfService?.agreementTitle || "Agreement to Terms"}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t.termsOfService?.agreementText1 || "By accessing our website or making a purchase from Nuni Global, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services."}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t.termsOfService?.agreementText2 || "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of our services after any changes indicates your acceptance of the new terms."}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Terms Sections */}
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

        {/* Limitation of Liability */}
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
                  {t.termsOfService?.limitationLiability || "Limitation of Liability"}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t.termsOfService?.limitationText1 || "Nuni Global shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our products or services."}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t.termsOfService?.limitationText2 || "Our total liability to you for any claim arising from these terms or your use of our products shall not exceed the amount you paid for the product giving rise to the claim."}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Governing Law */}
        <section className="py-12 bg-muted/30">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-soft">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                  {t.termsOfService?.governingLaw || "Governing Law"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t.termsOfService?.governingLawText || "These Terms of Service shall be governed by and construed in accordance with the laws of the Republic of Ghana. Any disputes arising from these terms shall be resolved through the appropriate courts in Ghana."}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                {t.termsOfService?.questions || "Questions About These Terms?"}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t.termsOfService?.questionsText || "If you have any questions about our Terms of Service, please don't hesitate to contact us."}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="mailto:Kofiideas2017@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
                >
                  <Mail size={18} />
                  {t.termsOfService?.emailUs || "Email Us"}
                </a>
                <a
                  href="https://wa.me/233554753634"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-full font-medium hover:bg-[#20BA5A] transition-colors"
                >
                  <Phone size={18} />
                  {t.termsOfService?.whatsAppUs || "WhatsApp Us"}
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

export default TermsOfServicePage;
