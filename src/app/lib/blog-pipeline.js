import {
  BLOG_AI_PROMPT_VERSION,
  TIME_SENSITIVE_CATEGORIES,
  buildOpenAIRequestBody,
  extractResponseText,
  parseDraftResponse,
} from "./blog-ai-prompt";
import {
  createArticle,
  getExistingArticleIndex,
  getRecentCategoryPillarCounts,
  claimTopicForGeneration,
  seedTopicsFromPool,
  markTopicDone,
  markTopicError,
  slugify,
} from "./blog";
import { runQualityChecks, DEFAULT_MIN_CONTENT_WORDS } from "./blog-quality-gate";

const DEFAULT_MODEL = "gpt-5.6-luna";

function buildArticleBrief(topic) {
  return {
    title: topic.title,
    category: topic.category,
    pillar: topic.pillar || "student-problems",
    timeSensitive: TIME_SENSITIVE_CATEGORIES.includes(topic.category) || topic.requiresVerification === true,
    targetWords: Number(topic.targetWords) || 700,
    referenceUrls: Array.isArray(topic.referenceUrls) ? topic.referenceUrls : [],
  };
}

export async function requestDraftFromModel(brief, { fetchImpl = fetch, model = process.env.BLOG_AI_MODEL || DEFAULT_MODEL } = {}) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured.");
  const response = await fetchImpl("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: "Bearer " + apiKey, "Content-Type": "application/json" },
    body: JSON.stringify(buildOpenAIRequestBody({ model, brief })),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error("AI provider error (" + response.status + "): " + errorText.slice(0, 500));
  }
  const result = await response.json();
  return { draft: parseDraftResponse(result), model };
}

export async function runPipelineForTopic(topic, { fetchImpl, minWords = Number(process.env.BLOG_MIN_CONTENT_WORDS) || DEFAULT_MIN_CONTENT_WORDS, deps = {} } = {}) {
  const services = {
    createArticle,
    getExistingArticleIndex,
    markTopicDone,
    markTopicError,
    slugify,
    ...deps,
  };
  const brief = buildArticleBrief(topic);
  let generated;
  try {
    generated = await requestDraftFromModel(brief, { fetchImpl });
  } catch (error) {
    await services.markTopicError(topic.id, error.message);
    return { ok: false, topicId: topic.id, stage: "generate", error: error.message };
  }

  let existingIndex;
  try {
    existingIndex = await services.getExistingArticleIndex();
  } catch {
    existingIndex = { slugs: new Set(), titles: new Set() };
  }

  const gate = runQualityChecks(generated.draft, {
    topic,
    existingSlugs: existingIndex.slugs,
    existingTitles: existingIndex.titles,
    minWords,
    slugify: services.slugify,
  });

  if (!gate.ok) {
    const message = gate.blocking.map((item) => item.id + ": " + item.message).join(" | ");
    await services.markTopicError(topic.id, message);
    return { ok: false, topicId: topic.id, stage: "quality-gate", error: message, blocking: gate.blocking };
  }

  try {
    const articleId = await services.createArticle({
      title: generated.draft.title,
      slug: gate.normalized.slug,
      excerpt: generated.draft.excerpt,
      content: generated.draft.content,
      seoTitle: generated.draft.seoTitle || generated.draft.title,
      metaDescription: generated.draft.metaDescription || generated.draft.excerpt,
      keywords: gate.normalized.keywords,
      editorNotes: Array.isArray(generated.draft.editorNotes) ? generated.draft.editorNotes : [],
      sourceUrls: gate.normalized.sourceUrls,
      needsVerification: gate.normalized.needsVerification,
      researchNotes: generated.draft.researchNotes || "",
      qualityChecks: Array.isArray(generated.draft.qualityChecks) ? generated.draft.qualityChecks : [],
      category: topic.category,
      pillar: topic.pillar || "student-problems",
      topicId: topic.id,
      source: "target95-ai-editorial-assistant",
      status: "review",
      needsHumanReview: true,
      aiModel: generated.model,
      promptVersion: BLOG_AI_PROMPT_VERSION,
    });
    await services.markTopicDone(topic.id, { articleId });
    return { ok: true, topicId: topic.id, articleId, status: "review", warnings: gate.warnings };
  } catch (error) {
    await services.markTopicError(topic.id, "Failed to save article: " + error.message);
    return { ok: false, topicId: topic.id, stage: "save", error: error.message };
  }
}

export async function runEditorialPipeline({ maxTopics = 1, fetchImpl, deps = {} } = {}) {
  const services = {
    seedTopicsFromPool,
    getRecentCategoryPillarCounts,
    claimTopicForGeneration,
    ...deps,
  };
  const seededTopics = await services.seedTopicsFromPool();
  const { categoryCounts, pillarCounts } = await services.getRecentCategoryPillarCounts();
  const results = [];
  for (let i = 0; i < maxTopics; i += 1) {
    const topic = await services.claimTopicForGeneration({ counts: { categoryCounts, pillarCounts } });
    if (!topic) break;
    const result = await runPipelineForTopic(topic, { fetchImpl, deps: services });
    results.push(result);
    if (result.ok) categoryCounts[topic.category] = (categoryCounts[topic.category] || 0) + 1;
  }
  return { seededTopics, results };
}
