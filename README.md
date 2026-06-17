# Dolce Vita - SolidJS Restaurant Website

**Repo:** `Alftakeaway/dolce-solid`  
**Framework:** SolidJS + Vite  
**Deployed:** Cloudflare Pages  
**Status:** WIP (MenuSection hidden, mobile testing pending)

---

## Stack

| Tool | Version | Purpose |
|------|---------|---------|
| **SolidJS** | 1.9.13 | Reactive UI framework |
| **Vite** | 5.0.12 | Build tool + dev server |
| **GSAP** | 3.15.0 | Scroll triggers, parallax, animations |
| **Bootstrap** | 5.3.0 | Grid, form components, responsive |
| **AOS** | 2.3.4 | Scroll animations (fade-in, slide-up) |
| **EmailJS** | 4.4.1 | Contact form submissions (no backend) |
| **Rellax.js** | Custom fetch via jsDelivr | Parallax backgrounds (Cloudflare-safe) |

---

## Project Structure

```
src/
├── App.jsx                 # Main root component, section orchestration
├── App.css                 # Global styles (731 lines)
├── index.jsx               # Mount point
├── Parallax.js             # Rellax.js initialization (Cloudflare fix)
├── useIntersectionAnimation.js  # Intersection Observer hook
├── withAnimations.jsx      # HOC for animation wrapper
├── menuData.js             # Menu items JSON (Restaurant + GreenDelight + LaBottega)
│
├── components/
│   ├── Navbar.jsx          # Fixed navbar + scroll logic
│   ├── HeroSection.jsx     # Full-screen hero with carousel, menu PDF link
│   ├── AboutSection.jsx    # Mission statement + carousel
│   ├── AboutCarousel.jsx   # Sub-component for About slides
│   ├── MenuSection.jsx     # HIDDEN - Menu items grid (awaiting photos)
│   ├── GallerySection.jsx  # Atmosphere gallery + 3-column grid
│   ├── CateringPackages.jsx # Catering options cards
│   ├── SpecialDish.jsx     # Feature dish + carousel (margherita, tiramisu, etc)
│   ├── ReviewsSection.jsx  # Customer testimonials
│   ├── ReservationForm.jsx # Contact form + OpenTable link + terms
│   ├── VenuesSection.jsx   # 3 venue cards (Dolce Vita / Green Delight / La Bottega)
│   ├── ContactSection.jsx  # Maps + contact info
│   └── Footer.jsx          # Links + social media
│
├── assets/                 # Photos, icons, fonts (23MB total)
│   ├── LucidaUnicodeCalligraphy.ttf
│   ├── LucidaUnicodeCalligraphyBold.ttf
│   ├── Parisienne.ttf
│   ├── hero_bg.jpg
│   ├── margherita.jpg
│   ├── gelato.jpg
│   ├── interior2.webp
│   ├── interior3.webp
│   ├── hero.png
│   ├── tavolini.webp
│   ├── solid.svg
│   └── ...
│
└── public/
    ├── assets/             # CDN-served images
    ├── icons.svg           # SVG sprite
    ├── favicon.svg
    └── vite.svg
```

---

## Key Features

### 1. **Parallax Bands** (Rellax.js + GSAP)
- Two parallax backgrounds (band-1, band-2) with overlay gradient
- **Fixed via Rellax.js** after CSS `background-attachment: fixed` caused stacking context issues on Cloudflare Pages
- Library fetched from jsDelivr CDN

