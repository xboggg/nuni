export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "products" | "shipping" | "partnership" | "general";
}

export const faqData: FAQItem[] = [
  {
    id: "1",
    question: "What makes Nuni Global products different?",
    answer: "Our products are crafted with 100% natural African botanicals including shea butter, cocoa butter, and activated charcoal. We combine traditional African skincare wisdom with modern formulation techniques. All our products are FDA approved in Ghana and suitable for all skin types.",
    category: "products",
  },
  {
    id: "2",
    question: "Are your products safe for sensitive skin?",
    answer: "Yes! Our products are formulated with gentle, natural ingredients that are suitable for all skin types, including sensitive skin. We recommend starting with a small test area for the first use. Our Cocoa Butter is especially gentle and even safe for babies 6 months and older.",
    category: "products",
  },
  {
    id: "3",
    question: "How long until I see results?",
    answer: "Most customers notice visible improvements within 2-4 weeks of consistent use. For acne and dark spots, you may see significant changes in 4-6 weeks. Results vary based on individual skin conditions and consistency of use. We recommend using products as directed for best results.",
    category: "products",
  },
  {
    id: "4",
    question: "Do you ship internationally?",
    answer: "Yes, we ship to customers across Ghana and internationally. Delivery times vary by location - typically 1-3 days within Accra, 3-5 days within Ghana, and 7-14 days for international orders. Contact us via WhatsApp for specific shipping quotes to your location.",
    category: "shipping",
  },
  {
    id: "5",
    question: "Are your products FDA approved?",
    answer: "Yes, all Nuni Global products are approved by the Ghana Food and Drugs Authority (FDA). We maintain strict quality control standards and use only certified, safe ingredients in our formulations.",
    category: "general",
  },
  {
    id: "6",
    question: "Can I use multiple products together?",
    answer: "Absolutely! Our products are designed to work beautifully together. For best results, we recommend using the Acne Dark Soap as your cleanser, followed by the Acne Facial Cream for treatment, and the Cocoa Butter for deep moisturizing. This complete routine addresses cleansing, treatment, and hydration.",
    category: "products",
  },
  {
    id: "7",
    question: "What is your return policy?",
    answer: "We want you to love your purchase! If you're not satisfied with your product, please contact us within 14 days of delivery. We'll work with you to find a solution, whether that's a replacement or store credit. Products must be unused and in original packaging for returns.",
    category: "general",
  },
  {
    id: "8",
    question: "How do I become a reseller?",
    answer: "We're always looking for passionate partners to join our network! As a Nuni Global reseller, you'll receive competitive wholesale pricing, marketing materials, product training, and ongoing support. Contact us via WhatsApp to learn about partnership opportunities and start your skincare business journey.",
    category: "partnership",
  },
];

export const categoryLabels = {
  products: "Products",
  shipping: "Shipping",
  partnership: "Partnership",
  general: "General",
};
