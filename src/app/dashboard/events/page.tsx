"use client";

import { useEffect, useState } from "react";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import api from "@/app/lib/api";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

interface EventType {
    id: string;
    title: string;
    description: string;
    banner?: string;
    date: string;
    location?: string;
    type?: string;
    capacity: number;
    seatsTaken: number;
    organizerId: string;
    createdAt: string;
    updatedAt: string;
}

export default function EventPage() {
    const [events, setEvents] = useState<EventType[]>([]);
    const [editingEvent, setEditingEvent] = useState<EventType | null>(null);

    const fetchEvents = async () => {
        try {
        const res = await api.get("/api/events");
        setEvents(res.data);
        } catch (error) {
        console.error("Gagal memuat data event:", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleSubmit = async (formData: any) => {
        try {
        const body = new FormData();
        body.append("title", formData.title);
        body.append("description", formData.description);
        body.append("date", formData.date);
        body.append("capacity", formData.capacity);
        if (formData.location) body.append("location", formData.location);
        if (formData.type) body.append("type", formData.type);
        if (formData.banner) body.append("banner", formData.banner);

        const method = editingEvent ? "PUT" : "POST";
        const url = editingEvent ? `/api/events/${editingEvent.id}` : "/api/events";

        await fetch(url, { method, body });
        setEditingEvent(null);
        await fetchEvents();
        } catch (error) {
        console.error("Gagal menyimpan event:", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Yakin ingin menghapus event ini?")) {
        try {
            await fetch(`/api/events/${id}`, { method: "DELETE" });
            await fetchEvents();
        } catch (error) {
            console.error("Gagal menghapus event:", error);
        }
        }
    };

    return (
        <div className="flex bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header/>
                <main className="p-6 bg-gray-50">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">📅 Manajemen Event</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Event Form */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                                {editingEvent ? "✏️ Edit Event" : "➕ Tambah Event Baru"}
                            </h2>
                            <EventForm
                                onSubmit={handleSubmit}
                                initialData={editingEvent || {}}
                                isEditing={!!editingEvent}
                            />
                        </div>

                        {/* Event List */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">📋 Daftar Event</h2>
                            <EventList
                                events={events}
                                onEdit={setEditingEvent}
                                onDelete={handleDelete}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
