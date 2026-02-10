import { division_districts } from "@/constants/data";
import { InternalServerErrorResponse, ZodErrorResponse } from "@/lib/exception";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const { division, district, parliamentarySeat } = Object.fromEntries(searchParams.entries());

        const data = [division, district, parliamentarySeat];
        const paramsCount = data.filter((d) => d).length;
        if (paramsCount != 1) {
            return NextResponse.json({ message: "Too many query parameters provided" }, { status: 400 });
        }

        const match: Record<string, any> = {};

        if (parliamentarySeat) {
            match.parliamentarySeat = parliamentarySeat;
        }
        else if (division) {
            match.district = {
                $in: division_districts[division] ?? [],
            };
        }
        else if (district) {
            match.district = district;
        }


        const pipeline: any[] = [
            { $match: match },
            {
                $facet: {
                    data: [
                        {
                            $group: {
                                _id: null,
                                totalViolations: { $sum: 1 },
                                totalDeathCount: {
                                    $sum: { $ifNull: ["$deathCount", 0] }
                                }
                            }
                        }
                    ],

                    summary: [
                        { $unwind: "$responsibleParty" },
                        {
                            $group: {
                                _id: "$responsibleParty",
                                violations: { $sum: 1 },
                                totalDeathCount: {
                                    $sum: { $ifNull: ["$deathCount", 0] }
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                responsibleParty: "$_id",
                                violations: 1,
                                totalDeathCount: 1
                            }
                        },
                    ]
                }
            }
        ];

        const response = await prisma.violence.aggregateRaw({ pipeline });

        return NextResponse.json(response[0], { status: 200 });

    } catch (err: unknown) {
        if (err instanceof ZodError) {
            return ZodErrorResponse(err);
        }
        return InternalServerErrorResponse(err);
    }
}
