"use client";
import React, { useState, useEffect } from 'react';
import api from '@/app/lib/api';
import TransactionList from './components/TransactionList';  // Mengimpor TransactionList
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {BanknotesIcon} from "@heroicons/react/24/outline";

// Mendefinisikan tipe untuk Event
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

const EventDetails = () => {
    const [events, setEvents] = useState<EventType[]>([]); // Array EventType
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null); // ID event yang dipilih
    const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null); // Detail event yang dipilih

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('/api/events/organizer', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setEvents(response.data); 
            } catch (error) {
                console.error('Failed to fetch events', error);
            }
        };
        fetchEvents();
    }, []);

    // Ambil data event yang dipilih
    useEffect(() => {
        const fetchEventDetails = async () => {
            if (selectedEventId) {
                try {
                    const response = await api.get(`/api/events/${selectedEventId}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    setSelectedEvent(response.data.event);
                } catch (error) {
                    console.error('Failed to fetch event details', error);
                }
            }
        };

        fetchEventDetails();
    }, [selectedEventId]);

    // Menangani perubahan event yang dipilih dari dropdown
    const handleEventChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const eventId = event.target.value;
        setSelectedEventId(eventId);
    };

    return (
        <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <Sidebar />

            <div className="flex-1 bg-gray-50">
                <Header />

                {/* Dropdown untuk memilih event */}
                <div className="p-6 flex justify-between">
                    <h2 className='flex items-center gap-4 text-3xl font-bold'><BanknotesIcon className='w-10 h-10'/> Transaction Page </h2>
                    <select
                        id="eventDropdown"
                        onChange={handleEventChange}
                        value={selectedEventId || ''}
                        className="w-sm p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>Pilih Event</option>
                        {events.map((event) => (
                            <option key={event.id} value={event.id}>
                                {event.title}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Menampilkan detail event yang dipilih */}
                {selectedEvent && (
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{selectedEvent.title}</h2>
                        <p className="text-gray-600 mb-4">{selectedEvent.description}</p>
                        <p className="text-gray-700 mb-2"><strong>Tanggal:</strong> {new Date(selectedEvent.date).toLocaleDateString()}</p>
                        <p className="text-gray-700"><strong>Lokasi:</strong> {selectedEvent.location || 'Tidak tersedia'}</p>
                    </div>
                )}

                {/* Menampilkan transaksi terkait dengan event yang dipilih */}
                {selectedEventId ? (
                    <TransactionList eventId={selectedEventId} />
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="overflow-x-auto shadow rounded-lg">
                            <table className="min-w-full table-auto text-sm text-left">
                                <thead>
                                    <tr className="bg-gray-200 text-left text-gray-600">
                                        <th className="px-4 py-6 text-center">Transaction ID</th>
                                        <th className="px-4 py-6 text-center">User Name</th>
                                        <th className="px-4 py-6 text-center">Ticket Quantity</th>
                                        <th className="px-4 py-6 text-center">Total Price</th>
                                        <th className="px-4 py-6 text-center">Status</th>
                                        <th className="px-4 py-6 text-center">Proof Image</th>
                                        <th className="px-4 py-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan={7} className="text-center text-gray-500 py-4">Data tidak tersedia</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventDetails;
