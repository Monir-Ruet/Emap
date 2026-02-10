import { useMapStore } from "@/stores/map_stores";
import Bangladesh from "./bangladesh"
import DivisionMap from "./division/division_map";
import DistrictMap from "./districts/district_map";
import dynamic from "next/dynamic";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeft, Home, Search, SearchX } from "lucide-react";
import PopupNotification from "./popup_notification";
import Location from "./location";

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
                <Location />
                <div className="flex flex-col items-center absolute top-4 right-4 gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button onClick={handleGoToDefaultMap} >
                                <Home />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Go to default map</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button onClick={() => setInside()} className={`p-1 rounded-md`}>
                                {
                                    inside ? <Search /> : <SearchX />
                                }
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Go inside</p>
                        </TooltipContent>
                    </Tooltip>
                    {
                        (showDivisionMap || showDistrictMap) &&
                        (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button className={`p-1 rounded-md `}>
                                        <ArrowLeft onClick={() => {
                                            if (showDistrictMap) {
                                                setShowDistrictMap(false);
                                                setShowDivisionMap(true);
                                            } else if (showDivisionMap) {
                                                setShowDivisionMap(false);
                                                setShowMainMap(true)
                                            }
                                        }} />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Go back</p>
                                </TooltipContent>
                            </Tooltip>
                        )
                    }
                </div>

                {showMainMap && <Bangladesh />}
                {showDivisionMap && <DivisionMap />}
                {showDistrictMap && <DistrictMap />}

                <PopupNotification />
            </div>

            <div className="flex flex-col md:flex-row gap-6 mt-6">
                <ChartPieDonutText />
                <ChartBarInteractive />
            </div>
        </div>
    )
}