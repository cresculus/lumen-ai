# Lumen Listening Rooms — World & Character System
**Goal:** Support ~1,000 videos without repeating “king stares / queen at window.”  
**Rule:** Characters are **roles in many rooms**, not one frozen pose.

---

## 1. Why empty backgrounds first
1. Reuse plates across many titles  
2. Drop locked cast later  
3. Stop AI inventing random faces  

**Pipeline:** empty plate → lock character ref → place → thumb badge  

Asset root:  
`C:\Users\brand\.cursor\projects\c-Users-brand-OneDrive-Desktop-Lumen-AI\assets\`

---

## 2. The world: Quiet Kingdom (scalable)

**Quiet Kingdom** is not one castle story. It is a **map of Listening Rooms** — places where feeling, focus, deep rest, and soft resets happen.

### Five regions (rotate forever)
| Region | Mood | Settings pool |
|--------|------|----------------|
| **The Exiled Marches** | bittersweet, dusk, memory | ridges, ruined roads, moss rocks, border towers |
| **Candleward** | waiting, soft light, night focus | tower rooms, libraries, scriptoria, window seats |
| **Hearthvale** | rest, warm reset | inns, cottages, hearth halls, rainy porches |
| **Silverwood** | ancient calm, elf time | star clearings, quiet streams, moss shrines |
| **Greyharbor** | sleep, tide, low drones | docks at night, fog piers, tide pools, lantern boats |

Each video = **1 Region + 1 Character (+ optional companion) + 1 Room verb + 1 Object/Weather**

That matrix alone → thousands of unique rooms.

---

## 3. Core cast (expanded roles)

### King Aldren — The Exiled King *(LOCKED LOOK)*
**File:** `sword-at-dusk-cartoon-with-knight.png`

**Look:** white hair/beard · worn armor · maroon cape · sword upright between knees · weathered calm  

**He is more than “exiled guy on a rock.”**  
Archetype: **the man who put power down**

| Room verbs (use these) | Settings |
|------------------------|----------|
| rests / remembers / forgives / watches the road / lays the sword down / teaches the squire / walks the border / sleeps under open sky | Marches ridges, empty throne room (visited once), rain road, campfire vigil, autumn field, ruined chapel |

**Title fuel:** The Exiled King Who ___, Aldren Among the ___, Sword Laid at ___

---

### Queen Seren — ~~Window Keeper~~ → **The Soft Regent**
**Do not trap her as “the woman in the window waiting for him.”**  
That was **one room**. She is the kingdom’s **quiet authority** — she rules the soft hours.

**Look:** dark hair + gold pins · indigo gown · calm sovereign face · optional lamp/book/ink  

**Archetype:** **she who keeps the realm gentle**

| Room verbs | Settings (her own lanes) |
|------------|---------------------------|
| keeps counsel / writes decrees at midnight / walks the candle galleries / blesses the harvest quiet / reads the old laws / waits *(rare)* / forgives the exile from afar / lights the winter halls | Candleward library, throne of soft light (no court noise), scriptorium, winter gallery, rain balcony, garden at blue hour, council chamber empty at dawn |

**Title fuel:** The Soft Regent Who ___, Seren in the ___, Midnight Counsel in ___

**Relationship to Aldren:** estranged / unfinished — **not her whole identity**. Most Seren videos never mention him.

---

### Lirael — The Listening Elf *(LOCKED VIBE)*
**File refs:** `lumen-character-lineup.png`, `rested-between-journeys-hearth-with-lirael.png`

**Look:** white-silver hair · pointed ears · cream/gold/indigo robes · calm gold eyes  

**Archetype:** **time that listens**

| Room verbs | Settings |
|------------|----------|
| rests between journeys / remembers names / sits with silence / watches stars / shares tea with mortals / walks Silverwood / hears the hearth | Hearthvale inns, star clearings, moss shrines, long roads, library alcoves, rainy windows |

**Title fuel:** The Elf Who ___, Lirael Between ___, Centuries Softened by ___

---

### Rowan — The Quiet Squire → **The Listening Apprentice**
**Look:** auburn hair · travel cloak · satchel · earnest  

**Archetype:** **the one still learning how to be still**

| Room verbs | Settings |
|------------|----------|
| studies / copies maps / follows / fails gently / finds courage / sleeps by books / asks better questions | road camps, scriptorium desk, apprentice loft, rain study nook, first watch on wall |

**Title fuel:** The Apprentice Who ___, Rowan Learns ___, First Watch at ___

---

### Moth — The Hearth Cat
**Archetype:** cozy witness / soft reset mascot  

Appears in corners of Hearthvale + sleep-adjacent rooms. Never the whole plot — texture.

---

## 4. Expanding cast (add slowly — don’t dump 50 at once)

Unlock new faces every ~20–30 videos:

| Name | Archetype | Region home | Unlocks room types |
|------|-----------|-------------|--------------------|
| **Bram** | The Miller at Dusk | Hearthvale | work-winddown, warm focus |
| **Ilya** | The Cartographer | Marches / Candleward | deep study, maps, ink |
| **Neris** | The Tide Sister | Greyharbor | sleep, tide drones, fog |
| **Corvin** | The Disgraced Knight | Marches | darker focus, rain, ruins |
| **Asta** | The Bell-Keeper | Candleward | soft reset, hourly calm |
| **Thorn** | The Forest Warden | Silverwood | nature ambient, walking focus |
| **Pewter** | The Innkeeper | Hearthvale | late-night social quiet |
| **Vesper** | The Night Scholar | Candleward | dark academia strings |

Each new character = **~40–80 video hooks** before they feel tired.

---

## 5. The 1,000-video engine

### Formula
```
Quiet Kingdom Listening Room — [Deep Focus for Study / Deep Sleep / Soft Reset]
| [Character] Who [Verb] [in/at/among] [Setting Detail]
```

### Examples (not trapped in one pose)
- The Soft Regent Who Wrote Until Dawn  
- The Soft Regent in the Winter Gallery  
- The Exiled King Who Forgave the Road  
- The Exiled King Among Autumn Ruins  
- The Elf Who Rested Between Journeys  
- The Elf Who Remembered Every Quiet Name  
- The Apprentice Who Kept First Watch  
- The Tide Sister Who Hushed the Harbor  
- The Night Scholar Among Grey Gold Shelves  

### Slot machine (pick one from each column)

| Character | Verb | Setting | Weather/Object | Use |
|-----------|------|---------|----------------|-----|
| Aldren / Seren / Lirael / Rowan / +new | rests, remembers, forgives, studies, waits, walks, returns, leaves, listens, lights, closes, opens | tower, hearth, road, library, pier, chapel, meadow, gallery, inn, ruin | rain, snow, dusk, lamp, sword, book, bell, tide, stars, embers | Focus / Sleep / Soft Reset |

**Math:** 12 characters × 20 verbs × 20 settings × 10 weathers ≈ **48,000** hooks.  
You only need **1,000** best ones.

---

## 6. Series shelves (playlists = regions)
1. **Quiet Kingdom — Exiled Marches** (Aldren, Corvin)  
2. **Quiet Kingdom — Candleward** (Seren, Vesper, Asta)  
3. **Quiet Kingdom — Hearthvale** (Lirael rest, Pewter, Bram, Moth)  
4. **Quiet Kingdom — Silverwood** (Lirael, Thorn)  
5. **Quiet Kingdom — Greyharbor** (Neris — sleep lane)  
6. **Focus Rooms** / **Sleep Rooms** (cross-cut by use, not story)

---

## 7. Relationship map (light — don’t over-soap)
```
Seren (Soft Regent) ──estranged / unfinished── Aldren (Exiled King)
         │
         └── protects realm’s quiet hours
