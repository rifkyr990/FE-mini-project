"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  profileImage: string | null;
  role: "CUSTOMER" | "ORGANIZER" | string;
  points?: number;
};

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const defaultAvatar = "https://www.gravatar.com/avatar/?d=mp";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed: User = JSON.parse(storedUser);
        setUser(parsed);
      } catch (error) {
        console.error("Gagal parse user dari localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/auth/login");
  };

  return (
    <header className="w-full bg-white shadow px-6 py-4 flex justify-between items-center z-50 relative">
      <h2 className="text-xl font-semibold">Organizer Panel</h2>

      {user ? (
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-2 focus:outline-none"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src={user.profileImage ?? defaultAvatar}
              alt={user.name ?? "User"}
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-gray-700 hidden sm:inline">{user.name}</span>
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <ul className="py-1 text-sm text-gray-700">
                <li>
                  <button
                    onClick={() => router.push("/profile")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    🙍‍♂️ Profil
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/settings")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    ⚙️ Pengaturan
                  </button>
                </li>
              </ul>
              <div className="border-t border-gray-100">
                <button
                  onClick={logout}
                  className="w-full text-left text-red-600 px-4 py-2 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-sm text-gray-500">Belum login</div>
      )}
    </header>
  );
}
