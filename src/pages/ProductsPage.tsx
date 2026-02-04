import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Package, ShoppingBag, Check, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getWhatsAppLink } from "@/data/products";
import { useLanguage } from "@/lib/i18n";

// Import product images - retail
import soapImage from "@/assets/nuni-darksoap25.jpeg";
import creamImage from "@/assets/nuni-facialacne28.jpeg";
import butterImage from "@/assets/nuni-cocoabutter-product.jpeg";

// Import product images - wholesale
import soapImageWholesale from "@/assets/gallery/nuni-darksoap11.jpeg";
import creamImageWholesale from "@/assets/gallery/nuni-facialacne15.jpeg";
import butterImageWholesale from "@/assets/gallery/nuni-cocoabutter7.jpeg";

interface PriceOption {
  size: string;
  retailPrice: number;
  wholesalePrice: number;
  wholesaleQty: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  wholesaleImage: string;
  prices: PriceOption[];
  features: string[];
}

const products: Product[] = [
  {
    id: "acne-dark-soap",
    name: "Nuni Global Acne Dark Soap",
    description: "A powerful yet gentle soap formulated to combat acne and dark spots. Made with natural African botanicals, this soap deeply cleanses while nourishing your skin, leaving it clear and radiant.",
    image: soapImage,
    wholesaleImage: soapImageWholesale,
    prices: [
      { size: "750g", retailPrice: 170, wholesalePrice: 140, wholesaleQty: "24 in a carton" },
      { size: "500g", retailPrice: 100, wholesalePrice: 80, wholesaleQty: "36 in a carton" },
    ],
    features: [
      "Fights acne and blemishes",
      "Fades dark spots naturally",
      "Deep cleansing formula",
      "100% natural ingredients",
      "FDA approved",
    ],
  },
  {
    id: "acne-facial-cream",
    name: "Nuni Global Acne - Facial & Skin Cream",
    description: "Our premium facial cream targets acne, dark spots, and uneven skin tone. Enriched with natural botanicals, it hydrates deeply while working to reveal your skin's natural glow.",
    image: creamImage,
    wholesaleImage: creamImageWholesale,
    prices: [
      { size: "100ml", retailPrice: 270, wholesalePrice: 240, wholesaleQty: "25 pieces per carton" },
      { size: "50ml", retailPrice: 140, wholesalePrice: 110, wholesaleQty: "36 pieces per carton" },
      { size: "25ml", retailPrice: 80, wholesalePrice: 60, wholesaleQty: "50 in a carton" },
    ],
    features: [
      "Targets acne and dark spots",
      "Evens skin tone",
      "Deep hydration",
      "Non-greasy formula",
      "Suitable for all skin types",
    ],
  },
  {
    id: "cocoa-butter",
    name: "Nuni Global Cocoa Butter",
    description: "Pure Ghanaian cocoa butter blended with nourishing oils to deeply moisturize and protect your skin. Perfect for maintaining soft, supple skin all day long.",
    image: butterImage,
    wholesaleImage: butterImageWholesale,
    prices: [
      { size: "300ml", retailPrice: 150, wholesalePrice: 120, wholesaleQty: "24 in a carton" },
      { size: "180ml", retailPrice: 110, wholesalePrice: 80, wholesaleQty: "24 in a carton" },
    ],
    features: [
      "Deep moisturizing",
      "Rich in vitamins",
      "Natural cocoa scent",
      "Prevents dry skin",
      "Long-lasting hydration",
    ],
  },
];

const ProductsPage = () => {
  const [showWholesale, setShowWholesale] = useState(false);
  const { t } = useLanguage();

  // Wholesale WhatsApp numbers (primary first)
  const WHOLESALE_NUMBERS = ["233554753634", "233540501872"];

  const handleOrderClick = (productName: string, size: string, price: number) => {
    const message = `Hello! I would like to order:\n\nProduct: ${productName}\nSize: ${size}\nPrice: GH₵${price}\n\nPlease confirm availability.`;
    window.open(getWhatsAppLink(message), "_blank");
  };

  const handleWholesaleOrder = (productName: string, phoneNumber: string) => {
    const message = `Hello! I'm interested in wholesale ordering:\n\nProduct: ${productName}\n\nPlease provide wholesale pricing and availability.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
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
              <span className="font-medium">{t.common.backToHome}</span>
            </Link>

            <div className="text-center">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4"
              >
                {t.productsPage.badge}
              </motion.span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4">
                {t.productsPage.title} <span className="text-gradient-gold">{t.productsPage.titleHighlight}</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                {t.productsPage.description}
              </p>

              {/* Price Toggle */}
              <div className="inline-flex items-center bg-card rounded-full p-1 border border-border">
                <button
                  onClick={() => setShowWholesale(false)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    !showWholesale
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ShoppingBag size={16} className="inline mr-2" />
                  {t.productsPage.retailPrices}
                </button>
                <button
                  onClick={() => setShowWholesale(true)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    showWholesale
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Package size={16} className="inline mr-2" />
                  {t.productsPage.wholesalePrices}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="space-y-24">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-3xl overflow-hidden shadow-2xl"
                  >
                    <img
                      src={showWholesale ? product.wholesaleImage : product.image}
                      alt={product.name}
                      className="w-full h-[400px] md:h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </motion.div>

                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
                    {product.name}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-8">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-foreground">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="text-primary" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Pricing Cards */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {product.prices.map((price) => (
                      <div
                        key={price.size}
                        className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-lg transition-all"
                      >
                        <div className="text-sm text-muted-foreground mb-1">{price.size}</div>
                        <div className="text-2xl font-bold text-foreground mb-1">
                          GH₵{showWholesale ? price.wholesalePrice : price.retailPrice}
                        </div>
                        {showWholesale && (
                          <div className="text-xs text-accent mb-3">{price.wholesaleQty}</div>
                        )}
                        <button
                          onClick={() =>
                            handleOrderClick(
                              product.name,
                              price.size,
                              showWholesale ? price.wholesalePrice : price.retailPrice
                            )
                          }
                          className="w-full mt-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary/90 transition-colors"
                        >
                          {t.common.orderNow}
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Wholesale WhatsApp Order Buttons */}
                  {showWholesale && (
                    <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                      <p className="text-sm text-green-800 dark:text-green-200 font-medium mb-3">
                        Order via WhatsApp for wholesale inquiries:
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => handleWholesaleOrder(product.name, WHOLESALE_NUMBERS[0])}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-full hover:bg-green-700 transition-colors"
                        >
                          <MessageCircle size={16} />
                          0554753634 (Primary)
                        </button>
                        <button
                          onClick={() => handleWholesaleOrder(product.name, WHOLESALE_NUMBERS[1])}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-full hover:bg-green-600 transition-colors"
                        >
                          <MessageCircle size={16} />
                          0540501872
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Link to product detail page */}
                  <Link
                    to={`/products/${product.id}`}
                    className="inline-flex items-center gap-2 mt-6 text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    {t.common.viewDetails}
                    <ArrowLeft size={16} className="rotate-180" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wholesale CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/90 to-primary">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Package size={48} className="text-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              {t.productsPage.wholesaleCta} <span className="text-accent">{t.productsPage.wholesaleCtaHighlight}</span>
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              {t.productsPage.wholesaleCtaDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setShowWholesale(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary rounded-full font-semibold transition-all duration-200 hover:bg-white/90 hover:scale-105 cursor-pointer"
              >
                {t.productsPage.viewWholesalePrices}
              </button>
              <Link
                to="/partners"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 text-white rounded-full font-semibold transition-all duration-200 hover:bg-white/30"
              >
                {t.productsPage.becomePartner}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
