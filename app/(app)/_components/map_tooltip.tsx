import { useMapStore } from "@/stores/map_stores";

export default function MapTooltip() {
    const { tooltipData } = useMapStore();
    if (!tooltipData) return null;
    return (
        <div id="batman" className="bg-black text-white px-2 py-1 rounded-sm text-xs w-fit absolute top-1 left-[47%] right-1/3">
            {tooltipData}
        </div>
    )
}