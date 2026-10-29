import { useEffect, useState, useRef } from "react";
import { Trash2, Plus, Loader2, Pencil, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/adminApi";

interface Partner {
  id: string;
  name: string;
  phone: string[];
  momoPhone: string | null;
  locations: string[];
  region: string;
  roles: string[];
  image: string | null;
}

const REGIONS = [
  { id: "greater-accra", name: "Greater Accra Region" },
  { id: "tema", name: "Tema" },
  { id: "central", name: "Central Region" },
  { id: "kasoa", name: "Kasoa" },
  { id: "ashanti", name: "Ashanti Region" },
  { id: "bono-east", name: "Bono East Region" },
  { id: "bono", name: "Bono Region" },
  { id: "western-north", name: "Western North Region" },
  { id: "western", name: "Western Region" },
  { id: "eastern", name: "Eastern Region" },
  { id: "northern", name: "Northern Region" },
  { id: "volta", name: "Volta Region" },
  { id: "uk", name: "United Kingdom" },
];

const ROLES = ["distributor", "ambassador", "vendor", "pa"];

interface FormState {
  id: string | null;
  name: string;
  phone1: string;
  phone2: string;
  momoPhone: string;
  locations: string;
  region: string;
  roles: string[];
  imageFile: File | null;
  existingImage: string | null;
}

const emptyForm: FormState = {
  id: null,
  name: "",
  phone1: "",
  phone2: "",
  momoPhone: "",
  locations: "",
  region: "greater-accra",
  roles: [],
  imageFile: null,
  existingImage: null,
};

const PartnersManager = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await apiGet("partners");
      setPartners(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openAddDialog = () => {
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEditDialog = (p: Partner) => {
    setForm({
      id: p.id,
      name: p.name,
      phone1: p.phone[0] || "",
      phone2: p.phone[1] || "",
      momoPhone: p.momoPhone || "",
      locations: p.locations.join(", "),
      region: p.region,
      roles: p.roles,
      imageFile: null,
      existingImage: p.image,
    });
    setDialogOpen(true);
  };

  const toggleRole = (role: string) => {
    setForm((f) => ({
      ...f,
      roles: f.roles.includes(role) ? f.roles.filter((r) => r !== role) : [...f.roles, role],
    }));
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.region) {
      setError("Name and region are required");
      return;
    }
    setSaving(true);
    setError("");

    const locations = form.locations
      .split(",")
      .map((l) => l.trim())
      .filter(Boolean);
    const phone = [form.phone1, form.phone2].filter(Boolean);

    try {
      if (form.id) {
        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("id", form.id);
        formData.append("name", form.name.trim());
        formData.append("region", form.region);
        formData.append("phone", JSON.stringify(phone));
        formData.append("momoPhone", form.momoPhone);
        formData.append("locations", JSON.stringify(locations));
        formData.append("roles", JSON.stringify(form.roles));
        if (form.imageFile) formData.append("image", form.imageFile);
        await apiPost("partners", formData);
      } else {
        const formData = new FormData();
        formData.append("name", form.name.trim());
        formData.append("region", form.region);
        formData.append("phone", JSON.stringify(phone));
        formData.append("momoPhone", form.momoPhone);
        formData.append("locations", JSON.stringify(locations));
        formData.append("roles", JSON.stringify(form.roles));
        if (form.imageFile) formData.append("image", form.imageFile);
        await apiPost("partners", formData);
      }
      setDialogOpen(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Remove ${name} from the partners list? This cannot be undone.`)) return;
    try {
      await apiDelete("partners", id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const filtered = partners
    .filter((p) => roleFilter === "all" || p.roles.includes(roleFilter))
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.locations.some((l) => l.toLowerCase().includes(search.toLowerCase())) ||
        p.phone.some((ph) => ph.includes(search))
    );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Partners & Distributors</h2>
          <p className="text-sm text-muted-foreground">{partners.length} partners total</p>
        </div>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2" size={16} />
          Add Partner
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative max-w-sm flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, location, or phone..."
            className="pl-9"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {ROLES.map((role) => (
              <SelectItem key={role} value={role} className="capitalize">
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2 mb-4">{error}</p>
      )}

      <div className="rounded-xl border border-border overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-muted/50 text-left text-muted-foreground">
            <tr>
              <th className="px-4 py-2.5 font-medium">Photo</th>
              <th className="px-4 py-2.5 font-medium">Name</th>
              <th className="px-4 py-2.5 font-medium">Phone</th>
              <th className="px-4 py-2.5 font-medium">Location(s)</th>
              <th className="px-4 py-2.5 font-medium">Region</th>
              <th className="px-4 py-2.5 font-medium">Roles</th>
              <th className="px-4 py-2.5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-border hover:bg-muted/30">
                <td className="px-4 py-2.5">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-10 h-10 rounded-full object-cover border border-border"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
                      —
                    </div>
                  )}
                </td>
                <td className="px-4 py-2.5 font-medium text-foreground">{p.name}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{p.phone.join(", ") || "—"}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{p.locations.join(", ") || "—"}</td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  {REGIONS.find((r) => r.id === p.region)?.name || p.region}
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">{p.roles.join(", ") || "—"}</td>
                <td className="px-4 py-2.5 text-right">
                  <button
                    onClick={() => openEditDialog(p)}
                    className="text-muted-foreground hover:text-primary p-1.5 inline-flex"
                    aria-label="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id, p.name)}
                    className="text-muted-foreground hover:text-destructive p-1.5 inline-flex"
                    aria-label="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">No partners match your search.</p>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit Partner" : "Add Partner"}</DialogTitle>
            <DialogDescription>
              {form.id ? "Update this partner's details below." : "Fill in the details for the new partner."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
              <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Phone 1</label>
                <Input value={form.phone1} onChange={(e) => setForm((f) => ({ ...f, phone1: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Phone 2 (optional)</label>
                <Input value={form.phone2} onChange={(e) => setForm((f) => ({ ...f, phone2: e.target.value }))} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">MoMo Number (optional)</label>
              <Input value={form.momoPhone} onChange={(e) => setForm((f) => ({ ...f, momoPhone: e.target.value }))} />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Locations (comma-separated)
              </label>
              <Input
                value={form.locations}
                onChange={(e) => setForm((f) => ({ ...f, locations: e.target.value }))}
                placeholder="e.g. Madina, Dodowa, Adenta"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Region</label>
              <Select value={form.region} onValueChange={(v) => setForm((f) => ({ ...f, region: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REGIONS.map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Roles</label>
              <div className="flex flex-wrap gap-2">
                {ROLES.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => toggleRole(role)}
                    className={`px-3 py-1.5 rounded-full text-sm capitalize transition-colors ${
                      form.roles.includes(role)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Photo (optional)</label>
              <div className="flex items-center gap-3">
                {(form.imageFile || form.existingImage) && (
                  <img
                    src={form.imageFile ? URL.createObjectURL(form.imageFile) : form.existingImage!}
                    alt="Preview"
                    className="w-14 h-14 rounded-full object-cover border border-border"
                  />
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => setForm((f) => ({ ...f, imageFile: e.target.files?.[0] || null }))}
                />
                <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                  {form.existingImage || form.imageFile ? "Change Photo" : "Upload Photo"}
                </Button>
              </div>
            </div>
          </div>

          {error && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</p>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
              {form.id ? "Save Changes" : "Add Partner"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PartnersManager;
