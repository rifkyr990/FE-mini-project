"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/api";
import Header from "@/app/dashboard/components/Header";
import Sidebar from "@/app/dashboard/components/Sidebar";
import { useParams } from "next/navigation";

type Attendee = {
    id: string;
    name: string;
    email: string;
    ticketQty: number;
    price: number;
    totalPaid: number;
    status: string;
};

type EventGroup = {
    eventId: string;
    eventName: string;
    eventDate: string;
    eventLocation?: string;
    eventType?: string;
    eventCapacity: number;
    eventSeatsTaken: number;
    attendees: Attendee[];
};

const PAGE_SIZE = 10;

const AttendeeList = () => {
    const [eventGroups, setEventGroups] = useState<EventGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const params = useParams();

    const fetchDataAttendees = async () => {
        try {
            const id = params?.id;
            const token = localStorage.getItem("token");

            const res = await api.get(`/api/attendees/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setEventGroups(res.data);
        } catch (error) {
            console.error("Failed to fetch attendees", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckIn = async (attendeeId: string, eventId: string) => {
        try {
            const token = localStorage.getItem("token");
            await api.patch(
                `/api/attendees/${attendeeId}/check-in`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setEventGroups((prev) =>
                prev.map((event) =>
                    event.eventId === eventId
                        ? {
                            ...event,
                            attendees: event.attendees.map((att) =>
                                att.id === attendeeId ? { ...att, status: "Checked In" } : att
                            ),
                        }
                        : event
                )
            );
        } catch (error) {
            console.error("Check-in failed:", error);
        }
    };

    useEffect(() => {
        fetchDataAttendees();
    }, []);

    if (loading) return <p className="p-6 text-center">Loading daftar peserta...</p>;

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-6 space-y-10">
                    {eventGroups.map((event) => {
                        const filterName = event.attendees.filter((att) =>
                            att.name.toLowerCase().includes(search.toLowerCase())
                        );
                        console.log("ini filter",filterName)
                        const totalPages = Math.ceil(filterName.length / PAGE_SIZE);
                        const paginatedAttendees = filterName.slice(
                            (currentPage - 1) * PAGE_SIZE,
                            currentPage * PAGE_SIZE
                        );

                        console.log("ini event", event);

                        return (
                            <section key={event.eventId} className="space-y-6">
                                {/* Detail Event */}
                                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{event.eventName}</h2>
                                    <div className="text-gray-600 text-sm space-y-1">
                                        <p>📅 Tanggal: {new Date(event.eventDate).toLocaleDateString("id-ID")}</p>
                                        <p>📍 Lokasi: {event.eventLocation || "-"}</p>
                                        <p>🎟️ Tipe: {event.eventType || "Offline"}</p>
                                        <p>👥 Kapasitas: {event.eventSeatsTaken} / {event.eventCapacity}</p>
                                    </div>
                                </div>

                                {/* Tabel Attendees */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                                            <h3 className="text-xl font-semibold mb-4">Daftar Peserta</h3>
                                            <input 
                                                type="text"
                                                placeholder="🔍 Cari nama peserta...."
                                                className="px-2 py-3 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 w-full sm:w-74 text-sm border border-gray-300"
                                                value={search}
                                                onChange={(e) => {
                                                    setSearch(e.target.value);
                                                    setCurrentPage(1);
                                                }}
                                            />
                                        </div>
                                        <div className="overflow-x-auto shadow rounded-lg">
                                            <table className="min-w-full table-auto text-sm text-left">
                                                <thead className="">
                                                    <tr className="bg-gray-200 text-left text-gray-600">
                                                        <th className="px-4 py-6">Nama</th>
                                                        <th className="px-4 py-6">Email</th>
                                                        <th className="px-4 py-6 text-center">Qty</th>
                                                        <th className="px-4 py-6">Harga</th>
                                                        <th className="px-4 py-6">Total</th>
                                                        <th className="px-4 py-6">Status</th>
                                                        <th className="px-4 py-6 text-center">Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {paginatedAttendees.map((att) => (
                                                        <tr key={att.id} className="hover:bg-gray-50">
                                                            <td className="px-4 py-6">{att.name}</td>
                                                            <td className="px-4 py-6">{att.email}</td>
                                                            <td className="px-4 py-6 text-center">{att.ticketQty}</td>
                                                            <td className="px-4 py-6">Rp {att.price.toLocaleString("id-ID")}</td>
                                                            <td className="px-4 py-6 font-medium text-gray-700">
                                                                Rp {(att?.totalPaid ?? 0).toLocaleString("id-ID")}
                                                            </td>
                                                            <td className="px-4 py-6">
                                                                <span
                                                                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                                                                        att.status === "Checked In"
                                                                            ? "bg-green-100 text-green-700"
                                                                            : "bg-yellow-100 text-yellow-700"
                                                                    }`}
                                                                >
                                                                    {att.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-6 text-center">
                                                                {att.status === "Pending" ? (
                                                                    <button
                                                                        onClick={() => handleCheckIn(att.id, event.eventId)}
                                                                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-1 rounded transition"
                                                                    >
                                                                        Check In
                                                                    </button>
                                                                ) : (
                                                                    <span className="text-green-600 text-xs font-semibold">✓ Sudah</span>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Pagination */}
                                        {totalPages > 1 && (
                                            <div className="flex justify-center mt-4 space-x-2">
                                                {[...Array(totalPages)].map((_, idx) => {
                                                    const page = idx + 1;
                                                    return (
                                                        <button
                                                            key={page}
                                                            onClick={() => setCurrentPage(page)}
                                                            className={`px-3 py-1 rounded text-sm font-medium ${
                                                                currentPage === page
                                                                    ? "bg-blue-600 text-white"
                                                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                                            }`}
                                                        >
                                                            {page}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                            </section>
                        );
                    })}
                </main>
            </div>
        </div>
    );
};

export default AttendeeList;
