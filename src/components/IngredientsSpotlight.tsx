import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Sparkles, Flame } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const IngredientsSpotlight = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const ingredients = [
    {
      key: "shea" as const,
      icon: Leaf,
      color: "from-primary/20 to-secondary/10",
      accentColor: "text-primary",
      bgAccent: "bg-primary/10",
    },
    {
      key: "cocoa" as const,
      icon: Sparkles,
      color: "from-accent/20 to-amber-100/50",
      accentColor: "text-accent",
      bgAccent: "bg-accent/10",
    },
    {
      key: "charcoal" as const,
      icon: Flame,
      color: "from-charcoal/10 to-slate-100/50",
      accentColor: "text-charcoal",
      bgAccent: "bg-charcoal/10",
    },
  ];

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
            {t.ingredients.subtitle}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6"
          >
            {t.ingredients.title} <span className="text-gradient-green">{t.ingredients.titleHighlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {t.ingredients.description}
          </motion.p>
        </div>

        {/* Ingredient Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {ingredients.map((ingredient, index) => {
            const ingredientData = t.ingredients[ingredient.key];
            return (
              <motion.div
                key={ingredient.key}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="group relative"
              >
                <div
                  className={`relative h-full bg-gradient-to-br ${ingredient.color} rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:shadow-card`}
                >
                  {/* Decorative circles */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-card/30 rounded-full blur-2xl" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-card/20 rounded-full blur-xl" />

                  {/* Icon */}
                  <div
                    className={`relative w-16 h-16 ${ingredient.bgAccent} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <ingredient.icon size={32} className={ingredient.accentColor} />
                  </div>

                  {/* Name & Origin */}
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                    {ingredientData.name}
                  </h3>
                  <span className="inline-block text-xs font-medium text-muted-foreground bg-card/50 px-3 py-1 rounded-full mb-4">
                    {ingredientData.origin}
                  </span>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {ingredientData.description}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-2">
                    {ingredientData.benefits.map((benefit: string) => (
                      <div
                        key={benefit}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${ingredient.accentColor} bg-current`}
                        />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-sm">
            {t.ingredients.bottomNote}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default IngredientsSpotlight;
