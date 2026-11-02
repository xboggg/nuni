// Many components call getWhatsAppLink() / use WHATSAPP_NUMBER synchronously
// (render-time, click handlers), so this can't be a plain async fetch +
// useState per component. Instead it's a module-level cache seeded from
// localStorage (so the very first render already has the last-known-good
// number, no flash of a wrong link) and refreshed from the live API in the
// background; callers always read the current in-memory value.
const STORAGE_KEY = "ngc_contact_info";

interface ContactInfo {
  whatsapp: string;
  email: string;
  location: string;
}

const DEFAULTS: ContactInfo = {
  whatsapp: "233554753634",
  email: "Kofiideas2017@gmail.com",
  location: "Accra, Ghana",
};

function loadCached(): ContactInfo {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw);
    return {
      whatsapp: parsed.whatsapp || DEFAULTS.whatsapp,
      email: parsed.email || DEFAULTS.email,
      location: parsed.location || DEFAULTS.location,
    };
  } catch {
    return DEFAULTS;
  }
}

let current: ContactInfo = loadCached();
let refreshed = false;

export function getContactInfo(): ContactInfo {
  if (!refreshed) refreshContactInfo();
  return current;
}

export async function refreshContactInfo(): Promise<ContactInfo> {
  refreshed = true;
  try {
    const res = await fetch("/admin-api/settings.php");
    if (!res.ok) return current;
    const data = await res.json();
    current = {
      whatsapp: data.contactWhatsapp || current.whatsapp,
      email: data.contactEmail || current.email,
      location: data.contactLocation || current.location,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch {
      // Storage can fail (private mode, quota) — in-memory value still works.
    }
  } catch {
    // Network failure — keep using the cached/default value.
  }
  return current;
}
