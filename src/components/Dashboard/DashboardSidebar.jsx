
'use client';
import { useSession } from "@/lib/auth-client";
import { LayoutSideContentLeft, Bell, Briefcase, Envelope, Gear, House, Magnifier, Person, Bookmark, FileText, CreditCard } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { Building, Users } from "lucide-react";
import Link from "next/link";

export function DashboardSidebar() {
    const { data } = useSession();
    const user = data?.user;

    const creatorNavLinks = [
        { icon: House, href: "/dashboard/creator", label: "Home" },
        { icon: Magnifier, href: "/dashboard/creator/prompts", label: "Prompts" },
        { icon: Bell, href: "/dashboard/creator/prompts/new", label: "Create Prompt" },
        { icon: Briefcase, href: "/dashboard/creator/profile", label: "Creator Profile" },
        { icon: Envelope, href: "/messages", label: "Messages" },
        { icon: Gear, href: "/settings", label: "Settings" },
    ]

    const userNavLinks = [
        { icon: House, href: "/dashboard/user", label: "Dashboard" },
        { icon: Bookmark, href: "/dashboard/user/saved", label: "Saved Prompts" },
        { icon: FileText, href: "/dashboard/user/purchases", label: "Purchases" },
        { icon: CreditCard, href: "/dashboard/user/billing", label: "Billing" },
        { icon: Gear, href: "/settings", label: "Settings" },
    ];

    const adminNavLinks = [
        { icon: House, href: "/dashboard/admin", label: "Dashboard" },
        { icon: Users, href: "/dashboard/admin/users", label: "Users" },
        { icon: Building, href: "/dashboard/admin/creators", label: "Creators" },
        { icon: Briefcase, href: "/dashboard/admin/prompts", label: "Prompts" },
        { icon: CreditCard, href: "/dashboard/admin/payments", label: "Payments" },
        { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
    ];



    const navLinksMap = {
        user: userNavLinks,
        creator: creatorNavLinks,
        admin: adminNavLinks
    }
    const activeRole = user?.role === 'admin' ? 'admin' : (user?.accountType || 'user');
    const navItems = navLinksMap[activeRole];


    const navContent = <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
            <Link
                key={item.label}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                href={item.href}
            >
                <item.icon className="size-5 text-muted" />
                {item.label}
            </Link>
        ))}
    </nav>

    return (
        <>
            <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
                {navContent}
            </aside>
            <Drawer>
                <Button className="lg:hidden" variant="secondary">
                    <LayoutSideContentLeft />
                    Sidebar
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}