### 2. **Navbar**
- Sticky on scroll
- Link anchors to sections (#hero, #about, #menu, #gallery, #catering, #special, #reviews, #reservation, #venues, #contact)
- Parisienne font for branding (serif style)

### 3. **Hero Section**
- Image carousel (5 slides)
- CTA: "View Menu" → PDF link `/assets/menu.pdf`
- Full-viewport height

### 4. **Animations**
- **GSAP ScrollTrigger:** Footer elastic entrance
- **AOS:** Fade-in, slide-up on scroll (duration 800ms, once=true)
- **GSAP**: Instagram icon rotation (360°, 2s, bounce.out, repeat=-1)
- **Intersection Observer:** Custom hook for element visibility

### 5. **Forms**
- **ReservationForm:** EmailJS integration (no backend), form validation, Bootstrap styling
  - API key stored in `ReservationForm.jsx` (hardcoded - review for security)
- **OpenTable Link:** Deep link for direct bookings
- **Terms Modal:** Checkbox + submission logic

### 6. **Menu System** (Currently Hidden)
- Reads from `menuData.js` (structured by restaurant)
- Awaiting product photos before re-enabling
- Grid layout with cards

### 7. **Multi-Venue Display**
- 3 separate venue cards (Dolce Vita Restaurant, Green Delight, La Bottega di Wooburn Green)
- Distance from each location shown

---

## Color Palette

- **Primary Brown:** `#4A2F1A` (Marrone Cioccolato)
- **Secondary Brown:** `#8B6F47` (Tan/Beige)
- **Accent:** Gold text-strokes, golden borders
- **Text:** Dark on light, light on dark backgrounds
- **Overlay:** Semi-transparent dark gradients for parallax effect

---

## Known Issues & Todos

### ✅ Resolved
- ✅ Parallax overlap bug (fixed via Rellax.js)
- ✅ Cloudflare Pages stacking context issue (CSS `background-attachment: fixed` causes problems)

### 🔄 In Progress
- [ ] Mobile responsiveness testing (Bootstrap 5 grid, but needs validation)
- [ ] Lighthouse/Performance scoring
- [ ] Enable MenuSection (waiting for product photos)
- [ ] CSS modernization: Use 2025-2026 native features (e.g., @mixin, corner-shape, native nesting)

### 📋 Planned
- [ ] Replace AOS with native `scroll()` or `@supports` queries (AOS unmaintained)
- [ ] Integrate CSS Anchor Positioning (for tooltips, dropdowns)
- [ ] Use Customizable `<select>` for booking form dropdowns
- [ ] Modernize fonts: Parisienne + Lucida Calligraphy via jsDelivr → CSS custom fonts
- [ ] View Transitions Level 2 for section-to-section animations

---

## Deployment

**Host:** Cloudflare Pages  
**Branch:** `main`  
**Build Command:** `npm run build`  
**Output:** `dist/`  

**Special Config:**
- Images in `public/assets/` auto-served by Cloudflare
- jsDelivr CDN for external libraries (Rellax, fonts)
- No server-side logic (static SPA)

---

## Scripts

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Production build → dist/
npm run serve    # Preview production build locally
```

---

## Dependencies Breakdown

| Dependency | Why |
|------------|-----|
| **solid-js** | Reactive state, components, lifecycle |
| **vite-plugin-solid** | SSR-free build optimization |
| **gsap** | Smooth animations + ScrollTrigger |
| **bootstrap** | Grid, forms, responsive utilities |
| **aos** | Scroll animations (fade-in, slide) |
| **@emailjs/browser** | Client-side form submissions |
| **Rellax.js** (CDN) | Safe parallax (Cloudflare-compatible) |

---

## Fonts

**Local files** (`src/assets/`):
- `LucidaUnicodeCalligraphy.ttf` - Headlines, elegant serif
- `LucidaUnicodeCalligraphyBold.ttf` - Bold variant
- Parisienne - Navbar branding (serif, elegant)

**Body:** Bootstrap system stack

**Served via:** Local bundle (Vite includes in dist/)

---

## Next Steps

1. **Mobile Testing:** Run on iOS/Android, check Lighthouse
2. **MenuSection:** Source product photos, uncomment component
3. **CSS Modernization:** Replace old patterns with 2025-2026 features
4. **Performance:** Audit image sizes, lazy-load where needed
5. **AccessibilityLighthouse:** Color contrast, ARIA labels, semantic HTML

---

## Security Notes

- **EmailJS API Key:** Hardcoded in `ReservationForm.jsx` - visible in client code. EmailJS Public Key is safe to expose (access-control on EmailJS dashboard), but consider moving to `.env` file if concerned.
- **No Backend:** All submissions handled client-side via EmailJS
- **HTTPS:** Cloudflare Pages auto-HTTPS

---
- **Protocol:** Incremental changes, one mod at a time, test immediately
- **No Breaking Changes:** Don't modify paths, URLs, or DOM structure without confirmation
- **Cloudflare Quirk:** `background-attachment: fixed` causes z-index stacking issues → use Rellax.js instead
- **Form Submissions:** EmailJS handles all contact forms

---

**Last Updated:** June 2026  
**Commit:** Latest on main branch