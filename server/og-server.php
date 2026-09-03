<?php
/**
 * Social Media Crawler OG Meta Tag Server
 * Run with: php -S 127.0.0.1:9876 og-server.php
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
    "/export" => [
        "title" => "Kofi Ideas Import & Export | Premium African Commodities",
        "description" => "Quality African commodities for the global market. Shea butter, cocoa, black soap and more. Ethically sourced from Ghana with full traceability.",
        "image" => "/media/kofi-export-poster.jpg",
    ],
    "/export/products" => [
        "title" => "Export Products | Kofi Ideas Import & Export",
        "description" => "Browse our range of premium African export commodities - shea butter, cocoa, black soap and more. Ethically sourced from Ghana.",
        "image" => "/media/kofi-export-poster.jpg",
    ],
    "/export/shea-butter" => [
        "title" => "Premium Shea Butter | Kofi Ideas Import & Export",
        "description" => "100% pure, unrefined shea butter sourced directly from Northern Ghana. Available in bulk for cosmetic and food industries.",
        "image" => "/media/kofi-export-poster.jpg",
    ],
    "/export/cocoa" => [
        "title" => "Ghana Cocoa Export | Kofi Ideas Import & Export",
        "description" => "Premium Ghana cocoa beans and cocoa products. Ethically sourced with full traceability from farm to export.",
        "image" => "/media/kofi-export-poster.jpg",
    ],
    "/export/black-soap" => [
        "title" => "African Black Soap | Kofi Ideas Import & Export",
        "description" => "Authentic African black soap made with traditional methods. Available in bulk for retail and wholesale markets.",
        "image" => "/media/kofi-export-poster.jpg",
    ],
    "/export/process" => [
        "title" => "Our Export Process | Kofi Ideas Import & Export",
        "description" => "From sourcing to shipping - learn about our transparent export process ensuring quality African commodities reach global markets.",
        "image" => "/media/kofi-export-poster.jpg",
    ],
    "/export/contact" => [
        "title" => "Contact Export Team | Kofi Ideas Import & Export",
        "description" => "Get in touch with our export team for inquiries, quotes, and partnerships. Premium African commodities for global markets.",
        "image" => "/media/kofi-export-poster.jpg",
    ],
    "/home-decor" => [
        "title" => "Kofi Ideas Home Decor | Handcrafted African Interiors",
        "description" => "Beautiful handcrafted African home decor pieces. Transform your space with authentic Ghanaian artisan craftsmanship.",
        "image" => "/media/kofi-homedecor-poster.jpg",
    ],
    "/community" => [
        "title" => "Community Impact | NG Cosmetics",
        "description" => "Empowering communities through sustainable business. See how NG Cosmetics gives back to Ghanaian communities through healthcare, education and employment.",
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
        "image" => "/og-image-products.jpg",
    ],
    "/products/faraway-body-butter" => [
        "title" => "Faraway Body Butter - Rich, Smooth, Luxurious | NG Cosmetics",
        "description" => "NG Cosmetics Faraway Body Butter with an exotic, long-lasting scent. Deeply moisturizes and softens dry skin. Made in Ghana.",
        "image" => "/og-image-products.jpg",
    ],
    "/products/acne-dark-soap" => [
        "title" => "Acne Dark Soap - Natural Acne Treatment | NG Cosmetics",
        "description" => "Powerful charcoal-based soap with shea butter, coconut oil, and salicylic acid. Fights acne, fades dark spots, and clears razor bumps. FDA Approved. Made in Ghana.",
        "image" => "/og-image-products.jpg",
    ],
    "/products/acne-facial-cream" => [
        "title" => "Acne Facial & Skin Cream - Dark Spot Treatment | NG Cosmetics",
        "description" => "Targeted acne treatment with salicylic acid and niacinamide. Reduces breakouts, fades hyperpigmentation, and promotes smoother skin. FDA Approved. Made in Ghana.",
        "image" => "/og-image-products.jpg",
    ],
    "/products/cocoa-butter" => [
        "title" => "Cocoa Butter - Natural Moisturizer | NG Cosmetics",
        "description" => "Pure Ghanaian cocoa butter for deep moisturizing. Rich in antioxidants, soothes irritation, fades stretch marks. Safe for babies 6 months+. Made in Ghana.",
        "image" => "/og-image-products.jpg",
    ],
    "/about-us" => [
        "title" => "About Us - Why Choose NG Cosmetics | NG Cosmetics",
        "description" => "Learn about NG Cosmetics' story, our commitment to natural skincare, and why we're Ghana's trusted skincare brand. FDA Certified, 100% natural ingredients.",
        "image" => "/og-image.jpg",
    ],
    "/partners" => [
        "title" => "Partners & Distributors - Find Vendors Near You | NG Cosmetics",
        "description" => "Find NG Cosmetics authorized vendors, distributors, and brand ambassadors across Ghana. Become a partner and join our growing network.",
        "image" => "/og-image.jpg",
    ],
];

// Find matching route
$meta = null;
if (isset($routes[$uri])) {
    $meta = $routes[$uri];
} elseif (strpos($uri, "/export/") === 0) {
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
