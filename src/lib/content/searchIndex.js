// Client-safe question search for the global search box. Reads the generated answer-free
// projection (src/content/searchIndex.mjs), NOT the catalog, so no answer, model answer or
// explanation can reach the browser through search.

import { SEARCH_INDEX } from "@/content/searchIndex.mjs";
import { searchQuestionIndex } from "@/content/searchProjection.mjs";

/** Questions matching `term`, in catalog order, with their chapter title and slug resolved. */
export const searchQuestions = (term) => searchQuestionIndex(SEARCH_INDEX, term);
