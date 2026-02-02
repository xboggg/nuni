

# Plan: TikTok Section Simplification & Hero Text Positioning

## Overview
This plan addresses two visual improvements:
1. Remove the TikTok video preview grid and replace with a simple, elegant link to the TikTok profile
2. Push the hero text content slightly more to the left for better visual balance

---

## Changes

### 1. Simplify TikTok Section
**File: `src/components/TestimonialsCarousel.tsx`**

**Current state:** The component has a TikTok section (lines 204-287) with:
- A header with "Follow Our Journey" text
- A link to @nuniglobalc
- A 6-column grid of video thumbnails using hero images as placeholders

**What will change:**
- Remove the entire video grid (lines 230-287)
- Remove unused imports (hero images, Play icon, tiktokVideos data)
- Keep only a clean, styled TikTok profile link with the TikTok icon
- Make the link more prominent with a button-style design

### 2. Push Hero Text to the Left
**File: `src/components/HeroCarousel.tsx`**

**Current state:** The content container uses `container-custom` which has `max-w-7xl mx-auto px-4` - centered with equal padding on both sides.

**What will change:**
- Reduce the left padding in the hero content area specifically
- Add negative margin or reduce left spacing to push text closer to the left edge
- The text container (line 104) currently has `max-w-2xl` - this will remain but be positioned further left

---

## Technical Details

### TestimonialsCarousel.tsx Changes
- Remove lines 4, 8, 10-18 (unused imports: Play, tiktokVideos, hero images, tiktokThumbnails array)
- Replace lines 204-287 (entire TikTok section) with a simpler, centered call-to-action:
  - Keep the "Follow Our Journey" header
  - Style the TikTok link as an attractive button with hover effects
  - Remove the video grid entirely

### HeroCarousel.tsx Changes
- Modify line 103: Change from `container-custom pt-20` to include left positioning
- Add a custom padding class or inline style to reduce left margin
- Change to something like `container-custom pt-20 pl-0 sm:pl-2 lg:pl-4` to push content left

---

## Visual Result
- **Testimonials section:** Will end with a clean TikTok follow button instead of placeholder thumbnails
- **Hero section:** Text will appear closer to the left edge, giving more breathing room for the background images to show through on the right

