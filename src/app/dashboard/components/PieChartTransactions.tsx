'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Props = {
    totalTransactions: number;
    acceptTransaction: number;
};

const COLORS = ['#00C49F', '#FF8042']; // hijau = accepted, oranye = declined

export default function PieChartTransactions({ totalTransactions, acceptTransaction }: Props) {
    const declinedTransaction = totalTransactions - acceptTransaction;

    const data = [
        { name: 'Accepted', value: acceptTransaction },
        { name: 'Declined', value: declinedTransaction },
    ];

    return (
        <div className="bg-white shadow p-4 rounded-md w-full h-96">
        <h3 className="text-lg font-semibold mb-4">Komposisi Transaksi</h3>
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                label
            >
                {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
            </PieChart>
        </ResponsiveContainer>
        </div>
    );
}
