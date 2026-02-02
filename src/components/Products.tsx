import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { products, Product } from "@/data/products";
import ProductModal from "./ProductModal";
import { useLanguage } from "@/lib/i18n";
import hero1 from "@/assets/hero-1.jpeg";
import hero3 from "@/assets/hero-3.jpeg";
import hero4 from "@/assets/hero-4.png";

const productImages: Record<string, string> = {
  "hero-1": hero1,
  "hero-3": hero3,
  "hero-4": hero4,
};

const Products = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <section id="products" className="py-20 lg:py-32 bg-background">
      <div className="container-custom">
        <div ref={ref} className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4"
          >
            {t.products.subtitle}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6"
          >
            {t.products.title} <span className="text-gradient-green">{t.products.titleHighlight}</span>{" "}
            {t.products.titleEnd}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            {t.products.description}
          </motion.p>
        </div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="group bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={productImages[product.image]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
                
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        product.badge === "Bestseller"
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Category */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-card/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Sizes */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-foreground"
                    >
                      {size}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleViewDetails(product)}
                  className="w-full flex items-center justify-center gap-2 py-3 border-2 border-primary text-primary rounded-xl font-medium transition-all duration-200 hover:bg-primary hover:text-primary-foreground group"
                >
                  {t.products.viewDetails}
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Products;
