import { notFound } from "next/navigation";
import CbseCurriculum2026_27 from "@/app/data/cbse/curriculum-2026-27";

export async function generateStaticParams() {
  try {
    const classesObj = CbseCurriculum2026_27?.classes;

    if (!classesObj || typeof classesObj !== "object") {
      return [
        { classNumber: "9" },
        { classNumber: "10" },
        { classNumber: "11" },
        { classNumber: "12" },
      ];
    }

    return Object.keys(classesObj).map((classNumber) => ({
      classNumber: String(classNumber),
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);

    return [
      { classNumber: "9" },
      { classNumber: "10" },
      { classNumber: "11" },
      { classNumber: "12" },
    ];
  }
}

/*
 * IMPORTANT:
 * This is a .jsx file, so do NOT use TypeScript annotations such as:
 * Record<number, string[]>
 */

const CLASS_SUBJECT_MAP = {
  9: ["083", "065", "086"],
  10: ["083", "065", "086"],
  11: ["083", "065", "802"],
  12: ["083", "065", "802"],
};

export default async function ClassPage({ params }) {
  const { classNumber } = await params;

  const classNum = Number(classNumber);

  if (!CLASS_SUBJECT_MAP[classNum]) {
    notFound();
  }

  const classes = CbseCurriculum2026_27?.classes;

  if (!classes || typeof classes !== "object") {
    notFound();
  }

  const classData =
    classes[classNumber] ??
    classes[classNum];

  if (!classData) {
    notFound();
  }

  /*
   * Keep the rest of your existing subject-resolution/rendering
   * logic below this point unchanged.
   */
}