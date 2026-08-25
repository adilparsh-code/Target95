# CBSE Academic Data Structure

Target95 CBSE curriculum data for session 2026–27.

## Source of truth

The official CBSE syllabus for the relevant subject code and session is the primary curriculum authority. Official CBSE textbooks/support material and NCERT resources are secondary mapping sources and must not override the syllabus.

## Supported CBSE subject tracks

- **402 — Information Technology:** Classes IX–X
- **083 — Computer Science:** Classes XI–XII
- **065 — Informatics Practices:** Classes XI–XII
- **802 — Information Technology:** Classes XI–XII

These are separate curriculum tracks. Similar topics must not be merged across subject codes.

## Python separation

- **083 Computer Science:** Python is core programming.
- **065 Informatics Practices:** Python is used for programming and data handling; library coverage is tracked separately, including Pandas and Matplotlib where prescribed.
- **402 Information Technology:** no Python curriculum assumption.
- **802 Information Technology:** separate skill-subject track; do not inherit Python content from 083/065.

## Current 2026–27 curriculum map

The authoritative structured map is in:

`src/app/data/cbse/curriculum-2026-27.js`

It is intentionally separated by class and subject code.

### Class IX — Information Technology (402)

Completed and source-verified for the current 2026–27 syllabus in:

`src/app/data/cbse/class9-402-verification.md`

The Class IX map includes:
- Employability Skills unit structure
- Subject Specific Skills Units 1–5
- unit hours and marks
- verified learning outcomes
- verified theory topics
- verified practical activities
- practical assessment breakup
- primary official CBSE source URL

### Legacy data warning

Older files under `src/app/data/cbse/classes/` and older documentation may contain historical or placeholder curriculum structures. They are **not authoritative for the 2026–27 curriculum** and must not be used as a source of truth for new CBSE content.

Before reusing legacy data, verify it against `curriculum-2026-27.js` and the official 2026–27 CBSE source.

## Data policy

1. Subject codes are authoritative identifiers.
2. Session must remain `2026-27` for this curriculum map.
3. Do not infer current units, chapters or topics from older sessions.
4. Do not fabricate learning outcomes or practical activities.
5. Only mark content as verified when checked against the relevant official 2026–27 source.
6. Keep syllabus structure separate from textbook/content mapping.
7. Preserve source URLs alongside verified curriculum records.
