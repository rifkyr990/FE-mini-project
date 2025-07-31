"use client"

import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="w-full bg-white shadow-md py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <span className="text-2xl sm:text-3xl font-extrabold text-green-700">
                            TiKeT
                        </span>
                        <span className="text-2xl sm:text-3xl font-extrabold text-black">
                            .com
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-6 lg:space-x-8">
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

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-700 hover:text-green-500 focus:outline-none focus:text-green-500"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t mt-4">
                        <Link href="#"
                            className="block px-3 py-2 text-gray-700 hover:text-green-500 font-medium transition-colors">
                            Kategori
                        </Link>
                        <Link href="#"
                            className="block px-3 py-2 text-gray-700 hover:text-green-500 font-medium transition-colors">
                            Event Terbaru
                        </Link>
                        <Link href="#"
                            className="block px-3 py-2 text-gray-700 hover:text-green-500 font-medium transition-colors">
                            Tiket
                        </Link>
                        <Link href="#"
                            className="block px-3 py-2 text-gray-700 hover:text-green-500 font-medium transition-colors">
                            Promo
                        </Link>
                        <Link href="#"
                            className="block px-3 py-2 text-gray-700 hover:text-green-500 font-medium transition-colors">
                            Tentang
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
