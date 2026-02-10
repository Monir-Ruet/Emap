'use client';

import { useState } from 'react';

export default function DualArraySelector({ selected: initialSelected, unselected: initialUnselected, onChange }: { selected?: string[]; unselected?: string[]; onChange?: (selected: string[]) => void }) {
    const [unselected, setUnselected] = useState<string[]>(initialUnselected || []);

    const [selected, setSelected] = useState<string[]>(initialSelected || []);

    const selectItem = (item: string) => {
        setSelected(prev => [...prev, item]);
        setUnselected(prev => prev.filter(i => i !== item));
        if (onChange) {
            onChange([...selected, item]);
        }
    };

    const unselectItem = (item: string) => {
        setUnselected(prev => [...prev, item]);
        setSelected(prev => prev.filter(i => i !== item));
        if (onChange) {
            onChange(selected.filter(i => i !== item));
        }
    };

    return (
        <div className="grid grid-cols-2 gap-6 max-w-xl">
            <div>
                <h3 className="font-semibold mb-2">Available</h3>
                <div className="space-y-2">
                    {unselected.map(item => (
                        <button
                            key={item}
                            onClick={() => selectItem(item)}
                            className="w-full border px-3 py-2 rounded hover:bg-gray-100 text-left"
                        >
                            ➕ {item}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-2">Selected</h3>
                <div className="space-y-2">
                    {selected.map(item => (
                        <button
                            key={item}
                            onClick={() => unselectItem(item)}
                            className="w-full bg-blue-600 text-white px-3 py-2 rounded text-left"
                        >
                            ❌ {item}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
