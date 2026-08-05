# TARGET95 - Official Learning Architecture
## Core Mission
TARGET95 is a Learning Platform first, with Question Bank as a first-class feature. The platform preserves public access to all learning content while only requiring authentication for personalized features.

---

## 1. Core User Journey (Publicly Accessible)
All users can navigate through the entire hierarchy without login. Learning content remains completely public to ensure unrestricted access.

```
Homepage
  ↓
Board Selection
  ↓
Class Selection
  ↓
Subject Selection
  ↓
Chapter Selection
  ↓
Chapter Landing Page (Two First-Class Options)
    ├─ 📖 Study Mode (Learning-First Path)
    └─ 📝 Question Bank (Practice-First Path)
```

---

## 2. Navigation Hierarchy Details
### 2.1 Homepage
- Platform introduction
- Quick access to popular boards
- Search functionality for direct chapter/subject access
- No forced login prompts
- No duplicate "Start Learning" buttons

### 2.2 Board Selection (Preserving CISCE Flow)
- All education boards listed clearly
- **CISCE board maintains dedicated ICSE (Class 9-10) and ISC (Class 11-12) paths** - preserved per requirements
- State boards displayed with their respective states
- International boards (if applicable)

### 2.3 Class Selection
- Board-specific classes available
- ICSE: Classes 9-10 only
- ISC: Classes 11-12 only
- Other boards: Classes as per their curriculum
- No restrictions on public access

### 2.4 Subject Selection
- Curriculum-aligned subjects for selected class and board
- Clear subject descriptions
- Chapter count displayed
- All content publicly accessible

### 2.5 Chapter Selection
- Chapter list with progress indicators (progress only visible to logged-in users)
- Last accessed timestamp (stored locally for guests, synced for logged-in users)
- Public content preview available to all

### 2.6 Chapter Landing Page (Critical Design Rules)
- **Only two primary options presented equally: Study and Question Bank**
- No prioritization of practice over theory - user chooses their path
- No duplicate action buttons
- Clear icons and descriptions for both paths
- All users can access both paths without login

---

## 3. Study Mode Content Structure (100% Publicly Accessible)
The Study mode is the comprehensive learning path that presents content in pedagogical order. All learning content is available to all users without authentication.

```
📖 Study Mode
  ├─ Theory (Core foundational content)
  ├─ Definitions (Key terminology explained)
  ├─ Key Points (Summarized critical concepts)
  ├─ Examples (Practical applications of theory)
  ├─ Diagrams (Visual learning aids)
  ├─ Revision Notes (Condensed chapter review material)
  ├─ Practice MCQs (Reinforce learning after theory)
  ├─ Programming (For STEM subjects - coding exercises)
  ├─ PYQs (Previous Year Questions from board exams)
  ├─ Mock Test (Chapter-level assessment)
  └─ AI Tutor (Personalized help - requires login)
```

### 3.1 Study Mode Content Access Rules
| Content Type | Guest Access | Logged-in Access |
|--------------|--------------|------------------|
| Theory | ✅ Full access | ✅ Full access + sync progress |
| Definitions | ✅ Full access | ✅ Full access + save notes |
| Key Points | ✅ Full access | ✅ Full access + sync |
| Examples | ✅ Full access | ✅ Full access |
| Diagrams | ✅ Full access | ✅ Full access + download |
| Revision Notes | ✅ Full access | ✅ Full access + PDF download |
| Practice MCQs | ✅ Limited attempts | ✅ Unlimited attempts + track scores |
| Programming | ✅ View problems | ✅ Run code + save submissions |
| PYQs | ✅ View questions | ✅ Attempt + track performance |
| Mock Test | ✅ One attempt | ✅ Multiple attempts + detailed analytics |
| AI Tutor | ❌ Login required | ✅ Unlimited access |

---

## 4. Question Bank Feature (First-Class Citizen - 100% Public Core)
The Question Bank remains a fully accessible, standalone feature that users can enter at any time after selecting a chapter. All question content is public; only personalization features require login.

```
📝 Question Bank
  ├─ MCQs (Multiple Choice Questions)
  ├─ Programming (Coding problems with test cases)
  ├─ Output Questions (Code output prediction)
  ├─ PYQs (Previous Year Questions - same as Study mode, standalone access)
  ├─ Difficulty Levels (Beginner/Intermediate/Advanced tags)
  ├─ Filters (By type, difficulty, topic, year)
  ├─ AI Explanation (Automated explanations - requires login)
  ├─ Bookmark (Save important questions - requires login)
  └─ Mark for Revision (Track questions to review - requires login)
```

