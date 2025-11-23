import Navbar from '@/components/organisms/Navbar';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />

            {/* Hero Section */}
            <main className="flex-1">
                <div className="relative isolate px-6 pt-14 lg:px-8">
                    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                Empower Your Business with
                                <span className="block text-indigo-600">
                                    Ing Foundation CRM
                                </span>
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                A modern, enterprise-grade customer relationship
                                management platform. Built to help you manage
                                contacts, close deals, and accelerate growth.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link
                                    href="/login"
                                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Go to Dashboard
                                </Link>
                                <Link
                                    href="about"
                                    className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-1"
                                >
                                    Learn more{' '}
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature Section */}
                <div className="bg-gray-50 py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base font-semibold leading-7 text-indigo-600">
                                Faster workflow
                            </h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Everything you need to manage sales
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                                <div className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                            <Zap
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        Fast Performance
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">
                                        Built with Next.js App Router and NestJS
                                        for lightning-fast data fetching and
                                        rendering.
                                    </dd>
                                </div>
                                <div className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                            <ShieldCheck
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        Secure Authentication
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">
                                        Enterprise-grade security with JWT
                                        authentication and HTTP-only cookie
                                        strategies.
                                    </dd>
                                </div>
                                <div className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                            <CheckCircle2
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        Easy Management
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">
                                        Intuitive dashboard to manage customers,
                                        companies, and deals in one place.
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white py-8">
                <div className="text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Ing Foundation. All rights
                    reserved.
                </div>
            </footer>
        </div>
    );
}
