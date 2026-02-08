import { prisma } from "@/lib/prisma";
import { InternalServerErrorResponse, ZodErrorResponse } from "@/lib/exception";
import { ViolanceSchema } from "@/schemas/violance";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { broadcast, getSocketIO } from "@/lib/socket_server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const data = ViolanceSchema.parse(body);

        const violance = await prisma.violance.create({
            data,
        });

        const io = getSocketIO();
        broadcast("violance", violance);

        return NextResponse.json(violance, { status: 201 });
    } catch (err: unknown) {
        if (err instanceof ZodError)
            return ZodErrorResponse(err);
        return InternalServerErrorResponse(err);
    }
}

export async function GET(req: Request) {
    try {
        const violance = await prisma.violance.findMany();
        return NextResponse.json(violance, { status: 200 });
    } catch (err: unknown) {
        return InternalServerErrorResponse(err);
    }
}