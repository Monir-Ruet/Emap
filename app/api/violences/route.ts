import { InternalServerErrorResponse } from "@/lib/exception";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const PAGE_SIZE = 20;

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const searchParams = url.searchParams;
        const { districts,
            parliamentarySeats,
            violenceDate,
            responsibleParties,
            violenceTypes,
            minorities,
            page = 1
        } = Object.fromEntries(searchParams.entries());

        if (districts?.split(",").length > 64 ||
            parliamentarySeats?.split(",").length > 400 ||
            responsibleParties?.split(",").length > 10 ||
            violenceTypes?.split(",").length > 10 ||
            minorities?.split(",").length > 10)
            return NextResponse.json({ message: "Too many data provided" }, { status: 400 });

        const filters: any = {};

        const prioritizedStringMatch = (field: string, values: string) => {
            const vals = values.split(",").map((v) => v.trim());
            const matchers: any[] = [];

            for (const v of vals) {
                matchers.push({ [field]: { equals: v, mode: "insensitive" } });
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
        if (parliamentarySeats) filters.AND = [...(filters.AND || []), prioritizedStringMatch("parliamentarySeat", parliamentarySeats)];
        if (responsibleParties) filters.AND = [...(filters.AND || []), prioritizedArrayMatch("responsibleParty", responsibleParties)];
        if (violenceTypes) filters.AND = [...(filters.AND || []), prioritizedArrayMatch("violenceType", violenceTypes)];
        if (minorities) filters.AND = [...(filters.AND || []), prioritizedArrayMatch("minority", minorities)];

        if (violenceDate) {
            const startDate = new Date(violenceDate);
            startDate.setUTCHours(0, 0, 0, 0);
            const nextDate = new Date(startDate);
            nextDate.setDate(startDate.getDate() + 1);

            filters.AND = [...(filters.AND || []), {
                violenceDate: {
                    gte: startDate,
                    lt: nextDate
                }
            }]
        };

        const violence = await prisma.violence.findMany({
            where: filters,
            take: PAGE_SIZE,
            skip: (Number(page) - 1) * PAGE_SIZE,
            orderBy: {
                createdAt: "desc"
            },
        });

        const totalCount = await prisma.violence.count({
            where: filters,
        });

        return NextResponse.json({
            data: violence,
            totalCount,
        }, { status: 200 });
    } catch (err: unknown) {
        return InternalServerErrorResponse(err);
    }
}