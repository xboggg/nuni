import { useEffect, useState, useRef } from "react";
import { Trash2, Plus, GripVertical, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/adminApi";

interface HeroSlide {
  id: number;
  src: string;
  sortOrder: number;
}

const HeroManager = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragIndexRef = useRef<number | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await apiGet("hero");
      setSlides(data);
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
      await apiPost("hero", formData);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Remove this hero slide? This cannot be undone.")) return;
    try {
      await apiDelete("hero", id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const handleDragStart = (index: number) => {
    dragIndexRef.current = index;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (index: number) => {
    const fromIndex = dragIndexRef.current;
    dragIndexRef.current = null;
    if (fromIndex === null || fromIndex === index) return;

    const reordered = [...slides];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(index, 0, moved);
    setSlides(reordered);

    try {
      await apiPut("hero", { reorder: reordered.map((s) => s.id) });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reorder failed");
      load();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Homepage Hero Slides</h2>
          <p className="text-sm text-muted-foreground">
            These images rotate at the very top of the homepage. Drag to reorder.
          </p>
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            {uploading ? <Loader2 className="animate-spin mr-2" size={16} /> : <Plus className="mr-2" size={16} />}
            Add Slide
          </Button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2 mb-4">{error}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            className="group relative rounded-xl overflow-hidden border border-border bg-muted cursor-move"
          >
            <img src={slide.src} alt={`Hero slide ${index + 1}`} className="w-full aspect-[3/2] object-cover" />
            <div className="absolute top-2 left-2 bg-card/90 rounded-full p-1.5">
              <GripVertical size={16} className="text-muted-foreground" />
            </div>
            <button
              onClick={() => handleDelete(slide.id)}
              className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Delete slide"
            >
              <Trash2 size={16} />
            </button>
            <div className="absolute bottom-2 left-2 bg-card/90 text-xs font-medium px-2 py-0.5 rounded-full text-foreground">
              {index + 1}
            </div>
          </div>
        ))}
      </div>

      {slides.length === 0 && (
        <p className="text-center text-muted-foreground py-12">No hero slides yet. Add one above.</p>
      )}
    </div>
  );
};

export default HeroManager;
