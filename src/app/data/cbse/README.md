# CBSE Academic Data Structure

Production-ready CBSE (Central Board of Secondary Education) academic data configuration for Target95 platform.

## Overview

This data layer provides comprehensive CBSE curriculum information for:
- **Class 10**: Computer Applications (Code 165/402)
- **Class 11**: Computer Science (Code 083)
- **Class 12**: Computer Science (Code 083)

## Folder Structure

```
src/app/data/cbse/
├── index.js                      # Main entry point with helper functions
├── subjects.js                   # Subject definitions for all classes
├── units.js                      # Unit configurations and weightages
├── learning-outcomes.js          # Learning objectives by chapter
├── competency-levels.js          # Bloom's taxonomy competency mapping
├── validation-report.js          # Data validation and integrity checks
├── inconsistencies.js            # Known curriculum issues and recommendations
├── README.md                     # This file
└── classes/
    ├── class10/
    │   └── index.js              # Class 10 complete curriculum (20 chapters, 15 practicals)
    ├── class11/
    │   └── index.js              # Class 11 complete curriculum (20 chapters, 20 practicals)
    └── class12/
        └── index.js              # Class 12 complete curriculum (19 chapters, 25 practicals)
```

## Data Architecture

### Entity Structure

Each entity follows a consistent schema:

```javascript
{
  id: "unique-identifier",           // Unique ID for the entity
  slug: "url-friendly-slug",         // URL-safe slug
  title: "Display Title",            // Human-readable title
  description: "Detailed description", // Comprehensive description
  displayOrder: 1,                   // Sort order
  keywords: ["keyword1", "keyword2"], // Search keywords
  learningObjectives: ["objective1"], // Learning outcomes
  competencyLevel: "Applying",       // Bloom's taxonomy level
  metadata: {                        // Additional metadata
    isPractical: true,
    isTheory: false,
    importantTopics: [],
    commonMistakes: []
  }
}
```

### Class Structure

```javascript
{
  id: "cbse-class-10",
  name: "Class 10",
  fullName: "CBSE Class 10",
  icon: "📘",
  color: "border-blue-300 bg-blue-50",
  board: "CBSE",
  stream: "General",
  subjects: [...],
  units: [...],
  practicals: [...],
  previousYearQuestions: {...},
  revisionTopics: [...]
}
```

### Unit Structure

```javascript
{
  id: "unit-1-basics",
  unitNumber: 1,
  title: "Unit Title",
  slug: "unit-slug",
  description: "Unit description",
  displayOrder: 1,
  weightage: 15,  // Marks weightage
  chapters: [...]
}
```

### Chapter Structure

```javascript
{
  id: "ch-1-1",
  chapterNumber: 1,
  unitId: "unit-1-basics",
  title: "Chapter Title",
  slug: "chapter-slug",
  description: "Chapter description",
  displayOrder: 1,
  difficulty: "Beginner",
  estimatedTime: 45,  // Minutes
  topics: ["Topic 1", "Topic 2"],
  learningObjectives: [...],
  keywords: [...],
  competencyLevel: "Remembering",
  marksDistribution: {
    mcq: 2,
    shortAnswer: 4,
    longAnswer: 0,
    practical: 0
  },
  previousYearQuestions: [2020, 2021, 2022, 2023, 2024, 2025],
  metadata: {
    isPractical: false,
    isTheory: true,
    importantTopics: [],
    commonMistakes: []
  }
}
```

## Curriculum Summary

### Class 10 - Computer Applications

**Total Chapters**: 20
**Total Units**: 5
**Total Practicals**: 15
**Total Marks**: 100 (Theory: 70, Practical: 30)

#### Units:
1. **Basic Computer System** (15 marks, 5 chapters)
   - Computer fundamentals, components, I/O devices, memory, software

2. **Office Tools** (25 marks, 6 chapters)
   - MS Word (basic & advanced), MS Excel (basic & advanced), PowerPoint, Integration

3. **Web Technologies and HTML** (20 marks, 4 chapters)
   - HTML basics, lists/tables, forms, CSS

4. **Programming Fundamentals** (25 marks, 3 chapters)
   - Scratch (basic & advanced), Python introduction

5. **Cyber Safety and Ethics** (15 marks, 2 chapters)
   - Internet & web browsing, cyber safety & ethics

### Class 11 - Computer Science

**Total Chapters**: 20
**Total Units**: 5
**Total Practicals**: 20
**Total Marks**: 100 (Theory: 70, Practical: 30)

#### Units:
1. **Computer Fundamentals** (15 marks, 4 chapters)
   - Computer systems, number systems, software, memory

2. **Programming Methodology** (15 marks, 3 chapters)
   - Problem solving, algorithms, Python basics

3. **Python Programming** (30 marks, 8 chapters)
   - Variables, operators, conditionals, loops, strings, lists, tuples, dictionaries, functions

4. **Database Management System** (20 marks, 3 chapters)
   - Database concepts, SQL basics, SQL advanced

5. **Society, Law and Ethics** (10 marks, 2 chapters)
   - IPR, cyber safety

### Class 12 - Computer Science

**Total Chapters**: 19
**Total Units**: 5
**Total Practicals**: 25
**Total Marks**: 100 (Theory: 70, Practical: 30)

#### Units:
1. **Object Oriented Programming with Python** (20 marks, 5 chapters)
   - Python review, OOP concepts, classes/objects, inheritance, data hiding

