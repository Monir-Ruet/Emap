export const dynamic = "force-dynamic";

import { division_districts, divisions } from "@/constants/data";
import HomePage from "./_components/homepage";
import { FindTotalCountByDistrict } from "../services/violence_service";

const colors = ["#8E2F2B", "#2F5F6A", "#D4A73C"]

export default async function Home() {
  const tasks = divisions.map(async (div) => {
    const districtsString = division_districts[div].join(",");
    return {
      division: div,
      count: await FindTotalCountByDistrict(districtsString)
    };
  });

  const violenceCount = await Promise.all(tasks);
  const sortedViolenceCount = violenceCount.sort((a, b) => b.count - a.count);

  const colorMap: Record<string, string> = {};
  sortedViolenceCount.forEach((item, idx) => {
    colorMap[item.division] = colors[Math.floor(idx / 3)];
  });

  return (
    <HomePage colorMap={colorMap} />
  );
}
