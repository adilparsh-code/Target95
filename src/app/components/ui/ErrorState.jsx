import { AlertTriangle } from "lucide-react";

export default function ErrorState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
      <h3 className="text-xl font-semibold mb-2">An Error Occurred</h3>
      <p className="text-gray-500">{message || "Something went wrong. Please try again later."}</p>
    </div>
  );
}