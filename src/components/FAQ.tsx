import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface FAQItem {
  id: string;
  questionKey: string;
  answerKey: string;
  category: "products" | "shipping" | "partnership" | "general";
}

const faqItems: FAQItem[] = [
  { id: "1", questionKey: "q1", answerKey: "a1", category: "products" },
  { id: "2", questionKey: "q2", answerKey: "a2", category: "products" },
  { id: "3", questionKey: "q3", answerKey: "a3", category: "products" },
  { id: "4", questionKey: "q4", answerKey: "a4", category: "shipping" },
  { id: "5", questionKey: "q5", answerKey: "a5", category: "general" },
  { id: "6", questionKey: "q6", answerKey: "a6", category: "products" },
  { id: "7", questionKey: "q7", answerKey: "a7", category: "general" },
  { id: "8", questionKey: "q8", answerKey: "a8", category: "partnership" },
];

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { t } = useLanguage();

  const categories = ["all", "products", "shipping", "partnership", "general"] as const;

  const filteredFAQs =
    activeCategory === "all"
      ? faqItems
      : faqItems.filter((item) => item.category === activeCategory);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 lg:py-32 bg-muted/30">
      <div className="container-custom">
        <div ref={ref} className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4">
              {t.faq.subtitle}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
              {t.faq.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.faq.description}
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-muted"
                }`}
              >
                {t.faq.categories[category as keyof typeof t.faq.categories]}
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {filteredFAQs.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-card rounded-2xl border border-border overflow-hidden shadow-soft"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-center justify-between p-6 text-left group"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        item.category === "products"
                          ? "bg-primary/10 text-primary"
                          : item.category === "shipping"
                          ? "bg-secondary/20 text-secondary-foreground"
                          : item.category === "partnership"
                          ? "bg-accent/20 text-accent-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {t.faq.categories[item.category as keyof typeof t.faq.categories]}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {t.faq.questions[item.questionKey as keyof typeof t.faq.questions]}
                    </h3>
                  </div>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                      openId === item.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                    }`}
                  >
                    {openId === item.id ? (
                      <Minus size={18} />
                    ) : (
                      <Plus size={18} />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="border-t border-border pt-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {t.faq.questions[item.answerKey as keyof typeof t.faq.questions]}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Still Have Questions CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground mb-4">
              {t.faq.stillHaveQuestions}
            </p>
            <a
              href="https://wa.me/233540501872?text=Hello%20Nuni%20Global!%20I%20have%20a%20question%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium transition-all duration-200 hover:shadow-green hover:scale-105"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t.faq.chatWithUs}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
