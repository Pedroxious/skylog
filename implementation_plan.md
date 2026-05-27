# Fix README + Redesign SVG Cards

## Problem Analysis

The project has **unresolved git merge conflicts** scattered throughout:
- `README.md` — ~30+ conflict markers (`<<<<<<< HEAD`, `=======`, `>>>>>>>`) making it unreadable
- `cards/*.svg` — SVG files also contain merge conflict markers, making them broken/unrenderable on GitHub
- Duplicated city sections (e.g., Havana appears twice, Moscow appears twice)
- Missing cities from the ordered list (Mexico City, Miami, New York were overwritten)

> [!CAUTION]
> The SVG cards are **completely broken** on GitHub right now because they contain raw git merge conflict text inside the SVG XML. GitHub cannot render them at all.

## Proposed Changes

### [Component 1] Resolve All Merge Conflicts

#### [MODIFY] [update_weather.py](file:///c:/Users/Alice/Desktop/My%20Site/skylog/update_weather.py)

The script itself generates both the SVG cards and the README.md. Since the script is the source of truth and regenerates everything on each run, the cleanest approach is to:

1. **Fix the SVG card generator** — Redesign `generate_svg_card()` with a new premium layout
2. **Fix the README generator** — Clean up `generate_city_section()` and `generate_readme()`
3. **Run the script** — This regenerates all 15 SVG cards + the entire README.md from scratch, wiping out all merge conflicts

---

### [Component 2] Redesign SVG Cards — Modern, Gradient-based, Temperature & Time-Aware

#### [MODIFY] [update_weather.py](file:///c:/Users/Alice/Desktop/My%20Site/skylog/update_weather.py) — `generate_svg_card()`

The new SVG card design will feature:

**Intelligent Gradient Presets:**
- 🥶 **Freezing** (< 5°C): Deep blue to ice white gradient
- ❄️ **Cold** (5–15°C): Steel blue to slate gradient
- 🌤️ **Mild** (15–25°C): Teal to cyan gradient
- 🌞 **Warm** (25–32°C): Amber to orange gradient
- 🔥 **Hot** (> 32°C): Red to magenta gradient
- 🌙 **Night** variants: Darker, deeper versions of each with indigo/navy tones

**Card Layout (500×300px, GitHub-compatible):**
```
┌─────────────────────────────────────────────────┐
│  City Name, Country          Continent • Time   │
│  ─────────────────────────────────────────────── │
│  🌡️ 28°C                              ☀️ Clear  │
│  Feels like 32°C              Min 24° / Max 30° │
│  ─────────────────────────────────────────────── │
│  💧 81%   💨 13km/h   ☀️ UV:3   🎈 1016hPa     │
│  ─────────────────────────────────────────────── │
│  🕐 +1h: 27°C   🕑 +2h: 26°C   🕒 +3h: 25°C   │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░ Day Progress            │
└─────────────────────────────────────────────────┘
```

**Key design principles:**
- No emoji rendering (GitHub SVG doesn't render emoji) — use pure SVG text/symbols instead
- Legible font sizes (minimum 11px for details, 48px for temperature)
- High-contrast text colors against gradient backgrounds
- Clean glassmorphism panels with semi-transparent overlays
- Animated weather elements (rain, snow, stars, clouds) preserved
- Static font-family using `system-ui, sans-serif`

---

### [Component 3] Reorganize README Layout

#### [MODIFY] [update_weather.py](file:///c:/Users/Alice/Desktop/My%20Site/skylog/update_weather.py) — `generate_city_section()` & `generate_readme()`

New clean layout per city:
- Landmark banner image (full width)
- Side-by-side: SVG card (left) + Condition photo (right)
- Compact data table with key metrics
- 3-day forecast table

All 15 cities in correct order matching `CIDADES` list.

---

### [Component 4] Regenerate Everything

Run `python update_weather.py` to:
- Fetch fresh weather data for all 15 cities
- Generate 15 new SVG cards (clean, no merge conflicts)
- Generate a clean README.md (no merge conflicts)
- Update CSV history

## Verification Plan

### Automated
- Run the Python script and confirm it completes with 0 errors
- Verify all 15 SVG files in `cards/` are valid XML (no merge conflict markers)
- Verify `README.md` contains no merge conflict markers
- Verify all 15 cities appear exactly once in the README
