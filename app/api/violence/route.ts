import { prisma } from "@/lib/prisma";
import { InternalServerErrorResponse, ZodErrorResponse } from "@/lib/exception";
import { ViolenceSchema } from "@/schemas/violence";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { broadcast } from "@/lib/socket_server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const data = ViolenceSchema.parse(body);
        data.id = undefined;

        const violence = await prisma.violence.create({
            data,
        });

        broadcast("violence", violence);

        return NextResponse.json(violence, { status: 201 });
    } catch (err: unknown) {
        if (err instanceof ZodError)
            return ZodErrorResponse(err);
        return InternalServerErrorResponse(err);
    }
}

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const searchParams = url.searchParams;
        const { id } = Object.fromEntries(searchParams.entries());
        if (!id)
            return NextResponse.json({ message: "No id provided" }, { status: 400 });
        const record = await prisma.violence.findUnique({
            where: { id: String(id) }
        });
        if (!record)
            return NextResponse.json({ message: `No violence record found with id ${id}` }, { status: 404 });
        return NextResponse.json(record, { status: 200 });
    } catch (err: unknown) {
        return InternalServerErrorResponse(err);
    }
}


export async function DELETE(req: Request) {
    try {
        const url = new URL(req.url);
        const searchParams = url.searchParams;
        const { id } = Object.fromEntries(searchParams.entries());
        if (!id)
            return NextResponse.json({ message: "No id provided" }, { status: 400 });

        await prisma.violence.delete({
            where: { id: String(id) }
        });
        broadcast("violence_delete", { id });
        return NextResponse.json({ message: `Violence record with id ${id} deleted` }, { status: 200 });
    } catch (err: unknown) {
        return InternalServerErrorResponse(err);
    }
}

export async function PUT(req: Request) {
    try {
        const url = new URL(req.url);
        const searchParams = url.searchParams;
        const { id } = Object.fromEntries(searchParams.entries());
        if (!id)
            return NextResponse.json({ message: "No id provided" }, { status: 400 });

        const body = await req.json();
        const data = ViolenceSchema.parse(body);
        data.id = undefined;

        const record = await prisma.violence.findUnique({
            where: { id: id }
        });

        if (!record)
            return NextResponse.json({ message: `No violance record found with id ${id}` }, { status: 404 });

        const violence = await prisma.violence.update({
            where: { id: String(id) },
            data,
        });

        broadcast("violence_update", violence);

        return NextResponse.json(violence, { status: 200 });
    } catch (err: unknown) {
        if (err instanceof ZodError) {
            return ZodErrorResponse(err);
        }

        return InternalServerErrorResponse(err);
    }
}