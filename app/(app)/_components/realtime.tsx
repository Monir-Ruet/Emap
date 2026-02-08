"use client";

import { socket } from "@/lib/socket";
import { Violance } from "@/schemas/violance";
import { useEffect, useState } from "react";

export default function RealTimeViolance() {
    const [violances, setViolances] = useState<Violance[]>([]);

    useEffect(() => {
        fetch("/api/violance")
            .then((res) => res.json())
            .then((data) => setViolances(data))
            .catch((err) => console.error("Failed to fetch violance data:", err));

        if (socket.connected)
            onConnect();

        function onConnect() {

            // socket.io.engine.on("upgrade", (transport) => {
            //     setTransport(transport.name);
            // });
        }

        function onDisconnect() {
            // setTransport("N/A");
        }

        function onViolance(violance: Violance) {
            setViolances((prev) => [...prev, violance]);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("violance", onViolance);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("violance", onViolance);
        };
    }, []);

    return (
        <div className="border-2 overflow-y-auto min-h-96 w-1/3">
            {
                violances.map((violance, idx) => {
                    return (
                        <div key={idx}>
                            <p className="text-black">{violance.title}</p>
                        </div>
                    );
                })
            }
        </div>
    );
}
