"use client";

import { Spinner } from "@/components/ui/spinner";
import { socket } from "@/lib/socket";
import { Violence } from "@/schemas/violence";
import { useEffect, useState } from "react";

export default function RealTimeViolence() {
    const [violances, setViolances] = useState<Violence[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [total, setTotal] = useState(0);

    const getLiveViolance = async () => {
        const res = await fetch("/api/violence?&page=1");
        if (res.status !== 200)
            return;
        const response = await res.json();
        setViolances(response.data);
        if (response.data.length > 0)
            setTotal(response.totalCount);
    }

    useEffect(() => {
        if (socket.connected)
            onConnect();

        function onConnect() {
            setIsConnected(true);
            getLiveViolance();
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onViolence(violence: Violence) {
            setViolances((prev) => [violence, ...prev]);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("violence", onViolence);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("violence", onViolence);
        };
    }, []);

    return (
        <aside className="flex-1 bg-white md:ml-4 mt-6 md:mt-0 rounded-xl overflow-y-auto">
            <div className="flex items-center gap-2 p-4 border-b">
                <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                <h3 className="font-bold">Live Updates</h3>
            </div>

            <div className="flex justify-between p-4 text-sm bg-gray-50">
                <div className="flex flex-row gap-1">
                    {total > 0 ? `${total} Violance${total > 1 ? "s" : ""}` : ""}
                </div>

                <label className="flex items-center gap-2">
                    Auto-updates <input type="checkbox" defaultChecked />
                </label>
            </div>

            <div className={`p-4 space-y-4 bg-neutral-900 text-white relative min-h-140 md:h-full`}>
                {
                    isConnected &&
                    (
                        violances.map((violence, idx) => {
                            return (
                                <div key={idx}>
                                    <div className="text-xs text-gray-400">{new Date(violence.violenceDate).toLocaleString()}</div>
                                    <div className="border border-gray-700 p-3 rounded mt-1">
                                        <span className="bg-red-600 text-xs px-2 py-0.5 rounded">
                                            {violence.district}
                                        </span>
                                        <h4 className="font-semibold mt-2 line-clamp-1">{violence.title}</h4>
                                        <p className="text-sm text-gray-300 line-clamp-2">
                                            {
                                                violence.description
                                            }
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )
                }
                {
                    !isConnected && (
                        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row items-center gap-2">
                            <Spinner data-icon="inline-start " />
                            <span className="text-white">Loading...</span>
                        </div>
                    )
                }
            </div>
        </aside >

    );
}
