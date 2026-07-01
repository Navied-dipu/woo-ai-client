import Link from 'next/link';

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F9F9F9] px-4 text-center selection:bg-[#0080FF]/20">
      <div className="max-w-2xl space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-4 py-1 text-xs font-medium text-gray-600 backdrop-blur-sm">
          🔒 Restricted Access
        </div>

        {/* Big styled headline */}
        <h1 className="text-4xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-6xl">
          Access <span className="text-gray-400">Denied</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto max-w-md text-base text-gray-600 sm:text-lg">
          You don't have permission to view this resource. Please sign in with an authorized account or upgrade your access.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center gap-3 pt-4 sm:flex-row">
          <Link
            href="/login"
            className="w-full sm:w-auto inline-block rounded-full bg-[#0080FF] px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0070DF] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0080FF] focus:ring-offset-2"
          >
            Sign In Instantly
          </Link>
          
          <Link
            href="/"
            className="w-full sm:w-auto inline-block rounded-full bg-white border border-gray-200 px-8 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0080FF] focus:ring-offset-2"
          >
            Keep Exploring
          </Link>
        </div>
      </div>
    </div>
  );
}