2. **Advanced Python** (20 marks, 4 chapters)
   - File handling, exception handling, data structures, modules

3. **Database Management System** (20 marks, 4 chapters)
   - Database review, SQL advanced, connectivity, normalization

4. **Boolean Algebra** (15 marks, 3 chapters)
   - Boolean fundamentals, logic gates, Karnaugh maps

5. **Communication Technologies** (15 marks, 3 chapters)
   - Networks, protocols, web technologies & security

## Competency Levels (Bloom's Taxonomy)

- **Remembering**: Recall facts and basic concepts
- **Understanding**: Explain ideas or concepts
- **Applying**: Use information in new situations
- **Analyzing**: Draw connections among ideas
- **Evaluating**: Justify a decision or course of action
- **Creating**: Produce new or original work

### Distribution:
- **Class 10**: 5 Remembering, 5 Understanding, 10 Applying
- **Class 11**: 2 Remembering, 6 Understanding, 12 Applying
- **Class 12**: 2 Remembering, 5 Understanding, 8 Applying, 2 Analyzing, 2 Analyzing

## Integration with Platform

### Search
- Keywords in every chapter, unit, and practical
- Full-text search ready
- Tag-based filtering

### Dashboard
- Progress tracking by chapter/unit
- Estimated time calculations
- Difficulty levels
- Marks distribution

### AI Tutor
- Learning objectives for each chapter
- Competency levels for adaptive learning
- Common mistakes for targeted help
- Important topics for focus areas

### Question Engine
- Chapter-topic mapping
- Previous year questions (2020-2025)
- Marks distribution
- Difficulty levels

### Mock Tests
- Previous year questions organized by year
- Unit-wise weightage
- Topic coverage
- Time estimation

## Usage Examples

### Get all CBSE classes
```javascript
import { getAllCBSEClasses } from '@/app/data/cbse';

const classes = getAllCBSEClasses();
```

### Get specific class
```javascript
import { getCBSEClassById } from '@/app/data/cbse';

const class10 = getCBSEClassById('cbse-class-10');
```

### Get chapters by unit
```javascript
const class10 = getCBSEClassById('cbse-class-10');
const unit1 = class10.units.find(u => u.id === 'unit-1-basics');
const chapters = unit1.chapters;
```

### Get learning outcomes
```javascript
import { getLearningOutcomes } from '@/app/data/cbse/learning-outcomes';

const outcomes = getLearningOutcomes('cbse-class-10', 'ch-1-1');
```

### Get competency level
```javascript
import { getCompetencyLevel } from '@/app/data/cbse/competency-levels';

const level = getCompetencyLevel('cbse-class-11', 'ch-11-3-4');
```

### Validate data structure
```javascript
import { validateCBSEStructure } from '@/app/data/cbse/validation-report';

const validation = validateCBSEStructure();
console.log('Is valid:', validation.isValid);
console.log('Stats:', validation.stats);
```

### Get inconsistencies
```javascript
import { getCriticalInconsistencies } from '@/app/data/cbse/inconsistencies';

const criticalIssues = getCriticalInconsistencies();
```

## Validation

Run validation to check data integrity:

```javascript
import { getValidationSummary } from '@/app/data/cbse/validation-report';

const summary = getValidationSummary();
console.log('Valid:', summary.isValid);
console.log('Errors:', summary.totalErrors);
console.log('Warnings:', summary.totalWarnings);
```

## Known Issues

See `inconsistencies.js` for documented curriculum inconsistencies:
- 2 critical issues
- 4 moderate issues
- 2 minor issues

### Critical Issues:
1. Python content overlap between Class 10 and Class 11
2. No database content in Class 10

## Maintenance

### Adding New Chapters
1. Add chapter data to the appropriate class file (`classes/class10/index.js`, etc.)
2. Update unit chapter counts in `units.js`
3. Add learning outcomes in `learning-outcomes.js`
4. Add competency level in `competency-levels.js`
5. Run validation to ensure consistency

### Updating Previous Year Questions
Add questions to the `previousYearQuestions` object in the respective class file:
```javascript
previousYearQuestions: {
  2025: {
    mcq: [...],
    shortAnswer: [...],
    longAnswer: [...]
  }
}
```

### Adding Practicals
Add practical entries to the `practicals` array in the respective class file with:
- Unique ID
- Chapter reference
- Step-by-step instructions
- Learning objectives
- Software requirements

## Compatibility

This data structure is compatible with:
- ✅ Search functionality
- ✅ Dashboard analytics
- ✅ AI Tutor recommendations
- ✅ Question Engine
- ✅ Mock Test generation
- ✅ Progress tracking
- ✅ Revision modules

## Notes

- All IDs use kebab-case for URL compatibility
- Slugs are unique within each class
- Keywords support search and filtering
- Previous year questions span 2020-2025
- Practical marks are typically 5 marks each
- Theory papers are 3 hours duration
- All data follows CBSE 2024-25 syllabus

## Future Enhancements

- Add more previous year questions (currently sample questions)
- Include marking schemes
- Add video lesson references
- Include NCERT textbook mappings
- Add skill-based assessments
- Include project ideas
- Add interdisciplinary connections

---

**Generated**: 2025-01-15
**Version**: 1.0.0
**Syllabus**: CBSE 2024-25