import { useMapStore } from "@/stores/map_stores";
import Bangladesh from "./bangladesh"
import DivisionMap from "./division/division_map";
import DistrictMap from "./districts/district_map";
import dynamic from "next/dynamic";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import PopupNotification from "./popup_notification";

const ChartPieDonutText = dynamic(
    () => import("@/app/(app)/_components/pie_chart").then((mod) => mod.ChartPieDonutText),
    { ssr: false }
)

const ChartBarInteractive = dynamic(
    () => import("@/app/(app)/_components/bar_chart").then((mod) => mod.ChartBarInteractive),
    { ssr: false }
)

export default function MapContainer() {
    const { showMainMap, setShowMainMap, setShowDivisionMap, setShowDistrictMap,
        showDivisionMap, showDistrictMap, setInside, inside
    } = useMapStore();

    const handleGoToDefaultMap = () => {
        if (!showMainMap) {
            setShowMainMap(true);
        }
        setShowDivisionMap(false);
        setShowDistrictMap(false);
    }

    return (
        <div className="p-6">
            <div className="relative bg-gray-100 border border-dashed p-4">
                <div className="flex flex-col absolute top-4 right-4 gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={handleGoToDefaultMap} variant="ghost"><Home /></Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Go to default map</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button onClick={() => setInside()} className={`p-1 rounded-md ${inside ? "bg-red-700" : ""}`}>🔍</button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Go inside into map</p>
                        </TooltipContent>
                    </Tooltip>
                </div>


                {showMainMap && <Bangladesh />}
                {showDivisionMap && <DivisionMap />}
                {showDistrictMap && <DistrictMap />}

                <PopupNotification />
            </div>

            <div className="flex flex-row gap-2 mt-2 w-full">
                <ChartPieDonutText />
                <ChartBarInteractive />
            </div>
        </div>
    )
}