Lirael ── visits all regions; outside mortal time
Rowan ── apprenticed to stillness; may serve Seren or follow Aldren’s legend
Moth ── belongs to hearths; appears where rest is needed
```
Most videos are **standalone rooms**. Continuity is optional spice (~1 in 10).

---

## 8. Visual rules
- Quiet Kingdom default: **storybook cartoon cinematic**  
- Thumb: MAIN story · SUB poetic · **BR badge LUMEN / Listening Rooms**  
- Characters midground, not face-closeup spam  
- Prompt line:  
  `Lumen original characters only — not existing anime IP. Match character bible: [Name].`

---

## 9. Locked assets so far
| Scene | File |
|--------|------|
| Aldren dusk + king | `sword-at-dusk-cartoon-with-knight.png` |
| Seren window era plates | `window-she-kept-lit-*.png` *(one chapter, not her whole life)* |
| Lirael hearth | `rested-between-journeys-hearth-with-lirael.png` |
| Cast lineup | `lumen-character-lineup.png` |
| Channel logo / banner | `lumen-listening-rooms-logo-cast-1x1.png`, `lumen-youtube-banner-with-cast-safe-16x9.png` |

---

## 10. Immediate next Seren videos (break the window trap)
1. **The Soft Regent Who Wrote Until Dawn** — scriptorium, ink, candle focus  
2. **The Soft Regent in the Winter Gallery** — blue hour indoor walk  
3. **Midnight Counsel** — empty council chamber, soft authority  
4. *(Only later)* return to window as a reunion/season finale room  

---

*Read with `SESSION-CONTEXT-QUIET-KINGDOM-2026-07.md` + `LUMEN-MASTER-PROMPT-MEDIEVAL-FANTASY-STUDY.md`*
