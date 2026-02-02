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
    // About
    about: {
      subtitle: "Our Story",
      title: "From Nature",
      titleHighlight: "To You",
      description: "At Nuni Global, we believe that nature holds the key to radiant, healthy skin. Our products blend centuries-old African botanical wisdom with modern skincare science, creating premium formulas that deliver real results. Every ingredient is carefully sourced and crafted right here in Ghana, bringing you the authentic power of African beauty traditions.",
      features: {
        fdaApproved: "FDA Approved",
        fdaDesc: "All products certified by Ghana FDA for safety and quality",
        natural: "100% Natural",
        naturalDesc: "Pure African botanicals with no harsh chemicals",
        allSkinTypes: "All Skin Types",
        allSkinTypesDesc: "Gentle formulas suitable for every skin type",
        visibleResults: "Visible Results",
        visibleResultsDesc: "See improvement in your skin within weeks",
      },
    },
    // Products
    products: {
      subtitle: "Our Collection",
      title: "Premium",
      titleHighlight: "Skincare",
      titleEnd: "Products",
      description: "Each product is carefully formulated with the finest African botanicals to deliver visible results for all skin types.",
      viewDetails: "View Details",
    },
    // Benefits
    benefits: {
      subtitle: "Why Choose Us",
      title: "The Nuni Global",
      titleHighlight: "Difference",
      description: "What sets us apart is our unwavering commitment to quality, nature, and your skin's health.",
      items: {
        fdaCertified: "FDA Certified",
        fdaCertifiedDesc: "All Nuni Global products are approved by the Ghana Food and Drugs Authority, ensuring the highest standards of safety and quality.",
        natural: "100% Natural",
        naturalDesc: "We use only pure African botanicals and natural ingredients. No harsh chemicals, parabens, or artificial additives in any of our products.",
        visibleResults: "Visible Results",
        visibleResultsDesc: "Our customers see real improvements in their skin within weeks. From clearer complexion to faded dark spots, the results speak for themselves.",
        forEveryone: "For Everyone",
        forEveryoneDesc: "Our gentle yet effective formulas are suitable for all skin types and ages. From teenagers to adults, everyone can benefit from Nuni Global.",
      },
    },
    // How It Works
    howItWorks: {
      subtitle: "Simple Process",
      title: "How It Works",
      description: "Getting your favorite Nuni Global products is easy. Just three simple steps to radiant, healthy skin.",
      step1Title: "Choose Your Products",
      step1Desc: "Browse our collection of premium African skincare products. Each formulated with 100% natural ingredients.",
      step2Title: "Order via WhatsApp",
      step2Desc: "Simply send us a message on WhatsApp. We'll confirm your order and answer any questions you have.",
      step3Title: "Delivered to You",
      step3Desc: "Fast delivery across Ghana and beyond. Your skincare journey begins at your doorstep.",
      cta: "Start Shopping Now",
    },
    // Stats
    stats: {
      happyCustomers: "Happy Customers",
      naturalIngredients: "Natural Ingredients",
      yearsExcellence: "Years of Excellence",
      customerSatisfaction: "Customer Satisfaction",
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
      securePayments: "Secure Payments",
    },
    // Sticky Bar
    stickyBar: {
      text: "Ready to transform your skin?",
      cta: "Order Now",
    },
    // Footer
    footer: {
      tagline: "Premium African skincare crafted with 100% natural ingredients. From Nature To You.",
      products: "Products",
      company: "Company",
      support: "Support",
      about: "About",
      gallery: "Gallery",
      partners: "Partners",
      contact: "Contact",
      faq: "FAQ",
      shipping: "Shipping",
      returns: "Returns",
      copyright: "All rights reserved.",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      designedBy: "Designed by NovaStream",
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
    // About
    about: {
      subtitle: "Notre Histoire",
      title: "De la Nature",
      titleHighlight: "À Vous",
      description: "Chez Nuni Global, nous croyons que la nature détient la clé d'une peau radieuse et saine. Nos produits allient la sagesse séculaire des plantes africaines à la science moderne des soins de la peau, créant des formules premium qui donnent de vrais résultats. Chaque ingrédient est soigneusement sélectionné et fabriqué ici au Ghana, vous apportant le pouvoir authentique des traditions de beauté africaines.",
      features: {
        fdaApproved: "Approuvé FDA",
        fdaDesc: "Tous les produits certifiés par la FDA du Ghana pour la sécurité et la qualité",
        natural: "100% Naturel",
        naturalDesc: "Plantes africaines pures sans produits chimiques agressifs",
        allSkinTypes: "Tous Types de Peau",
        allSkinTypesDesc: "Formules douces adaptées à tous les types de peau",
        visibleResults: "Résultats Visibles",
        visibleResultsDesc: "Voyez l'amélioration de votre peau en quelques semaines",
      },
    },
    // Products
    products: {
      subtitle: "Notre Collection",
      title: "Produits",
      titleHighlight: "Soins",
      titleEnd: "Premium",
      description: "Chaque produit est soigneusement formulé avec les meilleurs ingrédients botaniques africains pour des résultats visibles sur tous les types de peau.",
      viewDetails: "Voir Détails",
    },
    // Benefits
    benefits: {
      subtitle: "Pourquoi Nous Choisir",
      title: "La Différence",
      titleHighlight: "Nuni Global",
      description: "Ce qui nous distingue, c'est notre engagement indéfectible envers la qualité, la nature et la santé de votre peau.",
      items: {
        fdaCertified: "Certifié FDA",
        fdaCertifiedDesc: "Tous les produits Nuni Global sont approuvés par l'Autorité Ghanéenne des Aliments et Médicaments, garantissant les plus hauts standards de sécurité et de qualité.",
        natural: "100% Naturel",
        naturalDesc: "Nous utilisons uniquement des plantes africaines pures et des ingrédients naturels. Aucun produit chimique agressif, parabènes ou additifs artificiels.",
        visibleResults: "Résultats Visibles",
        visibleResultsDesc: "Nos clients voient de vraies améliorations de leur peau en quelques semaines. Du teint plus clair aux taches atténuées, les résultats parlent d'eux-mêmes.",
        forEveryone: "Pour Tous",
        forEveryoneDesc: "Nos formules douces mais efficaces conviennent à tous les types de peau et tous les âges. Des adolescents aux adultes, tout le monde peut bénéficier de Nuni Global.",
      },
    },
    // How It Works
    howItWorks: {
      subtitle: "Processus Simple",
      title: "Comment Ça Marche",
      description: "Obtenir vos produits Nuni Global préférés est facile. Juste trois étapes simples vers une peau radieuse et saine.",
      step1Title: "Choisissez Vos Produits",
      step1Desc: "Parcourez notre collection de soins africains premium. Chacun formulé avec des ingrédients 100% naturels.",
      step2Title: "Commandez via WhatsApp",
      step2Desc: "Envoyez-nous simplement un message sur WhatsApp. Nous confirmerons votre commande et répondrons à vos questions.",
      step3Title: "Livré Chez Vous",
      step3Desc: "Livraison rapide au Ghana et au-delà. Votre voyage beauté commence à votre porte.",
      cta: "Commencer Maintenant",
    },
    // Stats
    stats: {
      happyCustomers: "Clients Satisfaits",
      naturalIngredients: "Ingrédients Naturels",
      yearsExcellence: "Années d'Excellence",
      customerSatisfaction: "Satisfaction Client",
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
      securePayments: "Paiements Sécurisés",
    },
    // Sticky Bar
    stickyBar: {
      text: "Prêt à transformer votre peau?",
      cta: "Commander",
    },
    // Footer
    footer: {
      tagline: "Soins africains premium formulés avec des ingrédients 100% naturels. De la Nature À Vous.",
      products: "Produits",
      company: "Entreprise",
      support: "Support",
      about: "À Propos",
      gallery: "Galerie",
      partners: "Partenaires",
      contact: "Contact",
      faq: "FAQ",
      shipping: "Livraison",
      returns: "Retours",
      copyright: "Tous droits réservés.",
      privacyPolicy: "Politique de Confidentialité",
      termsOfService: "Conditions d'Utilisation",
      designedBy: "Conçu par NovaStream",
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
    // About
    about: {
      subtitle: "Yɛn Asɛm",
      title: "Firi Abɔdeɛ Mu",
      titleHighlight: "Ba Wo Nkyɛn",
      description: "Wɔ Nuni Global, yegyedi sɛ abɔdeɛ kura safoa a ɛbɛma honam ayɛ fɛ ne apɔmuden. Yɛn nneɛma de Afrika afifide nimdeɛ a edi mfe pii bɔ abɔ skincare nyansahu a ɛwɔ seesei, na yɛyɛ formulas titiriw a ɛma nsunsuansoɔ ankasa. Nneɛma biara wɔpɛpɛw mu yiye na wɔyɛ wɔ Ghana ha, de Afrika ahoɔfɛ amammere tumi ankasa brɛ wo.",
      features: {
        fdaApproved: "FDA Apene So",
        fdaDesc: "Nneɛma nyinaa wɔahyɛ ama Ghana FDA ama ahobanbɔ ne quality",
        natural: "100% Ankasa",
        naturalDesc: "Afrika afifide kronkron a chemical bɔne biara nni mu",
        allSkinTypes: "Honam Ahorow Nyinaa",
        allSkinTypesDesc: "Formulas a ɛyɛ dɛ a ɛfata honam ahorow nyinaa",
        visibleResults: "Nsunsuansoɔ A Wuhu",
        visibleResultsDesc: "Hu sɛnea wo honam yɛ yie wɔ nnawɔtwe kakraa mu",
      },
    },
    // Products
    products: {
      subtitle: "Yɛn Nneɛma",
      title: "Skincare",
      titleHighlight: "Nneɛma",
      titleEnd: "Titiriw",
      description: "Nneɛma biara wɔayɛ no yiye de Afrika afifide papa a ɛde nsunsuansoɔ a wuhu brɛ honam ahorow nyinaa.",
      viewDetails: "Hwɛ Nsɛm",
    },
    // Benefits
    benefits: {
      subtitle: "Adɛn Nti Na Wopɛ Yɛn",
      title: "Nuni Global",
      titleHighlight: "Nsonsonoeɛ",
      description: "Deɛ ɛma yɛyɛ soronko ne sɛ yɛde yɛn ho hyɛ quality, abɔdeɛ, ne wo honam apɔmuden mu.",
      items: {
        fdaCertified: "FDA Ahyɛ Mu",
        fdaCertifiedDesc: "Nuni Global nneɛma nyinaa Ghana Food and Drugs Authority apene so, ɛhyɛ da sɛ ahobanbɔ ne quality wɔ soro.",
        natural: "100% Ankasa",
        naturalDesc: "Yɛde Afrika afifide kronkron ne nneɛma a ɛfiri asase so nko ara. Chemical bɔne biara anaa parabens nni yɛn nneɛma mu.",
        visibleResults: "Nsunsuansoɔ A Wuhu",
        visibleResultsDesc: "Yɛn adefodeɛ hu sɛnea wɔn honam yɛ yie wɔ nnawɔtwe kakraa mu. Firi ani ho te kɔ dark spots a ɛyera, nsunsuansoɔ no ka wɔn ankasa ho asɛm.",
        forEveryone: "Ma Obiara",
        forEveryoneDesc: "Yɛn formulas a ɛyɛ dɛ nanso ɛyɛ adwuma fata honam ahorow nyinaa ne mfeɛ nyinaa. Firi mmabunu kɔ mpanyimfoɔ, obiara betumi anya mfaso firi Nuni Global.",
      },
    },
    // How It Works
    howItWorks: {
      subtitle: "Ɔkwan A Ɛnyɛ Den",
      title: "Sɛnea Ɛyɛ Adwuma",
      description: "Wo Nuni Global nneɛma a wopɛ no nya yɛ mmerɛw. Anammɔn mmiɛnsa nko ara de wo kɔ honam a ɛhyerɛn ne apɔmuden.",
      step1Title: "Yi Wo Nneɛma",
      step1Desc: "Hwehwɛ yɛn Afrika skincare nneɛma titiriw no mu. Biara wɔde nneɛma 100% ankasa ayɛ.",
      step2Title: "Tɔ Firi WhatsApp",
      step2Desc: "Mena yɛn nkra wɔ WhatsApp so. Yɛbɛhyɛ wo order mu na yɛayi wo nsɛmmisa nyinaa ano.",
      step3Title: "Wɔde Brɛ Wo",
      step3Desc: "Delivery ntɛm wɔ Ghana nyinaa ne akwankyere. Wo skincare akwantu fi wo ɛpon ano.",
      cta: "Fi Ase Tɔ Seesei",
    },
    // Stats
    stats: {
      happyCustomers: "Adefodeɛ A Wɔn Ani Gye",
      naturalIngredients: "Nneɛma Ankasa",
      yearsExcellence: "Mfeɛ A Yɛayɛ Yie",
      customerSatisfaction: "Adefodeɛ Ani Gye",
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
      securePayments: "Tua Ka A Ɛbɔ Ho Ban",
    },
    // Sticky Bar
    stickyBar: {
      text: "Wuasiesie wo ho sɛ wubɛsesa wo honam?",
      cta: "Tɔ Seesei",
    },
    // Footer
    footer: {
      tagline: "Afrika honam nhweren titiriw a wɔde nneɛma 100% ankasa ayɛ. Firi Abɔdeɛ Mu Ba Wo Nkyɛn.",
      products: "Nneɛma",
      company: "Kɔmpani",
      support: "Mmoa",
      about: "Fa Ho",
      gallery: "Mfonini",
      partners: "Ayɔnkofoɔ",
      contact: "Di Nsawosoo",
      faq: "Nsɛmmisa",
      shipping: "Soma",
      returns: "San Bra",
      copyright: "Hokwan nyinaa wɔ hɔ.",
      privacyPolicy: "Kokoamsɛm Nhyehyɛe",
      termsOfService: "Dwumadie Mmara",
      designedBy: "NovaStream Na Ɔyɛɛ",
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
