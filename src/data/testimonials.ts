export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  location: string;
  rating: number;
  text: string;
  product: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Akosua M.",
    initials: "AM",
    location: "Accra, Ghana",
    rating: 5,
    text: "I've struggled with acne and dark spots for years. After using Nuni Global products for just 6 weeks, my skin has never looked better. The natural ingredients are gentle but so effective!",
    product: "Acne Dark Soap + Facial Cream",
  },
  {
    id: "2",
    name: "Kwame A.",
    initials: "KA",
    location: "Kumasi, Ghana",
    rating: 5,
    text: "The Acne Dark Soap cleared my stubborn breakouts within a month. I've tried so many products before, but nothing worked like this. My confidence is back!",
    product: "Acne Dark Soap",
  },
  {
    id: "3",
    name: "Efua O.",
    initials: "EO",
    location: "Takoradi, Ghana",
    rating: 5,
    text: "I use the Cocoa Butter on my 8-month-old baby and myself. It's so gentle and moisturizing! No more dry, flaky skin for either of us. A family favorite now.",
    product: "Cocoa Butter",
  },
  {
    id: "4",
    name: "Kofi M.",
    initials: "KM",
    location: "Tema, Ghana",
    rating: 5,
    text: "Finally found something that actually works for razor bumps! The Acne Facial Cream has completely transformed my neck area. Smooth skin after just 3 weeks of use.",
    product: "Acne Facial Cream",
  },
  {
    id: "5",
    name: "Ama K.",
    initials: "AK",
    location: "Cape Coast, Ghana",
    rating: 5,
    text: "My dark spots from years of sun exposure are visibly fading. The results are amazing! I recommend Nuni Global to everyone who asks about my glowing skin.",
    product: "Acne Dark Soap + Facial Cream",
  },
];
