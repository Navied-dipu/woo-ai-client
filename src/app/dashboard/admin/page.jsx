import React from 'react';

// Demo Data for the Dashboard
const stats = [
  { name: 'Total Revenue', value: '$24,560.00', change: '+12.3%', up: true },
  { name: 'Active Users', value: '1,284', change: '+8.2%', up: true },
  { name: 'Total Prompts Sold', value: '4,821', change: '+23.1%', up: true },
  { name: 'Conversion Rate', value: '4.6%', change: '-0.4%', up: false },
];

const recentSales = [
  { id: 1, user: 'Alex Rivera', email: 'alex@example.com', item: 'SaaS Automation Master', price: '$49.00', status: 'Completed' },
  { id: 2, user: 'Sarah Chen', email: 'schen@example.com', item: 'SEO Copywriting Framework', price: '$29.00', status: 'Completed' },
  { id: 3, user: 'Marcus Vance', email: 'marcus.v@example.com', item: 'Midjourney UI/UX Gen v6', price: '$79.00', status: 'Pending' },
  { id: 4, user: 'Emma Larson', email: 'emma@example.com', item: 'Claude 3.5 Sonnet Full Stack', price: '$120.00', status: 'Completed' },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans antialiased text-[#1A1A1A]">
      {/* Sidebar / Navbar Wrapper */}
      <div className="flex">
        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto space-y-8">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-gray-600 mb-2">
                ✨ Workspace Overview
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Dashboard <span className="text-gray-400">Home</span>
              </h1>
            </div>
            
            {/* Primary Action Button */}
            <div>
              <button className="inline-block rounded-full bg-[#0080FF] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0070DF] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0080FF]">
                + Create New Prompt
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{stat.name}</p>
                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-2xl font-bold tracking-tight">{stat.value}</span>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                    stat.up ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts & Analytical Section */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Traffic/Sales Line Chart (Mockup via SVG) */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold">Revenue Analytics</h3>
                  <p className="text-xs text-gray-400">Weekly performance metrics</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs bg-black/5 px-2.5 py-1 rounded-md font-medium text-gray-600">7 Days</span>
                  <span className="text-xs text-gray-400 px-2.5 py-1">30 Days</span>
                </div>
              </div>
              
              {/* Minimalist Modern Line Chart Graphics */}
              <div className="w-full h-48 bg-[#FDFDFD] rounded-xl border border-dashed border-gray-200 relative overflow-hidden flex items-end">
                <svg className="w-full h-full absolute inset-0 text-[#0080FF]" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d="M0,90 Q15,60 30,75 T60,30 T90,15 L100,10 L100,100 L0,100 Z"
                    fill="url(#gradient)"
                    fillOpacity="0.05"
                  />
                  <path
                    d="M0,90 Q15,60 30,75 T60,30 T90,15 L100,10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="currentColor" />
                      <stop offset="100%" stopColor="#FFFFFF" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Horizontal Guide Lines */}
                <div className="w-full border-b border-gray-100 absolute bottom-1/3"></div>
                <div className="w-full border-b border-gray-100 absolute bottom-2/3"></div>
              </div>
            </div>

            {/* Platform Distribution Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-base font-bold mb-1">Top Categories</h3>
              <p className="text-xs text-gray-400 mb-6">Most demanded prompt engines</p>
              
              <div className="space-y-4">
                {[
                  { name: 'ChatGPT / Claude', share: '62%', color: 'bg-[#0080FF]' },
                  { name: 'Midjourney', share: '24%', color: 'bg-zinc-800' },
                  { name: 'SaaS Automation', share: '14%', color: 'bg-zinc-400' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{item.name}</span>
                      <span className="text-gray-400">{item.share}</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: item.share }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders / Detailed Data Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Recent Market Transactions</h3>
                <p className="text-xs text-gray-400">Live feed of global engineering prompt purchases</p>
              </div>
              <button className="text-xs font-semibold text-[#0080FF] hover:underline">
                View all transactions
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#FDFDFD] border-b border-gray-100 text-gray-400 font-medium">
                    <th className="p-4 pl-6">Customer</th>
                    <th className="p-4">Engine / Asset</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4 pr-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-medium">
                  {recentSales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="p-4 pl-6">
                        <div className="font-bold text-[#1A1A1A]">{sale.user}</div>
                        <div className="text-xs text-gray-400 font-normal">{sale.email}</div>
                      </td>
                      <td className="p-4 text-gray-600">{sale.item}</td>
                      <td className="p-4 font-bold">{sale.price}</td>
                      <td className="p-4 pr-6 text-right">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          sale.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}