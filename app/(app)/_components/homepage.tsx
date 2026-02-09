'use client'

import { useMapStore } from "@/stores/map_stores";
import { ChartBarInteractive } from "./bar_chart";
import { ChartPieDonutText } from "./pie_chart";
import Bangladesh from "./bangladesh";
import DivisionMap from "./division/division_map";
import DistrictMap from "./districts/district_map";

export default function HomePage() {
    const { showMainMap, showDivisionMap, showDistrictMap } = useMapStore();
    return (
        <div className="max-w-325 mx-auto mt-5 text-gray-800">
            <main className="flex flex-col md:flex-row bg-black rounded-3xl border-12 border-neutral-800 shadow-2xl p-5 max-h-[calc(100vh-100px)]">
                <section className="flex-2 overflow-y-auto bg-white rounded-xl">
                    <header className="bg-[#004a99] text-white p-6">
                        <h1 className="md:hidden font-bold uppercase">
                            CCD Electoral Violence Tracker
                        </h1>
                        <p className="text-sm mt-1">
                            Select an area on the map or apply the filters
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white text-gray-800 p-4 mt-4 rounded-lg">
                            {["Division", "District", "Parliamentary Area"].map((label) => (
                                <div key={label}>
                                    <label className="block text-xs font-bold mb-1">{label}</label>
                                    <select className="w-full border rounded px-2 py-2">
                                        <option>Select here</option>
                                    </select>
                                </div>
                            ))}
                            <button className="bg-[#004a99] text-white rounded px-4 py-2 self-end">
                                Apply Filters
                            </button>
                        </div>
                    </header>

                    <div className="p-6">
                        <div className="relative bg-gray-100 border border-dashed p-4">
                            <button className="absolute right-2 top-2 scale-120">🔍</button>
                            {showMainMap && <Bangladesh />}
                            {showDivisionMap && <DivisionMap />}
                            {showDistrictMap && <DistrictMap />}

                            {/* <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border p-4 w-64 shadow-md h-fit border-black">
                                <strong>Nilphamari-1</strong>
                                <p className="text-sm mt-2">
                                    Total Violences: <b>10</b>
                                    <br />
                                    Death Count: <b>10</b>
                                </p>
                            </div> */}
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 mt-6">
                            <div className="flex-1 bg-white border p-4">
                                <ChartPieDonutText />
                            </div>
                            <div className="flex-1 bg-white border p-4">
                                <ChartBarInteractive />
                            </div>
                        </div>
                    </div>
                </section>

                <aside className="flex-1 bg-white md:ml-4 mt-6 md:mt-0 rounded-xl overflow-y-auto">
                    <div className="flex items-center gap-2 p-4 border-b">
                        <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                        <h3 className="font-bold">Live Updates</h3>
                    </div>

                    <div className="flex justify-between p-4 text-sm bg-gray-50">
                        <span>85 Updates</span>
                        <label className="flex items-center gap-2">
                            Auto-updates <input type="checkbox" defaultChecked />
                        </label>
                    </div>

                    <div className="p-4 space-y-4 bg-neutral-900 text-white">
                        {["Nilphamari-1", "Tangail-9", "Dhaka-4", "adds", "dmsakl"].map((seat) => (
                            <div key={seat}>
                                <div className="text-xs text-gray-400">3m ago (21:05 GMT)</div>
                                <div className="border border-gray-700 p-3 rounded mt-1">
                                    <span className="bg-red-600 text-xs px-2 py-0.5 rounded">
                                        {seat}
                                    </span>
                                    <h4 className="font-semibold mt-2">More from Trump</h4>
                                    <p className="text-sm text-gray-300">
                                        When asked if his statement claiming that Iran has stopped
                                        killing protesters...
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </main>

            <div className="hidden md:flex justify-center py-6 text-blue-900 font-bold uppercase text-xl">
                CCD Electoral Violence Tracker
            </div>

            <section className="max-w-5xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 gap-10">
                    <div>
                        <h3 className="text-blue-900 font-bold border-l-4 pl-3 mb-3">
                            Who We Are
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            CCD Electoral Violence Tracker maps electoral violence across
                            Bangladesh’s 13th National Election 2026. Electoral violence is
                            social engineering of power—driven by fear, money, and muscle.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-blue-900 font-bold border-l-4 pl-3 mb-3">
                            Share Your Stories
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            If you carry silenced stories and evidence that never reached
                            headlines, this platform is for you.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-around bg-gray-100 rounded-xl mt-12 p-8 text-center">
                    {[
                        ["500+", "Areas Tracked"],
                        ["24/7", "Live Monitoring"],
                        ["10k+", "Data Points"],
                    ].map(([num, label]) => (
                        <div key={label}>
                            <span className="text-3xl font-bold text-blue-900">{num}</span>
                            <div className="uppercase text-xs tracking-widest text-gray-500">
                                {label}
                            </div>
                        </div>
                    ))}
                </div>

                <footer className="text-center text-sm text-gray-500 mt-10">
                    contact@ccdbd.org © 2026 CCD
                </footer>
            </section>
        </div>
    );
}
