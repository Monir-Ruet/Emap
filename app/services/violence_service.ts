import { prisma } from "@/lib/prisma";

export async function FindTotalCountByDistrict(districts: string) {
    const match: Record<string, any> = {};

    if (districts) {
        const districtList = districts.split(",").map((d) => d.trim());
        match.district = { in: districtList };
    }

    const totalCount = await prisma.violence.count({
        where: {
            ...match,
        },
    });
    return totalCount;
}