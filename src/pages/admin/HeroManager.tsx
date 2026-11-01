import { useEffect, useState, useRef } from "react";
import { Trash2, Plus, GripVertical, Loader2, ChevronUp, ChevronDown, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/adminApi";

interface HeroSlide {
  id: number;
  src: string;
  description: string;
  focalX: number;
  focalY: number;
  sortOrder: number;
  isActive: boolean;
}

const HeroManager = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [facePickerId, setFacePickerId] = useState<number | null>(null);
  const [descDrafts, setDescDrafts] = useState<Record<number, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragIndexRef = useRef<number | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data: HeroSlide[] = await apiGet("hero");
      setSlides(data);
      setDescDrafts(Object.fromEntries(data.map((s) => [s.id, s.description])));
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
    if (!confirm("Remove this picture? This cannot be undone.")) return;
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
    reorderTo(fromIndex, index);
  };

  const reorderTo = async (fromIndex: number, toIndex: number) => {
    const reordered = [...slides];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    setSlides(reordered);

    try {
      await apiPut("hero", { reorder: reordered.map((s) => s.id) });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reorder failed");
      load();
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    reorderTo(index, index - 1);
  };

  const moveDown = (index: number) => {
    if (index === slides.length - 1) return;
    reorderTo(index, index + 1);
  };

  const toggleActive = async (slide: HeroSlide) => {
    const nextActive = !slide.isActive;
    setSlides((prev) => prev.map((s) => (s.id === slide.id ? { ...s, isActive: nextActive } : s)));
    try {
      await apiPut("hero", { id: slide.id, isActive: nextActive });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
      load();
    }
  };

  const saveDescription = async (slide: HeroSlide) => {
    const next = descDrafts[slide.id] ?? "";
    if (next === slide.description) return;
    setSlides((prev) => prev.map((s) => (s.id === slide.id ? { ...s, description: next } : s)));
    try {
      await apiPut("hero", { id: slide.id, description: next });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
      load();
    }
  };

  const saveFace = async (slide: HeroSlide, focalX: number, focalY: number) => {
    setSlides((prev) => prev.map((s) => (s.id === slide.id ? { ...s, focalX, focalY } : s)));
    try {
      await apiPut("hero", { id: slide.id, focalX, focalY });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
      load();
    }
  };

  const handleFaceTap = (slide: HeroSlide, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100));
    saveFace(slide, Math.round(x * 100) / 100, Math.round(y * 100) / 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  const facePickerSlide = slides.find((s) => s.id === facePickerId) || null;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Homepage Pictures</h2>
          <p className="text-sm text-muted-foreground">
            The big pictures at the top of the homepage. Drag, or use the arrows, to reorder.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={load}>
            <RefreshCw size={14} className="mr-2" />
            Refresh
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            {uploading ? <Loader2 className="animate-spin mr-2" size={16} /> : <Plus className="mr-2" size={16} />}
            Add a picture
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-6">
        {slides.filter((s) => s.isActive).length} of {slides.length} showing. Every change saves by itself.
      </p>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2 mb-4">{error}</p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
        <div className="space-y-4">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              className={`flex flex-col sm:flex-row gap-4 rounded-xl border bg-card p-4 cursor-move ${
                facePickerId === slide.id ? "border-primary ring-1 ring-primary" : "border-border"
              }`}
            >
              <div className="relative flex-shrink-0 w-full sm:w-32">
                <span className="absolute top-1.5 left-1.5 bg-card/90 text-xs font-semibold px-2 py-0.5 rounded-full text-foreground z-10">
                  {index + 1}
                </span>
                <img
                  src={slide.src}
                  alt={`Picture ${index + 1}`}
                  className="w-full aspect-[3/2] object-cover rounded-lg border border-border"
                  style={{ objectPosition: `${slide.focalX}% ${slide.focalY}%` }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground">Picture {index + 1}</p>
                    <input
                      type="text"
                      value={descDrafts[slide.id] ?? ""}
                      onChange={(e) => setDescDrafts((prev) => ({ ...prev, [slide.id]: e.target.value }))}
                      onBlur={() => saveDescription(slide)}
                      placeholder="No description yet"
                      className="mt-0.5 w-full text-sm bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none text-muted-foreground"
                    />
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted disabled:opacity-30 transition-colors"
                      aria-label="Move up"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      onClick={() => moveDown(index)}
                      disabled={index === slides.length - 1}
                      className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted disabled:opacity-30 transition-colors"
                      aria-label="Move down"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleActive(slide)}
                    aria-pressed={slide.isActive}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
                      slide.isActive ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        slide.isActive ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span className="text-sm text-foreground">{slide.isActive ? "Showing" : "Hidden"}</span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFacePickerId(facePickerId === slide.id ? null : slide.id)}
                  >
                    Set face
                  </Button>

                  <button
                    onClick={() => handleDelete(slide.id)}
                    className="ml-auto w-8 h-8 flex items-center justify-center rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                    aria-label="Delete picture"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="hidden sm:flex items-center text-muted-foreground">
                <GripVertical size={18} />
              </div>
            </div>
          ))}

          {slides.length === 0 && (
            <p className="text-center text-muted-foreground py-12 border border-dashed border-border rounded-xl">
              No pictures yet. Add one above.
            </p>
          )}

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full flex items-center gap-3 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 px-4 py-4 text-left hover:bg-primary/10 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
              {uploading ? <Loader2 className="animate-spin text-primary" size={18} /> : <Plus className="text-primary" size={18} />}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Add a picture</p>
              <p className="text-xs text-muted-foreground">
                From your phone or computer. Any size — we make it light and fast automatically.
              </p>
            </div>
          </button>
        </div>

        {/* Face picker side panel */}
        <div className="lg:sticky lg:top-4">
          {facePickerSlide ? (
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="font-medium text-foreground mb-1">
                Picture {slides.findIndex((s) => s.id === facePickerSlide.id) + 1}: where is the face?
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Tap the person's face. Phones only show a narrow slice of the picture, so we keep that spot in view.
              </p>
              <div
                className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-border cursor-crosshair"
                onClick={(e) => handleFaceTap(facePickerSlide, e)}
              >
                <img
                  src={facePickerSlide.src}
                  alt="Set face position"
                  className="w-full h-full object-cover pointer-events-none"
                />
                <div
                  className="absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary border-2 border-white shadow-lg pointer-events-none"
                  style={{ left: `${facePickerSlide.focalX}%`, top: `${facePickerSlide.focalY}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">On a computer</p>
                  <div
                    className="relative aspect-video rounded-md overflow-hidden border border-border"
                  >
                    <img
                      src={facePickerSlide.src}
                      alt=""
                      className="w-full h-full object-cover"
                      style={{ objectPosition: `${facePickerSlide.focalX}% ${facePickerSlide.focalY}%` }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">On a phone</p>
                  <div className="relative aspect-[9/16] max-h-28 mx-auto rounded-md overflow-hidden border border-border">
                    <img
                      src={facePickerSlide.src}
                      alt=""
                      className="w-full h-full object-cover"
                      style={{ objectPosition: `${facePickerSlide.focalX}% ${facePickerSlide.focalY}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs text-muted-foreground mb-1">What's in the picture? (short)</label>
                <input
                  type="text"
                  value={descDrafts[facePickerSlide.id] ?? ""}
                  onChange={(e) => setDescDrafts((prev) => ({ ...prev, [facePickerSlide.id]: e.target.value }))}
                  onBlur={() => saveDescription(facePickerSlide)}
                  placeholder="e.g. Woman holding our Faraway Body Butter"
                  className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">Google and blind visitors read this.</p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
              Click "Set face" on any picture to choose where its face is, so it's never cropped out on mobile or desktop.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroManager;
