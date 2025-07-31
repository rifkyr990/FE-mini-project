"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const events = [
    {
        title: "Konser Linkin Park",
        image: "/linkin-park.webp",
        link: "#",
    },
    {
        title: "Konser Padi",
        image: "/padi.webp",
        link: "#",
    },
    {
        title: "Persebaya vs Arema",
        image: "/persebaya-vs-arema.webp",
        link: "#",
    },
    {
        title: "Teater Kebangsaan",
        image: "/teater.webp",
        link: "#",
    },
];

export default function SlideShow() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % events.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-center py-8 px-4 md:px-8">
            <div className="flex flex-col md:flex-row w-full md:w-[1200px] h-auto md:h-[500px] rounded-3xl overflow-hidden shadow-lg bg-white">
                {/* Kiri */}
                <div className="bg-green-900 transform -skew-br-12 text-white flex flex-col justify-center px-6 md:px-12 py-8 md:py-0 w-full md:w-1/3 relative">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{events[current].title}</h1>
                    <Link
                        href={events[current].link}
                        className="mt-4 inline-block border border-green-400 rounded-lg px-6 md:px-8 py-3 text-base md:text-lg font-medium hover:bg-green-800 transition"
                    >
                        Lihat Tiket
                    </Link>
                    {/* Indikator */}
                    <div className="flex gap-3 mt-8 md:mt-12">
                        {events.map((_, idx) => (
                            <span
                                key={idx}
                                className={`w-4 h-4 md:w-5 md:h-5 rounded-full ${idx === current ? "bg-white" : "bg-green-700"}`}
                                onClick={() => setCurrent(idx)}
                                style={{ cursor: "pointer" }}
                            />
                        ))}
                    </div>
                </div>

                {/* Kanan */}
                <div className="relative w-full md:w-2/3 h-[300px] md:h-full">
                    <Image
                        src={events[current].image}
                        alt={events[current].title}
                        fill
                        className="object-cover transition-all duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
