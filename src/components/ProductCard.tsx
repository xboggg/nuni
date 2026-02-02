import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Product } from "@/data/products";
import { useLanguage } from "@/lib/i18n";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface ProductCardProps {
  product: Product;
  productImage: string;
  onViewDetails: (product: Product) => void;
  index: number;
  isInView: boolean;
}

const ProductCard = ({ product, productImage, onViewDetails, index, isInView }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { t } = useLanguage();

  if (!imageLoaded && !imageError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      >
        <ProductCardSkeleton />
        {/* Hidden image to trigger load */}
        <img
          src={productImage}
          alt=""
          className="hidden"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      className="group bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={productImage}
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
          onClick={() => onViewDetails(product)}
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
  );
};

export default ProductCard;
