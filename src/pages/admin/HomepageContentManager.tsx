import { useEffect, useState, useRef } from "react";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { apiGet, apiPost } from "@/lib/adminApi";

type Lang = "en" | "fr" | "tw";
const LANGS: { key: Lang; label: string }[] = [
  { key: "en", label: "English" },
  { key: "fr", label: "Français" },
  { key: "tw", label: "Twi" },
];

const Field = ({
  label, value, onChange, textarea,
}: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) => (
  <div>
    <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
    {textarea ? (
      <Textarea value={value ?? ""} onChange={(e) => onChange(e.target.value)} rows={3} />
    ) : (
      <Input value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
    )}
  </div>
);

// ---------- Field shapes for each section (all per-language except ingredients.images) ----------

interface HeroLang { badge: string; headline: string; headlineHighlight: string; subheadline: string }
interface AboutFeature { title: string; description: string }
interface AboutLang { subtitle: string; title: string; titleHighlight: string; description: string; features: AboutFeature[] }
interface VideoLang { badge: string; title: string; titleHighlight: string; description: string; discoverWhyNuni: string }
interface StatItem { value: string; suffix: string; label: string }
interface StatsLang { items: StatItem[] }
interface StepItem { title: string; description: string }
interface HowItWorksLang { subtitle: string; title: string; description: string; cta: string; steps: StepItem[] }
interface IngredientItem { name: string; origin: string; description: string; benefits: string[] }
interface IngredientsLang { subtitle: string; title: string; titleHighlight: string; description: string; bottomNote: string; shea: IngredientItem; cocoa: IngredientItem; charcoal: IngredientItem }
interface PartnersLang { badge: string; title: string; titleHighlight: string; description: string; cta: string; benefits: string[] }

type LangRecord<T> = Record<Lang, T>;

const emptyHero: LangRecord<HeroLang> = {
  en: { badge: "", headline: "", headlineHighlight: "", subheadline: "" },
  fr: { badge: "", headline: "", headlineHighlight: "", subheadline: "" },
  tw: { badge: "", headline: "", headlineHighlight: "", subheadline: "" },
};
const emptyAboutFeatures = (): AboutFeature[] => [
  { title: "", description: "" }, { title: "", description: "" }, { title: "", description: "" }, { title: "", description: "" },
];
const emptyAbout: LangRecord<AboutLang> = {
  en: { subtitle: "", title: "", titleHighlight: "", description: "", features: emptyAboutFeatures() },
  fr: { subtitle: "", title: "", titleHighlight: "", description: "", features: emptyAboutFeatures() },
  tw: { subtitle: "", title: "", titleHighlight: "", description: "", features: emptyAboutFeatures() },
};
const emptyVideo: LangRecord<VideoLang> = {
  en: { badge: "", title: "", titleHighlight: "", description: "", discoverWhyNuni: "" },
  fr: { badge: "", title: "", titleHighlight: "", description: "", discoverWhyNuni: "" },
  tw: { badge: "", title: "", titleHighlight: "", description: "", discoverWhyNuni: "" },
};
const emptyStatItems = (): StatItem[] => [
  { value: "", suffix: "", label: "" }, { value: "", suffix: "", label: "" }, { value: "", suffix: "", label: "" }, { value: "", suffix: "", label: "" },
];
const emptyStats: LangRecord<StatsLang> = {
  en: { items: emptyStatItems() }, fr: { items: emptyStatItems() }, tw: { items: emptyStatItems() },
};
const emptySteps = (): StepItem[] => [
  { title: "", description: "" }, { title: "", description: "" }, { title: "", description: "" },
];
const emptyHowItWorks: LangRecord<HowItWorksLang> = {
  en: { subtitle: "", title: "", description: "", cta: "", steps: emptySteps() },
  fr: { subtitle: "", title: "", description: "", cta: "", steps: emptySteps() },
  tw: { subtitle: "", title: "", description: "", cta: "", steps: emptySteps() },
};
const emptyIngredient = (): IngredientItem => ({ name: "", origin: "", description: "", benefits: ["", "", "", ""] });
const emptyIngredients: LangRecord<IngredientsLang> = {
  en: { subtitle: "", title: "", titleHighlight: "", description: "", bottomNote: "", shea: emptyIngredient(), cocoa: emptyIngredient(), charcoal: emptyIngredient() },
  fr: { subtitle: "", title: "", titleHighlight: "", description: "", bottomNote: "", shea: emptyIngredient(), cocoa: emptyIngredient(), charcoal: emptyIngredient() },
  tw: { subtitle: "", title: "", titleHighlight: "", description: "", bottomNote: "", shea: emptyIngredient(), cocoa: emptyIngredient(), charcoal: emptyIngredient() },
};
const emptyPartners: LangRecord<PartnersLang> = {
  en: { badge: "", title: "", titleHighlight: "", description: "", cta: "", benefits: ["", "", "", ""] },
  fr: { badge: "", title: "", titleHighlight: "", description: "", cta: "", benefits: ["", "", "", ""] },
  tw: { badge: "", title: "", titleHighlight: "", description: "", cta: "", benefits: ["", "", "", ""] },
};

