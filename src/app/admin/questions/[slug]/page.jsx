import { mockQuestions } from "../../../data/mockQuestions";
import QuestionDetailsClient from "./QuestionDetailsClient";

export async function generateStaticParams() {
  return mockQuestions.map((q) => ({ slug: q.slug }));
}

export default async function QuestionDetailsPage({ params }) {
  const { slug } = await params;
  return <QuestionDetailsClient slug={slug} />;
}