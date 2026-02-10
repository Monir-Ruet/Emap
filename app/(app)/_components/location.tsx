'use client';

import { useMapStore } from "@/stores/map_stores";

export default function Location() {
    const { district, division, parliamentarySeat, showDistrictMap } = useMapStore();
    if (showDistrictMap === false) {
        return null;
    }
    return (
        <div className="flex flex-row gap-2">
            {division && <div className="text-sm ">{division} |</div>}
            {district && <div className="text-sm ">{district} |</div>}
            {parliamentarySeat && <div className="text-sm ">{parliamentarySeat}</div>}
        </div>
    )
}