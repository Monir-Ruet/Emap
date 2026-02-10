'use client';

import { useMapStore } from "@/stores/map_stores";

export default function Location() {
    const { district, division, parliamentarySeat, showDivisionMap, showDistrictMap } = useMapStore();
    return (
        <div className="flex flex-row gap-2">
            {showDivisionMap && division && <div className="text-sm font-bold">{division}</div>}
            {showDistrictMap && district && <div className="text-sm font-bold">{division} | {district}</div>}
        </div>
    )
}