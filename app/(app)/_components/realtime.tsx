"use client";

import { Spinner } from "@/components/ui/spinner";
import { socket } from "@/lib/socket";
import { Violence } from "@/schemas/violence";
import { useDialogStore } from "@/stores/dialog_store";
import { Maximize } from "lucide-react";
import { useEffect, useState } from "react";
import { DialogScrollableContent } from "./dialog";

type ViolenceDto = Violence & {
    createdAt: string;
}

export default function RealTimeViolence() {
    const { setViolence, setOpen } = useDialogStore();
    const [violances, setViolances] = useState<ViolenceDto[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [total, setTotal] = useState(0);

    const getLiveViolance = async () => {
        const res = await fetch("/api/violences?&page=1");
        if (res.status !== 200)
            return;
        const response = await res.json();
        setViolances(response.data);
        if (response.data.length > 0)
            setTotal(response.totalCount);
    }

    const handleMaximize = (violence: ViolenceDto) => {
        if (violence.id) {
            setViolence(violence);
            setOpen(true);
        }
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
            setViolances((prev) => [violence as ViolenceDto, ...prev]);
        }

        function onViolenceUpdate(violence: Violence) {
            setViolances((prev) => {
                const index = prev.findIndex(v => v.id === violence.id);
                if (index !== -1) {
                    const updated = [...prev];
                    updated[index] = violence as ViolenceDto;
                    return updated;
                }
                return prev;
            });
            setTotal((prev) => prev + 1);
        }

        function onViolenceDelete(data: { id: string }) {
            setViolances((prev) => prev.filter(v => v.id !== data.id));
            setTotal((prev) => prev - 1);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("violence", onViolence);
        socket.on("violence_update", onViolenceUpdate);
        socket.on("violence_delete", onViolenceDelete);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("violence", onViolence);
            socket.off("violence_update", onViolenceUpdate);
        };
    }, []);

    return (
        <aside className="flex-1 bg-white lg:ml-4 mt-6 md:mt-0 rounded-xl overflow-y-auto">
            <DialogScrollableContent />
            <div className="flex items-center gap-2 p-4 border-b">
                <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                <h3 className="font-bold">Live Updates</h3>
            </div>

            <div className="flex justify-between p-4 text-sm bg-gray-50">
                <div className="flex flex-row gap-1">
                    {`${total} Violence`}
                </div>

                <label className="flex items-center gap-2">
                    Auto-updates <input type="checkbox" defaultChecked />
                </label>
            </div>

            <div className={`p-4 space-y-4 bg-neutral-900 text-white relative min-h-140`}>
                {
                    isConnected &&
                    (
                        violances.map((violence, idx) => {
                            return (
                                <div id={`${violence.id}`} key={idx}>
                                    <div className="text-xs text-gray-400">{new Date(violence.createdAt).toLocaleString()}</div>
                                    <div className="border border-gray-700 p-3 rounded mt-1 flex flex-row justify-between items-center">
                                        <div className="w-11/12">
                                            <span className="bg-red-600 text-xs px-2 py-0.5 rounded ">
                                                {violence.district}
                                            </span>
                                            <h4 className="font-semibold mt-2 line-clamp-1">{violence.title}</h4>
                                            <p className="text-sm text-gray-300 max-h-30 overflow-x-scroll">
                                                {
                                                    violence.description
                                                }
                                            </p>
                                        </div>
                                        <Maximize onClick={() => handleMaximize(violence)} className="size-4 w-1/12" />
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
