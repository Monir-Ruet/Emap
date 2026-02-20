"use client";

import { Spinner } from "@/components/ui/spinner";
import { socket } from "@/lib/socket";
import { Violence } from "@/schemas/violence";
import { useDialogStore } from "@/stores/dialog_store";
import { Maximize } from "lucide-react";
import { useEffect, useState } from "react";
import { DialogScrollableContent } from "./dialog";
import { useMapStore } from "@/stores/map_stores";
import { division_districts } from "@/constants/data";

type ViolenceDto = Violence & {
    createdAt: string;
}

export default function RealTimeViolence() {
    const { division, district, parliamentarySeat } = useMapStore();
    const { setViolence, setOpen } = useDialogStore();
    const [violances, setViolances] = useState<ViolenceDto[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const getLiveViolance = async (page: number) => {
        let url = `/api/violences?page=${page}`;

        if (parliamentarySeat)
            url += "&parliamentarySeats=" + parliamentarySeat;
        else if (district)
            url += "&districts=" + district;
        else if (division)
            url += "&districts=" + division_districts[division].join(",");

        const res = await fetch(url);
        if (res.status !== 200)
            return;
        const response = await res.json();
        setViolances(prev => [...prev.slice(0, page * 20 - 1), ...response.data]);
        if (response.data.length > 0) {
            setCurrentPage(page);
            setTotal(response.totalCount);
        }
    }

    const handleMaximize = (violence: ViolenceDto) => {
        if (violence.id) {
            setViolence(violence);
            setOpen(true);
        }
    }

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;

        const reachedBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 10;
        if (reachedBottom) {
            getLiveViolance(currentPage + 1);
        }
    };

    useEffect(() => {
        if (socket.connected)
            onConnect();

        function onConnect() {
            setIsConnected(true);
            getLiveViolance(1);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onViolence(violence: Violence) {
            if (district && violence.district !== district) return;
            if (division && !division_districts[division].includes(violence.district)) return;
            if (parliamentarySeat && violence.parliamentarySeat !== parliamentarySeat) return;
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
            socket.off("violence_delete", onViolenceDelete);
        };
    }, []);

    useEffect(() => {
        setCurrentPage(1);
        setViolances([]);
        setTotal(0);
        getLiveViolance(1);
    }, [division, district, parliamentarySeat]);

    return (
        <div className="flex-1 flex flex-col lg:h-auto">
            <div className=" bg-white  mt-6 md:mt-0 rounded-xl">
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
            </div>

            <div onScroll={handleScroll} className={`p-4 space-y-4 bg-neutral-900 text-white relative h-155 xl:h-170 overflow-scroll`}>
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
                                            <p className="text-sm text-gray-300 line-clamp-3">
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
        </div >

    );
}
