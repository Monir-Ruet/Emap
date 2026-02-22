import { InternalServerErrorResponse, ZodErrorResponse } from "@/lib/exception";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const { districts, parliamentarySeat } =
            Object.fromEntries(searchParams.entries());

        const paramsCount = [districts, parliamentarySeat].filter(Boolean).length;

        if (paramsCount === 0 || paramsCount > 1) {
            return NextResponse.json(
                { message: "Only one query parameter allowed" },
                { status: 400 }
            );
        }

        const match: Record<string, any> = {};

        if (parliamentarySeat) {
            match.parliamentarySeat = parliamentarySeat;
        } else if (districts) {
            const districtList = districts.split(",").map((d) => d.trim());
            match.district = { $in: districtList };
        }

        const pipeline = [
            { $match: match },
            {
                $facet: {
                    data: [
                        {
                            $group: {
                                _id: null,
                                totalViolations: { $sum: 1 },
                                totalDeathCount: { $sum: { $ifNull: ["$deathCount", 0] } },
                                mildCount: {
                                    $sum: {
                                        $cond: [
                                            { $and: [{ $ne: ["$mild", null] }, { $ne: ["$mild", ""] }] },
                                            1,
                                            0,
                                        ],
                                    },
                                },
                                moderateCount: {
                                    $sum: {
                                        $cond: [
                                            { $and: [{ $ne: ["$moderate", null] }, { $ne: ["$moderate", ""] }] },
                                            1,
                                            0,
                                        ],
                                    },
                                },
                                extremeCount: {
                                    $sum: {
                                        $cond: [
                                            { $and: [{ $ne: ["$extreme", null] }, { $ne: ["$extreme", ""] }] },
                                            1,
                                            0,
                                        ],
                                    },
                                },
                            },
                        },
                    ],
                    responsible_party_summary: [
                        {
                            $unwind: {
                                path: "$responsibleParty",
                                preserveNullAndEmptyArrays: false,
                            },
                        },
                        {
                            $group: {
                                _id: "$responsibleParty",
                                violations: { $sum: 1 },
                                totalDeathCount: { $sum: { $ifNull: ["$deathCount", 0] } },
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                responsibleParty: "$_id",
                                violations: 1,
                                totalDeathCount: 1,
                            },
                        },
                    ],
                    minority_summary: [
                        {
                            $unwind: {
                                path: "$minority",
                                preserveNullAndEmptyArrays: false,
                            },
                        },
                        {
                            $group: {
                                _id: "$minority",
                                violations: { $sum: 1 },
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                minority: "$_id",
                                violations: 1,
                            },
                        },
                    ],
                },
            },
        ];

        const response = await prisma.violence.aggregateRaw({ pipeline });

        return NextResponse.json(
            response[0] ?? { data: [], summary: [] },
            { status: 200 }
        );
    } catch (err: unknown) {
        if (err instanceof ZodError) {
            return ZodErrorResponse(err);
        }
        return InternalServerErrorResponse(err);
    }
}