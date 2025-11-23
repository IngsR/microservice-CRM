import Button from '@/components/atoms/Button';
import { Card, CardContent } from '@/components/atoms/Card';
import Navbar from '@/components/organisms/Navbar';
import { Heart, Target } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />

            {/* Hero Section */}
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-4xl py-16 sm:py-24">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            About Ing Foundation
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                            We're on a mission to empower businesses worldwide
                            with powerful, intuitive CRM tools that drive growth
                            and build lasting customer relationships.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission & Values */}
            <div className="bg-gray-50 py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center mb-16">
                        <h2 className="text-base font-semibold leading-7 text-indigo-600">
                            Our Mission
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Built for modern businesses
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            We believe that every business, regardless of size,
                            deserves access to world-class customer relationship
                            management tools.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        <Card>
                            <CardContent className="flex gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600 shrink-0">
                                    <Target className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Our Vision
                                    </h3>
                                    <p className="text-gray-600">
                                        To become the most trusted CRM platform
                                        globally, empowering millions of
                                        businesses to build meaningful customer
                                        relationships.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="flex gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600 shrink-0">
                                    <Heart className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Our Values
                                    </h3>
                                    <p className="text-gray-600">
                                        Customer-first approach, continuous
                                        innovation, transparency, and unwavering
                                        commitment to excellence in everything
                                        we do.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center mb-16">
                        <h2 className="text-base font-semibold leading-7 text-indigo-600">
                            Our Team
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Meet the people behind Ing Foundation
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                name: 'Ings R.',
                                role: 'Founder & CEO',
                                initial: 'I',
                            },
                            {
                                name: 'Engineering Team',
                                role: 'Product Development',
                                initial: 'E',
                            },
                            {
                                name: 'Support Team',
                                role: 'Customer Success',
                                initial: 'S',
                            },
                        ].map((member) => (
                            <Card key={member.name}>
                                <CardContent className="text-center">
                                    <div className="flex justify-center mb-4">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-indigo-600 to-purple-600 text-2xl font-bold text-white">
                                            {member.initial}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {member.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {member.role}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="bg-indigo-600 py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center text-white">
                        <div>
                            <div className="text-5xl font-bold mb-2">10K+</div>
                            <div className="text-indigo-200">Active Users</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">50K+</div>
                            <div className="text-indigo-200">Deals Closed</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">99.9%</div>
                            <div className="text-indigo-200">Uptime</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="py-24">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
                        Ready to grow with us?
                    </h2>
                    <div className="flex gap-4 justify-center">
                        <Link href="/register">
                            <Button size="lg">Get Started Free</Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg">
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-8">
                <div className="text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Ing Foundation. All rights
                    reserved.
                </div>
            </footer>
        </div>
    );
}
