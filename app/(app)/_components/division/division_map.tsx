'use client';

import { useMapStore } from "@/stores/map_stores";
import React, { useEffect } from "react";
import DhakaDivisionComponent from "./dhaka";
import ChittagongDivisionComponent from "./chittagong";
import RangpurDivisionComponent from "./rangpur";
import MymensinghDivisionComponent from "./mymensingh";
import RajshahiDivisionComponent from "./rajshahi";
import SylhetDivisionComponent from "./sylhet";
import BarishalDivisionComponent from "./barishal";
import KhulnaDivisionComponent from "./khulna";
import { SvgWrapper } from "../svg_wrapper";
import { division_districts, divisionColorMap } from "@/constants/data";

const divisionComponents: { [key: string]: React.FC } = {
    "Dhaka": () => <DhakaDivisionComponent />,
    "Chittagong": () => <ChittagongDivisionComponent />,
    "Khulna": () => <KhulnaDivisionComponent />,
    "Barishal": () => <BarishalDivisionComponent />,
    "Sylhet": () => <SylhetDivisionComponent />,
    "Rangpur": () => <RangpurDivisionComponent />,
    "Mymensingh": () => <MymensinghDivisionComponent />,
    "Rajshahi": () => <RajshahiDivisionComponent />,
};


export default function DivisionMap() {
    const { division, setDistrict, inside, setShowDistrictMap, setShowDivisionMap } = useMapStore();

    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target?.id) return;
        const element = document.getElementById(target.id);
        if (element) {
            element.style.fill = "red";
        }
    };

    const handleMouseClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target?.id) return;
        const [district, seatNumber, index] = target.id.split("_");
        if (inside) {
            setShowDivisionMap(false);
            setDistrict(district);
            setShowDistrictMap(true);
        } else {
            console.log("Api call for district details");
        }
    }

    const handleMouseOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target?.id) return;
        const element = document.getElementById(target.id);
        if (element) {
            element.style.fill = divisionColorMap[division] || "red";
        }
    }

    useEffect(() => {
        division_districts[division]?.forEach(district => {
            const element = document.getElementById(district);
            if (element) {
                element.style.fill = divisionColorMap[division] || "gray";
                element.addEventListener("click", handleMouseClick);
                element.addEventListener("mouseover", handleMouseOver);
                element.addEventListener("mouseout", handleMouseOut);
            }
        });

        return () => {
            division_districts[division]?.forEach(district => {
                const element = document.getElementById(district);
                if (element) {
                    element.removeEventListener("click", handleMouseClick);
                    element.removeEventListener("mouseover", handleMouseOver);
                    element.removeEventListener("mouseout", handleMouseOut);
                }
            });
        }
    }, [division]);

    return (
        <SvgWrapper>
            {
                React.createElement(divisionComponents[division])
            }
        </SvgWrapper>
    )
}