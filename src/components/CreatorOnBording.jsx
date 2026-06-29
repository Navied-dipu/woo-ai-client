// components/CreatorOnboarding.jsx
"use client";
import { Button } from "@heroui/react";
import { ArrowUpRight, ShieldCheck, DollarSign } from "lucide-react";
import Link from "next/link"; // Side note: Imported Next.js Link instead of lucide Link for the button wrapper
import FadeIn from "./FadeIn";

export default function CreatorOnboarding() {
    return (
        <section className="py-20 px-4 max-w-5xl mx-auto mb-10">
            <FadeIn>
                {/* Changed to white bg, added subtle slate border and dark slate text for the white theme */}
                <div className="relative bg-white border border-slate-100 text-slate-900 rounded-3xl p-8 md:p-12 shadow-xl overflow-hidden">
                    {/* Soft decorative blur layers tailored for light mode */}
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-xl" />
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/5 rounded-full blur-xl" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
                        <div className="space-y-4 text-left">
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                                Turn Your Custom Prompts Into Cash
                            </h2>
                            {/* Changed description text to a softer text-slate-600 */}
                            <p className="text-medium text-slate-600 leading-relaxed">
                                Are you sitting on prompt scripts that save you hours of manual development or creative layouts? List them on Woo-AI and make recurring sales.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                {/* Changed icons and text to use your theme's primary/secondary colors for visual pop */}
                                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                    <DollarSign size={16} className="text-primary" /> Instant Crypto/Fiat Payouts
                                </div>
                                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                    <ShieldCheck size={16} className="text-secondary" /> Advanced IP Theft Protection
                                </div>
                            </div>
                        </div>

                        <div className="flex md:justify-end">
                            {/* Removed text-black, let HeroUI's primary color automatically manage text contrast */}
                            <Button 
                                color="primary"
                                className="font-extrabold px-8 py-6 text-md shadow-lg hover:scale-105 transition-transform" 
                                size="lg" 
                                endContent={<ArrowUpRight size={18} />}
                                as={Link}
                                href="/auth/signup"
                            >
                                Become a Woo-AI Creator
                            </Button>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </section>
    );
}