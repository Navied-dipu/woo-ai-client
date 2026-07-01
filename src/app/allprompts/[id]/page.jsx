import { getPromptById, getSavedPrompts } from '@/lib/api/prompts';
import React from 'react';
import PromptDetails from './promptsDetails';
import { getUserSession } from '@/lib/core/session';
import { getPlanById } from '@/lib/api/plan';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const Page = async ({ params }) => {
    const { id } = await params;

    const currentUser = await getUserSession(); 
    const plan = await getPlanById(currentUser?.plan || "user_free");
    // console.log(plan)
    const savedPrompts = await getSavedPrompts(currentUser?.id) || [];
    const promptsDetails = await getPromptById(id);

    if (!promptsDetails) {
        return (
            <div className="min-h-screen bg-[#070a13] flex items-center justify-center text-slate-400 font-medium">
                Prompt not found.
            </div>
        );
    }

    // Limit tracking & calculations
    const promptsCount = savedPrompts.length;
    // console.log(promptsCount)
    const maxSavedPrompts = plan?.maxSavePromptsPerMonth || 10; 
    const remainingPrompts = Math.max(0, maxSavedPrompts - promptsCount);
    const usagePercentage = Math.min(100, (promptsCount / maxSavedPrompts) * 100);
    const hasReachedLimit = promptsCount >= maxSavedPrompts;

    return (
        <div className="min-h-screen bg-[#070a13] text-slate-200 antialiased selection:bg-blue-500/30">
            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-6">
                
                {/* Modern Usage Analytics Card */}
                <div className="bg-[#0e1322] border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm relative overflow-hidden transition-all duration-300 hover:border-slate-700">
                    {/* Subtle decorative background glow */}
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div>
                            <div className="flex items-center gap-2.5">
                                <h2 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                                    Saved Prompts Status
                                </h2>
                                <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/20">
                                    {plan?.name || "Free Plan"}
                                </span>
                            </div>
                            <p className="mt-1 text-sm text-slate-400">
                                Keep track of your monthly storage allocation.
                            </p>
                        </div>
                        
                        <Link 
                            href="/plan" 
                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-all duration-200 shrink-0 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Upgrade Plan
                        </Link>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-baseline">
                            <span className="text-3xl font-extrabold tracking-tight text-white">
                                {remainingPrompts}
                            </span>
                            <span className="text-xs font-medium text-slate-400">
                                remaining of <span className="text-slate-200 font-semibold">{maxSavedPrompts}</span>
                            </span>
                        </div>

                        {/* Animated & Color-shifting Progress Bar */}
                        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                    hasReachedLimit 
                                        ? 'bg-gradient-to-r from-red-500 to-rose-600' 
                                        : usagePercentage > 80 
                                            ? 'bg-gradient-to-r from-amber-500 to-orange-500' 
                                            : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                                }`}
                                style={{ width: `${usagePercentage}%` }}
                            />
                        </div>

                        {/* Contextual Warning Flag */}
                        {hasReachedLimit && (
                            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 mt-3 animate-pulse">
                                <p className="text-xs text-red-400 font-medium flex items-center gap-1.5">
                                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    You've hit your monthly saving limit. Upgrade your plan to manage more templates.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="bg-[#0e1322] border border-slate-800/80 rounded-2xl shadow-xl overflow-hidden">
                    <PromptDetails 
                        prompts={promptsDetails} 
                        currentUser={currentUser} 
                        isLimitReached={hasReachedLimit} 
                    />
                </div>

            </div>
        </div>
    );
};

export default Page;