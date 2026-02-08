import { create } from 'zustand'

interface useMapState {
    district: string
    setDistrict: (district: string) => void
}

export const useStore = create<useMapState>((set, get) => ({
    district: "",
    setDistrict: (district) => set({ district }),
}))