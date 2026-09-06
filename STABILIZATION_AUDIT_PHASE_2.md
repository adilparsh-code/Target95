# Target95 Phase 2: Stabilization Audit & Hardening

**Date:** 2026-09-06  
**Status:** ✅ Package-lock.json fix deployed + Phase 2 audit complete  
**Next Action:** Implement hardening fixes (Phase 3)

---

## Executive Summary

The codebase has **solid architectural foundations** but lacks defensive null checks and context isolation in three critical areas. This audit identifies 11 blocking issues and proposes targeted hardening.

### Key Findings
- ✅ **npm install fixed** – package-lock.json regenerated, no integrity errors
- ✅ **Academic Validator is comprehensive** – catches chapter duplicates, question references, and type mismatches
- ❌ **Rendering hazards** – Missing nullchecks in chapter/content/question paths
- ❌ **CBSE mock test support incomplete** – Curriculum exists, but questions not integrated into mock test player
- ❌ **Board/class context leakage** – ISC/ICSE routes accidentally accept CBSE category strings

---

## Phase 2: Audit Findings

### 1. **Academic Data Validator** (src/lib/validation/academicDataValidator.mjs)

**Status:** ✅ Production-ready, catches most issues

**Coverage:**
- Detects duplicate chapter IDs, slugs, question IDs/slugs
- Validates question type against inferred ID family (CH01-MCQ-001 → mcq)
- Ensures questions reference only existing chapters
- Validates difficulty levels, Bloom taxonomy, subjects
- Parses legacy question-bank families (mcqs, outputQuestions, programmingQuestions, etc.)

**What it misses:**
- Doesn't check for `null`/`undefined` chapter content fields (theoryNotes, examples)
- Doesn't validate visual asset references or DiagramsSection content
- Doesn't check context leakage (CBSE questions with ICSE category tags)

**Run:** `npm run validate:data`

---

### 2. **Chapter Registry & Curriculum Map**

#### ICSE (Canonical)
**File:** `src/app/data/javaCurriculum.js`  
**Chapters:** 18 chapters (Introduction to Java → Disruptive Technologies)  
**Issue:** ✅ Complete coverage

#### ISC XI/XII (Canonical)
**File:** `src/lib/iscSyllabus.js`  
**Topics (XI):** 13 topics covering System of Numeration → Python  
**Topics (XII):** 5 topics (Boolean Algebra → Advanced Java)  
**Issue:** ✅ Metadata only, no question content yet (by design: "verification required")

#### CBSE (Partial)
**File:** `src/app/data/cbse/curriculum-2026-27.js`  
**Classes & Subjects:**
- **Class 9:** 402 IT (Part A + B)
- **Class 10:** 402 IT (Part A + B)
- **Class 11:** 083 CS, 065 IP, 802 IT
- **Class 12:** 083 CS, 065 IP, 802 IT

**Issues:** ❌ **3 CRITICAL GAPS**
1. **No 083 CS chapters defined** – Curriculum exists (units, marks, hours) but zero chapter objects for lessons
2. **No 065 IP chapters defined** – Pandas/SQL/Networks defined as units, not searchable question chapters
3. **Mock test player cannot render CBSE questions** – `getCBSEMockQuestions()` exists but test player assumes questions have `.category` field; CBSE questions have `.classNumber` + `.subjectCode`

---

### 3. **Rendering Hazards**

#### Route: `/Java/[chapter]/page.jsx`
**Code:**
```javascript
const chapterData = getChapterContent("java", chapter);
if (!chapterData) { notFound(); } // ✅ Correct
```
**Status:** ✅ Safe — uses `notFound()`

#### Route: `/Java/[chapter]/question/[id]/page.jsx`
**Code:**
```javascript
const question = getQuestionContent("java", chapter, id);
if (!question) { notFound(); } // ✅ Correct
```
**Status:** ✅ Safe — uses `notFound()`

