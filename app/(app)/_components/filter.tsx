import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { division_districts, divisions } from "@/constants/data";
import { DistrictToAreaMap } from "@/constants/seat";
import { useMapStore } from "@/stores/map_stores";

export default function FilterMenu() {
    const { division, setDivision, district, setDistrict, setShowMainMap,
        showMainMap, inside,
        setShowDivisionMap, setShowDistrictMap, parliamentarySeat: parliamentaryArea, setParliamentarySeat
    } = useMapStore();

    const handleFilterApply = () => {
        setShowMainMap(false);
        setShowDivisionMap(false);
        setShowDistrictMap(true);
        setDistrict(district);
        setParliamentarySeat(parliamentaryArea);
    }

    const onDivisionChange = (value: string) => {
        setDivision(value);
        setDistrict("");
        setParliamentarySeat("");
        if (!showMainMap)
            setShowMainMap(true);
        setShowDivisionMap(false);
        setShowDistrictMap(false);
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white text-gray-800 p-4 mt-4 rounded-lg">
            <div>
                <label className="block text-xs font-bold mb-1">Division</label>
                <Select onValueChange={onDivisionChange}>
                    <SelectTrigger className="w-full max-w-64">
                        <SelectValue placeholder="Select a division" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            divisions?.map((division, idx) => (
                                <SelectItem key={idx} value={division}>
                                    {division}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label className="block text-xs font-bold mb-1">District</label>
                <Select onValueChange={(value) => setDistrict(value)}>
                    <SelectTrigger className="w-full max-w-64">
                        <SelectValue placeholder="Select a district" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            division_districts[division]?.map((district, idx) => (
                                <SelectItem key={idx} value={district}>
                                    {district}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label className="block text-xs font-bold mb-1">Parliamentary Area</label>
                <Select onValueChange={(value) => setParliamentarySeat(value)}>
                    <SelectTrigger className="w-full max-w-64">
                        <SelectValue placeholder="Select a district" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            DistrictToAreaMap.get(district)
                                ?.map((_, idx) => (
                                    <SelectItem key={idx} value={`${district}-${idx + 1}`}>
                                        {district}-{idx + 1}
                                    </SelectItem>
                                ))
                        }
                    </SelectContent>
                </Select>
            </div>

            <Button onClick={handleFilterApply} className="bg-[#004a99] text-white rounded px-4 py-2 self-end" disabled={!inside || !division || !district || !parliamentaryArea}>
                Apply Filters
            </Button>
        </div>
    )
}