import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Check, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import NotFound from "@/pages/NotFound";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink, getProductOrderMessage } from "@/data/products";
import { useLanguage } from "@/lib/i18n";
import { apiGet } from "@/lib/adminApi";

interface ApiSizePrice {
  retail: number;
  wholesale?: number;
  wholesaleQty?: string;
}

interface ApiProduct {
  id: string;
  name: string;
  category: string;
  badge: string | null;
  description: string;
  benefits: string[];
  usage: string;
  ingredients: string[];
  sizes: string[];
  prices: Record<string, ApiSizePrice>;
  image: string | null;
}

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    apiGet("products")
      .then((data: ApiProduct[]) => {
        const found = data.find((p) => p.id === slug);
        if (!found) {
          setNotFound(true);
          return;
        }
        setProduct(found);
        setSelectedSize(found.sizes[0] || "");
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (notFound || !product) {
    return <NotFound />;
  }

  const price = product.prices[selectedSize]?.retail;

  const handleOrder = () => {
    const message = getProductOrderMessage(product.name, selectedSize, price);
    window.open(getWhatsAppLink(message), "_blank");
  };

  const prices = Object.values(product.prices).map((p) => p.retail).filter((n) => typeof n === "number");
  const lowPrice = prices.length ? Math.min(...prices) : undefined;
  const highPrice = prices.length ? Math.max(...prices) : undefined;

  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: "NG Cosmetics" },
    category: "Skincare",
    ...(lowPrice !== undefined
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "GHS",
            lowPrice,
            highPrice,
            offerCount: prices.length,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${product.name} - NG Cosmetics`}
        description={product.description}
        url={`/products/${product.id}`}
        type="product"
        structuredData={productStructuredData}
      />
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="container-custom">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link to="/#products" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t.productDetail.breadcrumbProducts}
            </Link>
            <span className="text-sm text-muted-foreground mx-2">/</span>
            <span className="text-sm text-foreground">{product.name}</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-card shadow-elevated">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image yet
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {product.category && (
                <div className="mb-4">
                  <span className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-2">
                    {product.category}
                  </span>
                </div>
              )}

              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                {product.name}
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-3">{t.productDetail.selectSize}</h3>
                  <div className="flex gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${
                          selectedSize === size
                            ? "bg-primary text-primary-foreground shadow-green"
                            : "bg-card text-foreground border-2 border-border hover:border-primary"
                        }`}
                      >
                        {size}
                        {product.prices[size]?.retail !== undefined ? ` · GH₵${product.prices[size].retail}` : ""}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Order Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleOrder}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-xl shadow-green hover:shadow-elevated transition-all"
                >
                  {t.productDetail.orderWhatsAppGhana}
                </Button>
              </div>

              {/* View Pricing Link */}
              <Link
                to="/products"
                className="block text-center mt-4 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {t.productDetail.viewAllPricing}
              </Link>

              {/* Benefits */}
              {product.benefits.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-6">{t.productDetail.benefits}</h3>
                  <div className="space-y-3">
                    {product.benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground">{benefit}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* How to Use & Ingredients */}
          {(product.usage || product.ingredients.length > 0) && (
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {product.usage && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-card p-8 rounded-3xl shadow-card"
                >
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-4">{t.productDetail.howToUse}</h3>
                  <p className="text-muted-foreground leading-relaxed">{product.usage}</p>
                </motion.div>
              )}

              {product.ingredients.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-card p-8 rounded-3xl shadow-card"
                >
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-4">{t.productDetail.ingredients}</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
