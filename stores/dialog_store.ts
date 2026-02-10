import { Violence } from '@/schemas/violence'
import { create } from 'zustand'

interface useDialogState {
    open: boolean
    setOpen: (open: boolean) => void
    violence: Violence | null
    setViolence: (violence: Violence) => void
}

export const useDialogStore = create<useDialogState>((set, get) => ({
    open: false,
    setOpen: (open) => set({ open }),
    violence: null,
    setViolence: (violence) => set({ violence }),
}))