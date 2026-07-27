export default function QuestionCard({ question }) {

  return (

    <div className="mt-8 bg-slate-50 rounded-2xl border p-8">

      <p className="text-lg font-semibold leading-relaxed text-gray-900 sm:text-2xl">
        {question}
      </p>

    </div>

  );

}
