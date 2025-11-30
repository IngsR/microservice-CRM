'use client';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import axios from 'axios';
import { ArrowLeft, Loader2, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await axios.post('/api/auth/forgot-password', { email });
            setSubmitted(true);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                    'Something went wrong. Please try again.',
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 flex flex-col justify-center p-12 text-white">
                    <Link
                        href="/"
                        className="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm font-bold text-2xl">
                            I
                        </div>
                        <span className="text-2xl font-bold">
                            Ing Foundation
                        </span>
                    </Link>

                    <h1 className="text-5xl font-bold leading-tight mb-6">
                        Forgot Your Password?
                        <br />
                        <span className="text-indigo-200">No Worries</span>
                    </h1>
                    <p className="text-lg text-indigo-100 max-w-md">
                        Enter your email address and we'll send you a link to
                        reset your password.
                    </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            {/* Right Side - Form */}
            <div className="flex w-full lg:w-1/2 items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    <Link
                        href="/login"
                        className="flex items-center text-sm text-indigo-600 hover:text-indigo-700 mb-6 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Login
                    </Link>

                    <div className="mb-8">
                        <div className="flex lg:hidden items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white">
                                I
                            </div>
                            <span className="text-xl font-bold text-gray-900">
                                Ing Foundation
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Reset Password
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Enter your email and we'll send you a reset link
                        </p>
                    </div>

                    {submitted ? (
                        <div className="p-6 bg-green-50 border border-green-200 rounded-lg animate-scale-in">
                            <h3 className="text-lg font-semibold text-green-800 mb-2">
                                Check Your Email
                            </h3>
                            <p className="text-sm text-green-700">
                                We've sent password reset instructions to{' '}
                                <strong>{email}</strong>.
                            </p>
                            <p className="text-sm text-green-600 mt-2">
                                Please check your inbox and spam folder.
                            </p>
                            <Link href="/login" className="mt-4 block">
                                <Button variant="outline" className="w-full">
                                    Return to Login
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="pl-10"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-600">
                                        {error}
                                    </p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    'Send Reset Link'
                                )}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
