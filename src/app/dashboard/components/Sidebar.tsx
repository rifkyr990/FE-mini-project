"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HomeIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  Squares2X2Icon, // Icon tambahan untuk dashboard
  TagIcon,      // Icon tambahan untuk coupons
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-84 bg-gray-800 text-white h-screen p-4 pt-6 transition-all duration-300 md:static overflow-hidden z-40">
        <h1 className="text-2xl font-bold mb-10 px-2">📊 MyDashboard</h1>
        <nav>
          <ul className="space-y-7">
            <li>
              <Link
                href="/"
                className="flex items-center gap-2 hover:text-blue-300 transition px-2"
              >
                <HomeIcon className="h-5 w-5" />
                Homepage
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/"
                className="flex items-center gap-2 hover:text-blue-300 transition px-2"
              >
                <Squares2X2Icon className="h-5 w-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/events/"
                className="flex items-center gap-2 hover:text-blue-300 transition px-2"
              >
                <CalendarDaysIcon className="h-5 w-5" />
                Events
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/coupons/"
                className="flex items-center gap-2 hover:text-blue-300 transition px-2"
              >
                <TagIcon className="h-5 w-5" />
                Coupons
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/transactions/"
                className="flex items-center gap-2 hover:text-blue-300 transition px-2"
              >
                <CreditCardIcon className="h-5 w-5" />
                Transactions
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings/"
                className="flex items-center gap-2 hover:text-blue-300 transition px-2"
              >
                <Cog6ToothIcon className="h-5 w-5" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}