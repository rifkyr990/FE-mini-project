'use client';

import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import api from '../lib/api';
import BarChartStats from './components/BarChartStats';
import PieChartTransactions from './components/PieChartTransactions';



type StatsData = {
  totalEvents: number;
  totalTransactions: number;
  acceptTransaction: number;
  totalTicketsSold: number;
  totalRevenue: number;
};

export default function Home() {
    const [data, setData] = useState<StatsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await api.get('/api/dashboard/stats', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setData(res.data);
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Gagal mengambil data dari server.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-6">
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}

                    {data && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
                                <StatsCard title="Total Events" value={data.totalEvents} bgColor="bg-blue-400" />
                                <StatsCard title="Total Transactions" value={data.totalTransactions} bgColor="bg-yellow-400" />
                                <StatsCard title="Accepted Transactions" value={data.acceptTransaction} bgColor="bg-green-400" />
                                <StatsCard title="Tickets Sold" value={data.totalTicketsSold} bgColor="bg-purple-400" />
                                <StatsCard
                                    title="Total Revenue"
                                    value={`Rp ${data.totalRevenue.toLocaleString('id-ID')}`}
                                    bgColor="bg-pink-500"
                                />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <BarChartStats data={data} />
                                <PieChartTransactions
                                    totalTransactions={data.totalTransactions}
                                    acceptTransaction={data.acceptTransaction}
                                />
                            </div>
                        </>

                        
                    )}
                </main>
            </div>
        </div>
    );
}
