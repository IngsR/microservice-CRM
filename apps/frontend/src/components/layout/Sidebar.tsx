'use client';

import { cn } from '@/lib/utils';
import Cookies from 'js-cookie';
import {
    Briefcase,
    Building2,
    LayoutDashboard,
    LogOut,
    Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Customers', href: '/dashboard/customers', icon: Users },
    { name: 'Companies', href: '/dashboard/companies', icon: Building2 },
    { name: 'Deals', href: '/dashboard/deals', icon: Briefcase },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove('token');
        router.push('/login');
    };

    return (
        <div className="flex h-full w-64 flex-col bg-gray-900 text-white">
            <div className="flex h-16 items-center justify-center border-b border-gray-800">
                <h1 className="text-xl font-bold">Ing Foundation</h1>
            </div>

            <nav className="flex-1 space-y-1 px-2 py-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white',
                            )}
                        >
                            <item.icon
                                className={cn(
                                    'mr-3 h-5 w-5 shrink-0',
                                    isActive
                                        ? 'text-white'
                                        : 'text-gray-400 group-hover:text-white',
                                )}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t border-gray-800 p-4">
                <button
                    onClick={handleLogout}
                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                    <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-white" />
                    Sign out
                </button>
            </div>
        </div>
    );
}
