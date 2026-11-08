# DESIGN.md — ZYRVAE Digital Studio (Phase 1: Swiss Corporate Brutalism)

## Aesthetic Direction: The Monolith Grid
ZYRVAE Phase 1 is built under the visual language of **Swiss Corporate Brutalism** (*Brutalismo Corporativo Suizo*), combining lithographic print precision, exposed hairline modular grids with architectural registration marks, raw bone paper warmth, monumental condensed display typography, and a pre-rendered 2K refractive obsidian-and-crystal sculptural intervention.

---

## 1. Modular Grid System & Print Registration Marks (The Monolith Grid)
- **Perimeter Print Margins:** `40px` outer vertical strips on the left and right edges of the viewport housing 90°-rotated editorial micro-typography (`Buenos Aires, Argentina` on the left; `© 2026 · 34°36′S 58°22′W` on the right) and blueprint cotas (`34.68°`, `01.198`, `58.38°`, `02.410`) in `#94A3B8`.
- **Row 1 (Integrated Header):** 4 continuous horizontal cells (`20% | 45% | 20% | 15%`):
  - Cell 1 (`20%`): `Zyrvae / Phase 1 [01]` (neutral Swiss grotesque in Sentence case, `10px`, `font-medium`, `16px` padding).
  - Cell 2 (`45%`): Split internally by a `0.5px` vertical grid divider:
    - Left compartment: `Work | Studio | Journal | Archive` with clean vertical bar separators and strikethrough + italic hover state.
    - Right compartment: Subtle borderless system selectors (`ThemeToggle` sun/moon and `LanguageSwitcher` `Es / En`) with `10px` typography and zero solid black background boxes that could compete with the vermilion block.
  - Cell 3 (`20%`): `Buenos Aires, Arg. [HH:MM:SS]` (live UTC-3 clock with tabular numerals).
  - Cell 4 (`15%`): Solid Security Vermilion (`#FF3B30`) full-height block (`Contact /` above, `Inquire →` below).
- **Row 2 (Monumental Hero Cell):** Single full-width cell (`100%` grid width, `52vh–56vh` min-height) containing the condensed/vertical `ZYRVAE` display wordmark filling margin-to-margin and the `Instrument Serif Italic` manifesto.
- **Row 3 (Capabilities, Sculptural Asset & Signature Seal):** 3 proportional cells (`40% | 35% | 25%`):
  - Cell 1 (`40%`): `01 / Capabilities` + justified Sentence-case editorial block on brutalist architecture and digital interfaces.
  - Cell 2 (`35%`): `Fig. 01 — Obsidian & crystal` featuring a pre-rendered 2K transparent WebP studio asset (`/images/obsidian-crystal-2k.webp`) showing translucent optical crystal fused with glossy black volcanic obsidian rock, strictly contained within its cell with a clean contact shadow and spring-driven mouse tilt/parallax.
  - Cell 3 (`25%`): `02 / Current phase` (`— Art Direction`, `— Interactive`, `— CGI`) + `70px` circular typographic seal (`ZYRVAE · BS.AS. · ARG` with a monolithic central `Z`).
- **Grid Hairlines & Blueprint Registration:** Strict `0.5px` / `1px` borders in `#D8D6CE` (Light Mode) and `#1E2024` (Dark Mode), dressed with fine typographic registration crosses (`+`) at module corners and `#94A3B8` coordinate numbers (`34.68°`, `01.198`) at key intersections.
- **Absolute Sharp Corners:** `border-radius: 0px` (`rounded-none`) across all cells, buttons, containers, and images.

---

## 2. Typography Hierarchy
1. **Display Headline (`ZYRVAE`):**
   - **Typeface:** `Barlow Condensed` Black (`900` / `800`), condensed vertical proportion (`font-stretch: condensed`).
   - **Scale & Treatment:** All-caps, condensed monumental vertical proportion, `letter-spacing: -0.04em`, `line-height: 0.85`, spanning margin-to-margin across the Hero cell.
2. **Editorial Manifesto (Author Subtitle):**
   - **Typeface:** `Instrument Serif` (`Italic`, weight `400`).
   - **Scale & Treatment:** Fluid `1.75rem–3.35rem`, Sentence case: *"An avant-garde independent digital studio based in Buenos Aires, Argentina."*
3. **Editorial Micro-Typography (Metadata, Labels & System Cells):**
   - **Typeface:** Neutral Swiss grotesque (`General Sans`, `PP Neue Montreal`, `DM Sans`, `Plus Jakarta Sans`).
   - **Scale & Treatment:** Strict `10px`, Sentence case (`text-transform: none`), `letter-spacing: 0.015em`, weight `500` (`font-medium`), tabular numerals.

---

## 3. Chromatic Palette & Material Finishes
| Role | Token | Hex (Light Mode) | Hex (Dark Mode) |
| :--- | :--- | :--- | :--- |
| **Raw Bone Paper (Primary Ground)** | `--zy-bg` | `#EFEFEA` | `#0A0A0C` |
| **Lithographic Black Ink (Primary Type)** | `--zy-fg` | `#0A0A0C` | `#EFEFEA` |
| **Mineral Graphite (Secondary / Metadata)** | `--zy-muted` | `#4A4D52` | `#9CA3B5` |
| **Blueprint Registration & Cota Marks** | `.font-cota` | `#94A3B8` | `#94A3B8` |
| **Security Vermilion (Single Accent Anchor)** | `--zy-vermilion` | `#FF3B30` | `#FF3B30` |
| **Monolith Grid Hairlines** | `--zy-grid-line` | `#D8D6CE` | `#1E2024` |
| **Analog Grain (Static SVG Noise)** | `.zy-noise-overlay` | `2.5%` opacity | `2.6%` opacity |
