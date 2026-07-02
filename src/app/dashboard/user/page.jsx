import React from 'react';

const usersDemoData = [
  { id: 1, name: 'MD. NAVIED SIDDIQUE DIPU', email: 'navied.dipu@example.com', joinDate: 'Jan 2026', totalSpent: '$340.00', status: 'Active', tier: 'Premium Buyer' },
  { id: 2, name: 'Sarah Chen', email: 'schen@example.com', joinDate: 'Feb 2026', totalSpent: '$129.00', status: 'Active', tier: 'Regular Buyer' },
  { id: 3, name: 'Alex Rivera', email: 'alex@example.com', joinDate: 'Nov 2025', totalSpent: '$890.00', status: 'Active', tier: 'VIP Customer' },
  { id: 4, name: 'Marcus Vance', email: 'marcus.v@example.com', joinDate: 'Mar 2026', totalSpent: '$0.00', status: 'Suspended', tier: 'Free Tier' },
];

export default function UserManagement() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans antialiased text-[#1A1A1A] p-4 md:p-10 w-full min-w-0">
      <div className="max-w-7xl mx-auto space-y-8 w-full min-w-0">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-gray-600 mb-2">
              👥 System Accounts
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              User <span className="text-gray-400">Management</span>
            </h1>
          </div>

          {/* Search Input Bar matching screenshot container style */}
          <div className="w-full md:w-80">
            <input 
              type="text" 
              placeholder="Search users by name or email..." 
              className="w-full bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0080FF] transition-all shadow-sm"
            />
          </div>
        </div>

        {/* User Statistics Overview */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-3">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Registered Users</p>
            <p className="text-2xl font-bold tracking-tight mt-1">1,284</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Active This Week</p>
            <p className="text-2xl font-bold tracking-tight mt-1">942</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Premium Subscribers</p>
            <p className="text-2xl font-bold tracking-tight mt-1">184</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-[#FDFDFD] border-b border-gray-100 text-gray-400 font-medium">
                  <th className="p-4 pl-6">User Details</th>
                  <th className="p-4">Account Status</th>
                  <th className="p-4">Marketplace Tier</th>
                  <th className="p-4">Total Spent</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-medium">
                {usersDemoData.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="font-bold text-[#1A1A1A]">{user.name}</div>
                      <div className="text-xs text-gray-400 font-normal">{user.email} • Joined {user.joinDate}</div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 font-normal">{user.tier}</td>
                    <td className="p-4 font-bold">{user.totalSpent}</td>
                    <td className="p-4 pr-6 text-right">
                      <button className="text-xs font-semibold text-[#0080FF] hover:underline bg-transparent border-none cursor-pointer">
                        Edit Access
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