'use client'

import RealTimeViolence from "./realtime";
import MapContainer from "./map_container";
import dynamic from "next/dynamic";
import Visitor from "./visitor";

const FilterMenu = dynamic(
    () => import("@/app/(app)/_components/filter").then((mod) => mod.default),
    { ssr: false }
)

export default function HomePage() {
    return (
        <div className="max-w-325 mx-auto mt-5 text-gray-800">
            <main className="flex flex-col md:flex-row bg-black rounded-3xl border-12 border-neutral-800 shadow-2xl p-5 md:max-h-[calc(100vh-100px)]">
                <section className="flex-2 overflow-y-auto bg-white rounded-xl">
                    <header className="bg-[#004a99] text-white p-6">
                        <h1 className="md:hidden font-bold uppercase">
                            CCD Electoral Violence Tracker
                        </h1>
                        <p className="text-sm mt-1">
                            Select an area on the map or apply the filters
                        </p>

                        <FilterMenu />
                    </header>

                    <MapContainer />
                </section>

                <RealTimeViolence />
            </main>

            <h1 className="hidden md:flex justify-center py-6 text-blue-900 font-bold uppercase text-3xl">
                CCD Electoral Violence Tracker
            </h1>

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
                    <Visitor />
                </div>

                <footer className="text-center text-sm text-gray-500 mt-10">
                    contact@ccdbd.org © 2026 CCD
                </footer>
            </section>
        </div>
    );
}
