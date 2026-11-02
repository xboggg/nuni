import { useEffect, useState, useRef } from "react";
import { Trash2, Plus, Loader2, GripVertical, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/adminApi";

interface CommunityData {
  [key: string]: string;
}

interface VideoItem {
  id: number;
  src: string;
  title: string;
  sortOrder: number;
  isActive: boolean;
}

const emptyData: CommunityData = {
  badge: "", heroTitle: "", heroTitleHighlight: "", heroDescription: "",
  healthcareSupport: "", healthcareSupportDesc: "",
  communityOutreach: "", communityOutreachDesc: "",
  institutionalPartnerships: "", institutionalPartnershipsDesc: "",
  healthcareInitiativeBadge: "", healthcareTitle: "", healthcareTitleHighlight: "", healthcareDescription: "",
  letterTitle: "", letterDescription: "",
  activitiesBadge: "", activitiesTitle: "", activitiesTitleHighlight: "", activitiesDescription: "",
  ctaTitle: "", ctaDescription: "",
};

const Field = ({
  label, value, onChange, textarea,
}: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) => (
  <div>
    <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
    {textarea ? (
      <Textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} />
    ) : (
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    )}
  </div>
);

const CommunityManager = () => {
  const [data, setData] = useState<CommunityData>(emptyData);
  const [letterImage, setLetterImage] = useState<string | null>(null);
  const [letterImageFile, setLetterImageFile] = useState<File | null>(null);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const letterFileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const dragIndexRef = useRef<number | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const [communityData, videosData] = await Promise.all([
        apiGet("community"),
        apiGet("community-videos"),
      ]);
      setData({ ...emptyData, ...communityData });
      setLetterImage(communityData.letterImage || null);
      setVideos(videosData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const set = (key: string) => (value: string) => setData((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (letterImageFile) formData.append("letterImage", letterImageFile);
      await apiPost("community", formData);
      setLetterImageFile(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingVideo(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", newVideoTitle);
      await apiPost("community-videos", formData);
      setNewVideoTitle("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingVideo(false);
      if (videoFileInputRef.current) videoFileInputRef.current.value = "";
    }
  };

  const handleVideoDelete = async (id: number) => {
    if (!confirm("Remove this video? This cannot be undone.")) return;
    try {
      await apiDelete("community-videos", id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const handleVideoToggle = async (id: number, isActive: boolean) => {
    try {
      await apiPut("community-videos", { id, isActive: !isActive });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  };

  const handleVideoTitleBlur = async (id: number, title: string) => {
    try {
      await apiPut("community-videos", { id, title });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  };

  const handleVideoDrop = async (dropIndex: number) => {
    const fromIndex = dragIndexRef.current;
    dragIndexRef.current = null;
    if (fromIndex === null || fromIndex === dropIndex) return;
    const reordered = [...videos];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(dropIndex, 0, moved);
    setVideos(reordered);
    try {
      await apiPut("community-videos", { reorder: reordered.map((v) => v.id) });
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
      <div className="flex flex-wrap items-center justify-between gap-4 sticky top-0 bg-background/95 backdrop-blur py-3 z-10 -mx-1 px-1">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Community Impact Page</h2>
          <p className="text-sm text-muted-foreground">English text shown to all visitors on this page.</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : <Save className="mr-2" size={16} />}
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      {error && <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</p>}

      <section>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">Hero</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Badge" value={data.badge} onChange={set("badge")} />
          <Field label="Title" value={data.heroTitle} onChange={set("heroTitle")} />
          <Field label="Title Highlight (gold text)" value={data.heroTitleHighlight} onChange={set("heroTitleHighlight")} />
          <div className="md:col-span-2">
            <Field label="Description" value={data.heroDescription} onChange={set("heroDescription")} textarea />
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">Mission Cards</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2 border border-border rounded-lg p-3">
            <Field label="Card 1 Title" value={data.healthcareSupport} onChange={set("healthcareSupport")} />
            <Field label="Card 1 Description" value={data.healthcareSupportDesc} onChange={set("healthcareSupportDesc")} textarea />
          </div>
          <div className="space-y-2 border border-border rounded-lg p-3">
            <Field label="Card 2 Title" value={data.communityOutreach} onChange={set("communityOutreach")} />
            <Field label="Card 2 Description" value={data.communityOutreachDesc} onChange={set("communityOutreachDesc")} textarea />
          </div>
          <div className="space-y-2 border border-border rounded-lg p-3">
            <Field label="Card 3 Title" value={data.institutionalPartnerships} onChange={set("institutionalPartnerships")} />
            <Field label="Card 3 Description" value={data.institutionalPartnershipsDesc} onChange={set("institutionalPartnershipsDesc")} textarea />
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">Healthcare Partnership</h3>
        <div className="flex items-center gap-4 mb-4">
          {(letterImageFile || letterImage) && (
            <img
              src={letterImageFile ? URL.createObjectURL(letterImageFile) : letterImage!}
              alt="Letter of appreciation"
              className="w-24 h-24 rounded-lg object-cover border border-border"
            />
          )}
          <input
            ref={letterFileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => setLetterImageFile(e.target.files?.[0] || null)}
          />
          <Button type="button" variant="outline" size="sm" onClick={() => letterFileInputRef.current?.click()}>
            {letterImage || letterImageFile ? "Change Photo" : "Upload Photo"}
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Badge" value={data.healthcareInitiativeBadge} onChange={set("healthcareInitiativeBadge")} />
          <Field label="Title" value={data.healthcareTitle} onChange={set("healthcareTitle")} />
          <Field label="Title Highlight (gold text)" value={data.healthcareTitleHighlight} onChange={set("healthcareTitleHighlight")} />
          <div className="md:col-span-2">
            <Field label="Description" value={data.healthcareDescription} onChange={set("healthcareDescription")} textarea />
          </div>
          <Field label="Letter Title" value={data.letterTitle} onChange={set("letterTitle")} />
          <Field label="Letter Caption" value={data.letterDescription} onChange={set("letterDescription")} />
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">Video Gallery</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Field label="Badge" value={data.activitiesBadge} onChange={set("activitiesBadge")} />
          <Field label="Title" value={data.activitiesTitle} onChange={set("activitiesTitle")} />
          <Field label="Title Highlight (gold text)" value={data.activitiesTitleHighlight} onChange={set("activitiesTitleHighlight")} />
          <div className="md:col-span-2">
            <Field label="Description" value={data.activitiesDescription} onChange={set("activitiesDescription")} textarea />
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-3 mb-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Title for next upload</label>
            <Input
              value={newVideoTitle}
              onChange={(e) => setNewVideoTitle(e.target.value)}
              placeholder="e.g. Hospital Outreach"
              className="w-56"
            />
          </div>
          <input
            ref={videoFileInputRef}
            type="file"
            accept="video/mp4,video/quicktime,video/webm"
            className="hidden"
            onChange={handleVideoUpload}
          />
          <Button type="button" size="sm" onClick={() => videoFileInputRef.current?.click()} disabled={uploadingVideo}>
            {uploadingVideo ? <Loader2 className="animate-spin mr-2" size={14} /> : <Plus className="mr-2" size={14} />}
            Add Video
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video, index) => (
            <div
              key={video.id}
              draggable
              onDragStart={() => (dragIndexRef.current = index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleVideoDrop(index)}
              className="group relative rounded-xl overflow-hidden border border-border bg-black cursor-move"
            >
              <video src={video.src} className="w-full aspect-video object-cover" muted playsInline preload="metadata" />
              <div className="absolute top-2 left-2 bg-card/90 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical size={14} className="text-muted-foreground" />
              </div>
              <button
                onClick={() => handleVideoDelete(video.id)}
                className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Delete"
              >
                <Trash2 size={14} />
              </button>
              <button
                type="button"
                onClick={() => handleVideoToggle(video.id, video.isActive)}
                className={`absolute bottom-10 left-2 text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  video.isActive ? "bg-primary text-primary-foreground" : "bg-muted-foreground/60 text-white"
                }`}
              >
                {video.isActive ? "Showing" : "Hidden"}
              </button>
              <input
                defaultValue={video.title}
                onBlur={(e) => handleVideoTitleBlur(video.id, e.target.value)}
                placeholder="Title"
                className="w-full text-xs px-1.5 py-1 bg-card border-t border-border outline-none"
              />
            </div>
          ))}
        </div>
        {videos.length === 0 && <p className="text-sm text-muted-foreground py-6">No videos yet.</p>}
      </section>

      <section>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">Bottom Call to Action</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Title" value={data.ctaTitle} onChange={set("ctaTitle")} />
          <div className="md:col-span-2">
            <Field label="Description" value={data.ctaDescription} onChange={set("ctaDescription")} textarea />
          </div>
        </div>
      </section>

      <div className="flex justify-end pb-6">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : <Save className="mr-2" size={16} />}
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default CommunityManager;
