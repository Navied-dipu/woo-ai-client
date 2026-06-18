import Link from "next/link";

export default function Footer() {
    const aiModelsLinks = [
        { label: "Midjourney Prompts", href: "/midjourney" },
        { label: "ChatGPT Prompts", href: "/chatgpt" },
        { label: "Claude Prompts", href: "/claude" },
        { label: "DALL-E Prompts", href: "/dalle" },
        { label: "Gemini Prompts", href: "/gemini" },
    ];

    const policyLinks = [
        { label: "Help Center", href: "/help" },
        { label: "My account", href: "/account" },
        { label: "Prompt Market", href: "/market" },
        { label: "About", href: "/about" },
        { label: "Checkout", href: "/checkout" },
    ];

    return (
        <footer className="relative bg-[#070714] text-gray-400 font-sans border-t border-white/5 pt-16 overflow-visible">
            <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">

                    {/* COLUMN 1: BRAND & CONTACT */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-1">
                            <span className="text-2xl font-black tracking-tight text-white">Woo</span>
                            <span className="text-2xl font-black tracking-tight text-[#C5F623]">AI</span>
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
                            4 Grand Central Terminal New York, <br />
                            NY 10 City name, CA 90896 USA. <br />
                            <span className="text-gray-300">contact@example.com</span>
                        </p>
                        {/* Social Icons */}
                        <div className="flex items-center gap-4 pt-2">
                            <Link href="#" className="hover:text-white transition" aria-label="Facebook">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                            </Link>
                            <Link href="#" className="hover:text-white transition" aria-label="LinkedIn">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                </svg>
                            </Link>
                            <Link href="#" className="hover:text-white transition" aria-label="Instagram">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                            </Link>
                            <Link href="#" className="hover:text-white transition" aria-label="X (Twitter)">
                                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* COLUMN 2: AI MODELS */}
                    <div>
                        <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">AI Models</h2>
                        <ul className="space-y-2.5 text-sm">
                            {aiModelsLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="flex items-center gap-2 hover:text-white transition group">
                                        <span className="text-xs text-gray-500 group-hover:text-[#C5F623]">⚡</span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COLUMN 3: OUR POLICY */}
                    <div>
                        <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Our Policy</h2>
                        <ul className="space-y-2.5 text-sm">
                            {policyLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="flex items-center gap-2 hover:text-white transition group">
                                        <span className="text-xs text-gray-500 group-hover:text-[#C5F623]">⚡</span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COLUMN 4: NEWSLETTER */}
                    <div className="space-y-4">
                        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Stay Informed By Newsletter</h2>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            *Subscribe to our newsletter to receive early discount offers and updates.
                        </p>
                        <form className="relative max-w-sm" >
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition"
                            />
                            <button
                                type="submit"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                                aria-label="Subscribe"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform rotate-45" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                </svg>
                            </button>
                        </form>
                    </div>

                </div>

                {/* FLOATING OVERLAID SEARCH BAR */}
                <div className="relative mt-16 -mb-6 z-10 flex justify-center">
                    <div className="w-full max-w-xl bg-[#0F0F24]/90 border border-white/10 rounded-2xl p-2 flex items-center shadow-2xl backdrop-blur-xl">
                        <input
                            type="text"
                            placeholder="Search AI Prompts..."
                            className="w-full bg-transparent px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none"
                        />
                        <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="border-t border-white/5 bg-[#04040D]/60 py-6">
                <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 lg:px-8">
                    <p>© Copyright by ModelTheme. All Rights Reserved.</p>
                    <p>Elite Author on ThemeForest.</p>
                </div>
            </div>
        </footer>
    );
}