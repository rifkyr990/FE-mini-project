import React from "react";
import { FiInstagram, FiFacebook, FiMail, FiPhone } from "react-icons/fi";

export default function Footer() {
    return (
        <footer className="bg-black text-gray-300 pt-8 sm:pt-10 pb-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 border-b border-gray-700 pb-8 sm:pb-10">
                    {/* Logo & Deskripsi */}
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <div className="flex items-center">
                            <span className="text-2xl sm:text-3xl font-extrabold text-green-700">
                                TiKeT
                            </span>
                            <span className="text-2xl sm:text-3xl font-extrabold text-white">
                                .com
                            </span>
                        </div>
                        <div className="text-sm sm:text-base lg:text-lg text-gray-300 font-medium leading-relaxed">
                            Website penyedia tiket berbagai event termurah dan terpercaya.
                        </div>
                    </div>
                    
                    {/* Layanan */}
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <div className="text-lg sm:text-xl font-bold text-white">Layanan</div>
                        <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base lg:text-lg">
                            <li className="hover:text-white transition-colors cursor-pointer">Jual Tiket</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Promo Tiket</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Vocer Discount</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Membership</li>
                            <li className="hover:text-white transition-colors cursor-pointer">Jadwal Event</li>
                        </ul>
                    </div>
                    
                    {/* Kontak */}
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <div className="text-lg sm:text-xl font-bold text-white">Customer Service</div>
                        <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base lg:text-lg">
                            <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                                <FiPhone className="text-green-500 flex-shrink-0" /> 
                                <span>WhatsApp</span>
                            </li>
                            <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                                <FiInstagram className="text-pink-500 flex-shrink-0" /> 
                                <span>Instagram</span>
                            </li>
                            <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                                <FiFacebook className="text-blue-500 flex-shrink-0" /> 
                                <span>Facebook</span>
                            </li>
                            <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                                <FiMail className="text-yellow-400 flex-shrink-0" /> 
                                <span>Email</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                {/* Copyright */}
                <div className="pt-4 sm:pt-6 text-center text-gray-400 text-sm sm:text-base lg:text-lg font-medium">
                    © 2025 TiKeT.com – All rights reserved.
                </div>
            </div>
        </footer>
    );
}
