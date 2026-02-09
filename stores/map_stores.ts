import { create } from 'zustand'

interface useMapState {
    district: string
    setDistrict: (district: string) => void
    inside: boolean
    setInside: () => void
    showDivisionMap: boolean
    setShowDivisionMap: (showDivisionMap: boolean) => void
    division: string
    setDivision: (division: string) => void
    showMainMap: boolean
    setShowMainMap: (showMainMap: boolean) => void
    showDistrictMap: boolean
    setShowDistrictMap: (showDistrictMap: boolean) => void
}

export const useMapStore = create<useMapState>((set, get) => ({
    showMainMap: true,
    setShowMainMap: (showMainMap) => set({ showMainMap }),
    showDivisionMap: false,
    division: "",
    setDivision: (division) => set({ division }),
    setShowDivisionMap: (showDivisionMap) => set({ showDivisionMap }),
    inside: true,
    setInside: () => set({ inside: !get().inside }),
    district: "",
    setDistrict: (district) => set({ district }),
    showDistrictMap: false,
    setShowDistrictMap: (showDistrictMap) => set({ showDistrictMap })
}))