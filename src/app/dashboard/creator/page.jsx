import React from 'react';

const creatorsDemoData = [
    { id: 1, name: 'Alex Rivera', handle: '@alex_prompts', promptsCount: 24, sales: 412, revenue: '$8,450.00', level: 'Top Vendor' },
    { id: 2, name: 'Emma Larson', handle: '@emmalabs', promptsCount: 12, sales: 189, revenue: '$3,120.00', level: 'Expert Creator' },
    { id: 3, name: 'Sarah Chen', handle: '@schen_ai', promptsCount: 31, sales: 520, revenue: '$11,400.00', level: 'Top Vendor' },
    { id: 4, name: 'Devon Lane', handle: '@devon_codes', promptsCount: 3, sales: 14, revenue: '$210.00', level: 'Rising Star' },
];

export default function CreatorWorkspace() {
    return (
        <div className="min-h-screen bg-[#F9F9F9] font-sans antialiased text-[#1A1A1A] p-6 md:p-10">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 pb-6">
                    <div>
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-gray-600 mb-2">
                            🛠️ Prompt Engineering Partners
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Creator <span className="text-gray-400">Hub</span>
                        </h1>
                    </div>

                    <div>
                        <button className="inline-block rounded-full bg-[#0080FF] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0070DF] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0080FF]">
                            Approve Pending Submissions
                        </button>
                    </div>
                </div>

                {/* Top performing grid summary cards */}
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Creators</p>
                            <h2 className="text-3xl font-bold tracking-tight mt-1">42</h2>
                        </div>
                        <span className="text-xs text-green-600 mt-4 inline-block font-medium">+3 new applications today</span>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Engineering Payouts</p>
                            <h2 className="text-3xl font-bold tracking-tight mt-1">$23,180.00</h2>
                        </div>
                        <span className="text-xs text-gray-400 mt-4 inline-block font-normal">Next payout schedule: 15th of the month</span>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Avg. Creator Commission</p>
                            <h2 className="text-3xl font-bold tracking-tight mt-1">75%</h2>
                        </div>
                        <span className="text-xs text-[#0080FF] mt-4 inline-block font-medium">Standard marketplace flat rate split</span>
                    </div>
                </div>

                {/* Creators Performance Listing Table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-base font-bold">Creator Performance Standings</h3>
                        <p className="text-xs text-gray-400">Detailed track records of engineering content providers</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="bg-[#FDFDFD] border-b border-gray-100 text-gray-400 font-medium">
                                    <th className="p-4 pl-6">Architect</th>
                                    <th className="p-4">Rank Tier</th>
                                    <th className="p-4">Live Assets</th>
                                    <th className="p-4">Total Sales</th>
                                    <th className="p-4">Gross Income Earned</th>
                                    <th className="p-4 pr-6 text-right">Profiles</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 font-medium">
                                {creatorsDemoData.map((creator) => (
                                    <tr key={creator.id} className="hover:bg-gray-50/70 transition-colors">
                                        <td className="p-4 pl-6">
                                            <div className="font-bold text-[#1A1A1A]">{creator.name}</div>
                                            <div className="text-xs text-gray-400 font-normal">{creator.handle}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800">
                                                {creator.level}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-600 font-normal">{creator.promptsCount} prompts</td>
                                        <td className="p-4 font-normal text-gray-600">{creator.sales} units</td>
                                        <td className="p-4 font-bold text-gray-900">{creator.revenue}</td>
                                        <td className="p-4 pr-6 text-right">
                                            <button className="text-xs font-semibold text-[#0080FF] hover:underline bg-transparent border-none cursor-pointer">
                                                View Analytics
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}