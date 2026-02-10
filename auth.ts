import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import bcrypt from "bcrypt";
import { UserSchema } from "./schemas/user";
import { prisma } from "@/lib/prisma";

interface User {
    id: string;
    email: string;
    name: string;
}

export async function getUser(email: string) {
    return await prisma.user.findUnique({
        where: { email },
    });
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {

                const { email, password } = UserSchema.parse(credentials);
                const user = await getUser(email);
                if (!user) return null;

                const valid = await bcrypt.compare(password, user.passwordHash);
                if (!valid) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                };
            },
        }),
    ],
});
