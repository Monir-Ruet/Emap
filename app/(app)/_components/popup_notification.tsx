'use client';

import { usePopupStore } from "@/stores/popup_store";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function PopupNotification() {
    const { open, setOpen, data } = usePopupStore();

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 5000);

        document.addEventListener("click", (e: MouseEvent) => {
            if ((e.target as HTMLElement).id != "popup") {
                setOpen(false);
            }
        });

        return () => {
            clearTimeout(timer);
            document.removeEventListener("click", (e: MouseEvent) => {
                if ((e.target as HTMLElement).id != "popup") {
                    setOpen(false);
                }
            });
        };
    }, [open, setOpen]);

    if (!open) return null;

    return (
        <div id="popup" className="rounded-sm popup-notification absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border p-4 w-64 shadow-md h-fit border-black">
            <X className="absolute top-1 right-1 hover:text-red-500" onClick={() => setOpen(false)} />
            <strong>{data.location}</strong>
            <p className="text-sm mt-2">
                Total Violences: <b>{data.count ?? 0}</b>
                <br />
                Death Count: <b>{data.totalDeathCount ?? 0}</b>
            </p>
        </div>
    );
}