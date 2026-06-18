"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
// import { useSession, signOut } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const { data: session, isPending } = useSession();
    // // console.log(session);
    // const user = session?.user;
    // const router = useRouter();

    // const handleSignOut = async () => {
    //     try {
    //         await signOut({
    //             fetchOptions: {
    //                 onSuccess: () => {
    //                     router.push("/");
    //                     router.refresh();
    //                 },
    //             },
    //         });
    //     } catch (err) {
    //         console.error("Sign out failed:", err);
    //     }
    // };
    const user = true
    const isPending = false

    // Updated navigation items to match provided design image
    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Prompt Market", href: "/prompt-market" },
        { label: "AI Models", href: "/ai-models" },
        { label: "Blog", href: "/blog" },
        { label: "Pages", href: "/pages" },
        { label: "Purchase", href: "/purchase" },
    ];
    const dashboardLinks = {
        seeker: '/dashboard/seeker',
        recruiter: '/dashboard/recruiter',
        admin: '/dashboard/admin'
    }

    // if (user?.email) {
    //     navLinks.push(
    //         {
    //             label: 'Dashboard',
    //             href: dashboardLinks[user?.role || 'seeker']
    //         }
    //     )
    // }

    return (
        <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#070714]/90 backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

                {/* LOGO - WOOAI Style */}
                <Link href="/" className="flex items-center gap-1">
                    <span className="text-2xl font-black tracking-tight text-white">Woo</span>
                    <span className="text-2xl font-black tracking-tight text-[#C5F623]">AI</span>
                </Link>

                {/* DESKTOP CENTER NAVIGATION LINKS */}
                <div className="hidden md:flex items-center justify-center flex-1 mx-8">
                    <ul className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-sm font-medium text-gray-300 transition hover:text-white"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* RIGHT SIDE - ACTIONS */}
                <div className="flex items-center gap-6">
                    {/* Desktop Action Icons & Auth */}
                    <div className="hidden items-center gap-6 md:flex">
                        {/* Shopping Cart Icon */}
                        <button className="text-gray-300 hover:text-white transition" aria-label="Cart">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </button>

                        {/* Auth Section */}
                        <div className="flex items-center gap-2">
                            {isPending ? (
                                <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
                            ) : user ? (
                                <div className="flex items-center gap-2">
                                    {/* User Avatar Circle Icon */}
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C5F623]/20 border border-[#C5F623]/40">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#C5F623]" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-300 hover:text-white transition">
                                        Sign In
                                    </span>
                                    {/* <Button
                                        onClick={handleSignOut}
                                        variant="ghost"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Sign Out
                                    </Button> */}
                                </div>
                            ) : (
                                <Link
                                    href="/auth/signin"
                                    className="text-sm font-medium text-gray-300 transition hover:text-white"
                                >
                                    Sign In
                                </Link>
                            )}
                        </div>

                        {/* Kept original button wrapper to prevent template layout breakages */}
                        <div className="hidden">
                            <Button
                                as={Link}
                                href="/register"
                                radius="lg"
                                className="h-11 bg-white px-6 text-sm font-semibold text-black hover:bg-gray-200"
                            >
                                Get Started
                            </Button>
                        </div>
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center justify-center rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            {isMenuOpen && (
                <div className="border-t border-white/5 bg-[#070714] md:hidden">
                    <div className="space-y-3 px-4 py-6">
                        {/* Nav Links */}
                        <ul className="space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="block rounded-xl px-4 py-3 text-base font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Auth Links - Mobile */}
                        <div className="border-t border-white/5 pt-4">
                            <div className="flex flex-col gap-3">
                                {isPending ? (
                                    <div className="h-4 w-20 animate-pulse rounded bg-white/10" />
                                ) : user ? (
                                    <div className="flex items-center gap-3 px-4 py-3">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C5F623]/20 border border-[#C5F623]/40">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#C5F623]" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-base font-medium text-gray-300">
                                            Sign In
                                        </span>
                                        {/* <Button
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                handleSignOut();
                                            }}
                                            variant="ghost"
                                            className="text-left text-base font-medium text-red-400 hover:bg-white/5"
                                        >
                                            Sign Out
                                        </Button> */}
                                    </div>
                                ) : (
                                    <Link
                                        href="/auth/signin"
                                        className="rounded-xl px-4 py-3 text-base font-medium text-gray-300 transition hover:bg-white/5"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}