import { useEffect, useState, useRef } from "react";
import { Trash2, Plus, Loader2, GripVertical, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/adminApi";

interface AboutData {
  [key: string]: string;
}

interface MediaItem {
  id: number;
  src: string;
  title?: string;
  sortOrder: number;
  isActive: boolean;
}

const emptyAbout: AboutData = {
  badge: "", title: "", titleHighlight: "", description: "",
  ceoName: "", ceoRole: "", ceoBio: "", ceoQuote: "",
  statPartners: "", statPartnersLabel: "", statProducts: "", statProductsLabel: "", statRegions: "", statRegionsLabel: "",
  awardsBadge: "", awardsTitle: "", awardsTitleHighlight: "", awardsDescription: "",
  awardStat1Label: "", awardStat1Value: "", awardStat2Label: "", awardStat2Value: "",
  awardStat3Label: "", awardStat3Value: "", awardStat4Label: "", awardStat4Value: "",
  benefit1Title: "", benefit1Desc: "", benefit2Title: "", benefit2Desc: "",
  benefit3Title: "", benefit3Desc: "", benefit4Title: "", benefit4Desc: "",
  reason1Title: "", reason1Desc: "", reason2Title: "", reason2Desc: "", reason3Title: "", reason3Desc: "",
  fdaBadge: "", fdaTitle: "", fdaTitleHighlight: "", fdaDescription: "",
  communityBadge: "", communityTitle: "", communityTitleHighlight: "", communityDesc: "",
  communityPartnershipTitle: "", communityPartnershipDesc: "",
  ctaTitle: "", ctaDesc: "",
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

const MediaGrid = ({
  resource, items, onReload, titled,
}: { resource: string; items: MediaItem[]; onReload: () => void; titled?: boolean }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragIndexRef = useRef<number | null>(null);
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    setError("");
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        await apiPost(resource, formData);
      }
      onReload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Remove this photo? This cannot be undone.")) return;
    try {
      await apiDelete(resource, id);
      onReload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const handleToggle = async (id: number, isActive: boolean) => {
    try {
      await apiPut(resource, { id, isActive: !isActive });
      onReload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  };

  const handleTitleBlur = async (id: number, title: string) => {
    try {
      await apiPut(resource, { id, title });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  };

  const handleDrop = async (dropIndex: number) => {
    const fromIndex = dragIndexRef.current;
    dragIndexRef.current = null;
    if (fromIndex === null || fromIndex === dropIndex) return;
    const reordered = [...items];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(dropIndex, 0, moved);
    try {
      await apiPut(resource, { reorder: reordered.map((m) => m.id) });
      onReload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reorder failed");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={handleUpload}
        />
        <Button type="button" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
          {uploading ? <Loader2 className="animate-spin mr-2" size={14} /> : <Plus className="mr-2" size={14} />}
          Add Photo
        </Button>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => (dragIndexRef.current = index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
            className="group relative rounded-xl overflow-hidden border border-border bg-muted cursor-move"
          >
            <img src={item.src} alt={item.title || ""} className="w-full aspect-square object-cover" loading="lazy" />
            <div className="absolute top-2 left-2 bg-card/90 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <GripVertical size={14} className="text-muted-foreground" />
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Delete"
            >
              <Trash2 size={14} />
            </button>
            <button
              type="button"
              onClick={() => handleToggle(item.id, item.isActive)}
              className={`absolute bottom-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded-full ${
                item.isActive ? "bg-primary text-primary-foreground" : "bg-muted-foreground/60 text-white"
              }`}
            >
              {item.isActive ? "Showing" : "Hidden"}
            </button>
            {titled && (
              <input
                defaultValue={item.title}
                onBlur={(e) => handleTitleBlur(item.id, e.target.value)}
                placeholder="Title"
                className="w-full text-xs px-1.5 py-1 bg-card border-t border-border outline-none"
              />
            )}
          </div>
        ))}
      </div>
      {items.length === 0 && <p className="text-sm text-muted-foreground py-6">No photos yet.</p>}
    </div>
  );
};

const AboutManager = () => {
  const [about, setAbout] = useState<AboutData>(emptyAbout);
  const [ceoImage, setCeoImage] = useState<string | null>(null);
  const [ceoImageFile, setCeoImageFile] = useState<File | null>(null);
  const [awards, setAwards] = useState<MediaItem[]>([]);
  const [certs, setCerts] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const ceoFileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    try {
      const [aboutData, awardsData, certsData] = await Promise.all([
        apiGet("about"),
        apiGet("about-awards"),
        apiGet("about-certs"),
      ]);
      setAbout({ ...emptyAbout, ...aboutData });
      setCeoImage(aboutData.ceoImage || null);
      setAwards(awardsData);
      setCerts(certsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const set = (key: string) => (value: string) => setAbout((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(about));
      if (ceoImageFile) formData.append("ceoImage", ceoImageFile);
      await apiPost("about", formData);
      setCeoImageFile(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
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
          <h2 className="text-lg font-semibold text-foreground">Why NG Cosmetics / About Page</h2>
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
          <Field label="Badge" value={about.badge} onChange={set("badge")} />
          <Field label="Title" value={about.title} onChange={set("title")} />
          <Field label="Title Highlight (gold text)" value={about.titleHighlight} onChange={set("titleHighlight")} />
          <div className="md:col-span-2">
            <Field label="Description" value={about.description} onChange={set("description")} textarea />
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">CEO Section</h3>
        <div className="flex items-center gap-4 mb-4">
          {(ceoImageFile || ceoImage) && (
            <img
              src={ceoImageFile ? URL.createObjectURL(ceoImageFile) : ceoImage!}
              alt="CEO"
              className="w-20 h-20 rounded-full object-cover border border-border"
            />
          )}
          <input
            ref={ceoFileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => setCeoImageFile(e.target.files?.[0] || null)}
          />
          <Button type="button" variant="outline" size="sm" onClick={() => ceoFileInputRef.current?.click()}>
            {ceoImage || ceoImageFile ? "Change CEO Photo" : "Upload CEO Photo"}
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="CEO Name" value={about.ceoName} onChange={set("ceoName")} />
          <Field label="CEO Role" value={about.ceoRole} onChange={set("ceoRole")} />
          <div className="md:col-span-2">
            <Field label="CEO Bio" value={about.ceoBio} onChange={set("ceoBio")} textarea />
          </div>
          <div className="md:col-span-2">
            <Field label="CEO Quote" value={about.ceoQuote} onChange={set("ceoQuote")} textarea />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Field label="Stat 1 Value" value={about.statPartners} onChange={set("statPartners")} />
          <Field label="Stat 1 Label" value={about.statPartnersLabel} onChange={set("statPartnersLabel")} />
          <div />
          <Field label="Stat 2 Value" value={about.statProducts} onChange={set("statProducts")} />
          <Field label="Stat 2 Label" value={about.statProductsLabel} onChange={set("statProductsLabel")} />
          <div />
          <Field label="Stat 3 Value" value={about.statRegions} onChange={set("statRegions")} />
          <Field label="Stat 3 Label" value={about.statRegionsLabel} onChange={set("statRegionsLabel")} />
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">Awards & Recognition</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Field label="Badge" value={about.awardsBadge} onChange={set("awardsBadge")} />
          <Field label="Title" value={about.awardsTitle} onChange={set("awardsTitle")} />
          <Field label="Title Highlight (gold text)" value={about.awardsTitleHighlight} onChange={set("awardsTitleHighlight")} />
          <div className="md:col-span-2">
            <Field label="Description" value={about.awardsDescription} onChange={set("awardsDescription")} textarea />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="space-y-2">
              <Field label={`Stat ${n} Value`} value={about[`awardStat${n}Value`]} onChange={set(`awardStat${n}Value`)} />
              <Field label={`Stat ${n} Label`} value={about[`awardStat${n}Label`]} onChange={set(`awardStat${n}Label`)} />
            </div>
          ))}
        </div>
        <p className="text-sm font-medium text-foreground mb-2">Award Photos</p>
        <MediaGrid resource="about-awards" items={awards} onReload={load} />
      </section>

      <section>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">Benefit Cards</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="space-y-2 border border-border rounded-lg p-3">
              <Field label={`Benefit ${n} Title`} value={about[`benefit${n}Title`]} onChange={set(`benefit${n}Title`)} />
              <Field label={`Benefit ${n} Description`} value={about[`benefit${n}Desc`]} onChange={set(`benefit${n}Desc`)} textarea />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">Additional Reasons</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="space-y-2 border border-border rounded-lg p-3">
              <Field label={`Reason ${n} Title`} value={about[`reason${n}Title`]} onChange={set(`reason${n}Title`)} />
              <Field label={`Reason ${n} Description`} value={about[`reason${n}Desc`]} onChange={set(`reason${n}Desc`)} textarea />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">FDA Certificates</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Field label="Badge" value={about.fdaBadge} onChange={set("fdaBadge")} />
          <Field label="Title" value={about.fdaTitle} onChange={set("fdaTitle")} />
          <Field label="Title Highlight (gold text)" value={about.fdaTitleHighlight} onChange={set("fdaTitleHighlight")} />
          <div className="md:col-span-2">
            <Field label="Description" value={about.fdaDescription} onChange={set("fdaDescription")} textarea />
          </div>
        </div>
        <p className="text-sm font-medium text-foreground mb-2">Certificate Photos (each can have a title)</p>
        <MediaGrid resource="about-certs" items={certs} onReload={load} titled />
      </section>

      <section>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">Community Impact Blurb</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Badge" value={about.communityBadge} onChange={set("communityBadge")} />
          <Field label="Title" value={about.communityTitle} onChange={set("communityTitle")} />
          <Field label="Title Highlight (gold text)" value={about.communityTitleHighlight} onChange={set("communityTitleHighlight")} />
          <div className="md:col-span-2">
            <Field label="Description" value={about.communityDesc} onChange={set("communityDesc")} textarea />
          </div>
          <Field label="Healthcare Partnership Title" value={about.communityPartnershipTitle} onChange={set("communityPartnershipTitle")} />
          <div className="md:col-span-2">
            <Field label="Healthcare Partnership Description" value={about.communityPartnershipDesc} onChange={set("communityPartnershipDesc")} textarea />
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">Bottom Call to Action</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Title" value={about.ctaTitle} onChange={set("ctaTitle")} />
          <div className="md:col-span-2">
            <Field label="Description" value={about.ctaDesc} onChange={set("ctaDesc")} textarea />
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

export default AboutManager;
