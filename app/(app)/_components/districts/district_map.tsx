'use client'

import { useMapStore } from "@/stores/map_stores";
import { SvgWrapper } from "../svg_wrapper"
import { JSX, useEffect } from "react";
import React from "react";
import DhakaComponent from "./dhaka";
import GazipurComponent from "./gazipur";
import NarayanganjComponent from "./narayanganj";
import BandarbanComponent from "./bandarban";
import BargunaComponent from "./Barguna";
import BholaComponent from "./bhola";
import BograComponent from "./bogra";
import ChandpurComponent from "./chandpur";
import ChuadangaComponent from "./chuadanga";
import CoxsBazarComponent from "./coxsBazar";
import DinajpurComponent from "./dinajpur";
import FaridpurComponent from "./faridpur";
import FeniComponent from "./feni";
import GaibandhaComponent from "./gaibandha";
import GopalganjComponent from "./gopalganj";
import HabiganjComponent from "./habiganj";
import JamalpurComponent from "./jamalpur";
import JessoreComponent from "./jessore";
import JhenaidahComponent from "./jhenaidah";
import JoypurhatComponent from "./joypurhat";
import KhagrachariComponent from "./khagrachari";
import KhulnaComponent from "./khulna";
import KurigramComponent from "./kurigram";
import LalmonirhatComponent from "./lalmonirhat";
import MadaripurComponent from "./madaripur";
import MaguraComponent from "./magura";
import ManikganjComponent from "./manikganj";
import MeherpurComponent from "./meherpur";
import MunshiganjComponent from "./munshiganj";
import MymensinghComponent from "./mymensingh";
import NaogaonComponent from "./naogaon";
import NarailComponent from "./narail";
import NatoreComponent from "./natore";
import NetrokonaComponent from "./netrokona";
import NilphamariComponent from "./nilphamari";
import NoakhaliComponent from "./noakhali";
import PabnaComponent from "./pabna";
import PanchagarhComponent from "./panchagarh";
import PatuakhaliComponent from "./patuakhali";
import PirojpurComponent from "./pirojpur";
import RajbariComponent from "./rajbari";
import RajshahiComponent from "./rajshahi";
import RangamatiComponent from "./rangamati";
import RangpurComponent from "./rangpur";
import SatkhiraComponent from "./satkhira";
import ShariatpurComponent from "./shariatpur";
import SherpurComponent from "./sherpur";
import SirajganjComponent from "./sirajganj";
import SunamganjComponent from "./sunamganj";
import SylhetComponent from "./sylhet";
import TangailComponent from "./tangail";
import ThakurgaonComponent from "./thakurgaon";
import BarishalComponent from "./barishal";
import JhalokatiComponent from "./jhalokati";
import KushtiaComponent from "./kushtia";
import BagerhatComponent from "./bagherhat";
import ChapainawabganjComponent from "./chapainawabganj";
import ChittagongComponent from "./chittagong";
import KishorganjComponent from "./kishorganj";
import CommillaComponent from "./comilla";
import LaxmipurComponent from "./laxmipur";
import BrahmanbariaComponent from "./brahmanbaria";
import NarsingdiComponent from "./narshingdi";
import MaulvibazarComponent from "./moulvibazar";
import { DistrictToAreaMap } from "@/constants/seat";
import { division_districts, divisionColorMap, divisions } from "@/constants/data";

const districtDivisionMap: Record<string, string> = {};
divisions.forEach(division => {
    if (division_districts.hasOwnProperty(division)) {
        division_districts[division].forEach(district => {
            districtDivisionMap[district] = division;
        })
    }
})

