import { useEffect } from "react";
import { divisions } from "@/constants/data";

export function SvgWrapper({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const g = document.querySelector("g")
        const id = g?.getAttribute("id");
        if (g && id) {
            if (divisions.map(d => d.toLowerCase()).some(d => d === id)) {
                const bbox = g.getBBox();
                const centerX = bbox.x + bbox.width / 2;
                const centerY = bbox.y + bbox.height / 2;
                const scale = id !== 'chittagong' ? 2 : 1.5;
                const targetX = 250;
                const targetY = 250;

                g.setAttribute("transform", `translate(${targetX},${targetY}) scale(${scale}) translate(${-centerX},${-centerY})`);
            }
            else {
                const bbox = g.getBBox();
                const centerX = bbox.x + bbox.width / 2;
                const centerY = bbox.y + bbox.height / 2;
                const scale = 4.5;
                const targetX = 250;
                const targetY = 250;

                g.setAttribute("transform", `translate(${targetX},${targetY}) scale(${scale}) translate(${-centerX},${-centerY})`);
            }
        }
    }, [])

    return (
        <div className="w-100 h-100 mx-auto">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid meet"
                viewBox="-106.403 -201.859 654.709 900.764"
            >
                {children}
            </svg>
        </div>
    )
}