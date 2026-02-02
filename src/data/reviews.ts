export interface Review {
  id: string;
  productId: string;
  rating: number;
  title: string;
  text: string;
  author: string;
  location: string;
  date: string;
  verified: boolean;
  photos?: string[];
  helpful: number;
}

// Sample reviews for demo purposes
export const sampleReviews: Review[] = [
  {
    id: "r1",
    productId: "acne-dark-soap",
    rating: 5,
    title: "Finally something that works!",
    text: "I've struggled with acne and dark spots for years. After just 3 weeks of using this soap, my skin is so much clearer. The dark spots are fading and I'm getting fewer breakouts. Highly recommend!",
    author: "Akosua M.",
    location: "Accra, Ghana",
    date: "2025-01-15",
    verified: true,
    helpful: 24
  },
  {
    id: "r2",
    productId: "acne-dark-soap",
    rating: 5,
    title: "Best soap I've ever used",
    text: "The charcoal really draws out impurities. My pores look smaller and my skin feels so clean but not dry. I'm on my third bar now!",
    author: "Kwame A.",
    location: "Kumasi, Ghana",
    date: "2025-01-08",
    verified: true,
    helpful: 18
  },
  {
    id: "r3",
    productId: "acne-dark-soap",
    rating: 4,
    title: "Great for oily skin",
    text: "Perfect for my oily skin type. It controls oil throughout the day and my face doesn't feel greasy anymore. Only 4 stars because it took about a month to see major results.",
    author: "Efua O.",
    location: "Takoradi, Ghana",
    date: "2024-12-28",
    verified: true,
    helpful: 12
  },
  {
    id: "r4",
    productId: "acne-facial-cream",
    rating: 5,
    title: "Cleared my razor bumps completely",
    text: "I had terrible razor bumps on my neck for years. This cream cleared them up in just 3 weeks! My neck is so smooth now. Can't recommend enough.",
    author: "Kofi M.",
    location: "Tema, Ghana",
    date: "2025-01-20",
    verified: true,
    helpful: 31
  },
  {
    id: "r5",
    productId: "acne-facial-cream",
    rating: 5,
    title: "My dark spots are fading",
    text: "Been using for 6 weeks and my hyperpigmentation is visibly lighter. I use it morning and night. It absorbs quickly and doesn't leave my skin oily.",
    author: "Ama K.",
    location: "Cape Coast, Ghana",
    date: "2025-01-12",
    verified: true,
    helpful: 22
  },
  {
    id: "r6",
    productId: "acne-facial-cream",
    rating: 4,
    title: "Works well but takes time",
    text: "Effective cream but you need patience. Started seeing real results after week 4. Now my skin looks much more even. Will keep using!",
    author: "Yaw B.",
    location: "Accra, Ghana",
    date: "2024-12-20",
    verified: true,
    helpful: 15
  },
  {
    id: "r7",
    productId: "cocoa-butter",
    rating: 5,
    title: "Perfect for my baby and me",
    text: "I use this on my 8-month-old and myself. So gentle and moisturizing! The natural cocoa scent is divine. No more dry, ashy skin for our whole family.",
    author: "Efua O.",
    location: "Takoradi, Ghana",
    date: "2025-01-18",
    verified: true,
    helpful: 28
  },
  {
    id: "r8",
    productId: "cocoa-butter",
    rating: 5,
    title: "Stretch marks are fading",
    text: "After pregnancy, I had stretch marks everywhere. Been using this cocoa butter for 2 months and they're definitely fading. The texture is rich but absorbs well.",
    author: "Adjoa F.",
    location: "Accra, Ghana",
    date: "2025-01-05",
    verified: true,
    helpful: 35
  },
  {
    id: "r9",
    productId: "cocoa-butter",
    rating: 5,
    title: "Best moisturizer ever",
    text: "I have extremely dry skin and this is the only thing that keeps it hydrated all day. Natural ingredients and smells amazing. Worth every cedi!",
    author: "Nana K.",
    location: "Kumasi, Ghana",
    date: "2024-12-30",
    verified: true,
    helpful: 20
  }
];

export const getReviewsForProduct = (productId: string): Review[] => {
  return sampleReviews.filter(review => review.productId === productId);
};

export const getAverageRating = (productId: string): number => {
  const reviews = getReviewsForProduct(productId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

export const getRatingDistribution = (productId: string): Record<number, number> => {
  const reviews = getReviewsForProduct(productId);
  const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(review => {
    distribution[review.rating]++;
  });
  return distribution;
};
