"use client";
import React from 'react'
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

type User = {
    name: string;
    profileImage: string | null;
    role: "CUSTOMER" | "ORGANIZER" | string;
    points?: number;
};

const navbar = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const router = useRouter();

    const defaultAvatar = "https://www.gravatar.com/avatar/?d=mp";

    const menuItems = [
        { label: "Beranda", href: "/" },
        { label: "Kategori", href: "#" },
        { label: "Event Terbaru", href: "#" },
        { label: "Tiket", href: "#" },
        { label: "Promo", href: "#" },
        { label: "Tentang", href: "#" },
    ];

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
                const parsed: User = JSON.parse(storedUser);
                setUser(parsed);
            }
        }, []);

        const logout = () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
            router.push("/auth/login");
        };

        useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as HTMLElement;
            if (
                !target.closest("#user-menu-button") &&
                !target.closest("#user-menu-items")
            ) {
                setIsUserMenuOpen(false);
            }
        }
        if (isUserMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
        }, [isUserMenuOpen]);

    return (
        <nav className="w-full bg-white shadow-md py-6 relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-green-700">TiKeT</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-black">.com</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center">
                {menuItems.map((item) => (
                <Link key={item.label} href={item.href} className="text-gray-700 hover:text-green-500 font-medium">
                    {item.label}
                </Link>
                ))}

                {user ? (
                <div className="relative">
                    <button
                    id="user-menu-button"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 bg-gray-100 px-4 py-1.5 rounded-md hover:bg-gray-200 focus:outline-none"
                    aria-haspopup="true"
                    aria-expanded={isUserMenuOpen}
                    >
                    <img
                        src={user.profileImage ?? defaultAvatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-green-700 font-semibold">{user.name}</span>
                    <svg
                        className={`w-4 h-4 ml-1 text-green-700 transform transition-transform duration-200 ${
                        isUserMenuOpen ? "rotate-180" : "rotate-0"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    </button>

                    {isUserMenuOpen && (
                    <div
                        id="user-menu-items"
                        className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 animate-fade-in scale-in-origin-top-right"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                    >
                        {user.points !== undefined && (
                            <div className="px-4 py-2 text-sm text-gray-600 flex items-center gap-2">
                                <Image src="/icon/dollar.png" alt="Poin Icon" width={20} height={20} />
                                <span>Poin Anda: <span className="font-semibold text-green-700">{user.points}</span></span>
                            </div>
                        )}
                        {user.role === "ORGANIZER" && (
                            <Link
                                href="/dashboard"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                                onClick={() => setIsUserMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                        )}
                        <Link
                            href="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                            onClick={() => setIsUserMenuOpen(false)}
                        >
                            Profile
                        </Link>
                        <button
                            onClick={() => {
                                logout();
                                setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            role="menuitem"
                        >
                        Logout
                        </button>
                    </div>
                    )}
                </div>
                ) : (
                <>
                    <Link href="/auth/signup">
                        <button className="border border-green-700 text-green-700 hover:bg-green-50 py-1.5 px-5 rounded-md font-medium transition-all">
                            Signup
                        </button>
                    </Link>
                    <Link href="/auth/login">
                        <button className="bg-green-700 hover:bg-green-800 py-2 px-5 rounded-md text-white font-medium transition-all">
                            Login
                        </button>
                    </Link>
                </>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-gray-700 hover:text-green-500 focus:outline-none"
                    aria-label="Toggle menu"
                >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
                </button>
            </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
            <div className="md:hidden px-4 pt-4 pb-6 bg-white border-t mt-4 space-y-2">
                {menuItems.map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    className="block px-3 py-2 text-gray-700 hover:text-green-500 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                >
                    {item.label}
                </Link>
                ))}

                {user ? (
                <div className="relative w-full">
                    <div className="flex items-center space-x-2 px-3 py-2">
                        <img
                            src={user.profileImage ?? defaultAvatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-green-700 font-semibold">{user.name}</span>
                    </div>

                    {user.points !== undefined && (
                    <p className="px-4 py-2 text-sm text-gray-600 flex items-center gap-1">
                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
                        </svg>
                        Poin Anda: <span className="font-semibold text-green-700">{user.points ?? 0}</span>
                    </p>
                    )}

                    {user.role === "ORGANIZER" && (
                    <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => {
                        setIsUserMenuOpen(false);
                        setIsMenuOpen(false);
                        }}
                    >
                        Dashboard
                    </Link>
                    )}
                    <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => {
                            setIsUserMenuOpen(false);
                            setIsMenuOpen(false);
                        }}
                    >
                    Profile
                    </Link>
                    <button
                    onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                        setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    role="menuitem"
                    >
                    Logout
                    </button>
                </div>
                ) : (
                <>
                    <Link href="/auth/signup">
                        <button className="w-full border border-green-700 text-green-700 hover:bg-green-50 px-4 py-2 rounded-md font-medium transition-all">
                            Signup
                        </button>
                    </Link>
                    <Link href="/auth/login">
                        <button className="w-full bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md font-medium transition-all">
                            Login
                        </button>
                    </Link>
                </>
                )}
            </div>
            )}

            <style>{`
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
            .animate-fade-in {
                animation: fadeIn 0.2s ease forwards;
            }
            .scale-in-origin-top-right {
                transform-origin: top right;
            }
            `}</style>
        </nav>
    );
}

export default navbar

