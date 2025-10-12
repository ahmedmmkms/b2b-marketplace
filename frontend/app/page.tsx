import Link from 'next/link';

export const dynamic = 'force-static';

export default function RootLandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <main className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold">P4 B2B Marketplace</h1>
        <p className="text-lg text-gray-600 max-w-xl">
          Select a locale to explore the GCC/MENA procurement experience.
        </p>
        <div className="flex gap-4">
          <Link
            href="/en"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            English (Default)
          </Link>
          <Link
            href="/ar"
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            العربية
          </Link>
        </div>
      </main>
    </div>
  );
}