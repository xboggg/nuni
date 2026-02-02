import { motion } from "framer-motion";
import { Shield, Leaf, Award, Truck, Lock } from "lucide-react";

const badges = [
  {
    icon: <Shield className="w-6 h-6" />,
    label: "FDA Approved",
  },
  {
    icon: <Award className="w-6 h-6" />,
    label: "Made in Ghana",
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    label: "100% Natural",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    label: "Secure Ordering",
  },
  {
    icon: <Truck className="w-6 h-6" />,
    label: "Fast Delivery",
  },
];

const TrustBadges = () => {
  return (
    <section className="py-8 bg-muted/50 border-y border-border overflow-hidden">
      <div className="relative">
        {/* Scrolling Container */}
        <motion.div
          animate={{
            x: [0, -1000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
          className="flex gap-12 whitespace-nowrap"
        >
          {/* Duplicate badges for seamless loop */}
          {[...badges, ...badges, ...badges, ...badges].map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-6 py-2"
            >
              <div className="text-primary">{badge.icon}</div>
              <span className="text-sm font-medium text-foreground">
                {badge.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBadges;
