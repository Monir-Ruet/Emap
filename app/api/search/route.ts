import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    if (req.headers.get("x-api-key") !== process.env.API_KEY) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let users = await prisma.user.findMany();
    return NextResponse.json({ message: "Hello from the API route!", users });
}

export async function POST(req: Request) {
    const { name, email } = await req.json();
    let user = await prisma.user.create({
        data: {
            name,
            email,
        },
    });
    return NextResponse.json({ message: "User created successfully!", user });
}