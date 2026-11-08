# DESIGN.md — ZYRVAE Digital Studio (Phase 1: Swiss Corporate Brutalism)

## Aesthetic Direction: The Monolith Grid
ZYRVAE Phase 1 is built under the visual language of **Swiss Corporate Brutalism** (*Brutalismo Corporativo Suizo*), combining lithographic print precision, exposed hairline modular grids, raw bone paper warmth, monumental display typography, and a single refractive 3D obsidian-and-glass sculptural intervention.

---

## 1. Modular Grid System (The Monolith Grid)
- **Perimeter Print Margins:** `40px` outer vertical strips on the left and right edges of the viewport housing 90°-rotated technical typography (`BUENOS AIRES` on the left; `© 2026` and coordinates `34°36′S 58°22′W` on the right).
- **Row 1 (Integrated Header):** 4 continuous horizontal cells:
  - Cell 1 (`20%`): `ZYRVAE / PHASE 1 [01]` (monospace, left-aligned, `16px` padding).
  - Cell 2 (`45%`): `WORK | STUDIO | JOURNAL | ARCHIVE` (uppercase monospace, clean vertical bar separators, strikethrough + italic hover state).
  - Cell 3 (`20%`): `BUENOS AIRES, ARG [HH:MM:SS]` (live UTC-3 clock in tabular monospace).
  - Cell 4 (`15%`): Solid Security Vermilion (`#FF3B30`) full-height block with two-line white text (`CONTACT /` above, `INQUIRE →` below).
- **Row 2 (Monumental Hero Cell):** Single full-width cell (`100%` grid width, `50vh–55vh` min-height) containing the `ZYRVAE` display wordmark and the `Instrument Serif Italic` manifesto.
- **Row 3 (Capabilities, Sculptural Asset & Signature Seal):** 3 proportional cells:
  - Cell 1 (`40%`): `01 / CAPABILITIES` + 3-line justified text block on brutalist architecture and digital interfaces.
  - Cell 2 (`35%`): Central 3D faceted obsidian and refractive glass sculpture anchored at the bottom, overlapping the lower horizontal divider line.
  - Cell 3 (`25%`): `02 / CURRENT PHASE` (`— Art Direction`, `— Interactive`, `— CGI`) + `70px` circular typographic seal (`ZYRVAE · BS.AS. · ARG` with a monolithic central `Z`).
- **Grid Hairlines:** Strict `0.5px` / `1px` borders in `#D8D6CE` (Light Mode) and `#1E2024` (Dark Mode).
- **Absolute Sharp Corners:** `border-radius: 0px` (`rounded-none`) across all cells, buttons, containers, and images.

---

## 2. Typography Hierarchy
1. **Display Headline (`ZYRVAE`):**
   - **Typeface:** `Syne` ExtraBold (`800`) / `Plus Jakarta Sans` (`800`), fallback `Monument Extended` / `Druk Wide Bold`.
   - **Scale & Treatment:** All-caps, fluid `12vw–15vw`, `letter-spacing: -0.04em`, `line-height: 0.85`, spanning margin-to-margin across the cell.
2. **Editorial Manifesto (Author Subtitle):**
   - **Typeface:** `Instrument Serif` (`Italic`, weight `400`).
   - **Scale & Treatment:** Fluid `2.2rem–3.5rem` (`3vw`), Sentence case: *"An avant-garde independent digital studio based in Buenos Aires, Argentina."*
3. **Technical Micro-Typography (Metadata & Lower Cells):**
   - **Typeface:** `JetBrains Mono` / `Geist Mono`.
   - **Scale & Treatment:** Strict `11px–12px`, uppercase, `letter-spacing: 0.08em`, weight `500` (`medium`).

---

## 3. Chromatic Palette & Material Finishes
| Role | Token | Hex (Light Mode) | Hex (Dark Mode) |
| :--- | :--- | :--- | :--- |
| **Raw Bone Paper (Primary Ground)** | `--zy-bg` | `#EFEFEA` | `#0A0A0C` |
| **Lithographic Black Ink (Primary Type)** | `--zy-fg` | `#0A0A0C` | `#EFEFEA` |
| **Mineral Graphite (Secondary / Metadata)** | `--zy-muted` | `#4A4D52` | `#9CA3B5` |
| **Security Vermilion (Single Accent Anchor)** | `--zy-vermilion` | `#FF3B30` | `#FF3B30` |
| **Monolith Grid Hairlines** | `--zy-grid-line` | `#D8D6CE` | `#1E2024` |
| **Analog Grain (Static SVG Noise)** | `.zy-noise-overlay` | `2.5%` opacity | `2.6%` opacity |
