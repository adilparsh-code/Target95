import "server-only";

import { searchOfficeContent } from "@/data/office";
import { searchStudyContent } from "@/lib/studyCenter";
import { searchQuestions } from "@/lib/content/searchIndex";
import { getCBSEChapters } from "@/app/data/cbse/chapters";
import { getCBSEPracticeQuestions } from "@/app/data/cbse/question-bank-2026-27";
import { createInternalSearchAdapter } from "./internalSearch.mjs";

/**
 * Server-only composition root for first-party search sources.
 *
 * CBSE practice records include answer-bearing fields in their source module.
 * This module is marked server-only and the adapter copies only allow-listed
 * display fields into its response DTO. Never import this module from a client
 * component. The unified CISCE question search uses the generated answer-free
 * search projection rather than the question catalog.
 */
export const searchTarget95Content = createInternalSearchAdapter({
  searchOfficeContent,
  searchStudyContent,
  searchQuestions,
  getCBSEChapters,
  getCBSEPracticeQuestions,
});
