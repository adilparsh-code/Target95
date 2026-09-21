import Link from "next/link";

export default function AdminAccessDenied() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-red-50 text-2xl dark:bg-red-950/40">
          🔒
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin access required</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          This area is restricted to platform administrators. If you believe you should have access, sign in with an
          administrator account.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Sign in
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
