'use client'

import { useMapStore } from '@/stores/map_stores';

export default function Name() {
    const { district } = useMapStore();

    return <div className='absolute top-0 right-0 text-black'>{district}</div>
}