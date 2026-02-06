import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink, getProductOrderMessage, productPrices } from "@/data/products";
import acneSoap1 from "@/assets/acne-soap-1.png";
import acneSoap2 from "@/assets/acne-soap-2.jpeg";
import acneSoap3 from "@/assets/acne-soap-3.jpeg";

const ProductAcneSoap = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("500g");

  const productImages = [acneSoap1, acneSoap2, acneSoap3];

  const product = {
    id: "acne-dark-soap",
    name: "Nuni Global Acne Dark Soap",
    category: "Cleansing",
    badge: "Bestseller",
    rating: 4.7,
    reviewCount: 3,
    sizes: ["500g", "750g"],
    description: "Powerful charcoal-based soap with shea butter, coconut oil, and salicylic acid. Fights acne, fades dark spots, and clears razor bumps.",
    benefits: [
      "Fights acne-causing bacteria and reduces inflammation",
      "Fades dark spots and evens out skin tone",
      "Soothes irritated skin and calms redness",
      "Fades stretch marks",
      "Clears razor bumps and dark inner thighs"
    ],
    usage: "Lather in hands, massage on face for 90 seconds, rinse with cool water. Use daily for best results.",
    ingredients: [
      "Activated Charcoal",
      "Raw Shea Butter",
      "Coconut Oil",
      "Salicylic Acid",
      "Palm Kernel Oil",
      "Vitamin E"
    ],
  };

  const reviews = [
    {
      id: 1,
      name: "Akosua M.",
      rating: 5,
      date: "2 weeks ago",
      comment: "This soap has transformed my skin! My dark spots are fading and my acne is finally under control.",
    },
    {
      id: 2,
      name: "Kwame A.",
      rating: 4,
      date: "1 month ago",
      comment: "Great product! Noticed improvement in my razor bumps within the first week.",
    },
    {
      id: 3,
      name: "Ama D.",
      rating: 5,
      date: "3 weeks ago",
      comment: "Best soap I've ever used. Natural ingredients and amazing results!",
    },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const handleOrder = () => {
    const price = productPrices["acne-dark-soap"]?.[selectedSize];
    const message = getProductOrderMessage(product.name, selectedSize, price);
    window.open(getWhatsAppLink(message), "_blank");
  };

  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: "Nuni Global" },
    category: "Skincare",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "GHS",
      lowPrice: 100,
      highPrice: 170,
      offerCount: 2,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Acne Dark Soap - Natural Acne Treatment"
        description="Powerful charcoal-based soap with shea butter, coconut oil, and salicylic acid. Fights acne, fades dark spots, and clears razor bumps. FDA Approved. Made in Ghana."
        keywords="acne soap, dark spot soap, natural acne treatment, charcoal soap, shea butter soap, Ghana skincare"
        url="/products/acne-dark-soap"
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
              Products
            </Link>
            <span className="text-sm text-muted-foreground mx-2">/</span>
            <span className="text-sm text-foreground">{product.name}</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Image Carousel */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-card shadow-elevated">
                {product.badge && (
                  <div className="absolute top-6 left-6 z-10">
                    <span className="inline-block px-4 py-2 bg-accent text-accent-foreground text-sm font-semibold rounded-full shadow-lg">
                      {product.badge}
                    </span>
                  </div>
                )}

                <img
                  src={productImages[currentImageIndex]}
                  alt={`${product.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Carousel Controls */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6 text-primary" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6 text-primary" />
                </button>

                {/* Carousel Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "bg-white w-8"
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? "border-primary shadow-green"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4">
                <span className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-2">
                  {product.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-accent text-accent"
                          : "fill-none text-border"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Size Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-3">Select Size</h3>
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
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Button */}
              <Button
                onClick={handleOrder}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-xl shadow-green hover:shadow-elevated transition-all"
              >
                Order on WhatsApp
              </Button>

              {/* View Pricing Link */}
              <Link
                to="/products"
                className="block text-center mt-4 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                View All Pricing Options
              </Link>

              {/* Benefits */}
              <div className="mt-12">
                <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Benefits</h3>
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
            </motion.div>
          </div>

          {/* How to Use & Ingredients */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card p-8 rounded-3xl shadow-card"
            >
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">How to Use</h3>
              <p className="text-muted-foreground leading-relaxed">{product.usage}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card p-8 rounded-3xl shadow-card"
            >
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Ingredients</h3>
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
          </div>

          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-4xl"
          >
            <h3 className="text-3xl font-serif font-bold text-foreground mb-8">Customer Reviews</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-card p-5 rounded-2xl shadow-card"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground text-sm">{review.name}</h4>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < review.rating
                              ? "fill-accent text-accent"
                              : "fill-none text-border"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{review.comment}</p>
                  <p className="text-xs text-muted-foreground/70 mt-2">{review.date}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductAcneSoap;
