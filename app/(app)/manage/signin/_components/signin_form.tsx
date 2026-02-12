'use client';

import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { ArrowRightIcon } from 'lucide-react';
import { signInSchema, signInZodSchema } from '@/schemas/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { signIn } from '@/app/actions/account';


export default function SigninForm() {
    const searchParams = useSearchParams();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<signInSchema>({
        resolver: zodResolver(signInZodSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [signInError, setSignInError] = useState("");
    const redirectUrl = searchParams.get("redirect") || "/";

    const handleLogin = async (form: signInSchema) => {
        const signInResult = await signIn({ ...form, redirectUrl: redirectUrl });
        if (!signInResult?.success) {
            setSignInError("Incorrect credentials");
        } else {
            const redirectUrl = searchParams.get("redirect_url") ?? "/manage";
            window.location.href = redirectUrl;
        }
    };

    return (
        <div className='w-[30%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-3">
                <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                    <h1 className="mb-3 text-2xl">
                        Please log in to continue.
                    </h1>
                    <div className="w-full">
                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    {...register("email")}
                                    className="peer block w-full rounded-md border border-gray-200 py-2.25 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    {...register("password")}
                                    className="peer block w-full rounded-md border border-gray-200 py-2.25 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <input type="hidden" name="redirectTo" value={redirectUrl} />
                    <Button className="mt-4 w-full" aria-disabled={isSubmitting}>
                        Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                    </Button>
                    <div
                        className="flex h-8 items-end space-x-1"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {signInError && (
                            <p className="text-sm text-red-500">{signInError}</p>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}