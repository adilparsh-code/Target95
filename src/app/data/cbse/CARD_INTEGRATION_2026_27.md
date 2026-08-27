# CBSE 2026-27 Card Integration

## Source of truth

All current CBSE class/subject cards must resolve through `curriculum-2026-27.js` and the subject-track configuration. Legacy class files are compatibility exports only.

## Current tracks

- Class IX — 402 Information Technology
- Class X — 402 Information Technology
- Class XI — 083 Computer Science
- Class XII — 083 Computer Science
- Class XI — 065 Informatics Practices
- Class XII — 065 Informatics Practices
- Class XI — 802 Information Technology
- Class XII — 802 Information Technology

## Rules

1. Card routing must carry board, class and subject code.
2. Never infer the subject from a legacy array position.
3. Never fall back from 083 to 065 or 802, or vice versa.
4. 083 uses core Python programming; 065 tracks Python data handling with Pandas and Matplotlib; 802 is a Java-based IT skill track; 402 has no Python role.
5. Empty current curriculum records are allowed until their official 2026-27 mapping is completed; they must not silently display legacy data.

## QA checklist

- Class IX card opens 402 current curriculum.
- Class X card opens 402 current curriculum.
- XI 083, XI 065 and XI 802 resolve separately.
- XII 083, XII 065 and XII 802 resolve separately.
- Search results retain board/class/subject scope.
- Question and mock-test links preserve the same scope.
