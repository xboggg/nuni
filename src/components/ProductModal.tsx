import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Droplets, Leaf } from "lucide-react";
import { useState, useEffect } from "react";
import { Product, getWhatsAppLink, getProductOrderMessage } from "@/data/products";
import hero1 from "@/assets/hero-1.jpeg";
import hero3 from "@/assets/hero-3.jpeg";
import hero4 from "@/assets/hero-4.png";

const productImages: Record<string, string> = {
  "hero-1": hero1,
  "hero-3": hero3,
  "hero-4": hero4,
};

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const tabs = [
  { id: "benefits", label: "Benefits", icon: Check },
  { id: "usage", label: "How to Use", icon: Droplets },
  { id: "ingredients", label: "Ingredients", icon: Leaf },
];

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const [activeTab, setActiveTab] = useState("benefits");
  const [selectedSize, setSelectedSize] = useState<string>("");

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setActiveTab("benefits");
    }
  }, [product]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!product) return null;

  const handleOrder = () => {
    const message = getProductOrderMessage(product.name, selectedSize);
    window.open(getWhatsAppLink(message), "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-3xl max-h-[90vh] bg-card rounded-3xl shadow-elevated overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-background transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
              {/* Image */}
              <div className="md:w-2/5 flex-shrink-0">
                <div className="relative h-64 md:h-full">
                  <img
                    src={productImages[product.image]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        product.badge === "Bestseller"
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}>
                        {product.badge}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="md:w-3/5 p-6 md:p-8">
                <span className="text-xs font-medium tracking-widest text-accent uppercase">
                  {product.category}
                </span>
                <h3 className="mt-2 text-2xl md:text-3xl font-serif font-bold text-foreground">
                  {product.name}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                {/* Size Selection */}
                <div className="mt-6">
                  <p className="text-sm font-medium text-foreground mb-3">
                    Select Size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          selectedSize === size
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground hover:bg-muted/80"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tabs */}
                <div className="mt-6">
                  <div className="flex gap-1 p-1 bg-muted rounded-xl">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                          activeTab === tab.id
                            ? "bg-card text-foreground shadow-soft"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <tab.icon size={16} />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 min-h-[150px]">
                    <AnimatePresence mode="wait">
                      {activeTab === "benefits" && (
                        <motion.ul
                          key="benefits"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-2"
                        >
                          {product.benefits.map((benefit, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-3 text-sm text-muted-foreground"
                            >
                              <Check
                                size={16}
                                className="text-secondary flex-shrink-0 mt-0.5"
                              />
                              {benefit}
                            </li>
                          ))}
                        </motion.ul>
                      )}

                      {activeTab === "usage" && (
                        <motion.div
                          key="usage"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {product.usage}
                          </p>
                        </motion.div>
                      )}

                      {activeTab === "ingredients" && (
                        <motion.div
                          key="ingredients"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex flex-wrap gap-2"
                        >
                          {product.ingredients?.map((ingredient, index) => (
                            <span
                              key={index}
                              className="px-3 py-1.5 bg-muted rounded-full text-sm text-foreground"
                            >
                              {ingredient}
                            </span>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Order Button */}
                <button
                  onClick={handleOrder}
                  className="mt-6 w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-green hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Order on WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