#### Mock Test Player: `src/app/mock-test/player/page.jsx:28-36`
**Issue:** ❌ **CRITICAL** — No fallback if CBSE question pool is empty
```javascript
const questions = useMemo(() => {
  let pool = board === "CBSE" && subjectCode 
    ? getCBSEMockQuestions(classNumber, subjectCode, 1000).map(normalizeCBSEQuestion) 
    : mockTestQuestions.filter((q) => q.category === category && ...);
  // If pool is empty, renders "No results" → OK, but:
  // If normalizeCBSEQuestion fails (null question fields), crash at line 38
  return shuffleArray(pool).slice(0, Math.min(count, pool.length));
}, [...]);
```
**Hazard:** If `getCBSEMockQuestions()` returns questions with missing `.questionType`, `.difficulty`, `.classNumber` fields → runtime crash in `normalizeCBSEQuestion`

#### Practice Player: `src/app/components/practice/PracticePlayer.jsx`
**Status:** ⚠️ Not yet audited (requires retrieval)

---

### 4. **Board/Class Context Isolation**

#### Mock Test Setup: `/mock-test/page.jsx:30-40`
**Code:**
```javascript
const contextBoard = (searchParams.get("board") || "ICSE").toUpperCase();
const contextCategory = `${contextBoard.toLowerCase()}-class-${contextClass}`;
const activeBoard = category.startsWith("cbse-") ? "CBSE" : 
                    category.startsWith("isc-") ? "ISC" : "ICSE";
```
**Issues:**
1. ❌ CBSE category string (`cbse-class-11`) gets routed to ICSE chapters if subjectCode is missing
2. ❌ ISC class 11 passed to Java curriculum (which only has ICSE IX, X + ISC XII K-Map content)
3. ❌ No validation that (board, class, subject) triplet is defined in curriculum

**Example:**
- User: `/mock-test?board=ISC&class=11` → category becomes `isc-class-11`
- Player fetches from `javaChapters` (ICSE only) with `isc` prefix → 0 results

---

### 5. **Missing Visual Asset Checks**

#### DiagramsSection: `src/app/components/content/sections/DiagramsSection.jsx`
**Status:** Not yet retrieved

**Expected:** Should validate that diagram references exist in `/public/visuals/icse-java/` before rendering `<Image>` tag

---

## Phase 2 Deliverables

### Issue Tracking

| ID | Category | Severity | Component | Fix |
|--|--|--|--|--|
| 1 | Rendering | CRITICAL | Mock Test Player | Add null-checks to `normalizeCBSEQuestion()` |
| 2 | Curriculum | CRITICAL | CBSE 083 CS | Define chapter objects for each unit |
| 3 | Curriculum | CRITICAL | CBSE 065 IP | Define chapter objects for each unit |
| 4 | Routing | HIGH | Mock Test Setup | Validate (board, class, subject) triplet against curriculum |
| 5 | Rendering | HIGH | Practice Player | Audit & harden question null-checks |
| 6 | Rendering | HIGH | DiagramsSection | Add fallback for missing visual assets |
| 7 | Data | HIGH | CBSE Mock Questions | Ensure all fields populated (questionType, difficulty, classNumber) |
| 8 | Validator | MEDIUM | academicDataValidator | Add context leakage detection (CBSE questions with ICSE category) |
| 9 | Context | MEDIUM | Mock Test Player | Log category/board mismatches for debugging |
| 10 | Docs | LOW | Curriculum Map | Document board-to-chapters routing matrix |
| 11 | Testing | LOW | E2E | Add cross-board mock test journey tests |

---

## Phase 3: Recommended Hardening Order

