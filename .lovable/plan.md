

# Nuni Global Website Enhancement Plan

## Overview

This plan transforms the current Nuni Global website into a world-class premium skincare brand showcase with stunning visual effects, comprehensive content sections, and a dedicated gallery page.

---

## Part 1: Enhanced Hero Section with All 6 Images

### 1.1 Full-Width Image Carousel/Slider
- Create an auto-rotating carousel featuring all 6 hero images (hero-1 through hero-6)
- Each slide transitions smoothly with fade/zoom effects
- Navigation dots at the bottom for manual control
- Auto-play with 5-second intervals

### 1.2 Parallax Pulsating/Breathing Effect
- Add a subtle "breathing" animation that scales images between 1.0 and 1.02 continuously
- Layer multiple parallax depths for a 3D feel
- Background images move slower than foreground content on scroll
- Add a gentle floating animation to decorative elements

### 1.3 Falling Leaves Animation
- Create animated leaf particles that drift down from top of the screen
- Leaves rotate and sway naturally as they fall
- Multiple leaf types (different sizes, opacities)
- Leaves fade out before reaching the bottom
- Performance-optimized with limited particle count (15-20 leaves)

---

## Part 2: FAQ Section

### 2.1 New FAQ Component
Create an accordion-style FAQ section with common questions:
- "What makes Nuni Global products different?"
- "Are your products safe for sensitive skin?"
- "How long until I see results?"
- "Do you ship internationally?"
- "Are your products FDA approved?"
- "Can I use multiple products together?"
- "What is your return policy?"
- "How do I become a reseller?"

### 2.2 Design
- Elegant accordion with smooth open/close animations
- Green accent on active question
- Plus/minus icons for expand/collapse
- Category tags (Products, Shipping, Partnership, General)

---

## Part 3: Enhanced Testimonials Section

### 3.1 Multiple Testimonials Carousel
Add 4-5 more testimonials with rotation:
- Testimonial 1: Akosua M. (existing)
- Testimonial 2: Kwame A. - About acne clearing
- Testimonial 3: Efua O. - About cocoa butter for baby
- Testimonial 4: Kofi M. - About razor bump treatment
- Testimonial 5: Ama K. - About dark spot fading

### 3.2 Testimonial Card Design
- Auto-rotating carousel with navigation arrows
- Star ratings
- Customer initials avatar
- Location displayed
- Fade transitions between testimonials

---

## Part 4: Gallery Page

### 4.1 New Route: /gallery
- Create a dedicated gallery page accessible from navigation
- Update App.tsx with new route
- Add "Gallery" link to navigation menu

### 4.2 Gallery Features
- Masonry-style image grid layout
- All 6 hero images plus any additional product shots
- Lightbox modal for full-screen viewing
- Image zoom capability
- Navigation arrows in lightbox
- Keyboard support (Escape to close, arrows to navigate)
- Categories/filters (Products, Results, Brand)

### 4.3 Gallery Navigation
- Add gallery link to main navigation
- Add gallery link to footer

---

## Part 5: Additional Premium Features

Based on best practices for premium product websites, here are additional features to implement:

### 5.1 Animated Statistics Counter
Add a section with animated counters:
- "5,000+ Happy Customers"
- "100% Natural Ingredients"
- "3+ Years of Excellence"
- "98% Customer Satisfaction"

### 5.2 Product Comparison Section
- Side-by-side comparison table of all 3 products
- Helps customers choose the right product
- Visual icons for features

### 5.3 "How It Works" Process Section
3-step visual process:
1. "Choose Your Products" - Product selection
2. "Order via WhatsApp" - Easy ordering
3. "Delivered to You" - Fast delivery

### 5.4 Trust Badges Bar
Horizontal scrolling bar with:
- FDA Approved badge
- Made in Ghana badge
- 100% Natural badge
- Secure Ordering badge
- Fast Delivery badge

### 5.5 Newsletter Subscription
- Email capture form
- "Get 10% off your first order"
- Integrates with WhatsApp for now

### 5.6 Back to Top Button
- Appears after scrolling down
- Smooth scroll back to top
- Matching brand styling

### 5.7 Ingredient Spotlight Section
- Highlight key natural ingredients
- Shea Butter, Cocoa Butter, Activated Charcoal
- Beautiful botanical imagery cards
- Benefits of each ingredient

### 5.8 Before/After Results Section
- Placeholder for transformation images
- Image comparison slider component
- Disclaimer text

### 5.9 Brand Story Video Section
- Placeholder for brand video
- Play button overlay
- Video modal or embedded player

### 5.10 Social Proof Enhancements
- "As Seen On" section with TikTok prominence
- Follower count display
- Recent reviews ticker

---

## Technical Implementation Details

### New Files to Create
```
src/components/HeroCarousel.tsx      - Multi-image hero with effects
src/components/FallingLeaves.tsx     - Animated leaves overlay
src/components/FAQ.tsx               - FAQ accordion section
src/components/TestimonialsCarousel.tsx - Enhanced testimonials
src/components/GalleryGrid.tsx       - Gallery grid component
src/components/GalleryLightbox.tsx   - Lightbox modal
src/components/StatsCounter.tsx      - Animated statistics
src/components/HowItWorks.tsx        - Process steps section
src/components/TrustBadges.tsx       - Scrolling trust badges
src/components/BackToTop.tsx         - Scroll to top button
src/components/IngredientsSpotlight.tsx - Featured ingredients
src/pages/Gallery.tsx                - Gallery page
src/data/faq.ts                      - FAQ data
src/data/testimonials.ts             - Testimonials data
```

### Files to Modify
```
src/App.tsx                  - Add gallery route
src/components/Navigation.tsx - Add gallery link
src/components/Footer.tsx    - Add gallery link
src/pages/Index.tsx         - Add new sections
src/index.css               - Add new animations
tailwind.config.ts          - Add new keyframes
```

### New CSS Animations to Add
```css
/* Breathing/pulsating effect */
@keyframes breathing {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

/* Falling leaves */
@keyframes fall {
  0% { transform: translateY(-10%) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
}

/* Counter animation */
@keyframes countUp { ... }
```

---

## Implementation Order

1. **Hero Enhancements** (Carousel, Parallax, Breathing, Leaves)
2. **FAQ Section**
3. **Enhanced Testimonials**
4. **Gallery Page with Lightbox**
5. **Additional Premium Features** (Stats, Trust Badges, etc.)
6. **Back to Top & Polish**

---

## Summary of All Features

| Feature | Type | Priority |
|---------|------|----------|
| 6-Image Hero Carousel | Enhancement | High |
| Parallax Breathing Effect | Animation | High |
| Falling Leaves Animation | Animation | High |
| FAQ Section | New Section | High |
| Multiple Testimonials | Enhancement | High |
| Gallery Page | New Page | High |
| Lightbox Modal | Component | High |
| Stats Counter | New Section | Medium |
| How It Works | New Section | Medium |
| Trust Badges | New Section | Medium |
| Back to Top Button | Component | Medium |
| Ingredients Spotlight | New Section | Low |
| Newsletter Capture | Component | Low |

This plan will create a truly premium, world-class product showcase website that rivals the best skincare brand websites.