const LangTabs = ({ children }: { children: (lang: Lang) => React.ReactNode }) => (
  <Tabs defaultValue="en">
    <TabsList>
      {LANGS.map((l) => (
        <TabsTrigger key={l.key} value={l.key}>{l.label}</TabsTrigger>
      ))}
    </TabsList>
    {LANGS.map((l) => (
      <TabsContent key={l.key} value={l.key} className="mt-4 space-y-4">
        {children(l.key)}
      </TabsContent>
    ))}
  </Tabs>
);

const HomepageContentManager = () => {
  const [hero, setHero] = useState<LangRecord<HeroLang>>(emptyHero);
  const [about, setAbout] = useState<LangRecord<AboutLang>>(emptyAbout);
  const [video, setVideo] = useState<LangRecord<VideoLang>>(emptyVideo);
  const [stats, setStats] = useState<LangRecord<StatsLang>>(emptyStats);
  const [howItWorks, setHowItWorks] = useState<LangRecord<HowItWorksLang>>(emptyHowItWorks);
  const [ingredients, setIngredients] = useState<LangRecord<IngredientsLang>>(emptyIngredients);
  const [ingredientImages, setIngredientImages] = useState<{ shea: string; cocoa: string; charcoal: string }>({ shea: "", cocoa: "", charcoal: "" });
  const [ingredientImageFiles, setIngredientImageFiles] = useState<{ shea?: File; cocoa?: File; charcoal?: File }>({});
  const [partners, setPartners] = useState<LangRecord<PartnersLang>>(emptyPartners);

  const [loading, setLoading] = useState(true);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [savedSection, setSavedSection] = useState<string | null>(null);
  const [error, setError] = useState("");

  const sheaFileRef = useRef<HTMLInputElement>(null);
  const cocoaFileRef = useRef<HTMLInputElement>(null);
  const charcoalFileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiGet("homepage");
      if (data.hero) setHero(data.hero);
      if (data.about) setAbout(data.about);
      if (data.videoCarousel) setVideo(data.videoCarousel);
      if (data.stats) setStats(data.stats);
      if (data.howItWorks) setHowItWorks(data.howItWorks);
      if (data.ingredients) {
        const { images, ...langs } = data.ingredients;
        setIngredients((prev) => ({ ...prev, ...langs }));
        if (images) setIngredientImages(images);
      }
      if (data.partners) setPartners(data.partners);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const saveSection = async (
    sectionKey: string,
    data: unknown,
    files?: Record<string, File>
  ) => {
    setSavingSection(sectionKey);
    setSavedSection(null);
    setError("");
    try {
      const formData = new FormData();
      formData.append("section", sectionKey);
      formData.append("data", JSON.stringify(data));
      if (files) {
        for (const [field, file] of Object.entries(files)) {
          formData.append(field, file);
        }
      }
      await apiPost("homepage", formData);
      setSavedSection(sectionKey);
      setTimeout(() => setSavedSection(null), 2500);
      if (sectionKey === "ingredients") {
        setIngredientImageFiles({});
        await load();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSavingSection(null);
    }
  };

  const SaveButton = ({ sectionKey, onClick }: { sectionKey: string; onClick: () => void }) => (
    <Button size="sm" onClick={onClick} disabled={savingSection === sectionKey}>
      {savingSection === sectionKey ? (
        <Loader2 className="animate-spin mr-2" size={14} />
      ) : (
        <Save className="mr-2" size={14} />
      )}
      {savedSection === sectionKey ? "Saved!" : "Save"}
    </Button>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Homepage Content</h2>
        <p className="text-sm text-muted-foreground">
          Text shown on the homepage, in English, French and Twi. Each section saves on its own.
        </p>
      </div>

      {error && <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</p>}

      <Accordion type="multiple" defaultValue={["hero"]} className="space-y-3">
        {/* ---------------- Hero ---------------- */}
        <AccordionItem value="hero" className="border border-border rounded-xl px-4">
          <AccordionTrigger className="py-4">Hero Banner</AccordionTrigger>
          <AccordionContent className="pb-5">
            <LangTabs>
              {(lang) => (
                <>
                  <Field label="Badge" value={hero[lang].badge} onChange={(v) => setHero((p) => ({ ...p, [lang]: { ...p[lang], badge: v } }))} />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Headline" value={hero[lang].headline} onChange={(v) => setHero((p) => ({ ...p, [lang]: { ...p[lang], headline: v } }))} />
                    <Field label="Headline Highlight (gold text)" value={hero[lang].headlineHighlight} onChange={(v) => setHero((p) => ({ ...p, [lang]: { ...p[lang], headlineHighlight: v } }))} />
                  </div>
                  <Field label="Subheadline" value={hero[lang].subheadline} onChange={(v) => setHero((p) => ({ ...p, [lang]: { ...p[lang], subheadline: v } }))} textarea />
                </>
              )}
            </LangTabs>
            <div className="flex justify-end mt-4">
              <SaveButton sectionKey="hero" onClick={() => saveSection("hero", hero)} />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ---------------- About ---------------- */}
        <AccordionItem value="about" className="border border-border rounded-xl px-4">
          <AccordionTrigger className="py-4">Our Story / About</AccordionTrigger>
          <AccordionContent className="pb-5">
            <LangTabs>
              {(lang) => (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Subtitle (small label)" value={about[lang].subtitle} onChange={(v) => setAbout((p) => ({ ...p, [lang]: { ...p[lang], subtitle: v } }))} />
                    <div />
                    <Field label="Title" value={about[lang].title} onChange={(v) => setAbout((p) => ({ ...p, [lang]: { ...p[lang], title: v } }))} />
                    <Field label="Title Highlight (gold text)" value={about[lang].titleHighlight} onChange={(v) => setAbout((p) => ({ ...p, [lang]: { ...p[lang], titleHighlight: v } }))} />
                  </div>
                  <Field label="Description" value={about[lang].description} onChange={(v) => setAbout((p) => ({ ...p, [lang]: { ...p[lang], description: v } }))} textarea />
                  <p className="text-sm font-medium text-foreground pt-2">4 Feature Cards</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {about[lang].features.map((f, i) => (
                      <div key={i} className="space-y-2 border border-border rounded-lg p-3">
                        <Field
                          label={`Feature ${i + 1} Title`}
                          value={f.title}
                          onChange={(v) => setAbout((p) => {
                            const features = [...p[lang].features];
                            features[i] = { ...features[i], title: v };
                            return { ...p, [lang]: { ...p[lang], features } };
                          })}
                        />
                        <Field
                          label={`Feature ${i + 1} Description`}
                          value={f.description}
                          textarea
                          onChange={(v) => setAbout((p) => {
                            const features = [...p[lang].features];
                            features[i] = { ...features[i], description: v };
                            return { ...p, [lang]: { ...p[lang], features } };
                          })}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </LangTabs>
            <div className="flex justify-end mt-4">
              <SaveButton sectionKey="about" onClick={() => saveSection("about", about)} />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ---------------- Video Teaser ---------------- */}
        <AccordionItem value="videoCarousel" className="border border-border rounded-xl px-4">
          <AccordionTrigger className="py-4">"See the Transformation" Video Teaser</AccordionTrigger>
          <AccordionContent className="pb-5">
            <p className="text-xs text-muted-foreground -mt-1 mb-3">
              This only edits the text around the video teaser. The 6 video clips themselves are not managed here.
            </p>
            <LangTabs>
              {(lang) => (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Badge" value={video[lang].badge} onChange={(v) => setVideo((p) => ({ ...p, [lang]: { ...p[lang], badge: v } }))} />
                    <div />
                    <Field label="Title" value={video[lang].title} onChange={(v) => setVideo((p) => ({ ...p, [lang]: { ...p[lang], title: v } }))} />
                    <Field label="Title Highlight (gold text)" value={video[lang].titleHighlight} onChange={(v) => setVideo((p) => ({ ...p, [lang]: { ...p[lang], titleHighlight: v } }))} />
                  </div>
                  <Field label="Description" value={video[lang].description} onChange={(v) => setVideo((p) => ({ ...p, [lang]: { ...p[lang], description: v } }))} textarea />
                  <Field label="Button Text (links to About Us)" value={video[lang].discoverWhyNuni} onChange={(v) => setVideo((p) => ({ ...p, [lang]: { ...p[lang], discoverWhyNuni: v } }))} />
                </>
              )}
            </LangTabs>
            <div className="flex justify-end mt-4">
              <SaveButton sectionKey="videoCarousel" onClick={() => saveSection("videoCarousel", video)} />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ---------------- Stats ---------------- */}
        <AccordionItem value="stats" className="border border-border rounded-xl px-4">
          <AccordionTrigger className="py-4">Stats Numbers</AccordionTrigger>
          <AccordionContent className="pb-5">
            <LangTabs>
              {(lang) => (
                <div className="grid sm:grid-cols-2 gap-4">
                  {stats[lang].items.map((item, i) => (
                    <div key={i} className="space-y-2 border border-border rounded-lg p-3">
                      <div className="grid grid-cols-2 gap-2">
                        <Field
                          label="Number"
                          value={item.value}
                          onChange={(v) => setStats((p) => {
                            const items = [...p[lang].items];
                            items[i] = { ...items[i], value: v };
                            return { ...p, [lang]: { items } };
                          })}
                        />
                        <Field
                          label="Suffix (+, %)"
                          value={item.suffix}
                          onChange={(v) => setStats((p) => {
                            const items = [...p[lang].items];
                            items[i] = { ...items[i], suffix: v };
                            return { ...p, [lang]: { items } };
                          })}
                        />
                      </div>
                      <Field
                        label="Label"
                        value={item.label}
                        onChange={(v) => setStats((p) => {
                          const items = [...p[lang].items];
                          items[i] = { ...items[i], label: v };
                          return { ...p, [lang]: { items } };
                        })}
                      />
                    </div>
                  ))}
                </div>
              )}
            </LangTabs>
            <div className="flex justify-end mt-4">
              <SaveButton sectionKey="stats" onClick={() => saveSection("stats", stats)} />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ---------------- How It Works ---------------- */}
        <AccordionItem value="howItWorks" className="border border-border rounded-xl px-4">
          <AccordionTrigger className="py-4">How It Works</AccordionTrigger>
          <AccordionContent className="pb-5">
            <LangTabs>
              {(lang) => (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Subtitle (small label)" value={howItWorks[lang].subtitle} onChange={(v) => setHowItWorks((p) => ({ ...p, [lang]: { ...p[lang], subtitle: v } }))} />
                    <Field label="Title" value={howItWorks[lang].title} onChange={(v) => setHowItWorks((p) => ({ ...p, [lang]: { ...p[lang], title: v } }))} />
                  </div>
                  <Field label="Description" value={howItWorks[lang].description} onChange={(v) => setHowItWorks((p) => ({ ...p, [lang]: { ...p[lang], description: v } }))} textarea />
                  <Field label="Button Text (WhatsApp)" value={howItWorks[lang].cta} onChange={(v) => setHowItWorks((p) => ({ ...p, [lang]: { ...p[lang], cta: v } }))} />
                  <p className="text-sm font-medium text-foreground pt-2">3 Steps</p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {howItWorks[lang].steps.map((s, i) => (
                      <div key={i} className="space-y-2 border border-border rounded-lg p-3">
                        <Field
                          label={`Step ${i + 1} Title`}
                          value={s.title}
                          onChange={(v) => setHowItWorks((p) => {
                            const steps = [...p[lang].steps];
                            steps[i] = { ...steps[i], title: v };
                            return { ...p, [lang]: { ...p[lang], steps } };
                          })}
                        />
                        <Field
                          label={`Step ${i + 1} Description`}
                          value={s.description}
                          textarea
                          onChange={(v) => setHowItWorks((p) => {
                            const steps = [...p[lang].steps];
                            steps[i] = { ...steps[i], description: v };
                            return { ...p, [lang]: { ...p[lang], steps } };
                          })}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </LangTabs>
            <div className="flex justify-end mt-4">
              <SaveButton sectionKey="howItWorks" onClick={() => saveSection("howItWorks", howItWorks)} />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ---------------- Ingredients ---------------- */}
        <AccordionItem value="ingredients" className="border border-border rounded-xl px-4">
          <AccordionTrigger className="py-4">Ingredients Spotlight</AccordionTrigger>
          <AccordionContent className="pb-5">
            <LangTabs>
              {(lang) => (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Subtitle (small label)" value={ingredients[lang].subtitle} onChange={(v) => setIngredients((p) => ({ ...p, [lang]: { ...p[lang], subtitle: v } }))} />
                    <div />
                    <Field label="Title" value={ingredients[lang].title} onChange={(v) => setIngredients((p) => ({ ...p, [lang]: { ...p[lang], title: v } }))} />
                    <Field label="Title Highlight (green text)" value={ingredients[lang].titleHighlight} onChange={(v) => setIngredients((p) => ({ ...p, [lang]: { ...p[lang], titleHighlight: v } }))} />
                  </div>
                  <Field label="Description" value={ingredients[lang].description} onChange={(v) => setIngredients((p) => ({ ...p, [lang]: { ...p[lang], description: v } }))} textarea />
                  <Field label="Bottom Note" value={ingredients[lang].bottomNote} onChange={(v) => setIngredients((p) => ({ ...p, [lang]: { ...p[lang], bottomNote: v } }))} textarea />

                  {(["shea", "cocoa", "charcoal"] as const).map((key) => (
                    <div key={key} className="border border-border rounded-lg p-3 space-y-2">
                      <p className="text-sm font-medium text-foreground capitalize">{key === "charcoal" ? "Activated Charcoal" : `${key} Butter`}</p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <Field
                          label="Name"
                          value={ingredients[lang][key].name}
                          onChange={(v) => setIngredients((p) => ({ ...p, [lang]: { ...p[lang], [key]: { ...p[lang][key], name: v } } }))}
                        />
                        <Field
                          label="Origin"
                          value={ingredients[lang][key].origin}
                          onChange={(v) => setIngredients((p) => ({ ...p, [lang]: { ...p[lang], [key]: { ...p[lang][key], origin: v } } }))}
                        />
                      </div>
                      <Field
                        label="Description"
                        value={ingredients[lang][key].description}
                        textarea
                        onChange={(v) => setIngredients((p) => ({ ...p, [lang]: { ...p[lang], [key]: { ...p[lang][key], description: v } } }))}
                      />
                      <div className="grid sm:grid-cols-2 gap-3">
                        {ingredients[lang][key].benefits.map((b, i) => (
                          <Field
                            key={i}
                            label={`Benefit ${i + 1}`}
                            value={b}
                            onChange={(v) => setIngredients((p) => {
                              const benefits = [...p[lang][key].benefits];
                              benefits[i] = v;
                              return { ...p, [lang]: { ...p[lang], [key]: { ...p[lang][key], benefits } } };
                            })}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </LangTabs>

            <p className="text-sm font-medium text-foreground pt-4 mb-2">Ingredient Photos (shared across all 3 languages)</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {([
                { key: "shea" as const, label: "Shea Butter", ref: sheaFileRef },
                { key: "cocoa" as const, label: "Cocoa Butter", ref: cocoaFileRef },
                { key: "charcoal" as const, label: "Activated Charcoal", ref: charcoalFileRef },
              ]).map(({ key, label, ref }) => {
                const file = ingredientImageFiles[key];
                const preview = file ? URL.createObjectURL(file) : ingredientImages[key];
                return (
                  <div key={key} className="space-y-2">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    {preview ? (
                      <img src={preview} alt={label} className="w-full aspect-square object-cover rounded-lg border border-border" />
                    ) : (
                      <div className="w-full aspect-square rounded-lg border border-dashed border-border flex items-center justify-center text-xs text-muted-foreground">
                        No photo yet
                      </div>
                    )}
                    <input
                      ref={ref}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) setIngredientImageFiles((p) => ({ ...p, [key]: f }));
                      }}
                    />
                    <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => ref.current?.click()}>
                      <Plus className="mr-2" size={14} />
                      Change Photo
                    </Button>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end mt-4">
              <SaveButton
                sectionKey="ingredients"
                onClick={() => saveSection("ingredients", ingredients, ingredientImageFiles.shea || ingredientImageFiles.cocoa || ingredientImageFiles.charcoal
                  ? {
                      ...(ingredientImageFiles.shea ? { sheaImage: ingredientImageFiles.shea } : {}),
                      ...(ingredientImageFiles.cocoa ? { cocoaImage: ingredientImageFiles.cocoa } : {}),
                      ...(ingredientImageFiles.charcoal ? { charcoalImage: ingredientImageFiles.charcoal } : {}),
                    }
                  : undefined)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ---------------- Partners / Partnership Opportunity ---------------- */}
        <AccordionItem value="partners" className="border border-border rounded-xl px-4">
          <AccordionTrigger className="py-4">Partnership Opportunity</AccordionTrigger>
          <AccordionContent className="pb-5">
            <p className="text-xs text-muted-foreground -mt-1 mb-3">
              This is the "Become an NG Cosmetics Partner" promo text on the homepage. The actual partner directory is managed in the Partners tab.
            </p>
            <LangTabs>
              {(lang) => (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Badge" value={partners[lang].badge} onChange={(v) => setPartners((p) => ({ ...p, [lang]: { ...p[lang], badge: v } }))} />
                    <div />
                    <Field label="Title" value={partners[lang].title} onChange={(v) => setPartners((p) => ({ ...p, [lang]: { ...p[lang], title: v } }))} />
                    <Field label="Title Highlight (gold text)" value={partners[lang].titleHighlight} onChange={(v) => setPartners((p) => ({ ...p, [lang]: { ...p[lang], titleHighlight: v } }))} />
                  </div>
                  <Field label="Description" value={partners[lang].description} onChange={(v) => setPartners((p) => ({ ...p, [lang]: { ...p[lang], description: v } }))} textarea />
                  <Field label="Button Text" value={partners[lang].cta} onChange={(v) => setPartners((p) => ({ ...p, [lang]: { ...p[lang], cta: v } }))} />
                  <p className="text-sm font-medium text-foreground pt-2">Benefits List</p>
                  <div className="space-y-2">
                    {partners[lang].benefits.map((b, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <Input
                          value={b}
                          onChange={(e) => setPartners((p) => {
                            const benefits = [...p[lang].benefits];
                            benefits[i] = e.target.value;
                            return { ...p, [lang]: { ...p[lang], benefits } };
                          })}
                        />
                        <button
                          type="button"
                          onClick={() => setPartners((p) => {
                            const benefits = p[lang].benefits.filter((_, idx) => idx !== i);
                            return { ...p, [lang]: { ...p[lang], benefits } };
                          })}
                          className="w-9 h-9 flex items-center justify-center rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 flex-shrink-0"
                          aria-label="Remove benefit"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setPartners((p) => ({ ...p, [lang]: { ...p[lang], benefits: [...p[lang].benefits, ""] } }))}
                    >
                      <Plus className="mr-2" size={14} />
                      Add benefit
                    </Button>
                  </div>
                </>
              )}
            </LangTabs>
            <div className="flex justify-end mt-4">
              <SaveButton sectionKey="partners" onClick={() => saveSection("partners", partners)} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default HomepageContentManager;
