/**
 * CBSE Competency Levels
 * Bloom's Taxonomy based competency mapping for all chapters
 */

export const competencyLevels = {
  'cbse-class-10': {
    'ch-1-1': 'Remembering',
    'ch-1-2': 'Understanding',
    'ch-1-3': 'Remembering',
    'ch-1-4': 'Understanding',
    'ch-1-5': 'Remembering',
    'ch-2-1': 'Applying',
    'ch-2-2': 'Applying',
    'ch-2-3': 'Applying',
    'ch-2-4': 'Applying',
    'ch-2-5': 'Applying',
    'ch-2-6': 'Applying',
    'ch-3-1': 'Applying',
    'ch-3-2': 'Applying',
    'ch-3-3': 'Applying',
    'ch-3-4': 'Applying',
    'ch-4-1': 'Applying',
    'ch-4-2': 'Applying',
    'ch-4-3': 'Applying',
    'ch-5-1': 'Understanding',
    'ch-5-2': 'Understanding'
  },
  'cbse-class-11': {
    'ch-11-1-1': 'Remembering',
    'ch-11-1-2': 'Applying',
    'ch-11-1-3': 'Understanding',
    'ch-11-1-4': 'Understanding',
    'ch-11-2-1': 'Applying',
    'ch-11-2-2': 'Understanding',
    'ch-11-2-3': 'Applying',
    'ch-11-3-1': 'Applying',
    'ch-11-3-2': 'Applying',
    'ch-11-3-3': 'Applying',
    'ch-11-3-4': 'Applying',
    'ch-11-3-5': 'Applying',
    'ch-11-3-6': 'Applying',
    'ch-11-3-7': 'Applying',
    'ch-11-3-8': 'Applying',
    'ch-11-4-1': 'Understanding',
    'ch-11-4-2': 'Applying',
    'ch-11-4-3': 'Applying',
    'ch-11-5-1': 'Understanding',
    'ch-11-5-2': 'Understanding'
  },
  'cbse-class-12': {
    'ch-12-1-1': 'Remembering',
    'ch-12-1-2': 'Understanding',
    'ch-12-1-3': 'Applying',
    'ch-12-1-4': 'Applying',
    'ch-12-1-5': 'Applying',
    'ch-12-2-1': 'Applying',
    'ch-12-2-2': 'Applying',
    'ch-12-2-3': 'Applying',
    'ch-12-2-4': 'Applying',
    'ch-12-3-1': 'Remembering',
    'ch-12-3-2': 'Applying',
    'ch-12-3-3': 'Applying',
    'ch-12-3-4': 'Analyzing',
    'ch-12-4-1': 'Applying',
    'ch-12-4-2': 'Understanding',
    'ch-12-4-3': 'Analyzing',
    'ch-12-5-1': 'Understanding',
    'ch-12-5-2': 'Understanding',
    'ch-12-5-3': 'Understanding'
  }
};

/**
 * Bloom's Taxonomy levels
 */
export const bloomLevels = {
  REMEMBERING: 'Remembering',
  UNDERSTANDING: 'Understanding',
  APPLYING: 'Applying',
  ANALYZING: 'Analyzing',
  EVALUATING: 'Evaluating',
  CREATING: 'Creating'
};

/**
 * Get competency level for a chapter
 */
export const getCompetencyLevel = (classId, chapterId) => {
  const classLevels = competencyLevels[classId];
  if (!classLevels) return 'Understanding';
  return classLevels[chapterId] || 'Understanding';
};

/**
 * Get chapters by competency level
 */
export const getChaptersByCompetency = (classId, level) => {
  const classLevels = competencyLevels[classId];
  if (!classLevels) return [];
  
  return Object.entries(classLevels)
    .filter(([chapterId, compLevel]) => compLevel === level)
    .map(([chapterId, compLevel]) => chapterId);
};

/**
 * Get competency distribution for a class
 */
export const getCompetencyDistribution = (classId) => {
  const classLevels = competencyLevels[classId];
  if (!classLevels) return {};
  
  const distribution = {};
  Object.values(classLevels).forEach(level => {
    distribution[level] = (distribution[level] || 0) + 1;
  });
  
  return distribution;
};

export default competencyLevels;