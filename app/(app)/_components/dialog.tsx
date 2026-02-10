'use client';

import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useDialogStore } from "@/stores/dialog_store";
import { X } from "lucide-react";

export function DialogScrollableContent() {
    const { open, setOpen, violence } = useDialogStore();
    if (!open) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{violence?.title}</DialogTitle>
                </DialogHeader>
                <div
                    className="absolute z-1000 top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2
                             bg-white border border-black p-3.75 w-full md:w-125
                            md:h-[calc(100vh-100px)] h-[calc(100vh)]
                            shadow-[5px_5px_0px_rgba(0,0,0,0.1)]"
                >
                    <button onClick={() => setOpen(false)}
                        className="absolute top-0 right-0 w-7.5 h-7.5
                            text-[0.7rem] text-[#333]
                            bg-transparent border-l border-b border-[#333]
                            cursor-pointer text-center
                            hover:bg-red-500 hover:text-white">
                        <X className="w-5 h-5 mx-auto" />
                    </button>

                    <div className="mb-3 pb-2 border-b border-[#ddd]">
                        <strong className="block text-[16px] font-bold text-[#003366]">
                            {violence?.title}
                        </strong>

                        <span className="text-[12px] text-[#004a99]">
                            {violence?.district && (<>{violence.district} | </>)}
                        </span>
                        <span className="ml-1 text-[12px] text-[#004a99]">
                            {violence?.violenceDate && (<>{new Date(violence.violenceDate).toDateString()}</>)}
                        </span>
                    </div>

                    <div className="max-h-[90%] overflow-y-auto flex flex-col gap-2 pb-5">

                        <div className="text-sm text-gray-700 leading-relaxed">
                            <p>
                                {violence?.description}
                            </p>
                        </div>



                        <div className="flex justify-between px-2 py-1.5 bg-[#f4f7f9] rounded">
                            <span className="text-[13px] text-[#003366]">
                                Death Count
                            </span>
                            <strong className="text-[14px] font-bold text-[#004a99]">
                                {violence?.deathCount}
                            </strong>
                        </div>

                        <div className="flex justify-between px-2 py-1.5 bg-[#f4f7f9] rounded">
                            <span className="text-[13px] text-[#003366]">
                                Gender
                            </span>
                            <strong className="text-[14px] font-bold text-[#004a99]">
                                {violence?.gender}
                            </strong>
                        </div>

                        <div className="flex flex-col gap-2 justify-between px-2 py-1.5 bg-[#f4f7f9] rounded">
                            <span className="text-[13px] text-[#003366]">
                                Responsible Party
                            </span>
                            <strong className="text-[14px] flex flex-row flex-wrap gap-2 font-bold text-[#004a99]">
                                {violence?.responsibleParty?.map((party, idx) => (
                                    <Badge className="p-1" key={idx}>{party}</Badge>
                                ))}
                            </strong>
                        </div>

                        <div className="flex flex-col gap-2 justify-between px-2 py-1.5 bg-[#f4f7f9] rounded">
                            <span className="text-[13px] text-[#003366]">
                                Violence Type
                            </span>
                            <strong className="text-[14px] flex flex-row flex-wrap gap-2 font-bold text-[#004a99]">
                                {violence?.violenceType?.map((type, idx) => (
                                    <Badge className="p-1" key={idx}>{type}</Badge>
                                ))}
                            </strong>
                        </div>

                        <div className="flex flex-col gap-2 justify-between px-2 py-1.5 bg-[#f4f7f9] rounded">
                            <span className="text-[13px] text-[#003366]">
                                Minority
                            </span>
                            <strong className="text-[14px] flex flex-row flex-wrap gap-2 font-bold text-[#004a99]">
                                {violence?.minority?.map((type, idx) => (
                                    <Badge className="p-1" key={idx}>{type}</Badge>
                                ))}
                            </strong>
                        </div>

                    </div>
                </div>
            </DialogContent >
        </Dialog >
    )
}