### 4.1 Question Bank Access Rules
| Feature | Guest Access | Logged-in Access |
|---------|--------------|------------------|
| MCQs | ✅ Attempt all | ✅ Attempt + track performance |
| Programming | ✅ View problems | ✅ Run code + save submissions |
| Output Questions | ✅ Attempt all | ✅ Track scores |
| PYQs | ✅ View all | ✅ Attempt + performance history |
| Difficulty Levels | ✅ View tags | ✅ Filter by difficulty + performance analytics |
| Filters | ✅ All filters available | ✅ Save filter preferences |
| AI Explanation | ❌ Login required | ✅ Unlimited access to explanations |
| Bookmark | ❌ Login required | ✅ Unlimited bookmarks + organization |
| Mark for Revision | ❌ Login required | ✅ Create revision lists |

---

## 5. Authentication Requirements - Only Personalization Needs Login
Following the requirement: **Learning content must remain public. Only personalized features should require authentication.**

### 5.1 Features That NEVER Require Login (All Content Public)
- Navigating any board/class/subject/chapter hierarchy
- Accessing all Study Mode theory and learning materials
- Viewing all Question Bank questions
- Attempting MCQs, output questions, viewing problems
- Using all filter and sorting capabilities
- Accessing PYQs and mock test questions

### 5.2 Features That DO Require Login (All Personalization Features)
| Feature Category | Specific Features |
|------------------|-------------------|
| AI Features | AI Tutor access, AI Explanations for questions |
| Progress Tracking | Saving learning progress, syncing across devices |
| Personal Organization | Bookmarks, Mark for Revision, custom lists |
| Performance Analytics | Score history, weak area identification, progress reports |
| Content Interaction | Saving notes, highlighting text, downloading PDFs |
| Submission Storage | Saving programming submissions, mock test attempts |

---

## 6. Non-Negotiable Design Rules (From Mistake Prevention)
These rules must be followed in all implementations to prevent past mistakes:

1. **❌ Never duplicate Start Learning buttons** - Only clear, singular action buttons per path
2. **❌ Never remove Question Bank** - Remains first-class feature equal to Study mode
3. **❌ Never force Login before learning** - All core content accessible to guests
4. **❌ Never change board structure without preserving CISCE → ICSE/ISC flow** - This hierarchy is sacred
5. **❌ Never assume the user wants practice before theory** - User chooses their path at chapter level
6. **✅ Always keep learning content public** - Only personalization behind login
7. **✅ Always present Study and Question Bank as equal options** - No hierarchy between the two

---

## 7. User Flow Examples
### Example 1: Student who wants to learn first (Theory → Practice)
1. Visits homepage → Selects CISCE board → ICSE → Class 10 → Mathematics → Chapter 3: Trigonometry
2. Chooses "📖 Study" on chapter landing page
3. Reads theory, definitions, sees diagrams and examples
4. Reviews key points and revision notes
5. Attempts practice MCQs to reinforce learning
6. Solves PYQs from past board exams
7. Takes chapter mock test to assess understanding
8. (Optional) Logs in to use AI Tutor for difficult concepts

### Example 2: Student who wants to practice first (Question Bank path)
1. Visits homepage → Selects State Board → Class 12 → Physics → Chapter 5: Electromagnetism
2. Chooses "📝 Question Bank" on chapter landing page
3. Uses filters to select only Advanced difficulty MCQs
4. Attempts questions, checks answers
5. (Optional) Logs in to bookmark challenging questions
6. (Optional) Enables AI Explanation to understand solutions better
7. Switches to Study mode to review theory on topics they struggled with

### Example 3: CISCE Student (ISC path preserved)
1. Visits homepage → Selects CISCE board → ISC (preserved path) → Class 12 → Computer Science
2. Selects Chapter 4: OOP Concepts
3. Chooses Study mode to learn theory
4. Accesses Programming section to practice coding
5. Logs in to save code submissions and track progress
6. Later returns to Question Bank to practice output questions
7. Marks difficult questions for revision before exams

---

## 8. Technical Implementation Notes
- All content APIs must be accessible without authentication tokens
- Authentication only required for user-specific API endpoints (bookmarks, progress, AI features)
- Guest progress stored in localStorage only, never sent to servers
- Logged-in users have their data synced to cloud databases
- CISCE board's ICSE/ISC split hardcoded in navigation logic to preserve flow
- Chapter landing page never prioritizes one option over the other - equal visual weight
- No login modals or prompts that block access to content
- Login only available via dedicated "Login" button in header, never forced during navigation