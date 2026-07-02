import React from 'react';
import CreatePrompts from './CreatePrompts';
import { getUserSession } from '@/lib/core/session';
import { getPromptsByUserId } from '@/lib/api/prompts';
import Link from 'next/link';
import { getPlanById } from '@/lib/api/plan';

export const dynamic = "force-dynamic";

export default async function Page() {
    const user = await getUserSession();
    // console.log(user);

    const planData = await getPlanById(user?.plan || "creator_free");
    const plan = planData || {
        name: "Creator Free (Fallback)",
        maxCreatePromptsPerMonth: 5,
    };

    const prompts = await getPromptsByUserId(user.id);
    const promptsCount = prompts.length;
    const remainingPrompts = Math.max(0, (plan.maxCreatePromptsPerMonth || 5) - promptsCount);

    const maxPrompts = plan.maxCreatePromptsPerMonth || 5;
    const usagePercentage = Math.min(100, (promptsCount / maxPrompts) * 100);
    const isLimitReached = promptsCount >= maxPrompts;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-5 mb-8 gap-4">
                <div className="min-w-0 flex-1">
                    <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl tracking-tight">
                        Prompt Creator Studio
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Manage and build custom prompts optimized for your workflows.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Sidebar / Usage Analytics Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-fit">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-gray-700 tracking-wide uppercase">
                            Monthly Usage
                        </h2>
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                            {plan.name}
                        </span>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-baseline">
                            <span className="text-3xl font-bold tracking-tight text-gray-900">
                                {remainingPrompts}
                            </span>
                            <span className="text-sm text-gray-500">
                                remaining of {plan.maxCreatePromptsPerMonth}
                            </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                            <div
                                className={`h-2.5 rounded-full transition-all duration-500 ${
                                    isLimitReached ? 'bg-red-500' : usagePercentage > 80 ? 'bg-amber-500' : 'bg-blue-600'
                                }`}
                                style={{ width: `${usagePercentage}%` }}
                            />
                        </div>

                        {isLimitReached && (
                            <div className="rounded-md bg-red-50 p-3 mt-2">
                                <p className="text-xs text-red-700 font-medium">
                                    You've hit your monthly limit. Upgrade your plan to create more prompts.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content Area / Creation Form */}
                <div className="lg:col-span-2">
                    {!isLimitReached ? (
                        <CreatePrompts user={user} />
                    ) : (
                        <div className="text-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-semibold text-gray-900">Limit Reached</h3>
                            <p className="mt-1 text-sm text-gray-500">Ready to build more? Unlock unlimited creations instantly.</p>
                            <div className="mt-6">
                                <Link 
                                    href="/plan" 
                                    className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
                                >
                                    Upgrade to Pro
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}