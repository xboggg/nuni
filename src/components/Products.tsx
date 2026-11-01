import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import PullToRefresh from "./PullToRefresh";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useLanguage } from "@/lib/i18n";
import { apiGet } from "@/lib/adminApi";

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
  image: string | null;
}

const Products = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [refreshKey, setRefreshKey] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [apiProducts, setApiProducts] = useState<ApiProduct[]>([]);
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    apiGet("products")
      .then((data: ApiProduct[]) => setApiProducts(data))
      .catch(() => setApiProducts([]));
  }, []);

  const autoplay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const categoryTranslations: Record<string, string> = {
    Moisturizing: t.productDetail.categoryMoisturizing,
    Cleansing: t.productDetail.categoryCleansing,
    Treatment: t.productDetail.categoryTreatment,
  };
  const badgeTranslations: Record<string, string> = {
    New: t.productDetail.newBadge,
    Bestseller: t.productDetail.bestsellerBadge,
  };

  const translatedProducts: Product[] = apiProducts.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    benefits: product.benefits,
    usage: product.usage,
    ingredients: product.ingredients,
    sizes: product.sizes,
    category: categoryTranslations[product.category] ?? product.category,
    badge: product.badge ? badgeTranslations[product.badge] ?? product.badge : product.badge,
    image: product.image || "",
  }));

  const handleViewDetails = (product: Product) => {
    // Navigate to dedicated product page
    navigate(`/products/${product.id}`);
  };

  const handleRefresh = useCallback(async () => {
    try {
      const data: ApiProduct[] = await apiGet("products");
      setApiProducts(data);
    } catch {
      // Keep showing whatever was previously loaded.
    }
    setRefreshKey(prev => prev + 1);
  }, []);

  const onApiChange = useCallback((newApi: CarouselApi) => {
    setApi(newApi);
    if (!newApi) return;

    const update = () => {
      setCanScrollPrev(newApi.canScrollPrev());
      setCanScrollNext(newApi.canScrollNext());
    };

    update();
    newApi.on("select", update);
    newApi.on("reInit", update);
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
          <div key={refreshKey} className="relative">
            <Carousel
              setApi={onApiChange}
              opts={{ align: "start", loop: true }}
              plugins={[autoplay.current]}
              className="w-full"
            >
              <CarouselContent className="-ml-4 md:-ml-6">
                {translatedProducts.map((product, index) => (
                  <CarouselItem
                    key={product.id}
                    className="pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <ProductCard
                      product={product}
                      productImage={product.image}
                      onViewDetails={handleViewDetails}
                      index={index}
                      isInView={isInView}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Slide arrows - small & transparent, sit over the product image */}
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Previous product"
              className="absolute left-2 top-32 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/40 backdrop-blur-sm text-foreground shadow-sm transition-opacity hover:bg-white/60 disabled:opacity-0 disabled:pointer-events-none"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Next product"
              className="absolute right-2 top-32 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/40 backdrop-blur-sm text-foreground shadow-sm transition-opacity hover:bg-white/60 disabled:opacity-0 disabled:pointer-events-none"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </PullToRefresh>
      </div>
    </section>
  );
};

export default Products;
