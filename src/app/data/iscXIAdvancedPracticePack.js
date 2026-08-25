import fs from "fs";
import path from "path";

export const iscXIAdvancedPracticeMetadata = {
  id: "isc-11-advanced-practice",
  title: "ISC Class 11 Advanced Practice Pack",
  board: "ISC",
  class: "11",
  subject: "Computer Science",
};

export function getISCXIAdvancedPracticeContent() {
  try {
    const filePath = path.join(
      process.cwd(),
      "src/app/data/ISC_XI_ADVANCED_PRACTICE_QA.md"
    );
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf8");
    }
    return "";
  } catch (error) {
    console.error("Error reading ISC_XI_ADVANCED_PRACTICE_QA.md:", error);
    return "";
  }
}

export default iscXIAdvancedPracticeMetadata;