import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { products, Product } from "@/data/products";
import ProductCard from "./ProductCard";
import PullToRefresh from "./PullToRefresh";
import { useLanguage } from "@/lib/i18n";
import product1 from "@/assets/product-1.png";
import product2 from "@/assets/product-2.png";
import product3 from "@/assets/product-3.png";

const productImages: Record<string, string> = {
  "product-1": product1,
  "product-2": product2,
  "product-3": product3,
};

const Products = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [refreshKey, setRefreshKey] = useState(0);
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleViewDetails = (product: Product) => {
    // Navigate to dedicated product page
    navigate(`/products/${product.id}`);
  };

  const handleRefresh = useCallback(async () => {
    // Simulate refresh - in real app this would fetch new data
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshKey(prev => prev + 1);
  }, []);


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

        {/* Product Cards with Pull to Refresh */}
        <PullToRefresh onRefresh={handleRefresh}>
          <div key={refreshKey} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                productImage={productImages[product.image]}
                onViewDetails={handleViewDetails}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </PullToRefresh>
      </div>
    </section>
  );
};

export default Products;
