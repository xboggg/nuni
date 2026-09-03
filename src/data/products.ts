export interface Product {
  id: string;
  name: string;
  category: string;
  badge?: string;
  sizes: string[];
  description: string;
  benefits: string[];
  usage: string;
  ingredients?: string[];
  image: string;
}

export const products: Product[] = [
  {
    id: "acne-dark-soap",
    name: "Acne Dark Soap",
    category: "Cleansing",
    badge: "Bestseller",
    sizes: ["500g", "750g"],
    description: "Powerful charcoal-based soap with shea butter, coconut oil, and salicylic acid. Fights acne, fades dark spots, and clears razor bumps.",
    benefits: [
      "Fights acne-causing bacteria and reduces inflammation",
      "Fades dark spots and evens out skin tone",
      "Soothes irritated skin and calms redness",
      "Fades stretch marks",
      "Clears razor bumps and dark inner thighs"
    ],
    usage: "Lather in hands, massage on face for 90 seconds, rinse with cool water. Use daily for best results.",
    ingredients: [
      "Activated Charcoal",
      "Raw Shea Butter",
      "Coconut Oil",
      "Salicylic Acid",
      "Palm Kernel Oil",
      "Vitamin E"
    ],
    image: "product-1"
  },
  {
    id: "acne-facial-cream",
    name: "Acne Facial & Skin Cream",
    category: "Treatment",
    badge: "New",
    sizes: ["25ml", "50ml", "100ml"],
    description: "Targeted acne treatment with salicylic acid. Reduces breakouts, fades hyperpigmentation, and promotes smoother, unified skin tone.",
    benefits: [
      "Reduces acne and prevents breakouts",
      "Fades dark spots and hyperpigmentation",
      "Reduces stretch marks visibility",
      "Lightens dark inner thighs",
      "Reduces razor bumps"
    ],
    usage: "Apply small amount once or twice daily. Start with test dose for sensitive skin. Avoid eye area.",
    ingredients: [
      "Salicylic Acid",
      "Niacinamide",
      "Aloe Vera Extract",
      "Vitamin C",
      "Hyaluronic Acid",
      "Green Tea Extract"
    ],
    image: "product-2"
  },
  {
    id: "cocoa-butter",
    name: "Cocoa Butter",
    category: "Moisturizing",
    sizes: ["180ml", "300ml"],
    description: "Rich in antioxidants and fatty acids. Deep moisturizing for dry skin, soothes irritation, and fades stretch marks. Safe for babies 6 months+.",
    benefits: [
      "Deep moisturizing for dry areas",
      "Soothes skin irritation",
      "Fades stretch marks effectively",
      "Rich in antioxidants",
      "100% natural — safe for all ages"
    ],
    usage: "Apply generously to clean, damp skin. Massage until absorbed. Can be used multiple times daily.",
    ingredients: [
      "Pure Cocoa Butter",
      "Raw Shea Butter",
      "Sweet Almond Oil",
      "Vitamin E",
      "Jojoba Oil"
    ],
    image: "product-3"
  },
  {
    id: "luxury-body-butter",
    name: "Luxury Body Butter",
    category: "Moisturizing",
    badge: "New",
    sizes: ["150ml", "250ml"],
    description: "Rich, smooth, and luxurious body butter made with 100% natural shea butter. Deeply moisturizes and nourishes for soft, radiant skin every day.",
    benefits: [
      "Intense, long-lasting moisture",
      "Deeply nourishes and repairs dry skin",
      "Protects skin's natural barrier",
      "Rich in antioxidants and Vitamin E",
      "Suitable for all skin types, including sensitive skin"
    ],
    usage: "Apply generously to clean skin, best after bathing. Massage in circular motions until fully absorbed. Use daily for smooth, glowing skin.",
    ingredients: [
      "100% Natural Shea Butter",
      "Natural Oils",
      "Coconut Oil",
      "Vitamin E"
    ],
    image: "luxury-body-butter-1"
  },
  {
    id: "faraway-body-butter",
    name: "Faraway Body Butter",
    category: "Moisturizing",
    badge: "New",
    sizes: ["150ml", "250ml"],
    description: "Rich, smooth, and luxurious body butter with an exotic, long-lasting scent. Deeply moisturizes, softens rough areas, and helps improve skin texture.",
    benefits: [
      "Deeply moisturizes and prevents moisture loss",
      "Softens rough, dry areas like elbows, knees, and heels",
      "Soothes dry, irritated skin",
      "Helps reduce the appearance of stretch marks",
      "Exotic, long-lasting scent"
    ],
    usage: "Apply generously to clean skin, best after bathing. Massage in circular motions until fully absorbed. Use daily for smooth, glowing skin.",
    ingredients: [
      "100% Natural Shea Butter",
      "Natural Oils",
      "Coconut Oil",
      "Vitamin E"
    ],
    image: "faraway-body-butter-1"
  }
];

export const WHATSAPP_NUMBER = "233554753634";
export const WHATSAPP_NUMBER_EUROPE = "447861387824";

export const getWhatsAppLink = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const getWhatsAppLinkEurope = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER_EUROPE}?text=${encodedMessage}`;
};

export const getProductOrderMessage = (productName: string, size?: string, price?: number) => {
  if (size && price) {
    return `Hello! I would like to order:\n\nProduct: ${productName}\nSize: ${size}\nPrice: GH₵${price}\n\nPlease confirm availability and delivery options.`;
  }
  if (size) {
    return `Hello! I would like to order ${productName} (${size}). Please confirm availability and delivery options.`;
  }
  return `Hello! I'm interested in ${productName}. Please let me know the available sizes and delivery options.`;
};

export const getProductOrderMessageEurope = (productName: string) => {
  return `Hello! I'm contacting from Europe and interested in:\n\nProduct: ${productName}\n\nPlease let me know the available sizes, pricing, and delivery options to my location.`;
};

// Price lookup for individual product pages
export const productPrices: Record<string, Record<string, number>> = {
  "acne-dark-soap": { "500g": 100, "750g": 170 },
  "acne-facial-cream": { "25ml": 80, "50ml": 140, "100ml": 270 },
  "cocoa-butter": { "180ml": 110, "300ml": 150 },
  "luxury-body-butter": { "150ml": 70, "250ml": 100 },
  "faraway-body-butter": { "150ml": 70, "250ml": 100 },
};

export const GENERAL_INQUIRY_MESSAGE = "Hello! I'm interested in NG Cosmetics products.";
export const PARTNER_INQUIRY_MESSAGE = "Hello! I'm interested in becoming an NG Cosmetics reseller/partner.";

export const tiktokVideos = [
  "https://www.tiktok.com/@nuniglobalc/video/7596655791784873238",
  "https://www.tiktok.com/@nuniglobalc/photo/7601929990891982102",
  "https://www.tiktok.com/@nuniglobalc/video/7600693618042555670",
  "https://www.tiktok.com/@nuniglobalc/video/7599918059209493762",
  "https://www.tiktok.com/@nuniglobalc/video/7598878796619549974",
  "https://www.tiktok.com/@nuniglobalc/video/7598550244669803798"
];
