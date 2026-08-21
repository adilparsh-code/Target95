import xiContent, { ISC_XI_CONTENT_MAP, getISCClassXIContent } from "@/app/data/iscClassXIContent";

export const getClassXITopicContent = getISCClassXIContent;

export function getAllClassXITopicContent() {
  return xiContent.slice();
}

export function getClassXITopicIds() {
  return xiContent.map((topic) => topic.topicId);
}

export function hasClassXITopicContent(topicId) {
  return Boolean(ISC_XI_CONTENT_MAP[topicId]);
}

export default getClassXITopicContent;
