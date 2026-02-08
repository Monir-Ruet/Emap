"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { socket } from "@/lib/socket";
import { Violance } from "@/schemas/violance";
import { useEffect, useState } from "react";

export default function RealTimeViolance() {
    const [violances, setViolances] = useState<Violance[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    const getLiveViolance = async () => {
        const res = await fetch("/api/violance?&page=1");
        if (res.status !== 200)
            return;
        const data = await res.json();
        setViolances(data);
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
        <div className="ml-5">
            <Badge variant={isConnected ? "destructive" : "secondary"}>{isConnected ? "Live" : "Disconnected"}</Badge>

            <ScrollArea className="h-72 min-w-100 rounded-md border">
                <div className="p-4">
                    {
                        isConnected &&
                        (
                            violances.map((violance, idx) => {
                                return (
                                    <div key={idx}>
                                        <p className="text-black">{violance.title}</p>
                                        <p>{violance.description}</p>
                                        <Separator className="my-2" />
                                    </div>
                                );
                            })
                        )
                    }
                    {
                        !isConnected && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row items-center gap-2">
                                <Spinner data-icon="inline-start " />
                                <span>Loading...</span>
                            </div>
                        )
                    }
                </div>
            </ScrollArea>
        </div>
    );
}
