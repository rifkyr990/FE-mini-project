import React from "react";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full bg-white shadow-md py-4 flex justify-center">
            <div className="flex items-center justify-between w-[1200px] px-0">
                {/* Logo */}
                <div className="flex items-center">
                    <span className="text-3xl font-extrabold text-green-700">
                        TiKeT
                    </span>
                    <span className="text-3xl font-extrabold text-black">
                        .com
                    </span>
                </div>
                {/* Menu */}
                <ul className="flex space-x-8 ml-12">
                    <li>
                        <Link href="#"
                            className="text-gray-700 hover:text-green-500 font-medium transition-colors">
                            Kategori
                        </Link>
                    </li>
                    <li>
                        <Link href="#"
                            className="text-gray-700 hover:text-green-500 font-medium transition-colors">
                            Event Terbaru
                        </Link>
                    </li>
                    <li>
                        <Link href="#"
                            className="text-gray-700 hover:text-green-500 font-medium transition-colors">
                            Tiket
                        </Link>
                    </li>
                    <li>
                        <Link href="#"
                            className="text-gray-700 hover:text-green-500 font-medium transition-colors">
                            Promo
                        </Link>
                    </li>
                    <li>
                        <Link href="#"
                            className="text-gray-700 hover:text-green-500 font-medium transition-colors">
                            Tentang
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
