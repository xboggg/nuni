# NG Cosmetics — Site Documentation

Live site: https://ngcosmetics.com.gh
Stack: React + Vite + TypeScript (frontend), PHP + MySQL (admin API/backend)

## Server

- Host: Contabo server **38.242.195.0** (root access via SSH)
- Web root: `/var/www/ngcosmetics.com.gh/`
- Admin API (PHP): `/var/www/ngcosmetics.com.gh/admin-api/`
- Uploaded media: `/var/www/ngcosmetics.com.gh/uploads/` (random hashed filenames, see Upload pipeline below)
- Old static media (pre-admin-panel era, still referenced by filename in a few places): `/var/www/ngcosmetics.com.gh/media/`
- Nginx config: `/etc/nginx/sites-enabled/ngcosmetics.com.gh` — has a bot/crawler map that serves pre-rendered OG content to social crawlers (Facebook, Twitter, WhatsApp, Telegram, etc.) and the SPA to everyone else.
- Database: `ngcosmetics_admin` (MySQL, local to the server)

## Deploy pipeline

GitHub Actions (`.github/workflows/*.yml`): on every push to `main`, builds with `npm run build` and SCPs the `dist/` folder straight to `/var/www/ngcosmetics.com.gh` (frontend only — static files, no PM2/Node process involved). The PHP admin API is **not** redeployed by this workflow; it lives directly on the server and must be edited there via SSH if it ever needs to change.

Deploy status: `gh run list --limit 5` from the repo, or check the Actions tab on GitHub.

Repo: `xboggg/nuni` on GitHub.

## Admin panel

React admin UI lives under `src/pages/admin/`, reachable at `/admin` on the live site. Everything is intended to be fully admin-manageable per standing instruction — "everything on the site front end managed from the admin."

**Admin-managed content is English-only** by design decision (not translated into French/Twi) — matches the pattern across Products, Testimonials, Why NG Cosmetics (About), and Community sections. Only the surrounding static UI chrome (buttons, labels, legal pages) is translated via `src/lib/i18n.ts`.

### Database tables (MySQL `ngcosmetics_admin`)

| Table | Purpose |
|---|---|
| `products` | 5 products (id, name, category, badge, description, benefits/ingredients/sizes/prices as JSON, `image_filename`) |
| `hero_slides` | Homepage hero carousel background images (filename, description, focal_x/focal_y for crop focus point) |
| `testimonials` | Customer reviews (name, location, rating, review_text, product) |
| `testimonial_media` | Photos/videos attached to testimonials |
| `about_content` | Why NG Cosmetics / About page text, stored as one JSON blob (`data` column) |
| `about_award_media` | Award/recognition photos shown on the About page |
| `about_cert_media` | FDA certificate photos shown on the About page |
| `community_content` | Community Impact page text (JSON blob) + `letter_image_filename` (hospital appreciation letter photo) |
| `community_videos` | Community Impact page video gallery (filename, title) |
| `partners` | Partner/reseller directory (phone numbers, MoMo, region, roles, photo) |
| `gallery_images` | General photo gallery |
| `settings` | Key-value store: `contact_whatsapp`, `contact_email`, `contact_location`, `hide_ambassador_photos`, `legal_last_updated` |
| `admin_users` / `admin_sessions` | Admin login + bearer-token sessions |

### Upload pipeline (`admin-api/upload.php`)

Every image uploaded through the admin panel is:
1. Resized to fit within 1600×1600 (never upscaled)
2. Flattened onto a white background (for JPEGs — no alpha channel) at quality 85
3. Saved as `<32 random hex chars>.jpg` into `/var/www/ngcosmetics.com.gh/uploads/`
4. Chowned to `www-data:www-data`, `chmod 644`

Videos go through `handle_video_upload()` — validated by MIME type (mp4/mov/webm) and copied through under a random hashed name, same convention, no re-encoding (no ffmpeg on this box).

