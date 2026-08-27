# CBSE Integration Gap Audit — 2026–27

## Purpose

Track remaining integration work after making the CBSE 2026–27 data layer the canonical source in `src/app/data/cbse/index.js`.

## Confirmed canonical exports

- `cbseCurriculum2026_27`
- `cbseSubjectTracks`
- `cbseQuestionSchema2026_27`
- `CBSE_SUBJECT_MOCK_CONFIG`
- `CBSE_MOCK_TEST_BLUEPRINTS`
- `CBSE_MOCK_TESTS_2026_27`

## Legacy data

Legacy class data remains available only through explicit `legacy*` exports. It must not be used by new CBSE student-facing routes/components.

## Required UI integration checks

1. Board selector must route CBSE students to current 2026–27 curriculum data.
2. Class cards IX, X, XI and XII must read from the current class/subject records.
3. XI/XII cards must distinguish subject codes 083, 065 and 802.
4. IX/X cards must expose 402 only.
5. Card click targets must resolve to an existing board/class/subject route.
6. Practice-question screens must select questions using board + class + subject code + chapter metadata.
7. Mock tests must select only questions belonging to the requested board/class/subject.
8. No current CBSE route should import `classes/class10`, `classes/class11`, or `classes/class12` directly.

## Important curriculum rule

Do not merge Python coverage between 083 and 065. 083 is the Computer Science track with core Python programming; 065 separately includes Python data handling with libraries such as Pandas and Matplotlib. 402 and 802 remain separate IT skill-subject tracks.
