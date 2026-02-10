import { useMapStore } from "@/stores/map_stores";

export default function MapLocations() {
    const { division, district, inside } = useMapStore();
    return (
        <div>
            <p>Division: {division}</p>
            <p>District: {district}</p>
            <p>Inside Mode: {inside ? "Enabled" : "Disabled"}</p>
        </div>
    )
}