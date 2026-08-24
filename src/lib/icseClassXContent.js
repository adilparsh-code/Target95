import classXContent, { ICSE_CLASS_X_CONTENT_MAP, getICSEClassXContent } from "@/app/data/icseClassXContent";

export const getClassXTopicContent = getICSEClassXContent;

export function getAllClassXTopicContent() {
  return classXContent.slice();
}

export function getClassXTopicIds() {
  return classXContent.map((topic) => topic.topicId);
}

export function hasClassXTopicContent(topicId) {
  return Boolean(ICSE_CLASS_X_CONTENT_MAP[topicId]);
}

export default getClassXTopicContent;
