import Link from "next/link";

export default function EventList({ events, onEdit, onDelete }: any) {
    return (
        <div className="overflow-x-auto mt-6 bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">Judul</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">Tanggal</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">Lokasi</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">Tipe</th>
                        <th className="px-4 py-3 text-center font-medium text-gray-700">Peserta</th>
                        <th className="px-4 py-3 text-center font-medium text-gray-700">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {events.length === 0 && (
                        <tr>
                            <td colSpan={6} className="text-center py-6 text-gray-500">
                                Tidak ada event yang tersedia.
                            </td>
                        </tr>
                    )}

                    {events.map((event: any) => {
                        const date = new Date(event.date).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        });

                        return (
                            <tr key={event.id} className="hover:bg-gray-50 transition">
                                <td className="px-4 py-3 font-medium text-gray-800">
                                    <div className="flex items-center gap-2">
                                        {/* {event.banner && (
                                            <img
                                                src={event.banner}
                                                alt="Banner"
                                                className="w-10 h-10 rounded object-cover"
                                            />
                                        )} */}
                                        <span>{event.title}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-gray-600">{date}</td>
                                <td className="px-4 py-3 text-gray-600">{event.location || "-"}</td>
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700">
                                        {event.type || "Unknown"}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center text-gray-700">
                                    {event.seatsTaken} / {event.capacity}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => onEdit(event)}
                                            className="text-yellow-600 hover:text-yellow-800 text-sm"
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => onDelete(event.id)}
                                            className="text-red-600 hover:text-red-800 text-sm"
                                        >
                                            🗑️ Hapus
                                        </button>
                                        <Link href={`/dashboard/events/attendee/${event.id}`}>
                                            <span className="text-green-600 hover:text-green-800 text-sm cursor-pointer">
                                                👥 Peserta
                                            </span>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