const districtComponentMap: Record<string, () => JSX.Element> = {
    "Dhaka": () => <DhakaComponent />,
    "Gazipur": () => <GazipurComponent />,
    "Narayanganj": () => <NarayanganjComponent />,
    "Narsingdi": () => <NarsingdiComponent />,
    "Manikganj": () => <ManikganjComponent />,
    "Munshiganj": () => <MunshiganjComponent />,
    "Faridpur": () => <FaridpurComponent />,
    "Gopalganj": () => <GopalganjComponent />,
    "Madaripur": () => <MadaripurComponent />,
    "Rajbari": () => <RajbariComponent />,
    "Shariatpur": () => <ShariatpurComponent />,
    "Kishoreganj": () => <KishorganjComponent />,
    "Tangail": () => <TangailComponent />,

    "Chattogram": () => <ChittagongComponent />,
    "Cox's Bazar": () => <CoxsBazarComponent />,
    "Rangamati": () => <RangamatiComponent />,
    "Khagrachari": () => <KhagrachariComponent />,
    "Bandarban": () => <BandarbanComponent />,
    "Feni": () => <FeniComponent />,
    "Noakhali": () => <NoakhaliComponent />,
    "Lakshmipur": () => <LaxmipurComponent />,
    "Comilla": () => <CommillaComponent />,
    "Brahmanbaria": () => <BrahmanbariaComponent />,
    "Chandpur": () => <ChandpurComponent />,

    "Sylhet": () => <SylhetComponent />,
    "Maulvibazar": () => <MaulvibazarComponent />,
    "Habiganj": () => <HabiganjComponent />,
    "Sunamganj": () => <SunamganjComponent />,

    "Rajshahi": () => <RajshahiComponent />,
    "Natore": () => <NatoreComponent />,
    "Naogaon": () => <NaogaonComponent />,
    "Chapainawabganj": () => <ChapainawabganjComponent />,
    "Joypurhat": () => <JoypurhatComponent />,
    "Bogra": () => <BograComponent />,
    "Pabna": () => <PabnaComponent />,
    "Sirajganj": () => <SirajganjComponent />,

    "Khulna": () => <KhulnaComponent />,
    "Bagerhat": () => <BagerhatComponent />,
    "Satkhira": () => <SatkhiraComponent />,
    "Jessore": () => <JessoreComponent />,
    "Narail": () => <NarailComponent />,
    "Magura": () => <MaguraComponent />,
    "Jhenaidah": () => <JhenaidahComponent />,
    "Kushtia": () => <KushtiaComponent />,
    "Chuadanga": () => <ChuadangaComponent />,
    "Meherpur": () => <MeherpurComponent />,

    "Barishal": () => <BarishalComponent />,
    "Bhola": () => <BholaComponent />,
    "Patuakhali": () => <PatuakhaliComponent />,
    "Pirojpur": () => <PirojpurComponent />,
    "Jhalokati": () => <JhalokatiComponent />,
    "Barguna": () => <BargunaComponent />,

    "Rangpur": () => <RangpurComponent />,
    "Dinajpur": () => <DinajpurComponent />,
    "Thakurgaon": () => <ThakurgaonComponent />,
    "Panchagarh": () => <PanchagarhComponent />,
    "Nilphamari": () => <NilphamariComponent />,
    "Lalmonirhat": () => <LalmonirhatComponent />,
    "Kurigram": () => <KurigramComponent />,
    "Gaibandha": () => <GaibandhaComponent />,

    "Mymensingh": () => <MymensinghComponent />,
    "Jamalpur": () => <JamalpurComponent />,
    "Sherpur": () => <SherpurComponent />,
    "Netrokona": () => <NetrokonaComponent />,
};



export default function DistrictMap() {
    const { district } = useMapStore();

    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target?.id) return;
        const element = document.getElementById(target.id);
        if (element) {
            element.style.fill = "blue";
        }
    };

    const handleMouseClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target?.id) return;
        console.log("Api call for area details");
    }

    const handleMouseOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target?.id) return;
        const [district] = target.id.split("_");
        const division = districtDivisionMap[district];
        const element = document.getElementById(target.id);
        if (element) {
            element.style.fill = divisionColorMap[division] || "red";
        }
    }

    useEffect(() => {
        const areas = DistrictToAreaMap.get(district);
        if (areas) {
            areas.flatMap(area => area).forEach(id => {
                const element = document.getElementById(id);
                const [district] = id.split("_");
                const division = districtDivisionMap[district];

                if (element) {
                    element.style.fill = divisionColorMap[division] || "red";
                    element.addEventListener("click", handleMouseClick);
                    element.addEventListener("mouseover", handleMouseOver);
                    element.addEventListener("mouseout", handleMouseOut);
                }
            });
        }

    }, [district]);

    return (
        <SvgWrapper>
            {
                React.createElement(districtComponentMap[district])
            }
        </SvgWrapper>
    )
}