'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useDialogStore } from "@/stores/dialog_store";

export function DialogScrollableContent() {
    const { open, setOpen, violence } = useDialogStore();
    if (!open) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{violence?.title}</DialogTitle>
                </DialogHeader>
                <div className="-mx-4 max-h-[50vh] overflow-y-auto px-4">
                    {violence?.description}
                </div>
            </DialogContent>
        </Dialog>
    )
}
