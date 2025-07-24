import React from "react";
import { FiInstagram, FiFacebook, FiMail, FiPhone } from "react-icons/fi";

export default function Footer() {
    return (
        <footer className="bg-black text-gray-300 pt-10 pb-4">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-10 border-b border-gray-700 pb-10">
                {/* Logo & Deskripsi */}
                <div className="flex-1 min-w-[220px] flex flex-col gap-3">
                    <div className="flex items-center">
                        <span className="text-3xl font-extrabold text-green-700">
                            TiKeT
                        </span>
                        <span className="text-3xl font-extrabold text-white">
                            .com
                        </span>
                    </div>
                    <div className="text-lg text-gray-300 font-medium leading-relaxed">
                        Website penyedia tiket berbagai event termurah dan terpercaya.
                    </div>
                </div>
                {/* Layanan */}
                <div className="flex-1 min-w-[180px]">
                    <div className="text-xl font-bold text-white mb-3">Layanan</div>
                    <ul className="space-y-2 text-lg">
                        <li>Jual Tiket</li>
                        <li>Promo Tiket</li>
                        <li>Vocer Discount</li>
                        <li>Membership</li>
                        <li>Jadwal Event</li>
                    </ul>
                </div>
                {/* Kontak */}
                <div className="flex-1 min-w-[220px]">
                    <div className="text-xl font-bold text-white mb-3">Customer Service</div>
                    <ul className="space-y-2 text-lg">
                        <li className="flex items-center gap-2"><FiPhone className="text-green-500" /> WhatsApp</li>
                        <li className="flex items-center gap-2"><FiInstagram className="text-pink-500" /> Instagram</li>
                        <li className="flex items-center gap-2"><FiFacebook className="text-blue-500" /> Facebook</li>
                        <li className="flex items-center gap-2"><FiMail className="text-yellow-400" /> Email</li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto pt-6 px-6 sm:px-8 lg:px-12 text-center text-gray-400 text-lg font-medium">
                © 2025 TiKeT.com – All rights reserved.
            </div>
        </footer>
    );
}
