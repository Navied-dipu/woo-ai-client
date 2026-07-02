'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Person, Briefcase, ChevronLeft, ChevronRight } from '@gravity-ui/icons';
import { updateTemplateData } from '@/lib/action/users';

// Mobile Dropdown Menu Component for Roles
function MobileRoleDropdown({ userRole, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-neutral-500 hover:text-[#0080FF] transition-colors font-semibold"
            >
                Change Role
            </button>

            {isOpen && (
                <div className="absolute right-0 bottom-full mb-2 w-36 bg-white border border-neutral-200/80 rounded-xl shadow-lg z-10 py-1 overflow-hidden">
                    {userRole !== 'admin' && (
                        <button
                            onClick={() => { onSelect('admin'); setIsOpen(false); }}
                            className="w-full text-left px-4 py-2.5 text-xs text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 transition-colors font-medium"
                        >
                            Make Admin
                        </button>
                    )}
                    {userRole !== 'creator' && (
                        <button
                            onClick={() => { onSelect('creator'); setIsOpen(false); }}
                            className="w-full text-left px-4 py-2.5 text-xs text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 transition-colors font-medium"
                        >
                            Make Creator
                        </button>
                    )}
                    {userRole !== 'user' && (
                        <button
                            onClick={() => { onSelect('user'); setIsOpen(false); }}
                            className="w-full text-left px-4 py-2.5 text-xs text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 transition-colors font-medium"
                        >
                            Make User
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default function AdminUsersTable({ users }) {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState(null); 
    const [isUpdating, setIsUpdating] = useState(false);

    const formatDate = (dateObj) => {
        if (!dateObj || !dateObj.$date) return 'N/A';
        const date = new Date(dateObj.$date);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
    };

    const getUserId = (user) => user._id?.$oid || user.id;

    const initiateRoleChange = (userId, userName, newRole) => {
        setPendingAction({ type: 'role', userId, userName, payload: newRole });
        setIsConfirmOpen(true);
    };

    const initiateStatusChange = (userId, userName, newStatus) => {
        setPendingAction({ type: 'status', userId, userName, payload: newStatus });
        setIsConfirmOpen(true);
    };

    const initiateDelete = (userId, userName) => {
        setPendingAction({ type: 'delete', userId, userName });
        setIsConfirmOpen(true);
    };

    const executeConfirmedAction = async () => {
        if (!pendingAction) return;

        setIsUpdating(true);
        try {
            const { type, userId, payload } = pendingAction;

            if (type === 'role') {
                await updateTemplateData(userId, { role: payload });
            } else if (type === 'status') {
                console.log(`Executing status update API for ${userId} to ${payload}`);
            } else if (type === 'delete') {
                console.log(`Executing deletion API for user ${userId}`);
            }
        } catch (error) {
            console.error(`Failed to execute ${pendingAction.type} update:`, error);
        } finally {
            setIsUpdating(false);
            setIsConfirmOpen(false);
            setPendingAction(null);
        }
    };

    const getModalContent = () => {
        if (!pendingAction) return { title: '', description: '', confirmColor: 'bg-[#0080FF] hover:bg-[#0070DF]' };
        
        const { type, userName, payload } = pendingAction;
        
        switch (type) {
            case 'role':
                return {
                    title: 'Confirm Role Change',
                    description: `Are you sure you want to change the role of ${userName} to ${payload}? This alters system access and application flow permissions immediately.`,
                    confirmColor: 'bg-[#0080FF] hover:bg-[#0070DF]'
                };
            case 'status':
                const isSuspending = payload === 'Suspended';
                return {
                    title: isSuspending ? 'Suspend User Account' : 'Activate User Account',
                    description: isSuspending 
                        ? `Are you sure you want to suspend ${userName}? They will be blocked from logging into the platform until reactivated.`
                        : `Are you sure you want to reactivate ${userName}? This will fully restore their application login and profile access privileges.`,
                    confirmColor: isSuspending ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'
                };
            case 'delete':
                return {
                    title: 'Permanently Delete User',
                    description: `Warning: Are you absolutely sure you want to delete ${userName}? This action is irreversible and permanently wipes their associated templates, team memberships, and asset records.`,
                    confirmColor: 'bg-rose-600 hover:bg-rose-700'
                };
            default:
                return { title: '', description: '', confirmColor: 'bg-[#0080FF]' };
        }
    };

    const modal = getModalContent();

    return (
        <div className="relative w-full px-4 sm:px-6 lg:px-8">
            <div className="w-full bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm font-sans">
                
                {/* 1. Mobile & Tablet View */}
                <div className="block lg:hidden divide-y divide-neutral-100">
                    {users.map((user) => {
                        const userId = getUserId(user);
                        const userRole = user?.role?.toLowerCase();
                        const userStatus = user.status || 'Active';
                        const userName = user.name || 'Unknown User';

                        return (
                            <div key={userId} className="p-5 space-y-4 hover:bg-neutral-50/50 transition-colors">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-9 h-9 flex-shrink-0 rounded-full bg-neutral-100 flex items-center justify-center text-xs text-neutral-600 border border-neutral-200/60 font-bold tracking-wider">
                                            {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-sm font-semibold text-neutral-900 truncate">{userName}</h4>
                                            <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0">
                                        {userStatus === 'Active' ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                                                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                                                Active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-rose-50 text-rose-700 border border-rose-100">
                                                <span className="w-1 h-1 rounded-full bg-rose-500" />
                                                Suspended
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-neutral-500">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-neutral-400">Role:</span>
                                        {userRole === 'admin' ? (
                                            <span className="px-2 py-0.5 font-semibold text-[11px] rounded-full bg-purple-50 text-purple-700 border border-purple-100 capitalize">
                                                Admin
                                            </span>
                                        ) : userRole === 'creator' ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 font-semibold text-[11px] rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200/40 capitalize">
                                                <Briefcase width={10} height={10} />
                                                Creator
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 font-semibold text-[11px] rounded-full bg-neutral-50 text-neutral-600 border border-neutral-200/60 capitalize">
                                                <Person width={10} height={10} />
                                                User
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <span className="text-neutral-400">Joined:</span> <span className="font-medium text-neutral-700">{formatDate(user.createdAt)}</span>
                                    </div>
                                </div>

                                {/* Responsive Actions strip */}
                                <div className="pt-3 border-t border-neutral-100/60 flex items-center justify-between gap-4 text-xs font-semibold">
                                    {/* Mobile Dropdown handles clean selection space */}
                                    <MobileRoleDropdown 
                                        userRole={userRole} 
                                        onSelect={(newRole) => initiateRoleChange(userId, userName, newRole)} 
                                    />

                                    <div className="flex items-center gap-3">
                                        {userStatus === 'Active' ? (
                                            <button
                                                onClick={() => initiateStatusChange(userId, userName, 'Suspended')}
                                                className="text-rose-600 hover:text-rose-700 transition-colors"
                                            >
                                                Suspend
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => initiateStatusChange(userId, userName, 'Active')}
                                                    className="text-emerald-600 hover:text-emerald-700 transition-colors"
                                                >
                                                    Activate
                                                </button>
                                                <button
                                                    onClick={() => initiateDelete(userId, userName)}
                                                    className="text-neutral-400 hover:text-rose-600 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 2. Desktop View */}
                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm text-neutral-600">
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
                        <tbody className="divide-y divide-neutral-100 bg-white">
                            {users.map((user) => {
                                const userId = getUserId(user);
                                const userRole = user?.role?.toLowerCase();
                                const userStatus = user.status || 'Active';
                                const userName = user.name || 'Unknown User';

                                return (
                                    <tr key={userId} className="hover:bg-neutral-50/70 transition-colors duration-150">
                                        <td className="py-4 px-6 font-semibold text-neutral-900 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-xs text-neutral-600 border border-neutral-200/60 font-bold tracking-wider">
                                                    {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                                                </div>
                                                <span className="text-sm font-semibold text-neutral-900">{userName}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-neutral-600 whitespace-nowrap text-sm">
                                            {user.email}
                                        </td>
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
                                        <td className="py-4 px-6 text-neutral-500 whitespace-nowrap text-sm">
                                            {formatDate(user.createdAt)}
                                        </td>
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
                                        <td className="py-4 px-6 text-right whitespace-nowrap text-xs font-semibold">
                                            <div className="flex items-center justify-end gap-3.5">
                                                {userRole !== 'admin' && (
                                                    <button
                                                        onClick={() => initiateRoleChange(userId, userName, 'admin')}
                                                        className="text-neutral-500 hover:text-[#0080FF] transition-colors"
                                                    >
                                                        Make Admin
                                                    </button>
                                                )}
                                                {userRole !== 'creator' && (
                                                    <button
                                                        onClick={() => initiateRoleChange(userId, userName, 'creator')}
                                                        className="text-neutral-500 hover:text-[#0080FF] transition-colors"
                                                    >
                                                        Make Creator
                                                    </button>
                                                )}
                                                {userStatus === 'Active' ? (
                                                    <button
                                                        onClick={() => initiateStatusChange(userId, userName, 'Suspended')}
                                                        className="text-rose-600 hover:text-rose-700 transition-colors pl-3 border-l border-neutral-100"
                                                    >
                                                        Suspend
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => initiateStatusChange(userId, userName, 'Active')}
                                                            className="text-emerald-600 hover:text-emerald-700 transition-colors pl-3 border-l border-neutral-100"
                                                        >
                                                            Activate
                                                        </button>
                                                        <button
                                                            onClick={() => initiateDelete(userId, userName)}
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
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-neutral-100 text-xs text-neutral-500 select-none text-center sm:text-left">
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

            {/* Confirmation Modal */}
            {isConfirmOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40">
                    <div className="w-full max-w-sm bg-white border border-neutral-100 rounded-2xl p-6 shadow-xl space-y-6 mx-2">
                        <div className="space-y-2">
                            <h3 className="text-base font-bold text-neutral-900">
                                {modal.title}
                            </h3>
                            <p className="text-xs text-neutral-500 leading-relaxed">
                                {modal.description}
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-2 text-xs font-semibold">
                            <button
                                disabled={isUpdating}
                                onClick={() => { setIsConfirmOpen(false); setPendingAction(null); }}
                                className="px-4 py-2 text-neutral-600 hover:text-neutral-800 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 rounded-xl transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={isUpdating}
                                onClick={executeConfirmedAction}
                                className={`px-4 py-2 text-white rounded-xl transition-colors shadow-sm disabled:opacity-50 min-w-[76px] flex items-center justify-center ${modal.confirmColor}`}
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