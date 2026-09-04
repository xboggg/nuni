<?php
/**
 * Social Media Crawler OG Meta Tag Server
 * Run with: php -S 127.0.0.1:9876 og-server.php
 *
 * Route table kept in sync with each page's own <SEO> component in
 * src/pages/*.tsx — copy here should match, not be invented.
 */

$base = "https://ngcosmetics.com.gh";
$uri = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$uri = rtrim($uri, "/");
if ($uri === "") $uri = "/";

// Route -> OG meta mapping
$routes = [
    "/" => [
        "title" => "NG Cosmetics | Proudly Ghanaian. Naturally Effective.",
        "description" => "Discover the power of African botanicals. Premium skincare crafted with 100% natural ingredients for visibly healthier, glowing skin. FDA Approved. Made in Ghana.",
        "image" => "/og-image.jpg",
    ],
    "/products" => [
        "title" => "Products & Pricing - Retail & Wholesale | NG Cosmetics",
        "description" => "Browse NG Cosmetics skincare products with retail and wholesale pricing. Luxury & Faraway Body Butter, Acne Dark Soap, Acne Facial Cream, Cocoa Butter. Order via WhatsApp. Made in Ghana.",
        "image" => "/og-image-products.jpg",
    ],
    "/products/luxury-body-butter" => [
        "title" => "Luxury Body Butter - Rich, Smooth, Luxurious | NG Cosmetics",
        "description" => "NG Cosmetics Luxury Body Butter made with 100% natural shea butter. Deeply moisturizes and nourishes skin for a soft, radiant glow. Made in Ghana.",
        "image" => "/og-luxury-body-butter.jpg",
    ],
    "/products/faraway-body-butter" => [
        "title" => "Faraway Body Butter - Rich, Smooth, Luxurious | NG Cosmetics",
        "description" => "NG Cosmetics Faraway Body Butter with an exotic, long-lasting scent. Deeply moisturizes and softens dry skin. Made in Ghana.",
        "image" => "/og-faraway-body-butter.jpg",
    ],
    "/products/acne-dark-soap" => [
        "title" => "Acne Dark Soap - Natural Acne Treatment | NG Cosmetics",
        "description" => "Powerful charcoal-based soap with shea butter, coconut oil, and salicylic acid. Fights acne, fades dark spots, and clears razor bumps. FDA Approved. Made in Ghana.",
        "image" => "/og-acne-dark-soap.jpg",
    ],
    "/products/acne-facial-cream" => [
        "title" => "Acne Facial & Skin Cream - Dark Spot Treatment | NG Cosmetics",
        "description" => "Targeted acne treatment with salicylic acid and niacinamide. Reduces breakouts, fades hyperpigmentation, and promotes smoother skin. FDA Approved. Made in Ghana.",
        "image" => "/og-acne-facial-cream.jpg",
    ],
    "/products/cocoa-butter" => [
        "title" => "Cocoa Butter - Natural Moisturizer | NG Cosmetics",
        "description" => "Pure Ghanaian cocoa butter for deep moisturizing. Rich in antioxidants, soothes irritation, fades stretch marks. Safe for babies 6 months+. Made in Ghana.",
        "image" => "/og-cocoa-butter.jpg",
    ],
    "/about-us" => [
        "title" => "About Us - Why Choose NG Cosmetics | NG Cosmetics",
        "description" => "Learn about NG Cosmetics' story, our commitment to natural skincare, and why we're Ghana's trusted skincare brand. FDA Certified, 100% natural ingredients.",
        "image" => "/og-about-us.jpg",
    ],
    "/partners" => [
        "title" => "Partners & Distributors - Find Vendors Near You | NG Cosmetics",
        "description" => "Find NG Cosmetics authorized vendors, distributors, and brand ambassadors across Ghana. Become a partner and join our growing network.",
        "image" => "/og-partners.jpg",
    ],
    "/gallery" => [
        "title" => "Gallery - Product Photos & Ambassadors | NG Cosmetics",
        "description" => "Browse our gallery of NG Cosmetics skincare products, brand ambassadors, and happy customers. See real results from our natural African skincare line.",
        "image" => "/og-gallery.jpg",
    ],
    "/contact" => [
        "title" => "Contact Us - Get in Touch | NG Cosmetics",
        "description" => "Contact NG Cosmetics for product inquiries, wholesale orders, or partnership opportunities. Reach us via WhatsApp, email, or visit us in Ghana.",
        "image" => "/og-contact.jpg",
    ],
    "/testimonials" => [
        "title" => "Testimonials - Real Results from Real Customers | NG Cosmetics",
        "description" => "See real testimonials and before/after results from NG Cosmetics customers. Discover how our natural skincare products have transformed skin across Ghana.",
        "image" => "/og-testimonials.jpg",
    ],
    "/community" => [
        "title" => "Community Impact | NG Cosmetics",
        "description" => "Empowering communities through sustainable business. See how NG Cosmetics gives back to Ghanaian communities through healthcare, education and employment.",
        "image" => "/og-community.jpg",
    ],
    "/privacy-policy" => [
        "title" => "Privacy Policy | NG Cosmetics",
        "description" => "Learn how NG Cosmetics collects, uses, and protects your personal information. Your privacy is important to us.",
        "image" => "/og-privacy-policy.jpg",
    ],
    "/terms-of-service" => [
        "title" => "Terms of Service | NG Cosmetics",
        "description" => "Read NG Cosmetics' terms of service including orders, payments, shipping, returns, and product use policies.",
        "image" => "/og-terms-of-service.jpg",
    ],
    // /export is currently a single "Coming Soon" page in the React app
    // (src/pages/export/ExportComingSoon.tsx handles /export and /export/*).
    // Do NOT reintroduce per-sub-page export routes here unless that page
    // is rebuilt — this previously described a full export site that no
    // longer exists, which is exactly the kind of drift this file is
    // prone to. Keep this route table matched to the live app.
    "/export" => [
        "title" => "Kofi Ideas Import & Export - Coming Soon | NG Cosmetics",
        "description" => "Our export division is moving to a dedicated website. We'll be back bigger and better very soon. Reach us directly for export inquiries.",
        "image" => "/media/kofi-export-og.jpg",
    ],
    "/home-decor" => [
        "title" => "Kofi Ideas Home Decor - Turning Houses Into Beautiful Homes",
        "description" => "Professional home decoration, interior furnishing, room transformations, and luxury upgrades. We care about turning your house into a beautiful home.",
        "image" => "/media/kofi-homedecor-og.jpg",
    ],
];

