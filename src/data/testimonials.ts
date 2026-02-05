// Visual testimonial imports
import review1 from "@/assets/testimonials/nuni-review1.jpeg";
import review2 from "@/assets/testimonials/nuni-review2.jpeg";
import review3 from "@/assets/testimonials/nuni-review3.jpeg";
import review4 from "@/assets/testimonials/nuni-review4.jpeg";
import review5 from "@/assets/testimonials/nuni-review5.jpeg";
import review6 from "@/assets/testimonials/nuni-review6.jpeg";
import review7 from "@/assets/testimonials/nuni-review7.jpeg";
import review8 from "@/assets/testimonials/nuni-review8.jpeg";
import review9 from "@/assets/testimonials/nuni-review9.jpeg";
import review10 from "@/assets/testimonials/nuni-review10.jpeg";
import review11 from "@/assets/testimonials/nuni-review11.jpeg";
import review12 from "@/assets/testimonials/nuni-review12.jpeg";
import reviewVideo1 from "@/assets/testimonials/nuni-review1.mp4";
import reviewVideo2 from "@/assets/testimonials/nuni-review2.mp4";

// Text testimonial interface (existing)
export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  location: string;
  rating: number;
  text: string;
  product: string;
}

// Visual testimonial interface (new)
export type VisualTestimonialType = "image" | "video";

export interface VisualTestimonial {
  id: string;
  type: VisualTestimonialType;
  src: string;
  thumbnail?: string;
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

// Visual testimonials (images and videos)
export const visualTestimonials: VisualTestimonial[] = [
  // Videos first (featured)
  { id: "v1", type: "video", src: reviewVideo1, thumbnail: review1 },
  { id: "v2", type: "video", src: reviewVideo2, thumbnail: review2 },
  // Images
  { id: "t1", type: "image", src: review1 },
  { id: "t2", type: "image", src: review2 },
  { id: "t3", type: "image", src: review3 },
  { id: "t4", type: "image", src: review4 },
  { id: "t5", type: "image", src: review5 },
  { id: "t6", type: "image", src: review6 },
  { id: "t7", type: "image", src: review7 },
  { id: "t8", type: "image", src: review8 },
  { id: "t9", type: "image", src: review9 },
  { id: "t10", type: "image", src: review10 },
  { id: "t11", type: "image", src: review11 },
  { id: "t12", type: "image", src: review12 },
];

// Get only video testimonials
export const videoTestimonials = visualTestimonials.filter((t) => t.type === "video");

// Get only image testimonials
export const imageTestimonials = visualTestimonials.filter((t) => t.type === "image");
