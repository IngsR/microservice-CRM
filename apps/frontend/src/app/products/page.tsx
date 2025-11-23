import Button from '@/components/atoms/Button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/atoms/Card';
import Navbar from '@/components/organisms/Navbar';
import {
    BarChart,
    Check,
    MessageSquare,
    Shield,
    Users,
    Zap,
} from 'lucide-react';
import Link from 'next/link';

export default function ProductsPage() {
    const features = [
        {
            icon: Users,
            title: 'Contact Management',
            description:
                'Organize and track all your customer interactions in one centralized platform.',
            benefits: [
                'Unlimited contacts',
                'Custom fields',
                'Contact segmentation',
                'Import/Export',
            ],
        },
        {
            icon: BarChart,
            title: 'Sales Pipeline',
            description:
                'Visualize your sales process and move deals through customizable stages.',
            benefits: [
                'Kanban board view',
                'Deal tracking',
                'Revenue forecasting',
                'Win/loss analysis',
            ],
        },
        {
            icon: MessageSquare,
            title: 'Communication Hub',
            description:
                'Keep all customer communications in context with your CRM data.',
            benefits: [
                'Email integration',
                'Activity timeline',
                'Notes & tasks',
                'Team collaboration',
            ],
        },
        {
            icon: Shield,
            title: 'Security & Compliance',
            description:
                'Enterprise-grade security to protect your sensitive business data.',
            benefits: [
                '256-bit encryption',
                'Role-based access',
                'Audit logs',
                'GDPR compliant',
            ],
        },
        {
            icon: Zap,
            title: 'Automation',
            description:
                'Save time with powerful workflow automation and integrations.',
            benefits: [
                'Custom workflows',
                'Email templates',
                'Auto-assignment',
                'API access',
            ],
        },
        {
            icon: BarChart,
            title: 'Analytics & Reports',
            description:
                'Make data-driven decisions with comprehensive reporting tools.',
            benefits: [
                'Real-time dashboards',
                'Custom reports',
                'Export to CSV',
                'Performance metrics',
            ],
        },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />

            {/* Hero Section */}
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-4xl py-16 sm:py-24">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Powerful CRM Features
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                            Everything you need to manage customer
                            relationships, close more deals, and grow your
                            business.
                        </p>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="py-24 bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {features.map((feature) => (
                            <Card key={feature.title}>
                                <CardHeader>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600 mb-4">
                                        <feature.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <CardTitle>{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 mb-4">
                                        {feature.description}
                                    </p>
                                    <ul className="space-y-2">
                                        {feature.benefits.map((benefit) => (
                                            <li
                                                key={benefit}
                                                className="flex items-center gap-2 text-sm text-gray-700"
                                            >
                                                <Check className="h-4 w-4 text-green-600 shrink-0" />
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Simple, transparent pricing
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Choose the plan that fits your business needs
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {[
                            {
                                name: 'Starter',
                                price: '$29',
                                description: 'Perfect for small teams',
                                features: [
                                    'Up to 1,000 contacts',
                                    '2 users',
                                    'Basic reporting',
                                    'Email support',
                                ],
                            },
                            {
                                name: 'Professional',
                                price: '$79',
                                description: 'For growing businesses',
                                features: [
                                    'Up to 10,000 contacts',
                                    '10 users',
                                    'Advanced reporting',
                                    'Priority support',
                                    'API access',
                                ],
                                highlighted: true,
                            },
                            {
                                name: 'Enterprise',
                                price: '$199',
                                description: 'For large organizations',
                                features: [
                                    'Unlimited contacts',
                                    'Unlimited users',
                                    'Custom reports',
                                    '24/7 support',
                                    'Dedicated account manager',
                                ],
                            },
                        ].map((plan) => (
                            <Card
                                key={plan.name}
                                className={
                                    plan.highlighted
                                        ? 'border-indigo-600 shadow-lg'
                                        : ''
                                }
                            >
                                <CardHeader>
                                    <CardTitle>{plan.name}</CardTitle>
                                    <p className="text-sm text-gray-600 mt-2">
                                        {plan.description}
                                    </p>
                                    <div className="mt-4">
                                        <span className="text-4xl font-bold text-gray-900">
                                            {plan.price}
                                        </span>
                                        <span className="text-gray-600">
                                            /month
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Link href="/register">
                                        <Button
                                            variant={
                                                plan.highlighted
                                                    ? 'primary'
                                                    : 'outline'
                                            }
                                            className="w-full mb-6"
                                        >
                                            Get Started
                                        </Button>
                                    </Link>
                                    <ul className="space-y-3">
                                        {plan.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-center gap-2 text-sm"
                                            >
                                                <Check className="h-4 w-4 text-green-600 shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
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
