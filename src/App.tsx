import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import GalleryAdmin from "./pages/GalleryAdmin";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import ProductAcneSoap from "./pages/ProductAcneSoap";
import ProductAcneCream from "./pages/ProductAcneCream";
import ProductCocoaButter from "./pages/ProductCocoaButter";
import PartnersPage from "./pages/PartnersPage";
import WhyNuniPage from "./pages/WhyNuniPage";
import ProductsPage from "./pages/ProductsPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import ExportPage from "./pages/ExportPage";
import ScrollToTop from "@/components/ScrollToTop";
import PromoBar from "@/components/PromoBar";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <PromoBar />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/admin" element={<GalleryAdmin />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products/acne-dark-soap" element={<ProductAcneSoap />} />
          <Route path="/products/acne-facial-cream" element={<ProductAcneCream />} />
          <Route path="/products/cocoa-butter" element={<ProductCocoaButter />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/about-us" element={<WhyNuniPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/export" element={<ExportPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
