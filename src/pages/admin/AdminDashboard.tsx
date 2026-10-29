import { useNavigate } from "react-router-dom";
import { LogOut, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { clearToken } from "@/lib/adminApi";
import HeroManager from "./HeroManager";
import GalleryManager from "./GalleryManager";
import PartnersManager from "./PartnersManager";

const AdminDashboard = () => {
  const navigate = useNavigate();

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
            <span className="font-serif font-bold text-foreground">NG Cosmetics Admin</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut size={16} className="mr-2" />
            Log Out
          </Button>
        </div>
      </header>

      <main className="container-custom py-8">
        <Tabs defaultValue="hero">
          <TabsList>
            <TabsTrigger value="hero">Hero Slides</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
          </TabsList>
          <TabsContent value="hero" className="mt-6">
            <HeroManager />
          </TabsContent>
          <TabsContent value="gallery" className="mt-6">
            <GalleryManager />
          </TabsContent>
          <TabsContent value="partners" className="mt-6">
            <PartnersManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
