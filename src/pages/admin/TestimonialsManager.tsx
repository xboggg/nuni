import { useEffect, useState, useRef } from "react";
import { Trash2, Plus, Loader2, Pencil, Star, GripVertical, ChevronUp, ChevronDown, Image as ImageIcon, Video as VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/adminApi";

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  product: string;
  sortOrder: number;
  isActive: boolean;
}

interface Media {
  id: number;
  type: "image" | "video";
  src: string;
  thumbnail: string | null;
  sortOrder: number;
  isActive: boolean;
}

interface ReviewFormState {
  id: number | null;
  name: string;
  location: string;
  rating: number;
  text: string;
  product: string;
}

const emptyReviewForm: ReviewFormState = {
  id: null,
  name: "",
  location: "",
  rating: 5,
  text: "",
  product: "",
};

const TestimonialsManager = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ReviewFormState>(emptyReviewForm);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);
  const pendingVideoFile = useRef<File | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const [reviewData, mediaData] = await Promise.all([
        apiGet("testimonials"),
        apiGet("testimonial-media"),
      ]);
      setReviews(reviewData);
      setMedia(mediaData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // --- Reviews ---

  const openAddReview = () => {
    setForm(emptyReviewForm);
    setDialogOpen(true);
  };

  const openEditReview = (r: Review) => {
    setForm({ id: r.id, name: r.name, location: r.location, rating: r.rating, text: r.text, product: r.product });
    setDialogOpen(true);
  };

  const handleSaveReview = async () => {
    if (!form.name.trim() || !form.text.trim()) {
      setError("Name and review text are required");
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (form.id) {
        await apiPut("testimonials", {
          id: form.id,
          name: form.name.trim(),
          location: form.location.trim(),
          rating: form.rating,
          text: form.text.trim(),
          product: form.product.trim(),
        });
      } else {
        await apiPost("testimonials", {
          name: form.name.trim(),
          location: form.location.trim(),
          rating: form.rating,
          text: form.text.trim(),
          product: form.product.trim(),
        });
      }
      setDialogOpen(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteReview = async (id: number, name: string) => {
    if (!confirm(`Remove ${name}'s review? This cannot be undone.`)) return;
    try {
      await apiDelete("testimonials", id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const toggleReviewActive = async (r: Review) => {
    const nextActive = !r.isActive;
    setReviews((prev) => prev.map((x) => (x.id === r.id ? { ...x, isActive: nextActive } : x)));
    try {
      await apiPut("testimonials", { id: r.id, isActive: nextActive });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
      load();
    }
  };

  const reviewDragIndexRef = useRef<number | null>(null);
  const reorderReviewsTo = async (fromIndex: number, toIndex: number) => {
    const reordered = [...reviews];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    setReviews(reordered);
    try {
      await apiPut("testimonials", { reorder: reordered.map((r) => r.id) });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reorder failed");
      load();
    }
  };
  const moveReviewUp = (i: number) => i > 0 && reorderReviewsTo(i, i - 1);
  const moveReviewDown = (i: number) => i < reviews.length - 1 && reorderReviewsTo(i, i + 1);

  // --- Media ---

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("type", "image");
      formData.append("file", file);
      await apiPost("testimonial-media", formData);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingImage(false);
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    pendingVideoFile.current = file;
    thumbInputRef.current?.click();
  };

  const handleThumbSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const thumbFile = e.target.files?.[0];
    const videoFile = pendingVideoFile.current;
    if (!videoFile) return;
    setUploadingVideo(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("type", "video");
      formData.append("file", videoFile);
      if (thumbFile) formData.append("thumbnail", thumbFile);
      await apiPost("testimonial-media", formData);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingVideo(false);
      pendingVideoFile.current = null;
      if (videoInputRef.current) videoInputRef.current.value = "";
      if (thumbInputRef.current) thumbInputRef.current.value = "";
    }
  };

  const handleDeleteMedia = async (id: number) => {
    if (!confirm("Remove this from the testimonials gallery? This cannot be undone.")) return;
    try {
      await apiDelete("testimonial-media", id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const toggleMediaActive = async (m: Media) => {
    const nextActive = !m.isActive;
    setMedia((prev) => prev.map((x) => (x.id === m.id ? { ...x, isActive: nextActive } : x)));
    try {
      await apiPut("testimonial-media", { id: m.id, isActive: nextActive });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
      load();
    }
  };

  const mediaDragIndexRef = useRef<number | null>(null);
  const handleMediaDrop = async (index: number) => {
    const fromIndex = mediaDragIndexRef.current;
    mediaDragIndexRef.current = null;
    if (fromIndex === null || fromIndex === index) return;
    const reordered = [...media];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(index, 0, moved);
    setMedia(reordered);
    try {
      await apiPut("testimonial-media", { reorder: reordered.map((m) => m.id) });
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
    <div className="space-y-10">
      {error && (
        <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</p>
      )}

      {/* Text reviews */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Written Reviews</h2>
            <p className="text-sm text-muted-foreground">{reviews.length} reviews · shown on the homepage and testimonials page</p>
          </div>
          <Button onClick={openAddReview}>
            <Plus className="mr-2" size={16} />
            Add Review
          </Button>
        </div>

        <div className="space-y-3">
          {reviews.map((r, index) => (
            <div
              key={r.id}
              draggable
              onDragStart={() => (reviewDragIndexRef.current = index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                const from = reviewDragIndexRef.current;
                reviewDragIndexRef.current = null;
                if (from !== null && from !== index) reorderReviewsTo(from, index);
              }}
              className="flex gap-3 rounded-xl border border-border bg-card p-4 cursor-move"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <p className="font-medium text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.location}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => moveReviewUp(index)} disabled={index === 0} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted disabled:opacity-30">
                      <ChevronUp size={16} />
                    </button>
                    <button onClick={() => moveReviewDown(index)} disabled={index === reviews.length - 1} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted disabled:opacity-30">
                      <ChevronDown size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < r.rating ? "text-accent fill-accent" : "text-muted"} />
                  ))}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{r.text}</p>

                <div className="flex flex-wrap items-center gap-2">
                  {r.product && (
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">{r.product}</span>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleReviewActive(r)}
                    aria-pressed={r.isActive}
                    className={`ml-auto relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
                      r.isActive ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${r.isActive ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                  <span className="text-xs text-foreground">{r.isActive ? "Showing" : "Hidden"}</span>
                  <button onClick={() => openEditReview(r)} className="text-muted-foreground hover:text-primary p-1.5" aria-label="Edit">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDeleteReview(r.id, r.name)} className="text-muted-foreground hover:text-destructive p-1.5" aria-label="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="hidden sm:flex items-center text-muted-foreground">
                <GripVertical size={18} />
              </div>
            </div>
          ))}
          {reviews.length === 0 && (
            <p className="text-center text-muted-foreground py-8 border border-dashed border-border rounded-xl">No reviews yet.</p>
          )}
        </div>
      </div>

      {/* Photo/video gallery */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Photo & Video Gallery</h2>
            <p className="text-sm text-muted-foreground">{media.length} items · shown on the Testimonials page</p>
          </div>
          <div className="flex items-center gap-2">
            <input ref={imageInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleImageSelect} />
            <Button variant="outline" onClick={() => imageInputRef.current?.click()} disabled={uploadingImage}>
              {uploadingImage ? <Loader2 className="animate-spin mr-2" size={16} /> : <ImageIcon className="mr-2" size={16} />}
              Add Photo
            </Button>
            <input ref={videoInputRef} type="file" accept="video/mp4,video/quicktime,video/webm" className="hidden" onChange={handleVideoSelect} />
            <input ref={thumbInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleThumbSelect} />
            <Button variant="outline" onClick={() => videoInputRef.current?.click()} disabled={uploadingVideo}>
              {uploadingVideo ? <Loader2 className="animate-spin mr-2" size={16} /> : <VideoIcon className="mr-2" size={16} />}
              Add Video
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          For a video, you'll be asked to also pick a cover photo (thumbnail) right after choosing the video file.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {media.map((m, index) => (
            <div
              key={m.id}
              draggable
              onDragStart={() => (mediaDragIndexRef.current = index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleMediaDrop(index)}
              className="relative rounded-xl overflow-hidden border border-border cursor-move group"
            >
              <img
                src={m.type === "video" && m.thumbnail ? m.thumbnail : m.src}
                alt=""
                className="w-full aspect-square object-cover"
              />
              {m.type === "video" && (
                <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                  <VideoIcon size={12} /> Video
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2">
                <button
                  type="button"
                  onClick={() => toggleMediaActive(m)}
                  className={`text-xs px-2 py-1 rounded-full font-medium ${m.isActive ? "bg-primary text-white" : "bg-white/80 text-foreground"}`}
                >
                  {m.isActive ? "Showing" : "Hidden"}
                </button>
                <button
                  onClick={() => handleDeleteMedia(m.id)}
                  className="w-7 h-7 rounded-full bg-destructive text-white flex items-center justify-center"
                  aria-label="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
        {media.length === 0 && (
          <p className="text-center text-muted-foreground py-8 border border-dashed border-border rounded-xl">No photos or videos yet.</p>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit Review" : "Add Review"}</DialogTitle>
            <DialogDescription>
              {form.id ? "Update this review below." : "Fill in the details for the new review."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="e.g. Akosua M." />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Location</label>
                <Input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} placeholder="e.g. Accra, Ghana" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" onClick={() => setForm((f) => ({ ...f, rating: n }))}>
                    <Star size={22} className={n <= form.rating ? "text-accent fill-accent" : "text-muted"} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Review text</label>
              <Textarea value={form.text} onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))} rows={4} />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Product (optional)</label>
              <Input value={form.product} onChange={(e) => setForm((f) => ({ ...f, product: e.target.value }))} placeholder="e.g. Acne Dark Soap" />
            </div>
          </div>

          {error && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</p>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveReview} disabled={saving}>
              {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
              {form.id ? "Save Changes" : "Add Review"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestimonialsManager;
