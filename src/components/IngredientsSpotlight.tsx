import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Leaf, Sparkles, Flame } from "lucide-react";

const ingredients = [
  {
    name: "Shea Butter",
    icon: Leaf,
    color: "from-primary/20 to-secondary/10",
    accentColor: "text-primary",
    bgAccent: "bg-primary/10",
    description:
      "Rich in vitamins A & E, our pure African shea butter deeply moisturizes and restores skin elasticity. Sourced directly from Ghana.",
    benefits: [
      "Deep hydration",
      "Anti-aging properties",
      "Skin healing",
      "Natural UV protection",
    ],
    origin: "Northern Ghana",
  },
  {
    name: "Cocoa Butter",
    icon: Sparkles,
    color: "from-accent/20 to-amber-100/50",
    accentColor: "text-accent",
    bgAccent: "bg-accent/10",
    description:
      "Extracted from premium Ghanaian cocoa beans, our cocoa butter is packed with antioxidants that fight free radicals and nourish skin.",
    benefits: [
      "Rich antioxidants",
      "Stretch mark prevention",
      "Skin smoothing",
      "Natural fragrance",
    ],
    origin: "Ashanti Region",
  },
  {
    name: "Activated Charcoal",
    icon: Flame,
    color: "from-charcoal/10 to-slate-100/50",
    accentColor: "text-charcoal",
    bgAccent: "bg-charcoal/10",
    description:
      "Our activated charcoal draws out impurities, unclogs pores, and detoxifies skin. Perfect for acne-prone and oily skin types.",
    benefits: [
      "Deep pore cleansing",
      "Toxin removal",
      "Oil control",
      "Acne treatment",
    ],
    origin: "Coconut-derived",
  },
];

const IngredientsSpotlight = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            Natural Ingredients
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6"
          >
            The Power of African <span className="text-gradient-green">Botanicals</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            We harness the finest natural ingredients from Ghana, carefully
            selected for their proven skincare benefits.
          </motion.p>
        </div>

        {/* Ingredient Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={ingredient.name}
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
                  {ingredient.name}
                </h3>
                <span className="inline-block text-xs font-medium text-muted-foreground bg-card/50 px-3 py-1 rounded-full mb-4">
                  {ingredient.origin}
                </span>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {ingredient.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2">
                  {ingredient.benefits.map((benefit) => (
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
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-sm">
            All our ingredients are ethically sourced and FDA approved. No harsh
            chemicals, no parabens, no sulfates.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default IngredientsSpotlight;
