'use client'

import { useEffect } from "react";
import { useMapStore } from '@/stores/map_stores';
import DhakaDivisionComponent from "./division/dhaka";
import SylhetDivisionComponent from "./division/sylhet";
import ChittagongDivisionComponent from "./division/chittagong";
import RangpurDivisionComponent from "./division/rangpur";
import MymensinghDivisionComponent from "./division/mymensingh";
import RajshahiDivisionComponent from "./division/rajshahi";
import KhulnaDivisionComponent from "./division/khulna";
import BarishalDivisionComponent from "./division/barishal";
import { districts, divisions, division_districts, divisionColorMap } from '@/constants/data';
import { usePopupStore } from "@/stores/popup_store";
import { districtDivisionMap } from "@/constants/seat";
import MapTooltip from "./map_tooltip";

export default function Bangladesh() {
    const { inside, setShowMainMap, setDivision, setShowDivisionMap, setStatistics } = useMapStore();
    const setOpen = usePopupStore((state) => state.setOpen);
    const setData = usePopupStore((state) => state.setData);
    const setTooltipData = useMapStore((state) => state.setTooltipData);


    const handleMouseClick = async (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target?.id) return;
        const division = districtDivisionMap[target.id];
        if (inside) {
            setShowMainMap(false);
            setDivision(division);
            setShowDivisionMap(true);
            setTooltipData("");
        } else {
            let response = await fetch("/api/violence/filter?division=" + division);
            if (!response.ok) {
                return;
            }
            const data = await response.json();

            const responseData = data.data;
            setData({
                location: division,
                count: responseData[0]?.totalViolations,
                totalDeathCount: responseData[0]?.totalDeathCount
            });

            const statisticsData = data.summary;
            setStatistics(statisticsData ?? []);
            setOpen(true);
        }
    }

    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target?.id) return;
        const division = districtDivisionMap[target.id];
        division_districts[division]?.forEach(d => {
            const element = document.getElementById(d);
            if (element) {
                element.style.strokeWidth = "0";
                element.style.fill = "black";
                element.style.cursor = "pointer";
            }
        });
        setTooltipData(division);
    };

    const handleMouseOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target?.id) return;
        const division = districtDivisionMap[target.id];
        division_districts[division]?.forEach(d => {
            const element = document.getElementById(d);
            if (element) {
                element.style.fill = divisionColorMap[districtDivisionMap[d]] || "red";
            }
        });
        setTooltipData("");
    }


    useEffect(() => {
        divisions.forEach(division => {
            division_districts[division]?.forEach(d => {
                const element = document.getElementById(d);
                if (element) {
                    element.style.strokeWidth = "0";
                    element.style.fill = divisionColorMap[districtDivisionMap[d]] || "red";
                }
            });
        });


        districts.forEach(c => {
            const element = document.getElementById(c);
            if (element) {
                element.addEventListener("click", handleMouseClick);
                element.addEventListener("mouseover", handleMouseOver);
                element.addEventListener("mouseout", handleMouseOut);
            }
        });

        return () => {
            districts.forEach(c => {
                const element = document.getElementById(c);
                if (element) {
                    element.removeEventListener("click", handleMouseClick);
                    element.removeEventListener("mouseover", handleMouseOver);
                    element.removeEventListener("mouseout", handleMouseOut);
                }
            });
        }

    }, [inside]);

    return (
        <div className="w-120 h-120 mx-auto">
            <MapTooltip />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid meet"
                viewBox="-106.403 -201.859 654.709 900.764"
            >
                <DhakaDivisionComponent />
                <SylhetDivisionComponent />
                <ChittagongDivisionComponent />
                <KhulnaDivisionComponent />
                <RajshahiDivisionComponent />
                <MymensinghDivisionComponent />
                <RangpurDivisionComponent />
                <BarishalDivisionComponent />
            </svg>
        </div>

    )
}