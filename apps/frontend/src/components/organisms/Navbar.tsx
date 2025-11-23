'use client';

import Button from '@/components/atoms/Button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: '/about', label: 'About' },
        { href: '/products', label: 'Products' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
            <nav className="flex h-16 items-center justify-between px-4 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white">
                        I
                    </div>
                    <span className="text-lg lg:text-xl font-bold text-gray-900">
                        Ing Foundation
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'text-sm font-semibold transition-colors',
                                pathname === link.href
                                    ? 'text-indigo-600'
                                    : 'text-gray-900 hover:text-indigo-600',
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/login"
                        className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
                    >
                        Log in
                    </Link>
                    <Link href="/register">
                        <Button size="sm">Get Started</Button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    className="md:hidden p-2 text-gray-700 hover:text-indigo-600 transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <div className="relative w-6 h-6">
                        <Menu
                            className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                                mobileMenuOpen
                                    ? 'opacity-0 rotate-90'
                                    : 'opacity-100 rotate-0'
                            }`}
                        />
                        <X
                            className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                                mobileMenuOpen
                                    ? 'opacity-100 rotate-0'
                                    : 'opacity-0 rotate-90'
                            }`}
                        />
                    </div>
                </button>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`md:hidden border-t border-gray-100 bg-white overflow-hidden transition-all duration-300 ease-in-out ${
                    mobileMenuOpen
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0'
                }`}
            >
                <div className="flex flex-col space-y-1 px-4 py-3 animate-slide-down">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'px-3 py-2 text-base font-semibold rounded-lg transition-colors',
                                pathname === link.href
                                    ? 'text-indigo-600 bg-indigo-50'
                                    : 'text-gray-900 hover:text-indigo-600 hover:bg-gray-50',
                            )}
                            onClick={() => setMobileMenuOpen(false)}
                            style={{
                                animationDelay: `${index * 50}ms`,
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/login"
                        className="px-3 py-2 text-base font-semibold text-gray-900 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Log in
                    </Link>
                    <Link
                        href="/register"
                        onClick={() => setMobileMenuOpen(false)}
                        className="pt-2"
                    >
                        <Button className="w-full">Get Started</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
