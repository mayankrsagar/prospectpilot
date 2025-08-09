import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 space-y-8">
      <h1 className="text-4xl font-extrabold">ProspectPilot</h1>
      <p className="text-lg text-gray-600 text-center max-w-xl">
        AI-powered lead generation, analysis, and outreach—right from your dashboard.
      </p>

      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <Link
          href="/generate"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Generate Leads
        </Link>
        <Link
          href="/leads/1"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          View My Leads
        </Link>
      </div>

      <footer className="mt-16 text-sm text-gray-500">
        © {new Date().getFullYear()} ProspectPilot. All rights reserved.
      </footer>
    </main>
  );
}
