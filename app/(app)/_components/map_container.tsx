import { useMapStore } from "@/stores/map_stores";
import Bangladesh from "./bangladesh"
import DivisionMap from "./division/division_map";
import DistrictMap from "./districts/district_map";
import dynamic from "next/dynamic";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeft, Home, LockOpen, Lock } from "lucide-react";
import PopupNotification from "./popup_notification";
import Location from "./location";

const ChartPieDonutText = dynamic(
    () => import("@/app/(app)/_components/pie_chart").then((mod) => mod.ChartPieDonutText),
    { ssr: false }
)

const ChartBarInteractive = dynamic(
    () => import("@/app/(app)/_components/death_count_chart").then((mod) => mod.DeathCountChart),
    { ssr: false }
)

const ChartPieDonutViolationsType = dynamic(
    () => import("@/app/(app)/_components/pie_chart_violations_type").then((mod) => mod.ChartPieDonutText),
    { ssr: false }
)

const MinoritySummaryChart = dynamic(
    () => import("@/app/(app)/_components/minority_chart").then((mod) => mod.MinoritySummaryChart),
    { ssr: false }
)

export default function MapContainer() {
    const { showMainMap, setShowMainMap, setShowDivisionMap, setShowDistrictMap,
        showDivisionMap, showDistrictMap, setInside, inside,
        setDistrict, setDivision, setParliamentarySeat
    } = useMapStore();

    const handleGoToDefaultMap = () => {
        if (!showMainMap) {
            setShowMainMap(true);
        }
        setShowDivisionMap(false);
        setShowDistrictMap(false);
        setDistrict("");
        setDivision("");
        setParliamentarySeat("");
    }

    return (
        <div className="md:p-6 mt-5 md:mt-0">
            <div className="relative bg-gray-100 border border-dashed md:p-4">
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
                                    inside ? <LockOpen /> : <Lock />
                                }
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            {
                                inside ? <p>Lock Map</p> : <p>Unlock Map</p>
                            }
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
                                                setDistrict("");
                                                setParliamentarySeat("");
                                                setShowDivisionMap(true);
                                            } else if (showDivisionMap) {
                                                setDivision("");
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <ChartPieDonutText />
                <ChartBarInteractive />
                <ChartPieDonutViolationsType />
                <MinoritySummaryChart />
            </div>
        </div>
    )
}