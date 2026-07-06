export default function QuestionCard({ question }) {

  return (

    <div className="mt-8 bg-slate-50 rounded-2xl border p-8">

      <p className="text-3xl font-semibold text-gray-900 leading-relaxed">
        {question}
      </p>

    </div>

  );

}