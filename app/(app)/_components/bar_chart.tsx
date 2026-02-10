"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from "recharts"

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import { useMapStore } from "@/stores/map_stores"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
            <ChartContainer config={chartConfig}>
                <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ right: 16 }}
                    maxBarSize={50}
                >
                    <CartesianGrid horizontal={false} />

                    <YAxis
                        dataKey="party"
                        type="category"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        hide
                    />

                    <XAxis
                        dataKey="deaths"
                        type="number"
                        hide
                        domain={[0, 'dataMax + 1']}
                    />

                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                    />

                    <Bar
                        dataKey="deaths"
                        layout="vertical"
                        radius={10}
                        minPointSize={5}
                    >
                        {chartData.map((entry) => (
                            <Cell key={entry.party} fill={stringToColor(entry.party)} />
                        ))}

                        <LabelList
                            dataKey="party"
                            position="insideLeft"
                            offset={8}
                            className="fill-foreground text-sm"
                        />
                        <LabelList
                            dataKey="deaths"
                            position="right"
                            offset={8}
                            className="fill-foreground text-sm"
                        />
                    </Bar>
                </BarChart>
            </ChartContainer>
        </div>
    )
}