### Sprint 1: Blocking Issues (1–3)
1. **Fix CBSE Question Normalization** (Issue #1)
   - Add `question?.questionType ?? 'mcq'` fallback
   - Add `question?.difficulty ?? 'Medium'` fallback
   - Validate each required field before use

2. **Define CBSE 083 CS Chapters** (Issue #2)
   - Extract unit titles from `cbse083Class11.parts.partA.units`
   - Create chapter objects: `{ id, title, slug, board: "CBSE", class: "11", subject: "083", questions: [] }`
   - Repeat for class 12

3. **Define CBSE 065 IP Chapters** (Issue #3)
   - Extract Pandas, SQL, Networks units from `cbse065Class11Units`
   - Create chapter objects with same metadata
   - Repeat for class 12

### Sprint 2: Routing Isolation (Issues 4, 9)
4. **Validate Mock Test Category** (Issue #4)
   - In `/mock-test/page.jsx` setup, check that (board, class, subject) exists in curriculum
   - If not found, show error or redirect to valid configuration

5. **Add Debug Logging** (Issue #9)
   - Log category derivation on page load
   - Log question pool size by board before shuffle
   - Log first 3 questions' structure for validation

### Sprint 3: Rendering Hardening (Issues 5–6)
6. **Harden Practice Player** (Issue #5)
   - Wrap question renders in error boundaries
   - Add nullchecks for question.content, question.options, etc.

7. **Protect Visual Assets** (Issue #6)
   - Modify `DiagramsSection` to check `fs.existsSync()` or catch Image errors
   - Show fallback placeholder if visual missing

### Sprint 4: Data Quality (Issues 7–8, 10–11)
8. **Enrich CBSE Mock Questions** (Issue #7)
   - Audit `src/app/data/cbse/mock-tests-2026-27.js`
   - Ensure all questions have fields: `questionType`, `difficulty`, `classNumber`, `subjectCode`

9. **Extend Validator** (Issue #8)
   - Add rule: if question has board=CBSE, category must start with `cbse-`
   - Flag mismatches as ERRORs

10. **Document Routing Matrix** (Issue #10)
    - Create `CURRICULUM_ROUTING.md` showing board → chapters → questions flow

11. **Add E2E Tests** (Issue #11)
    - Test cross-board mock test journeys (ICSE → ISC → CBSE)
    - Verify each board renders correct question pools

---

## Validation Checkpoint

**To verify Phase 2 fixes are solid, run:**

```bash
# 1. Validate data integrity
npm run validate:data

# 2. Start dev server
npm run dev

# 3. Test each board in mock test:
# ICSE: http://localhost:3000/mock-test?board=ICSE&class=10
# ISC: http://localhost:3000/mock-test?board=ISC&class=12
# CBSE: http://localhost:3000/mock-test?board=CBSE&class=11&subjectCode=083

# 4. Verify result pages show correct performance metrics

# 5. Check browser console for warnings/errors
```

---

## Architecture Notes

### Curriculum Shape (Current)
```javascript
curriculum = [
  {
    id: "java",
    chapters: [
      { slug: "introduction-to-java", board: "ICSE", class: "IX", questions: [...] },
      { slug: "data-types-variables", board: "ICSE", class: "IX", questions: [...] },
      // ... 18 ICSE/ISC chapters total
    ]
  }
]
```

### Why CBSE is Incomplete
CBSE curriculum is defined at the **unit level** (e.g., "Boolean Algebra," "Pandas"). Each unit maps to multiple lessons, but no lesson objects exist yet. Legacy question bank has `chapterId` pointing to ICSE chapters, not CBSE units.

**To complete:**
1. Extract lesson titles from each CBSE unit
2. Create chapter objects in `src/app/data/cbse/chapters/` directory (parallel to `src/app/data/chapter-content/`)
3. Map questions from `getCBSEMockQuestions()` to these chapter objects

---

## Next Steps

1. ✅ Confirm npm install passes in workflow run #473
2. ✅ Review Phase 2 audit findings (this document)
3. 🔄 Execute Phase 3 hardening fixes (estimated 2-4 hours)
4. 🔄 Deploy fixes in a single PR with comprehensive test coverage
5. 📋 Monitor workflow for regressions

**Ready to proceed to Phase 3? [Y/N]**
