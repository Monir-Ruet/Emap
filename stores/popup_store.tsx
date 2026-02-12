import { create } from 'zustand'

interface usePopupState {
    open: boolean
    setOpen: (open: boolean) => void
    data: {
        location: string
        count: number
        totalDeathCount: number
        mildCount: number
        moderateCount: number
        extremeCount: number
    }
    setData: (data: { location: string, count: number, totalDeathCount: number, mildCount: number, moderateCount: number, extremeCount: number }) => void
}

export const usePopupStore = create<usePopupState>((set, get) => ({
    open: false,
    setOpen: (open) => set({ open }),
    data: {
        location: "",
        count: 0,
        totalDeathCount: 0,
        mildCount: 0,
        moderateCount: 0,
        extremeCount: 0
    },
    setData: (data) => set({ data }),
}))