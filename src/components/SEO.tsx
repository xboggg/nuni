import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "product" | "article";
  structuredData?: object;
}

const DEFAULT_TITLE = "Nuni Global | Premium African Skincare from Ghana";
const DEFAULT_DESCRIPTION =
  "Discover the power of African botanicals. Premium skincare crafted with 100% natural ingredients for visibly healthier, glowing skin. FDA Approved. Made in Ghana.";
const DEFAULT_IMAGE = "/og-image.png";
const SITE_NAME = "Nuni Global";
const BASE_URL = "https://ngcosmetics.com.gh";

const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
  structuredData,
}: SEOProps) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;
  const fullImage = image.startsWith("http") ? image : `${BASE_URL}${image}`;

  // Default organization structured data
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nuni Global",
    url: BASE_URL,
    logo: `${BASE_URL}/src/assets/nuni-logo.png`,
    description: DEFAULT_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      addressCountry: "GH",
      addressLocality: "Ghana",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "French", "Twi"],
    },
    sameAs: [
      "https://www.tiktok.com/@nuniglobalc",
      "https://wa.me/233554753634",
    ],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
