import { prisma } from "@/lib/prisma";
import { InternalServerErrorResponse, ZodErrorResponse } from "@/lib/exception";
import { ViolanceSchema } from "@/schemas/violance";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { broadcast } from "@/lib/socket_server";

const PAGE_SIZE = 2;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const data = ViolanceSchema.parse(body);

        const violance = await prisma.violance.create({
            data,
        });

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
        const url = new URL(req.url);
        const searchParams = url.searchParams;
        const { districts,
            parlamentarySeats,
            violanceDate,
            responsibleParties,
            violanceTypes,
            minorities,
            page = 1
        } = Object.fromEntries(searchParams.entries());

        if (districts?.split(",").length > 64 ||
            parlamentarySeats?.split(",").length > 400 ||
            responsibleParties?.split(",").length > 10 ||
            violanceTypes?.split(",").length > 10 ||
            minorities?.split(",").length > 10)
            return NextResponse.json({ message: "Too many data provided" }, { status: 400 });

        const filters: any = {};

        const prioritizedStringMatch = (field: string, values: string) => {
            const vals = values.split(",").map((v) => v.trim());
            const matchers: any[] = [];

            for (const v of vals) {
                matchers.push({ [field]: { equals: v, mode: "insensitive" } });
                matchers.push({ [field]: { startsWith: v, mode: "insensitive" } });
                matchers.push({ [field]: { contains: v, mode: "insensitive" } });
            }

            return { OR: matchers };
        };

        const prioritizedArrayMatch = (field: string, values: string) => {
            const vals = values.split(",").map(v => v.trim());

            const matchers = vals.map(v => ({
                [field]: { has: v }
            }));

            return { OR: matchers };
        };

        if (districts) filters.AND = [...(filters.AND || []), prioritizedStringMatch("district", districts)];
        if (parlamentarySeats) filters.AND = [...(filters.AND || []), prioritizedStringMatch("parlamentarySeat", parlamentarySeats)];
        if (responsibleParties) filters.AND = [...(filters.AND || []), prioritizedArrayMatch("responsibleParty", responsibleParties)];
        if (violanceTypes) filters.AND = [...(filters.AND || []), prioritizedArrayMatch("violanceType", violanceTypes)];
        if (minorities) filters.AND = [...(filters.AND || []), prioritizedArrayMatch("minority", minorities)];

        if (violanceDate) {
            const startDate = new Date(violanceDate);
            startDate.setUTCHours(0, 0, 0, 0);
            const nextDate = new Date(startDate);
            nextDate.setDate(startDate.getDate() + 1);

            filters.AND = [...(filters.AND || []), {
                violanceDate: {
                    gte: startDate,
                    lt: nextDate
                }
            }]
        };

        const violance = await prisma.violance.findMany({
            where: filters,
            take: PAGE_SIZE,
            skip: (Number(page) - 1) * PAGE_SIZE,
            orderBy: {
                createdAt: "desc"
            }
        });

        return NextResponse.json(violance, { status: 200 });
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

        await prisma.violance.delete({
            where: { id: String(id) }
        });
        return NextResponse.json({ message: `Violance record with id ${id} deleted` }, { status: 200 });
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
        const data = ViolanceSchema.parse(body);

        const violance = await prisma.violance.update({
            where: { id: String(id) },
            data,
        });

        return NextResponse.json(violance, { status: 200 });
    } catch (err: unknown) {
        if (err instanceof ZodError)
            return ZodErrorResponse(err);
        return InternalServerErrorResponse(err);
    }
}