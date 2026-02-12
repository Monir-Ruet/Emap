"use client"

import * as React from "react"
import { Bar, BarChart, Cell, XAxis } from "recharts"

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import { useMapStore } from "@/stores/map_stores"

function stringToColor(str: string) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    return `hsl(${Math.abs(hash) % 360}, 65%, 55%)`
}

const chartConfig = {
    deaths: {
        label: "Death Count",
    },
} satisfies ChartConfig

export function ChartBarInteractive() {
    const { statistics } = useMapStore()

    const chartData = React.useMemo(() => {
        const map = new Map<string, number>()
        for (const item of statistics) {
            const party = item.responsibleParty || "Unknown"
            map.set(party, (map.get(party) ?? 0) + item.totalDeathCount)
        }
        return Array.from(map.entries())
            .map(([party, deaths]) => ({ party, deaths }))
            .sort((a, b) => b.deaths - a.deaths)
    }, [statistics])

    if (!chartData.length) {
        return
    }
    return (
        <div className="flex-1 bg-white border p-4">
            <ChartContainer
                config={chartConfig}
                className="aspect-auto h-62.5 w-full"
            >
                <BarChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                        left: 12,
                        right: 12,
                    }}
                >
                    <XAxis
                        dataKey="party"
                        hide={chartData.length > 0}
                    />
                    <ChartTooltip
                        content={
                            <ChartTooltipContent
                                className="w-37.5"
                                nameKey="deaths" />
                        }
                    />
                    <Bar dataKey="deaths">
                        {chartData.map((entry) => (
                            <Cell key={entry.party} fill={stringToColor(entry.party)} />
                        ))}
                    </Bar>
                </BarChart>
            </ChartContainer>

        </div>
    )
}
