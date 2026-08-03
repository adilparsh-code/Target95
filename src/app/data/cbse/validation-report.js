/**
 * CBSE Data Validation Report
 * Validates the structure and completeness of CBSE academic data
 */

export const validateCBSEStructure = () => {
  const report = {
    isValid: true,
    errors: [],
    warnings: [],
    stats: {
      totalClasses: 0,
      totalSubjects: 0,
      totalUnits: 0,
      totalChapters: 0,
      totalPracticals: 0,
      totalPreviousYearQuestions: 0,
      totalRevisionTopics: 0
    },
    details: {}
  };

  try {
    // Import all CBSE data
    const class10 = require('./classes/class10').default;
    const class11 = require('./classes/class11').default;
    const class12 = require('./classes/class12').default;
    const units = require('./units').cbseUnits;
    const learningOutcomes = require('./learning-outcomes').learningOutcomes;
    const competencyLevels = require('./competency-levels').competencyLevels;

    const classes = [class10, class11, class12];

    // Validate each class
    classes.forEach(cls => {
      report.stats.totalClasses++;
      report.details[cls.id] = {
        isValid: true,
        errors: [],
        warnings: [],
        stats: {
          subjects: 0,
          units: 0,
          chapters: 0,
          practicals: 0,
          previousYearQuestions: 0,
          revisionTopics: 0
        }
      };

      // Validate subjects
      if (!cls.subjects || !Array.isArray(cls.subjects)) {
        report.details[cls.id].errors.push('Missing or invalid subjects array');
        report.details[cls.id].isValid = false;
      } else {
        report.details[cls.id].stats.subjects = cls.subjects.length;
        report.stats.totalSubjects += cls.subjects.length;
      }

      // Validate units
      if (!cls.units || !Array.isArray(cls.units)) {
        report.details[cls.id].errors.push('Missing or invalid units array');
        report.details[cls.id].isValid = false;
      } else {
        report.details[cls.id].stats.units = cls.units.length;
        report.stats.totalUnits += cls.units.length;

        // Validate each unit
        cls.units.forEach(unit => {
          if (!unit.chapters || !Array.isArray(unit.chapters)) {
            report.details[cls.id].errors.push(`Unit ${unit.id}: Missing chapters array`);
            report.details[cls.id].isValid = false;
          } else {
            report.details[cls.id].stats.chapters += unit.chapters.length;
            
            // Validate each chapter
            unit.chapters.forEach(chapter => {
              // Check required fields
              const requiredFields = ['id', 'title', 'slug', 'description', 'learningObjectives', 'keywords', 'competencyLevel'];
              requiredFields.forEach(field => {
                if (!chapter[field]) {
                  report.details[cls.id].errors.push(`Chapter ${chapter.id}: Missing required field '${field}'`);
                  report.details[cls.id].isValid = false;
                }
              });

              // Validate learning objectives
              if (!Array.isArray(chapter.learningObjectives) || chapter.learningObjectives.length === 0) {
                report.details[cls.id].warnings.push(`Chapter ${chapter.id}: No learning objectives defined`);
              }

              // Validate keywords
              if (!Array.isArray(chapter.keywords) || chapter.keywords.length === 0) {
                report.details[cls.id].warnings.push(`Chapter ${chapter.id}: No keywords defined`);
              }

              // Validate previous year questions
              if (!chapter.previousYearQuestions || !Array.isArray(chapter.previousYearQuestions)) {
                report.details[cls.id].warnings.push(`Chapter ${chapter.id}: No previous year questions mapped`);
              } else {
                report.details[cls.id].stats.previousYearQuestions += chapter.previousYearQuestions.length;
              }

              // Validate marks distribution
              if (!chapter.marksDistribution) {
                report.details[cls.id].warnings.push(`Chapter ${chapter.id}: No marks distribution defined`);
              }
            });
          }
        });
      }

      // Validate practicals
      if (!cls.practicals || !Array.isArray(cls.practicals)) {
        report.details[cls.id].warnings.push('No practicals defined');
      } else {
        report.details[cls.id].stats.practicals = cls.practicals.length;
        report.stats.totalPracticals += cls.practicals.length;

        // Validate each practical
        cls.practicals.forEach(practical => {
          if (!practical.id || !practical.title || !practical.description) {
            report.details[cls.id].errors.push(`Practical ${practical.id || 'unknown'}: Missing required fields`);
            report.details[cls.id].isValid = false;
          }
        });
      }

      // Validate previous year questions
      if (!cls.previousYearQuestions || typeof cls.previousYearQuestions !== 'object') {
        report.details[cls.id].warnings.push('No previous year questions defined');
      } else {
        Object.entries(cls.previousYearQuestions).forEach(([year, questions]) => {
          if (!questions.mcq || !Array.isArray(questions.mcq)) {
            report.details[cls.id].warnings.push(`Year ${year}: No MCQ questions`);
          }
          if (!questions.shortAnswer || !Array.isArray(questions.shortAnswer)) {
            report.details[cls.id].warnings.push(`Year ${year}: No short answer questions`);
          }
        });
      }

      // Validate revision topics
      if (!cls.revisionTopics || !Array.isArray(cls.revisionTopics)) {
        report.details[cls.id].warnings.push('No revision topics defined');
      } else {
        report.details[cls.id].stats.revisionTopics = cls.revisionTopics.length;
        report.stats.totalRevisionTopics += cls.revisionTopics.length;
      }

      // Update overall validity
      if (!report.details[cls.id].isValid) {
        report.isValid = false;
        report.errors.push(...report.details[cls.id].errors);
      }
      report.warnings.push(...report.details[cls.id].warnings);
    });

    // Validate units configuration
    Object.entries(units).forEach(([classId, classUnits]) => {
      if (!Array.isArray(classUnits)) {
        report.errors.push(`Invalid units configuration for ${classId}`);
        report.isValid = false;
      }
    });

    // Validate learning outcomes
    Object.entries(learningOutcomes).forEach(([classId, classOutcomes]) => {
      if (typeof classOutcomes !== 'object') {
        report.errors.push(`Invalid learning outcomes for ${classId}`);
        report.isValid = false;
      }
    });

    // Validate competency levels
    Object.entries(competencyLevels).forEach(([classId, classLevels]) => {
      if (typeof classLevels !== 'object') {
        report.errors.push(`Invalid competency levels for ${classId}`);
        report.isValid = false;
      }
    });

    // Calculate totals
    report.stats.totalChapters = report.stats.totalUnits > 0 
      ? Object.values(report.details).reduce((sum, detail) => sum + detail.stats.chapters, 0)
      : 0;

    report.stats.totalPreviousYearQuestions = Object.values(report.details).reduce(
      (sum, detail) => sum + detail.stats.previousYearQuestions, 0
    );

  } catch (error) {
    report.isValid = false;
    report.errors.push(`Validation failed with error: ${error.message}`);
  }

  return report;
};

/**
 * Get validation summary
 */
export const getValidationSummary = () => {
  const report = validateCBSEStructure();
  
  return {
    isValid: report.isValid,
    totalErrors: report.errors.length,
    totalWarnings: report.warnings.length,
    stats: report.stats,
    errorSummary: report.errors.slice(0, 10), // Show first 10 errors
    warningSummary: report.warnings.slice(0, 10) // Show first 10 warnings
  };
};

export default validateCBSEStructure;