// Find matching route
$meta = null;
if (isset($routes[$uri])) {
    $meta = $routes[$uri];
} elseif (strpos($uri, "/export/") === 0) {
    // All /export/* sub-paths currently render the same Coming Soon page
    $meta = $routes["/export"];
}
if (!$meta) {
    $meta = $routes["/"];
}

$title = htmlspecialchars($meta["title"], ENT_QUOTES, "UTF-8");
$desc = htmlspecialchars($meta["description"], ENT_QUOTES, "UTF-8");
$image = $base . $meta["image"];
$url = $base . $uri;

echo "<!DOCTYPE html>
<html lang=\"en\">
<head>
<meta charset=\"UTF-8\"/>
<title>{$title}</title>
<meta name=\"description\" content=\"{$desc}\"/>
<meta property=\"og:title\" content=\"{$title}\"/>
<meta property=\"og:description\" content=\"{$desc}\"/>
<meta property=\"og:type\" content=\"website\"/>
<meta property=\"og:url\" content=\"{$url}\"/>
<meta property=\"og:image\" content=\"{$image}\"/>
<meta property=\"og:image:width\" content=\"1200\"/>
<meta property=\"og:image:height\" content=\"630\"/>
<meta property=\"og:site_name\" content=\"NG Cosmetics\"/>
<meta name=\"twitter:card\" content=\"summary_large_image\"/>
<meta name=\"twitter:title\" content=\"{$title}\"/>
<meta name=\"twitter:description\" content=\"{$desc}\"/>
<meta name=\"twitter:image\" content=\"{$image}\"/>
<link rel=\"canonical\" href=\"{$url}\"/>
</head>
<body>
<h1>{$title}</h1>
<p>{$desc}</p>
<p><a href=\"{$url}\">{$url}</a></p>
</body>
</html>";