**Important**: original filenames are never preserved — everything becomes a random hash on upload. If you ever need to manually insert a file outside the admin UI (SSH), mirror this exact process (see "Manual media fix" below) so the DB and filesystem stay consistent with what the admin API expects.

### Admin API endpoints (`admin-api/*.php`)

Each content type typically has: `GET` (public reads active rows only; admin reads all including inactive), `POST`/`PUT` with `Authorization: Bearer <token>` for admin writes. Auth session tokens live in `admin_sessions`, checked via `auth.php`.

## Hero section (`src/components/HeroCarousel.tsx`)

- Background images come from the admin-managed `hero_slides` table via `apiGet("hero")`, with a bundled local fallback (`src/assets/*.jpg`) if the API is unreachable.
- Hero **text** (badge, headline, subheadline) is hardcoded in `src/lib/i18n.ts` under `hero: { ... }` for each language — **not** admin-managed.
- As of Nov 2026: hero reads "Natural Grace" / "A New Definition of Beauty" / "Rooted in nature, defined by grace, created for confidence." — matches the client's rebrand poster. Two dove graphics (`src/assets/doves/dove-left.png`, `dove-right.png`, cropped + background-removed from that same poster) flank the badge, with a gentle float animation. Visible at all screen sizes (small on mobile, larger on desktop).
- `FallingLeaves.tsx` renders a sparse, slow, low-opacity leaf-drift overlay — deliberately kept subtle (8 leaves, no sway/rotation) so it doesn't compete with the carousel, doves, and text animations already running in the hero. If asked to adjust hero motion again, this is the first place to look — the hero already has several animated layers (carousel crossfade + "breathing" zoom, falling leaves, dove float, staggered text fade-ins) and adding more on top risks feeling busy.

## Branding note — "Nuni" → "NG Cosmetics"

The brand was renamed from "Nuni Global" to "NG Cosmetics" (confirmed live and verified across the whole codebase as of Nov 2026, including `i18n.ts` in all 3 languages, SEO meta tags, `manifest.json`, product structured data, and WhatsApp CTA links). **Never refer to this brand as "Nuni Global" or "Nuni" anywhere user-facing.** Internal file/variable names like `WhyNuniPage.tsx` or `src/assets/*nuni*` asset filenames are harmless leftovers (not user-visible) and don't need renaming unless touched anyway.

If new "Nuni" text turns up anywhere on the live site, check beyond `src/` — past misses were in root-level `index.html` (SEO meta tags) and `public/manifest.json`, which a `src/`-only search won't catch.

## Manual media fix (when the admin table is empty but the real files exist)

This has happened twice: an admin-managed media table (e.g. `about_award_media`, `community_videos`) was empty even though real source files existed — either in `src/assets/` (git history) or in the old static `/media/` folder on the server, left over from before that section became admin-managed. Before concluding media was "never uploaded" or "lost," check:
1. `git log --diff-filter=A --name-only --all -- "*.jpg" "*.png" ...` for the asset ever being committed
2. The old static `/var/www/ngcosmetics.com.gh/media/` folder on the server
3. MySQL binary logs (`SHOW BINARY LOGS`) for INSERT/DELETE history — but note these auto-expire (`binlog_expire_logs_seconds`), so absence of binlog evidence isn't proof nothing happened before the log window

To manually link a found file into the admin system: resize/compress it the same way `upload.php` would (see Upload pipeline above), save it into `/var/www/ngcosmetics.com.gh/uploads/` with a random 32-hex-char name, `chown www-data:www-data`, `chmod 644`, then `INSERT`/`UPDATE` the relevant table's `filename` column directly via `mysql`.

## Smoke-testing after a deploy

The server's bot-protection returns 403 to requests without a `User-Agent` header — always test with `curl -H "User-Agent: Mozilla/5.0" ...`.

Since hero/admin-managed text renders client-side (not in the static HTML), a plain `curl | grep` won't catch it — use a headless browser (Playwright) to check rendered page text when verifying text changes, not just HTTP status codes.
