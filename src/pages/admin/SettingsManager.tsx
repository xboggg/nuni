import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiGet, apiPut } from "@/lib/adminApi";

const SettingsManager = () => {
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await apiGet("settings");
      setWhatsapp(data.contactWhatsapp || "");
      setEmail(data.contactEmail || "");
      setLocation(data.contactLocation || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      await apiPut("settings", {
        contactWhatsapp: whatsapp.trim(),
        contactEmail: email.trim(),
        contactLocation: location.trim(),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
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
    <div className="max-w-xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Contact Details</h2>
        <p className="text-sm text-muted-foreground">
          This WhatsApp number powers every "Order on WhatsApp" button on the main site. Changing
          it updates all of them at once.
        </p>
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</p>
      )}

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          WhatsApp / Phone Number
        </label>
        <Input
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="233554753634"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Digits only, with country code, no + or spaces. e.g. 233554753634 for +233 55 475 3634.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Location</label>
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Accra, Ghana"
        />
      </div>

      <Button onClick={handleSave} disabled={saving}>
        {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : <Save className="mr-2" size={16} />}
        {saved ? "Saved!" : "Save Changes"}
      </Button>
    </div>
  );
};

export default SettingsManager;
