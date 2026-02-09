'use client'

import Image from 'next/image';
import { useMapStore } from '@/stores/map_stores';

export default function GoInside() {
    const { inside, setInside, level } = useMapStore();

    return (
        <div>
            <Image onClick={() => setInside()} src="/go.png" alt="Go Inside" width={30} height={30} className={`absolute bottom-4 right-4 cursor-pointer ${inside ? "bg-blue-400" : ""}`} />
        </div>
    )
}