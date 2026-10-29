import { useEffect, useState, useRef } from "react";
import { Trash2, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/adminApi";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  sortOrder: number;
}

const CATEGORIES = [
  { id: "partners", label: "Partners" },
  { id: "soap", label: "Acne Dark Soap" },
  { id: "cream", label: "Acne Facial Cream" },
  { id: "cocoa-butter", label: "Cocoa Butter" },
  { id: "products", label: "Products" },
  { id: "kids", label: "Kids" },
];

const GalleryManager = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [newCategory, setNewCategory] = useState("cocoa-butter");
  const [newAlt, setNewAlt] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await apiGet("gallery");
      setImages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("category", newCategory);
      formData.append("alt", newAlt || "NG Cosmetics");
      await apiPost("gallery", formData);
      setNewAlt("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Remove this photo from the gallery? This cannot be undone.")) return;
    try {
      await apiDelete("gallery", id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const handleCategoryChange = async (id: number, category: string) => {
    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, category } : img)));
    try {
      await apiPut("gallery", { id, category });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
      load();
    }
  };

  const filtered =
    filterCategory === "all" ? images : images.filter((img) => img.category === filterCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Gallery Photos</h2>
          <p className="text-sm text-muted-foreground">{images.length} photos total</p>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Filter</label>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-muted/50 border border-border rounded-xl p-4 mb-6">
        <p className="text-sm font-medium text-foreground mb-3">Add a new photo</p>
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Category</label>
            <Select value={newCategory} onValueChange={setNewCategory}>
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Description (optional)</label>
            <Input
              value={newAlt}
              onChange={(e) => setNewAlt(e.target.value)}
              placeholder="e.g. NG Cosmetics Cocoa Butter"
              className="w-56"
            />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            {uploading ? <Loader2 className="animate-spin mr-2" size={16} /> : <Plus className="mr-2" size={16} />}
            Upload Photo
          </Button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2 mb-4">{error}</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((img) => (
          <div key={img.id} className="group relative rounded-xl overflow-hidden border border-border bg-muted">
            <img src={img.src} alt={img.alt} className="w-full aspect-square object-cover" loading="lazy" />
            <button
              onClick={() => handleDelete(img.id)}
              className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Delete photo"
            >
              <Trash2 size={14} />
            </button>
            <div className="p-1.5">
              <Select value={img.category} onValueChange={(v) => handleCategoryChange(img.id, v)}>
                <SelectTrigger className="h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.id} value={c.id} className="text-xs">
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">No photos in this category yet.</p>
      )}
    </div>
  );
};

export default GalleryManager;
