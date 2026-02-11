"use server";

import { prisma } from "@/lib/prisma";
import { signInSchema } from "@/schemas/user";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signIn(signInCredentials: signInSchema) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: signInCredentials.email,
            },
        });

        if (!user || !(await bcrypt.compare(signInCredentials.password, user.passwordHash)))
            return { success: false, message: "Incorrect email or password" };

        const cookieStore = cookies();

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: "24h" }
        );

        (await cookieStore).set("session", token, {
            httpOnly: true,
            secure: true,
            path: "/",
            maxAge: 3600 * 24,
        });

        return { success: true };
    } catch (err) {
        console.error("Error during sign-in:", err);
        return { success: false };
    }
}