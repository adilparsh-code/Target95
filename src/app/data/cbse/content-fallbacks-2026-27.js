const fallback = (name) => ({
  learningOutcomes: [`Explain and apply the prescribed ${String(name).toLowerCase()} concepts.`],
  theory: [name, 'Core concepts, terminology and applications'],
  practicalActivities: [`Complete a guided practical activity on ${String(name).toLowerCase()}.`],
  chapters: [],
});

export const cbseUnitContentFallback = fallback;

export default fallback;
