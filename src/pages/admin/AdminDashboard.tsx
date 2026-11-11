import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Leaf, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { clearToken } from "@/lib/adminApi";
import HeroManager from "./HeroManager";
import GalleryManager from "./GalleryManager";
import PartnersManager from "./PartnersManager";
import ProductsManager from "./ProductsManager";
import TestimonialsManager from "./TestimonialsManager";
import AboutManager from "./AboutManager";
import SettingsManager from "./SettingsManager";
import CommunityManager from "./CommunityManager";
import HomepageContentManager from "./HomepageContentManager";

const SECTIONS = [
  { value: "hero", label: "Hero Slides" },
  { value: "homepage", label: "Homepage Content" },
  { value: "products", label: "Products" },
  { value: "gallery", label: "Gallery" },
  { value: "partners", label: "Partners" },
  { value: "testimonials", label: "Testimonials" },
  { value: "about", label: "Why NG Cosmetics" },
  { value: "settings", label: "Contact Details" },
  { value: "community", label: "Community" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("hero");

  const handleLogout = () => {
    clearToken();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
              <Leaf size={18} className="text-primary-foreground" />
            </div>
            <span className="font-serif font-bold text-foreground whitespace-nowrap">
              <span className="hidden sm:inline">NG Cosmetics Admin</span>
              <span className="sm:hidden">Admin</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <ExternalLink size={16} className="mr-1.5 sm:mr-2" />
                View Site
              </Button>
            </a>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut size={16} className="mr-1.5 sm:mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Mobile: dropdown selector so every section is reachable in one tap */}
          <div className="sm:hidden mb-6">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SECTIONS.map((section) => (
                  <SelectItem key={section.value} value={section.value}>
                    {section.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Desktop/tablet: tab row */}
          <TabsList className="hidden sm:inline-flex">
            {SECTIONS.map((section) => (
              <TabsTrigger key={section.value} value={section.value}>
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="hero" className="mt-6">
            <HeroManager />
          </TabsContent>
          <TabsContent value="homepage" className="mt-6">
            <HomepageContentManager />
          </TabsContent>
          <TabsContent value="products" className="mt-6">
            <ProductsManager />
          </TabsContent>
          <TabsContent value="gallery" className="mt-6">
            <GalleryManager />
          </TabsContent>
          <TabsContent value="partners" className="mt-6">
            <PartnersManager />
          </TabsContent>
          <TabsContent value="testimonials" className="mt-6">
            <TestimonialsManager />
          </TabsContent>
          <TabsContent value="about" className="mt-6">
            <AboutManager />
          </TabsContent>
          <TabsContent value="settings" className="mt-6">
            <SettingsManager />
          </TabsContent>
          <TabsContent value="community" className="mt-6">
            <CommunityManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
