'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type Props = {
    data: {
        totalEvents: number;
        totalTransactions: number;
        acceptTransaction: number;
        totalTicketsSold: number;
        // totalRevenue: number;
    };
};

export default function BarChartStats({ data }: Props) {
    const chartData = [
        { name: 'Events', value: data.totalEvents },
        { name: 'Transactions', value: data.totalTransactions },
        { name: 'Accepted', value: data.acceptTransaction },
        { name: 'Tickets Sold', value: data.totalTicketsSold },
        // { name: 'Revenue', value: data.totalRevenue },
    ];

    return (
        <div className="bg-white shadow p-4 rounded-md w-full h-96">
            <h3 className="text-lg font-semibold mb-4">Statistik Keseluruhan</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
