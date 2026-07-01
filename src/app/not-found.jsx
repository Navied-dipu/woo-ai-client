import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F9F9F9] px-4 text-center selection:bg-[#0080FF]/20">
      <div className="max-w-2xl space-y-6">
        {/* Subtle pill badge resembling "Welcome to Woo-AI..." */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-4 py-1 text-xs font-medium text-gray-600 backdrop-blur-sm">
          ⚠️ Error 404
        </div>

        {/* Big styled headline */}
        <h1 className="text-4xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-6xl">
          Page <span className="text-gray-400">Not Found</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto max-w-md text-base text-gray-600 sm:text-lg">
          We couldn't find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
        </p>

        {/* Action Button matching the search button style */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-block rounded-full bg-[#0080FF] px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0070DF] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0080FF] focus:ring-offset-2"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}