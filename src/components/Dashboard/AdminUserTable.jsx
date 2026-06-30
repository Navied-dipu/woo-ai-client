'use client';

import React, { useState } from 'react';
import { Person, Briefcase, ChevronLeft, ChevronRight } from '@gravity-ui/icons';
import { updateTemplateData } from '@/lib/action/users';

export default function AdminUsersTable({ users }) {
    // Modal confirmation states
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [pendingChange, setPendingChange] = useState(null); // stores { userId, userName, newRole }
    const [isUpdating, setIsUpdating] = useState(false);

    // Helper function to format MongoDB ISO dates to 'MMM DD, YYYY'
    const formatDate = (dateObj) => {
        if (!dateObj || !dateObj.$date) return 'N/A';
        const date = new Date(dateObj.$date);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
    };

    // Safe accessor for MongoDB OID
    const getUserId = (user) => user._id?.$oid || user.id;

    // Trigger confirmation modal instead of executing directly
    const initiateRoleChange = (userId, userName, newRole) => {
        setPendingChange({ userId, userName, newRole });
        setIsConfirmOpen(true);
    };

    // Execute server action if confirmed
    const confirmRoleChange = async () => {
        if (!pendingChange) return;

        setIsUpdating(true);
        try {
            const { userId, newRole } = pendingChange;
            // Server Action runs -> updates DB -> revalidatePath updates Server Component props
            await updateTemplateData(userId, newRole);
        } catch (error) {
            console.error("Failed to update user role:", error);
        } finally {
            setIsUpdating(false);
            setIsConfirmOpen(false);
            setPendingChange(null);
        }
    };

    const handleStatusChange = async (userId, newStatus) => {
        console.log(`Status change triggered for ${userId} to ${newStatus}`);
    };

    const handleDelete = async (userId) => {
        console.log(`Delete triggered for user ${userId}`);
    };

    return (
        <div className="relative w-full">
            <div className="w-full bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm font-sans">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm text-neutral-600">

                        {/* Header */}
                        <thead>
                            <tr className="border-b border-neutral-100 text-neutral-500 font-semibold select-none bg-neutral-50/50">
                                <th className="py-4 px-6 font-semibold text-xs tracking-wider uppercase">User Name</th>
                                <th className="py-4 px-6 font-semibold text-xs tracking-wider uppercase">Email Address</th>
                                <th className="py-4 px-6 font-semibold text-xs tracking-wider uppercase">Role</th>
                                <th className="py-4 px-6 font-semibold text-xs tracking-wider uppercase">Join Date</th>
                                <th className="py-4 px-6 font-semibold text-xs tracking-wider uppercase">Status</th>
                                <th className="py-4 px-6 font-semibold text-xs tracking-wider uppercase text-right">Actions</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody className="divide-y divide-neutral-100 bg-white">
                            {users.map((user, index) => {
                                const userId = getUserId(user);
                                const userRole = user?.role?.toLowerCase();
                                const userStatus = user.status || 'Active';

                                return (
                                    <tr key={userId} className="hover:bg-neutral-50/70 transition-colors duration-150">

                                        {/* User Name + Initial Avatar */}
                                        <td className="py-4 px-6 font-semibold text-neutral-900 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-xs text-neutral-600 border border-neutral-200/60 font-bold tracking-wider">
                                                    {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                                                </div>
                                                <span className="text-sm font-semibold text-neutral-900">{user.name || 'Unknown User'}</span>
                                            </div>
                                        </td>

                                        {/* Email Address */}
                                        <td className="py-4 px-6 text-neutral-600 whitespace-nowrap text-sm">
                                            {user.email}
                                        </td>

                                        {/* Role Badge */}
                                        <td className="py-4 px-6 whitespace-nowrap">
                                            {userRole === 'admin' ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-purple-50 text-purple-700 border border-purple-100 capitalize">
                                                    Admin
                                                </span>
                                            ) : userRole === 'creator' ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200/40 capitalize">
                                                    <Briefcase width={12} height={12} />
                                                    Creator
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-neutral-50 text-neutral-600 border border-neutral-200/60 capitalize">
                                                    <Person width={12} height={12} />
                                                    User
                                                </span>
                                            )}
                                        </td>

                                        {/* Join Date */}
                                        <td className="py-4 px-6 text-neutral-500 whitespace-nowrap text-sm">
                                            {formatDate(user.createdAt)}
                                        </td>

                                        {/* Status Badge */}
                                        <td className="py-4 px-6 whitespace-nowrap">
                                            {userStatus === 'Active' ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-rose-50 text-rose-700 border border-rose-100">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                                    Suspended
                                                </span>
                                            )}
                                        </td>

                                        {/* Actions Column */}
                                        <td className="py-4 px-6 text-right whitespace-nowrap text-xs font-semibold">
                                            <div className="flex items-center justify-end gap-3.5">

                                                {/* Change Roles Triggers via confirmation flow */}
                                                {userRole !== 'admin' && (
                                                    <button
                                                        onClick={() => initiateRoleChange(userId, user.name, 'admin')}
                                                        className="text-neutral-500 hover:text-[#0080FF] transition-colors"
                                                    >
                                                        Make Admin
                                                    </button>
                                                )}
                                                {userRole !== 'creator' && (
                                                    <button
                                                        onClick={() => initiateRoleChange(userId, user.name, 'creator')}
                                                        className="text-neutral-500 hover:text-[#0080FF] transition-colors"
                                                    >
                                                        Make Creator
                                                    </button>
                                                )}

                                                {/* Suspension Toggle / Delete Operations */}
                                                {userStatus === 'Active' ? (
                                                    <button
                                                        onClick={() => handleStatusChange(userId, 'Suspended')}
                                                        className="text-rose-600 hover:text-rose-700 transition-colors pl-3 border-l border-neutral-100"
                                                    >
                                                        Suspend
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => handleStatusChange(userId, 'Active')}
                                                            className="text-emerald-600 hover:text-emerald-700 transition-colors pl-3 border-l border-neutral-100"
                                                        >
                                                            Activate
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(userId)}
                                                            className="text-neutral-400 hover:text-rose-600 transition-colors"
                                                        >
                                                            Delete
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-100 text-xs text-neutral-500 select-none">
                    <div>
                        Showing 1 to {users.length} of 12,842 users
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="p-1 text-neutral-400 hover:text-neutral-600 transition-colors">
                            <ChevronLeft width={16} height={16} />
                        </button>
                        <button className="w-6 h-6 flex items-center justify-center bg-[#0080FF] text-white rounded-lg font-semibold text-xs shadow-sm">
                            1
                        </button>
                        <button className="w-6 h-6 flex items-center justify-center hover:bg-neutral-100 rounded-lg text-neutral-500 font-medium transition-colors">
                            2
                        </button>
                        <button className="w-6 h-6 flex items-center justify-center hover:bg-neutral-100 rounded-lg text-neutral-500 font-medium transition-colors">
                            3
                        </button>
                        <span className="px-1 text-neutral-300">...</span>
                        <button className="w-fit px-1.5 h-6 flex items-center justify-center hover:bg-neutral-100 rounded-lg text-neutral-500 font-medium transition-colors">
                            1285
                        </button>
                        <button className="p-1 text-neutral-400 hover:text-neutral-600 transition-colors">
                            <ChevronRight width={16} height={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal Overlay */}
            {isConfirmOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40">
                    <div className="w-full max-w-sm bg-white border border-neutral-100 rounded-2xl p-6 shadow-xl space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-base font-bold text-neutral-900">
                                Confirm Role Change
                            </h3>
                            <p className="text-xs text-neutral-500 leading-relaxed">
                                Are you sure you want to change the role of <span className="text-neutral-900 font-semibold">{pendingChange?.userName}</span> to <span className="text-neutral-900 font-semibold capitalize">{pendingChange?.newRole}</span>? This alters system access and application flow parameters permissions immediately.
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-2 text-xs font-semibold">
                            <button
                                disabled={isUpdating}
                                onClick={() => { setIsConfirmOpen(false); setPendingChange(null); }}
                                className="px-4 py-2 text-neutral-600 hover:text-neutral-800 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 rounded-xl transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={isUpdating}
                                onClick={confirmRoleChange}
                                className="px-4 py-2 text-white bg-[#0080FF] hover:bg-[#0070DF] rounded-xl transition-colors shadow-sm disabled:opacity-50 min-w-[76px] flex items-center justify-center"
                            >
                                {isUpdating ? (
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    'Confirm'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}