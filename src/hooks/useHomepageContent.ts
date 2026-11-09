import { useEffect, useState } from "react";
import { useLanguage, type Language } from "@/lib/i18n";

export interface HomepageFeature {
  title: string;
  description: string;
}

export interface HomepageAbout {
  subtitle: string;
  title: string;
  titleHighlight: string;
  description: string;
  features: HomepageFeature[];
}

export interface HomepageHero {
  badge: string;
  headline: string;
  headlineHighlight: string;
  subheadline: string;
}

export interface HomepageVideoCarousel {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  discoverWhyNuni: string;
}

export interface HomepageStatItem {
  value: string;
  suffix: string;
  label: string;
}

export interface HomepageStats {
  items: HomepageStatItem[];
}

export interface HomepageStep {
  title: string;
  description: string;
}

export interface HomepageHowItWorks {
  subtitle: string;
  title: string;
  description: string;
  cta: string;
  steps: HomepageStep[];
}

export interface HomepageIngredient {
  name: string;
  origin: string;
  description: string;
  benefits: string[];
}

export interface HomepageIngredientsLang {
  subtitle: string;
  title: string;
  titleHighlight: string;
  description: string;
  bottomNote: string;
  shea: HomepageIngredient;
  cocoa: HomepageIngredient;
  charcoal: HomepageIngredient;
}

export interface HomepageIngredientsSection extends Record<Language, HomepageIngredientsLang> {
  images: { shea: string; cocoa: string; charcoal: string };
}

export interface HomepagePartners {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  cta: string;
  benefits: string[];
}

export interface HomepagePartnersSection extends Record<Language, HomepagePartners> {
  imageFilename?: string;
}

export interface HomepageContent {
  hero?: Record<Language, HomepageHero>;
  about?: Record<Language, HomepageAbout>;
  videoCarousel?: Record<Language, HomepageVideoCarousel>;
  stats?: Record<Language, HomepageStats>;
  howItWorks?: Record<Language, HomepageHowItWorks>;
  ingredients?: HomepageIngredientsSection;
  partners?: HomepagePartnersSection;
}

const UPLOAD_URL_BASE = "/uploads";

/** Turns a bare uploaded filename (as stored by the admin API) into a servable URL. */
export function uploadUrl(filename: string | null | undefined): string | null {
  if (!filename) return null;
  return `${UPLOAD_URL_BASE}/${filename}`;
}

let cachedContent: HomepageContent | null = null;
let inFlightRequest: Promise<HomepageContent> | null = null;
const listeners = new Set<() => void>();

async function fetchHomepageContent(): Promise<HomepageContent> {
  if (cachedContent) return cachedContent;
  if (inFlightRequest) return inFlightRequest;

  inFlightRequest = fetch("/admin-api/homepage.php")
    .then((res) => {
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      return res.json();
    })
    .then((data: HomepageContent) => {
      cachedContent = data;
      inFlightRequest = null;
      listeners.forEach((listener) => listener());
      return data;
    })
    .catch((err) => {
      inFlightRequest = null;
      throw err;
    });

  return inFlightRequest;
}

/** Clears the shared cache so the next useHomepageContent() call refetches. Call after an admin save. */
export function invalidateHomepageContent() {
  cachedContent = null;
  inFlightRequest = null;
}

/**
 * Fetches all homepage-managed content once (shared across every component
 * that calls this hook) and returns the slice for the given section in the
 * visitor's current language. Returns `null` while loading or if the fetch
 * fails, so callers should fall back to their bundled i18n copy in that case.
 */
export function useHomepageContent<K extends keyof HomepageContent>(
  section: K
): HomepageContent[K] extends Record<Language, infer T> ? T | null : HomepageContent[K] | null {
  const { language } = useLanguage();
  const [content, setContent] = useState<HomepageContent | null>(cachedContent);

  useEffect(() => {
    let active = true;
    if (cachedContent) {
      setContent(cachedContent);
      return;
    }
    fetchHomepageContent()
      .then((data) => {
        if (active) setContent(data);
      })
      .catch(() => {
        // Swallow — callers fall back to bundled i18n copy when this stays null.
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const listener = () => setContent(cachedContent);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  if (!content || !content[section]) return null as never;

  const sectionData = content[section] as Record<string, unknown>;
  return (sectionData[language] ?? null) as never;
}

/** ingredients.images is shared across all languages (not per-language), so it's read separately. */
export function useIngredientImages(): { shea: string; cocoa: string; charcoal: string } | null {
  const [content, setContent] = useState<HomepageContent | null>(cachedContent);

  useEffect(() => {
    let active = true;
    if (cachedContent) {
      setContent(cachedContent);
      return;
    }
    fetchHomepageContent()
      .then((data) => {
        if (active) setContent(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const listener = () => setContent(cachedContent);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const images = content?.ingredients?.images;
  if (!images) return null;
  return {
    shea: uploadUrl(images.shea) ?? "",
    cocoa: uploadUrl(images.cocoa) ?? "",
    charcoal: uploadUrl(images.charcoal) ?? "",
  };
}

/** partners.imageFilename is shared across all languages (not per-language), so it's read separately. */
export function usePartnersImage(): string | null {
  const [content, setContent] = useState<HomepageContent | null>(cachedContent);

  useEffect(() => {
    let active = true;
    if (cachedContent) {
      setContent(cachedContent);
      return;
    }
    fetchHomepageContent()
      .then((data) => {
        if (active) setContent(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const listener = () => setContent(cachedContent);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return uploadUrl(content?.partners?.imageFilename);
}
