"use client"
import { useEffect, useState } from "react";
import api from "@/app/lib/api";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

type Attendee = {
    id: string;
    name: string;
    email: string;
    ticketQty: number;
    price: number;
    totalPaid: number;
    status: string;
}

type EventGroup = {
    eventId: string;
    eventName: string;
    attendees: Attendee[];
}

const AttendeeList = () => {
    const [eventGroups, setEventGroups] = useState<EventGroup[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchDataAttendees = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await api.get("/api/attendees/grouped-by-event",{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            setEventGroups(res.data);
        } catch (error) {
            console.error('Failed to fetch attendees', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckIn = async (attendeeId: string, eventId: string) => {
        try {
            const token = localStorage.getItem('token');
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
                                att.id === attendeeId ? { ...att, status: 'Checked In' } : att
                            ),
                        }
                    : event
                )
            );
        } catch (error) {
            console.error('Check-in failed:', error);
        }
    };

    useEffect(() => {
        fetchDataAttendees()
    }, []);
    if(loading) return <p>Loading list attendees</p>

    return (
        <>
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
            <Header />

            <main className="p-6 space-y-8">
                {eventGroups.map((event) => (
                <section
                    key={event.eventId}
                    className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span role="img" aria-label="calendar">📅</span>
                    {event.eventName}
                    </h2>

                    <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse text-sm">
                        <thead>
                        <tr className="bg-gray-50 text-left text-gray-700">
                            <th className="px-4 py-2 border">Nama</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border text-center">Qty</th>
                            <th className="px-4 py-2 border">Harga</th>
                            <th className="px-4 py-2 border">Total</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border text-center">Aksi</th>
                        </tr>
                        </thead>
                        <tbody>
                            {event.attendees.map((att) => (
                                <tr
                                key={att.id}
                                className="border-t hover:bg-gray-50 transition-colors"
                                >
                                <td className="px-4 py-2 border">{att.name}</td>
                                <td className="px-4 py-2 border">{att.email}</td>
                                <td className="px-4 py-2 border text-center">{att.ticketQty}</td>
                                <td className="px-4 py-2 border">
                                    Rp {att.price.toLocaleString('id-ID')}
                                </td>
                                <td className="px-4 py-2 border font-medium text-gray-700">
                                    Rp {(att?.totalPaid ?? 0).toLocaleString('id-ID')}
                                </td>
                                <td className="px-4 py-2 border">
                                    <span
                                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                                        att.status === 'Checked In'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                    }`}
                                    >
                                    {att.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2 border text-center">
                                    {att.status === 'Pending' ? (
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
                </section>
                ))}
            </main>
            </div>
        </div>
        </>
    )
}

export default AttendeeList
