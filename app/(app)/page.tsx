'use client';

import Bangladesh from "@/app/(app)/_components/bangladesh";
import Name from "./_components/name";
import GoInside from "./_components/GoInside";
import DivisionMap from "./_components/division/division_map";
import { useMapStore } from "@/stores/map_stores";
import DistrictMap from "./_components/districts/district_map";

export default function Home() {
  const { showMainMap, showDivisionMap, showDistrictMap } = useMapStore();
  return (
    <div className="m-auto flex flex-row items-center justify-between min-h-screen">
      {/* <GoInside /> */}
      {showMainMap && <Bangladesh />}
      {showDivisionMap && <DivisionMap />}
      {showDistrictMap && <DistrictMap />}
      <Name />
    </div>

  );
}
