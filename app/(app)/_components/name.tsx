'use client'

import { useStore } from '@/stores/map_stores';

export default function Name() {
    const { district } = useStore();

    return <div>{district}</div>
}