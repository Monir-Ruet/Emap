'use client'

import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";

export default function Visitor() {
    useEffect(() => {
        const visitorHandler = (data: { count: string }) => {
            console.log(data.count);
        }

        socket.on("visitor", visitorHandler);

        return () => {
            socket.off("visitor", visitorHandler);
        };
    }, []);
    return (
        <div >
            <span className="text-3xl font-bold text-blue-900">1000</span>
            <div className="uppercase text-xs tracking-widest text-gray-500">
                Visitor
            </div>
        </div>
    )
}