import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { ShoppingBag, MessageCircle, Truck, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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

  const steps = [
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      step: "01",
      title: t.howItWorks.step1Title,
      description: t.howItWorks.step1Desc,
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      step: "02",
      title: t.howItWorks.step2Title,
      description: t.howItWorks.step2Desc,
    },
    {
      icon: <Truck className="w-8 h-8" />,
      step: "03",
      title: t.howItWorks.step3Title,
      description: t.howItWorks.step3Desc,
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium tracking-widest text-accent uppercase mb-4">
            {t.howItWorks.subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            {t.howItWorks.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.howItWorks.description}
          </p>
        </motion.div>

        {/* Steps - desktop grid */}
        <div ref={ref} className="relative hidden md:block">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.7,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="relative"
              >
                <div className="bg-card rounded-3xl p-8 text-center shadow-soft border border-border relative z-10 hover:shadow-elevated transition-shadow duration-300">
                  {/* Step Number */}
                  <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl mb-6 shadow-green"
                    whileHover={{
                      rotate: 360,
                      scale: 1.1
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {step.icon}
                    </motion.div>
                  </motion.div>

                  {/* Step Badge */}
                  <motion.div
                    className="absolute -top-3 -right-3 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-gold"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ delay: index * 0.2 + 0.4, type: "spring" }}
                  >
                    <span className="text-xs font-bold text-accent-foreground">
                      {step.step}
                    </span>
                  </motion.div>

                  <motion.h3
                    className="text-xl font-serif font-bold text-foreground mb-3"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p
                    className="text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.2 + 0.4 }}
                  >
                    {step.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Steps - mobile carousel */}
        <div className="relative md:hidden">
          <Carousel setApi={onApiChange} opts={{ align: "start", loop: false }} className="w-full">
            <CarouselContent className="-ml-4">
              {steps.map((step, index) => (
                <CarouselItem key={index} className="pl-4 basis-full">
                  <div className="bg-card rounded-3xl p-8 text-center shadow-soft border border-border relative">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl mb-6 shadow-green">
                      {step.icon}
                    </div>

                    <div className="absolute top-6 right-6 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-gold">
                      <span className="text-xs font-bold text-accent-foreground">
                        {step.step}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Slide arrows - small & transparent */}
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label="Previous step"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/40 backdrop-blur-sm text-foreground shadow-sm transition-opacity hover:bg-white/60 disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Next step"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/40 backdrop-blur-sm text-foreground shadow-sm transition-opacity hover:bg-white/60 disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://wa.me/233540501872?text=Hello%20Nuni%20Global!%20I'm%20interested%20in%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-green hover:scale-105"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t.howItWorks.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
