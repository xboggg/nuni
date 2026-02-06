import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload, Trash2, Image as ImageIcon, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Simple admin password - in production, use proper authentication
const ADMIN_PASSWORD_HASH = "nuniglobal2026"; // Change this to a secure password

interface UploadedImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  createdAt: number;
}

const categories = [
  { id: "events", label: "Events" },
  { id: "partnership", label: "Partnership" },
  { id: "soap", label: "Soap" },
  { id: "cream", label: "Cream" },
  { id: "cocoa-butter", label: "Cocoa Butter" },
  { id: "products", label: "Products" },
];

const GalleryAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("products");
  const [altText, setAltText] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  // Check if already authenticated in session
  useEffect(() => {
    const authStatus = sessionStorage.getItem("gallery-admin-auth");
    if (authStatus === "authenticated") {
      setIsAuthenticated(true);
    }
  }, []);

  // Load stored images - must be before any conditional returns
  useEffect(() => {
    if (isAuthenticated) {
      const stored = localStorage.getItem("gallery-images");
      if (stored) {
        try {
          setImages(JSON.parse(stored));
        } catch {
          // Invalid JSON, ignore
        }
      }
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD_HASH) {
      setIsAuthenticated(true);
      sessionStorage.setItem("gallery-admin-auth", "authenticated");
      setLoginError("");
    } else {
      setLoginError("Incorrect password");
      setPassword("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("gallery-admin-auth");
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-card rounded-2xl shadow-elevated p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-serif font-bold text-foreground">Gallery Admin</h1>
              <p className="text-muted-foreground mt-2">Enter password to access</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="mt-1"
                  autoFocus
                />
                {loginError && (
                  <p className="text-sm text-destructive mt-2">{loginError}</p>
                )}
              </div>

              <Button type="submit" className="w-full">
                Access Admin Panel
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/gallery"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Back to Gallery
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!previewUrl || !selectedFile) {
      toast({
        title: "No image selected",
        description: "Please select an image to upload",
        variant: "destructive",
      });
      return;
    }

    const newImage: UploadedImage = {
      id: `uploaded-${Date.now()}`,
      src: previewUrl,
      alt: altText || selectedFile.name,
      category: selectedCategory,
      createdAt: Date.now(),
    };

    const updatedImages = [...images, newImage];
    setImages(updatedImages);
    localStorage.setItem("gallery-images", JSON.stringify(updatedImages));

    toast({
      title: "Image uploaded",
      description: "Your image has been added to the gallery",
    });

    // Reset form
    setPreviewUrl(null);
    setSelectedFile(null);
    setAltText("");
  };

  const handleDelete = (id: string) => {
    const updatedImages = images.filter((img) => img.id !== id);
    setImages(updatedImages);
    localStorage.setItem("gallery-images", JSON.stringify(updatedImages));

    toast({
      title: "Image deleted",
      description: "The image has been removed from the gallery",
    });
  };

  return (
    <div className="min-h-screen bg-cream py-20">
      <div className="container-custom">
        <div className="mb-8">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-charcoal/60 hover:text-charcoal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Gallery
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-serif text-3xl md:text-4xl text-charcoal">
              Gallery Admin
            </h1>
            <Button variant="outline" onClick={handleLogout} size="sm">
              Logout
            </Button>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8">
            <h2 className="font-semibold text-xl text-charcoal mb-6">
              Upload New Image
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="image">Select Image</Label>
                  <div className="mt-2">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                  </div>
                  <p className="text-sm text-charcoal/60 mt-1">
                    Max file size: 5MB
                  </p>
                </div>

                <div>
                  <Label htmlFor="alt">Image Description</Label>
                  <Input
                    id="alt"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    placeholder="Enter image description"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleUpload}
                  disabled={!previewUrl}
                  className="w-full bg-terracotta hover:bg-terracotta/90"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
              </div>

              <div className="flex items-center justify-center">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-64 rounded-lg object-contain"
                  />
                ) : (
                  <div className="w-full h-64 bg-charcoal/5 rounded-lg flex flex-col items-center justify-center text-charcoal/40">
                    <ImageIcon className="w-12 h-12 mb-2" />
                    <p>Image preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Uploaded Images */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="font-semibold text-xl text-charcoal mb-6">
              Uploaded Images ({images.length})
            </h2>

            {images.length === 0 ? (
              <p className="text-charcoal/60 text-center py-8">
                No images uploaded yet. Upload your first image above!
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="relative group rounded-lg overflow-hidden"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2">
                      <span className="text-white text-xs text-center mb-2 line-clamp-2">
                        {image.alt}
                      </span>
                      <span className="text-white/60 text-xs capitalize mb-2">
                        {image.category.replace("-", " ")}
                      </span>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(image.id)}
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className="text-center text-charcoal/60 text-sm mt-6">
            Note: Images are stored locally in your browser and will persist
            until you clear your browser data.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default GalleryAdmin;
