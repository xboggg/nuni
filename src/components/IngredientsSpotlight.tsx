import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { useHomepageContent, useIngredientImages } from "@/hooks/useHomepageContent";
import sheaButterImg from "@/assets/raw-shea-butter.png";
import cocoaButterImg from "@/assets/cocoa-powder.png";
import charcoalImg from "@/assets/raw-activated-charcoal.jpg";

const AUTO_SLIDE_MS = 5000;

const bundledImages = {
  shea: sheaButterImg,
  cocoa: cocoaButterImg,
  charcoal: charcoalImg,
};

const IngredientsSpotlight = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const ingredientsContent = useHomepageContent("ingredients");
  const adminImages = useIngredientImages();
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const subtitle = ingredientsContent?.subtitle ?? t.ingredients.subtitle;
  const title = ingredientsContent?.title ?? t.ingredients.title;
  const titleHighlight = ingredientsContent?.titleHighlight ?? t.ingredients.titleHighlight;
  const description = ingredientsContent?.description ?? t.ingredients.description;
  const bottomNote = ingredientsContent?.bottomNote ?? t.ingredients.bottomNote;

  const ingredients = [
    {
      key: "shea" as const,
      image: adminImages?.shea || bundledImages.shea,
      swatch: "linear-gradient(145deg, #f3dba8, #c98a3c)",
      accentColor: "text-primary",
    },
    {
      key: "cocoa" as const,
      image: adminImages?.cocoa || bundledImages.cocoa,
      swatch: "linear-gradient(145deg, #8a5a2f, #4a2d12)",
      accentColor: "text-accent",
    },
    {
      key: "charcoal" as const,
      image: adminImages?.charcoal || bundledImages.charcoal,
      swatch: "linear-gradient(145deg, #4a4a4a, #1a1a1a)",
      accentColor: "text-charcoal",
    },
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % ingredients.length);
    }, AUTO_SLIDE_MS);
    return () => clearInterval(timer);
  }, [isPaused, ingredients.length]);

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container-custom">
        {/* Section Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4"
          >
            {subtitle}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6"
          >
            {title} <span className="text-gradient-green">{titleHighlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        </div>

        {/* ============ MOBILE / TABLET (below lg): "Ingredient Ledger" ============ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:hidden max-w-xl mx-auto border-t border-border"
        >
          {ingredients.map((ingredient, index) => {
            const data = ingredientsContent?.[ingredient.key] ?? t.ingredients[ingredient.key];
            return (
              <div key={ingredient.key} className="flex gap-4 items-baseline py-5 border-b border-border">
                <span className="font-serif font-semibold text-sm text-accent w-7 flex-shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <h3 className="font-serif font-bold text-lg text-foreground">{data.name}</h3>
                    <span className="text-xs text-muted-foreground">&mdash; {data.origin}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                    {data.benefits.join(" · ")}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* ============ DESKTOP (lg and up): "Accordion Tabs" ============ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden lg:block max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex gap-2 border-b border-border">
            {ingredients.map((ingredient, index) => {
              const data = ingredientsContent?.[ingredient.key] ?? t.ingredients[ingredient.key];
              const isActive = activeTab === index;
              return (
                <button
                  key={ingredient.key}
                  onClick={() => setActiveTab(index)}
                  className={`relative font-medium text-sm px-6 py-3 transition-colors`}
                >
                  <span className={isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}>
                    {data.name}
                  </span>
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-border" />
                  {isActive && (
                    <motion.span
                      layoutId="ingredient-tab-underline"
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-accent"
                      initial={false}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {ingredients.map((ingredient, index) => {
              if (activeTab !== index) return null;
              const data = ingredientsContent?.[ingredient.key] ?? t.ingredients[ingredient.key];
              return (
                <motion.div
                  key={ingredient.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 gap-12 items-center pt-10"
                >
                  <div>
                    <span className="inline-block text-xs font-semibold tracking-wider uppercase text-accent mb-3">
                      {data.origin}
                    </span>
                    <p className="text-foreground/80 text-[15px] leading-relaxed mb-6">
                      {data.description}
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {data.benefits.map((benefit: string) => (
                        <span key={benefit} className="font-medium text-sm text-foreground flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${ingredient.accentColor} bg-current`} />
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                  {ingredient.image ? (
                    <div className="aspect-square rounded-3xl shadow-card overflow-hidden">
                      <img
                        src={ingredient.image}
                        alt={data.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className="aspect-square rounded-3xl shadow-card"
                      style={{ background: ingredient.swatch }}
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-sm">
            {bottomNote}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default IngredientsSpotlight;
