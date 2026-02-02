import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Leaf, TrendingUp, Users } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "FDA Certified",
    description:
      "All Nuni Global products are approved by the Ghana Food and Drugs Authority, ensuring the highest standards of safety and quality.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Leaf,
    title: "100% Natural",
    description:
      "We use only pure African botanicals and natural ingredients. No harsh chemicals, parabens, or artificial additives in any of our products.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: TrendingUp,
    title: "Visible Results",
    description:
      "Our customers see real improvements in their skin within weeks. From clearer complexion to faded dark spots, the results speak for themselves.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Users,
    title: "For Everyone",
    description:
      "Our gentle yet effective formulas are suitable for all skin types and ages. From teenagers to adults, everyone can benefit from Nuni Global.",
    color: "bg-navy/10 text-navy",
  },
];

const Benefits = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="benefits" className="py-20 lg:py-32 bg-card">
      <div className="container-custom">
        <div ref={ref} className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4"
          >
            Why Choose Us
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6"
          >
            The Nuni Global <span className="text-gradient-gold">Difference</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            What sets us apart is our unwavering commitment to quality, nature,
            and your skin's health.
          </motion.p>
        </div>

        {/* Benefit Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="group p-8 bg-background rounded-3xl shadow-soft hover:shadow-card transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${benefit.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <benefit.icon size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
