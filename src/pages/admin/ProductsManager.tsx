import { useEffect, useState, useRef } from "react";
import { Trash2, Plus, Loader2, Pencil, Search, GripVertical, ChevronUp, ChevronDown } from "lucide-react";
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

interface SizePrice {
  retail: number;
  wholesale?: number;
  wholesaleQty?: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  badge: string | null;
  description: string;
  benefits: string[];
  usage: string;
  ingredients: string[];
  sizes: string[];
  prices: Record<string, SizePrice>;
  image: string | null;
  sortOrder: number;
  isActive: boolean;
}

interface SizeRow {
  size: string;
  retail: string;
  wholesale: string;
  wholesaleQty: string;
}

interface FormState {
  id: string | null;
  name: string;
  category: string;
  badge: string;
  description: string;
  benefits: string;
  usage: string;
  ingredients: string;
  sizeRows: SizeRow[];
  imageFile: File | null;
  existingImage: string | null;
}

const emptySizeRow: SizeRow = { size: "", retail: "", wholesale: "", wholesaleQty: "" };

const emptyForm: FormState = {
  id: null,
  name: "",
  category: "",
  badge: "",
  description: "",
  benefits: "",
  usage: "",
  ingredients: "",
  sizeRows: [{ ...emptySizeRow }],
  imageFile: null,
  existingImage: null,
};

const sizeRowsFromProduct = (sizes: string[], prices: Record<string, SizePrice>): SizeRow[] => {
  const rows = sizes.map((size) => ({
    size,
    retail: prices[size]?.retail !== undefined ? String(prices[size].retail) : "",
    wholesale: prices[size]?.wholesale !== undefined ? String(prices[size].wholesale) : "",
    wholesaleQty: prices[size]?.wholesaleQty || "",
  }));
  return rows.length > 0 ? rows : [{ ...emptySizeRow }];
};

const ProductsManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragIndexRef = useRef<number | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await apiGet("products");
      setProducts(data);
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

  const openEditDialog = (p: Product) => {
    setForm({
      id: p.id,
      name: p.name,
      category: p.category,
      badge: p.badge || "",
      description: p.description,
      benefits: p.benefits.join("\n"),
      usage: p.usage,
      ingredients: p.ingredients.join(", "),
      sizeRows: sizeRowsFromProduct(p.sizes, p.prices),
      imageFile: null,
      existingImage: p.image,
    });
    setDialogOpen(true);
  };

  const updateSizeRow = (index: number, field: keyof SizeRow, value: string) => {
    setForm((f) => ({
      ...f,
      sizeRows: f.sizeRows.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    }));
  };

  const addSizeRow = () => {
    setForm((f) => ({ ...f, sizeRows: [...f.sizeRows, { ...emptySizeRow }] }));
  };

  const removeSizeRow = (index: number) => {
    setForm((f) => ({ ...f, sizeRows: f.sizeRows.filter((_, i) => i !== index) }));
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.description.trim()) {
      setError("Name and description are required");
      return;
    }
    setSaving(true);
    setError("");

    const benefits = form.benefits.split("\n").map((b) => b.trim()).filter(Boolean);
    const ingredients = form.ingredients.split(",").map((i) => i.trim()).filter(Boolean);

    const validRows = form.sizeRows.filter((row) => row.size.trim() && row.retail.trim());
    const sizes = validRows.map((row) => row.size.trim());
    const prices: Record<string, SizePrice> = {};
    validRows.forEach((row) => {
      const retail = Number(row.retail);
      if (Number.isNaN(retail)) return;
      const entry: SizePrice = { retail };
      if (row.wholesale.trim()) {
        const wholesale = Number(row.wholesale);
        if (!Number.isNaN(wholesale)) entry.wholesale = wholesale;
      }
      if (row.wholesaleQty.trim()) entry.wholesaleQty = row.wholesaleQty.trim();
      prices[row.size.trim()] = entry;
    });

    try {
      const formData = new FormData();
      if (form.id) {
        formData.append("_method", "PUT");
        formData.append("id", form.id);
      }
      formData.append("name", form.name.trim());
      formData.append("category", form.category.trim());
      formData.append("badge", form.badge.trim());
      formData.append("description", form.description.trim());
      formData.append("usage", form.usage.trim());
      formData.append("benefits", JSON.stringify(benefits));
      formData.append("ingredients", JSON.stringify(ingredients));
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("prices", JSON.stringify(prices));
      if (form.imageFile) formData.append("image", form.imageFile);
      await apiPost("products", formData);

      setDialogOpen(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Remove ${name}? This cannot be undone.`)) return;
    try {
      await apiDelete("products", id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const toggleActive = async (p: Product) => {
    const nextActive = !p.isActive;
    setProducts((prev) => prev.map((x) => (x.id === p.id ? { ...x, isActive: nextActive } : x)));
    try {
      await apiPut("products", { id: p.id, isActive: nextActive });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
      load();
    }
  };

  const reorderTo = async (fromIndex: number, toIndex: number) => {
    const reordered = [...products];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    setProducts(reordered);
    try {
      await apiPut("products", { reorder: reordered.map((p) => p.id) });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reorder failed");
      load();
    }
  };

  const handleDragStart = (index: number) => {
    dragIndexRef.current = index;
  };
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (index: number) => {
    const fromIndex = dragIndexRef.current;
    dragIndexRef.current = null;
    if (fromIndex === null || fromIndex === index) return;
    reorderTo(fromIndex, index);
  };
  const moveUp = (index: number) => {
    if (index === 0) return;
    reorderTo(index, index - 1);
  };
  const moveDown = (index: number) => {
    if (index === products.length - 1) return;
    reorderTo(index, index + 1);
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
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
          <h2 className="text-lg font-semibold text-foreground">Products</h2>
          <p className="text-sm text-muted-foreground">
            {products.length} products · drag or use the arrows to reorder how they appear on the site
          </p>
        </div>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2" size={16} />
          Add Product
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative max-w-sm flex-1 min-w-[220px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or category..."
            className="pl-9"
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2 mb-4">{error}</p>
      )}

      <div className="space-y-3">
        {filtered.map((p, index) => (
          <div
            key={p.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            className="flex flex-col sm:flex-row gap-4 rounded-xl border border-border bg-card p-4 cursor-move"
          >
            <div className="relative flex-shrink-0 w-full sm:w-24">
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full aspect-square object-cover rounded-lg border border-border"
                />
              ) : (
                <div className="w-full aspect-square rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-xs">
                  No photo
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.category || "No category"}
                    {p.badge ? ` · ${p.badge}` : ""}
                  </p>
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
                    disabled={index === products.length - 1}
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted disabled:opacity-30 transition-colors"
                    aria-label="Move down"
                  >
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{p.description}</p>

              <div className="flex flex-wrap items-center gap-2">
                {p.sizes.map((size) => (
                  <span key={size} className="px-2 py-0.5 bg-muted rounded-full text-xs text-foreground">
                    {size}
                    {p.prices[size]?.retail !== undefined ? ` · GH₵${p.prices[size].retail}` : ""}
                  </span>
                ))}

                <button
                  type="button"
                  onClick={() => toggleActive(p)}
                  aria-pressed={p.isActive}
                  className={`ml-auto relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
                    p.isActive ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      p.isActive ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className="text-xs text-foreground">{p.isActive ? "Showing" : "Hidden"}</span>

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
              </div>
            </div>

            <div className="hidden sm:flex items-center text-muted-foreground">
              <GripVertical size={18} />
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">No products match your search.</p>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit Product" : "Add Product"}</DialogTitle>
            <DialogDescription>
              {form.id ? "Update this product's details below." : "Fill in the details for the new product."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
              <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
                <Input
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  placeholder="e.g. Moisturizing"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Badge (optional)</label>
                <Input
                  value={form.badge}
                  onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))}
                  placeholder="e.g. New, Bestseller"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Benefits (one per line)
              </label>
              <Textarea
                value={form.benefits}
                onChange={(e) => setForm((f) => ({ ...f, benefits: e.target.value }))}
                rows={4}
                placeholder={"Deep moisturizing\nFades stretch marks\n..."}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">How to use</label>
              <Textarea
                value={form.usage}
                onChange={(e) => setForm((f) => ({ ...f, usage: e.target.value }))}
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Ingredients (comma-separated)
              </label>
              <Input
                value={form.ingredients}
                onChange={(e) => setForm((f) => ({ ...f, ingredients: e.target.value }))}
                placeholder="Shea Butter, Coconut Oil, Vitamin E"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Sizes & prices (GH₵)</label>
              <div className="space-y-2">
                {form.sizeRows.map((row, index) => (
                  <div key={index} className="grid grid-cols-[1fr_1fr_1fr_1.4fr_auto] gap-1.5 items-center">
                    <Input
                      value={row.size}
                      onChange={(e) => updateSizeRow(index, "size", e.target.value)}
                      placeholder="Size e.g. 150ml"
                      className="text-sm"
                    />
                    <Input
                      value={row.retail}
                      onChange={(e) => updateSizeRow(index, "retail", e.target.value)}
                      placeholder="Retail"
                      type="number"
                      className="text-sm"
                    />
                    <Input
                      value={row.wholesale}
                      onChange={(e) => updateSizeRow(index, "wholesale", e.target.value)}
                      placeholder="Wholesale"
                      type="number"
                      className="text-sm"
                    />
                    <Input
                      value={row.wholesaleQty}
                      onChange={(e) => updateSizeRow(index, "wholesaleQty", e.target.value)}
                      placeholder="e.g. 24 in a carton"
                      className="text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeSizeRow(index)}
                      className="text-muted-foreground hover:text-destructive p-1.5"
                      aria-label="Remove size"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={addSizeRow}>
                <Plus size={14} className="mr-1.5" />
                Add Size
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Photo</label>
              <div className="flex items-center gap-3">
                {(form.imageFile || form.existingImage) && (
                  <img
                    src={form.imageFile ? URL.createObjectURL(form.imageFile) : form.existingImage!}
                    alt="Preview"
                    className="w-16 h-16 rounded-lg object-cover border border-border"
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
              {form.id ? "Save Changes" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsManager;
