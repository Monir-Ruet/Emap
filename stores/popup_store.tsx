import { create } from 'zustand'

interface usePopupState {
    open: boolean
    setOpen: (open: boolean) => void
    data: {
        location: string
        count: number
        totalDeathCount: number
    }
    setData: (data: { location: string, count: number, totalDeathCount: number }) => void
}

export const usePopupStore = create<usePopupState>((set, get) => ({
    open: false,
    setOpen: (open) => set({ open }),
    data: {
        location: "",
        count: 0,
        totalDeathCount: 0,
    },
    setData: (data) => set({ data }),
}))