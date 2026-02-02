import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Leaf, Heart, Sparkles } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "FDA Approved",
    description: "All products certified by Ghana FDA for safety and quality",
  },
  {
    icon: Leaf,
    title: "100% Natural",
    description: "Pure African botanicals with no harsh chemicals",
  },
  {
    icon: Heart,
    title: "All Skin Types",
    description: "Gentle formulas suitable for every skin type",
  },
  {
    icon: Sparkles,
    title: "Visible Results",
    description: "See improvement in your skin within weeks",
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 lg:py-32 bg-card">
      <div className="container-custom">
        <div ref={ref} className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4"
          >
            Our Story
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6"
          >
            From Nature <span className="text-gradient-gold">To You</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            At Nuni Global, we believe that nature holds the key to radiant,
            healthy skin. Our products blend centuries-old African botanical
            wisdom with modern skincare science, creating premium formulas that
            deliver real results. Every ingredient is carefully sourced and
            crafted right here in Ghana, bringing you the authentic power of
            African beauty traditions.
          </motion.p>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="group p-6 bg-background rounded-2xl shadow-soft hover:shadow-card transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon size={28} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
