import { createContext, useContext } from "react";

export type Language = "en" | "fr" | "tw";

export const translations = {
  en: {
    // Navigation
    nav: {
      about: "About",
      products: "Products",
      benefits: "Benefits",
      gallery: "Gallery",
      partners: "Partners",
      contact: "Contact",
      orderNow: "Order Now",
    },
    // Hero
    hero: {
      badge: "Premium African Skincare",
      headline: "Radiant Skin,",
      headlineHighlight: "Naturally Yours",
      subheadline: "Discover the power of African botanicals. Premium skincare crafted with 100% natural ingredients for visibly healthier, glowing skin.",
      exploreProducts: "Explore Products",
      contactUs: "Contact Us",
      naturalBadge: "100% Natural Ingredients",
    },
    // Trust Badges
    trust: {
      title: "From Nature to You",
      subtitle: "Our Promise",
      fdaApproved: "FDA Approved",
      fdaDesc: "Certified Safe",
      madeInGhana: "Made in Ghana",
      madeInGhanaDesc: "African Excellence",
      natural: "100% Natural",
      naturalDesc: "Pure Ingredients",
      secureOrdering: "Secure Ordering",
      secureOrderingDesc: "Protected Checkout",
      fastDelivery: "Fast Delivery",
      fastDeliveryDesc: "Swift Shipping",
    },
    // Sticky Bar
    stickyBar: {
      text: "Ready to transform your skin?",
      cta: "Order Now",
    },
    // Common
    common: {
      language: "Language",
    },
  },
  fr: {
    // Navigation
    nav: {
      about: "À Propos",
      products: "Produits",
      benefits: "Avantages",
      gallery: "Galerie",
      partners: "Partenaires",
      contact: "Contact",
      orderNow: "Commander",
    },
    // Hero
    hero: {
      badge: "Soins Africains Premium",
      headline: "Une Peau Radieuse,",
      headlineHighlight: "Naturellement Vôtre",
      subheadline: "Découvrez le pouvoir des plantes africaines. Des soins premium formulés avec des ingrédients 100% naturels pour une peau visiblement plus saine et éclatante.",
      exploreProducts: "Découvrir",
      contactUs: "Contactez-Nous",
      naturalBadge: "Ingrédients 100% Naturels",
    },
    // Trust Badges
    trust: {
      title: "De la Nature à Vous",
      subtitle: "Notre Promesse",
      fdaApproved: "Approuvé FDA",
      fdaDesc: "Certifié Sûr",
      madeInGhana: "Fabriqué au Ghana",
      madeInGhanaDesc: "Excellence Africaine",
      natural: "100% Naturel",
      naturalDesc: "Ingrédients Purs",
      secureOrdering: "Commande Sécurisée",
      secureOrderingDesc: "Paiement Protégé",
      fastDelivery: "Livraison Rapide",
      fastDeliveryDesc: "Expédition Swift",
    },
    // Sticky Bar
    stickyBar: {
      text: "Prêt à transformer votre peau?",
      cta: "Commander",
    },
    // Common
    common: {
      language: "Langue",
    },
  },
  tw: {
    // Navigation (Twi)
    nav: {
      about: "Fa Ho",
      products: "Nneɛma",
      benefits: "Mfaso",
      gallery: "Mfonini",
      partners: "Ayɔnkofoɔ",
      contact: "Di Nsawosoo",
      orderNow: "Tɔ Seesei",
    },
    // Hero
    hero: {
      badge: "Afrika Honam Nhweren Titiriw",
      headline: "Honam A Ɛhyerɛn,",
      headlineHighlight: "Wo Dea Ankasa",
      subheadline: "Hwehwɛ Afrika afifide tumi. Nhweren a wɔde nneɛma a ɛfiri asase so ayɛ de ma honam a ɛyɛ fɛ ne a ɛhyerɛn.",
      exploreProducts: "Hwehwɛ Nneɛma",
      contactUs: "Ka Kyerɛ Yɛn",
      naturalBadge: "Nneɛma A Ɛfiri Asase So 100%",
    },
    // Trust Badges
    trust: {
      title: "Firi Abɔdeɛ Mu Ba Wo Nkyɛn",
      subtitle: "Yɛn Bɔhyɛ",
      fdaApproved: "FDA Apene So",
      fdaDesc: "Wɔahyɛ Da Mu Sɛ Ɛyɛ",
      madeInGhana: "Wɔyɛɛ Wɔ Ghana",
      madeInGhanaDesc: "Afrika Nkɔsoɔ",
      natural: "Ankasa 100%",
      naturalDesc: "Nneɛma Kronkron",
      secureOrdering: "Tɔ A Ɛyɛ Safe",
      secureOrderingDesc: "Tua Ka A Ɛbɔ Ho Ban",
      fastDelivery: "De Ba Ntɛm",
      fastDeliveryDesc: "Soma Ntɛm",
    },
    // Sticky Bar
    stickyBar: {
      text: "Wuasiesie wo ho sɛ wubɛsesa wo honam?",
      cta: "Tɔ Seesei",
    },
    // Common
    common: {
      language: "Kasa",
    },
  },
};

export type Translations = typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: translations.en,
});

export const useLanguage = () => useContext(LanguageContext);

export const languageNames: Record<Language, string> = {
  en: "English",
  fr: "Français",
  tw: "Twi",
};
