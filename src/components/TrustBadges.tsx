import { motion } from "framer-motion";
import { Shield, Leaf, Award, Truck, Lock, BadgeCheck, CreditCard } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

const TrustBadges = () => {
  const { t } = useLanguage();

  const badges = [
    {
      icon: <Shield className="w-8 h-8" />,
      label: t.trust.fdaApproved,
      description: t.trust.fdaDesc,
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: <Award className="w-8 h-8" />,
      label: t.trust.madeInGhana,
      description: t.trust.madeInGhanaDesc,
      gradient: "from-amber-500 to-yellow-500",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      label: t.trust.natural,
      description: t.trust.naturalDesc,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Lock className="w-8 h-8" />,
      label: t.trust.secureOrdering,
      description: t.trust.secureOrderingDesc,
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      label: t.trust.fastDelivery,
      description: t.trust.fastDeliveryDesc,
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="container-custom">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-3">
            {t.trust.subtitle}
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
            {t.trust.title}
          </h2>
        </motion.div>

        {/* Badge Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="group relative bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-shadow duration-300 border border-border/50 cursor-pointer overflow-hidden"
            >
              {/* Animated background gradient on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              {/* Floating decoration */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon with pulse animation and gradient background */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 bg-gradient-to-br ${badge.gradient} rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg`}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  >
                    {badge.icon}
                  </motion.div>
                </motion.div>

                {/* Label */}
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {badge.label}
                </h3>

                {/* Description */}
                <p className="text-xs text-muted-foreground">
                  {badge.description}
                </p>

                {/* Verified checkmark */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                >
                  <BadgeCheck size={14} className="text-primary-foreground" />
                </motion.div>
              </div>

              {/* Bottom accent line */}
              <motion.div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r ${badge.gradient} rounded-full`}
                initial={{ width: 0 }}
                whileHover={{ width: "60%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Payment Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-6 mt-10 pt-8 border-t border-border/50"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <CreditCard size={20} />
            <span className="text-sm">Secure Payments</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Payment method icons represented as text badges */}
            {["Visa", "Mastercard", "MoMo"].map((method) => (
              <div
                key={method}
                className="px-3 py-1 bg-muted rounded-md text-xs font-medium text-foreground"
              >
                {method}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBadges;
