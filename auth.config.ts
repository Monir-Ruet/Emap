import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/manage/signin',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            // const isLoggedIn = !!auth?.user;
            // const isManagePage = nextUrl.pathname.startsWith('/manage');
            // if (isManagePage) {
            //     if (isLoggedIn) return true;
            //     return false;
            // }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;