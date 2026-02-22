"use client"

import * as React from "react"
import { Pie, PieChart, Label } from "recharts"

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

    const hue = Math.abs(hash) % 360
    return `hsl(${hue}, 65%, 55%)`
}

const chartConfig = {
    value: {
        label: "Violations",
    },
} satisfies ChartConfig

export function DeathCountChart() {
    const { statistics } = useMapStore()

    const chartData = React.useMemo(() => {
        const map = new Map<string, number>()
        for (const item of statistics) {
            const party = item.responsibleParty || "Unknown"
            map.set(party, (map.get(party) ?? 0) + item.totalDeathCount)
        }
        return Array.from(map.entries()).filter(([, deaths]) => deaths > 0)
            .map(([party, deaths]) => ({ party, deaths, fill: stringToColor(party) }))
    }, [statistics])

    const totalDeaths = React.useMemo(() => {
        return statistics.reduce((sum, s) => sum + s.totalDeathCount, 0)
    }, [statistics])


    if (!chartData.length) {
        return
    }

    return (
        <div className="flex-1 bg-white p-4 border">
            <div>
                <h3 className="text-md font-medium text-center mb-2">Responsible Party vs Deaths</h3>
            </div>
            <ChartContainer
                config={chartConfig}
                className="mx-auto max-h-62.5">
                <PieChart>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                    />

                    <Pie
                        data={chartData}
                        dataKey="deaths"
                        nameKey="party"
                        innerRadius={60}
                        strokeWidth={5}
                    >
                        <Label
                            content={({ viewBox }) => {
                                if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) {
                                    return null
                                }

                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className="fill-foreground text-3xl font-bold"
                                        >
                                            {totalDeaths.toLocaleString()}
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy ?? 0) + 24}
                                            className="fill-muted-foreground text-sm"
                                        >
                                            Total Deaths
                                        </tspan>
                                    </text>
                                )
                            }}
                        />
                    </Pie>
                </PieChart>
            </ChartContainer>
        </div>
    )
}
