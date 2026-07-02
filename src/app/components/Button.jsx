export default function Button({ text, type }) {

  return (

    <button
      className={
        type === "primary"
          ? "bg-blue-700 text-white px-8 py-4 rounded-xl hover:bg-blue-900 transition rounded-xl"
          : "border border-blue-700 text-blue-700 px-8 py-4 rounded-xl hover:bg-blue-50 transition"
      }
    >
      {text}
    </button>

  );
}