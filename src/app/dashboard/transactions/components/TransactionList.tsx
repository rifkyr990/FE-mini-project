import React, { useEffect, useState } from 'react';
import api from '@/app/lib/api';  // Import API untuk melakukan request ke server

interface Transaction {
    transactionId: string;
    userName: string;
    ticketQty: number;
    totalPrice: number;
    proofImage: string;
    status: string;
}

const TransactionList = ({ eventId }: { eventId: string }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State untuk kontrol modal
    const [selectedImage, setSelectedImage] = useState<string | null>(null); // State untuk gambar yang dipilih

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [transactionsPerPage] = useState(10); // Jumlah transaksi per halaman

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await api.get(`/api/transactions/${eventId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    params: {
                        page: currentPage,
                        limit: transactionsPerPage,
                    },
                });
                setTransactions(response.data);
                setTotalPages(response.data.totalPages); // Menyimpan total halaman
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch transactions');
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [eventId, currentPage]);

    const handleTransactionAction = async (transactionId: string, action: 'accept' | 'reject') => {
        try {
            const confirm = window.confirm(`Apakah anda yakin memilih ${action} pada transaksi ini ?`);

            if (!confirm) {
                return;
            }
            
            const response = await api.patch(`/api/transactions/${transactionId}/${action}`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            // Jika sukses, perbarui status transaksi di UI
            if (response.status === 200) {
                setTransactions(prevTransactions =>
                    prevTransactions.map(transaction =>
                        transaction.transactionId === transactionId
                            ? { ...transaction, status: action === 'accept' ? 'ACCEPTED' : 'REJECTED' }
                            : transaction
                    )
                );
            } else {
                throw new Error('Failed to update transaction status');
            }
        } catch (error) {
            console.error(`Failed to ${action} transaction:`, error);
        }
    };

    const openModal = (image: string) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='bg-white rounded-lg shadow-md p-6'>
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
                        {transactions.map((transaction) => (
                            <tr key={transaction.transactionId} className="hover:bg-gray-50">
                                <td className="px-4 py-6 text-center">{transaction.transactionId}</td>
                                <td className="px-4 py-6 text-center">{transaction.userName}</td>
                                <td className="px-4 py-6 text-center">{transaction.ticketQty}</td>
                                <td className="px-4 py-6 text-center">{transaction.totalPrice}</td>
                                <td className="px-4 py-6 text-center">{transaction.status}</td>
                                <td className="px-4 py-6 text-center">
                                    {transaction.proofImage ? (
                                        <button
                                            onClick={() => openModal(transaction.proofImage)}
                                            style={{
                                                backgroundColor: '#007bff',
                                                color: 'white',
                                                padding: '5px 10px',
                                                cursor: 'pointer',
                                                border: 'none',
                                                borderRadius: '4px',
                                            }}
                                        >
                                            Lihat
                                        </button>
                                    ) : (
                                        'No image'
                                    )}
                                </td>
                                <td className="px-4 py-6 text-center">
                                    {/* Button for Accept */}
                                    {transaction.status === 'PENDING' && (
                                        <button
                                            onClick={() => handleTransactionAction(transaction.transactionId, 'accept')}
                                            style={{
                                                backgroundColor: 'green',
                                                color: 'white',
                                                padding: '5px 10px',
                                                marginRight: '5px',
                                                border: 'none',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Accept
                                        </button>
                                    )}

                                    {/* Button for Reject */}
                                    {transaction.status === 'PENDING' && (
                                        <button
                                            onClick={() => handleTransactionAction(transaction.transactionId, 'reject')}
                                            style={{
                                                backgroundColor: 'red',
                                                color: 'white',
                                                padding: '5px 10px',
                                                border: 'none',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Reject
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-6 gap-5">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 backdrop-blur-md bg-opacity-30 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg relative">
                        {/* Close Button di pojok kanan atas */}
                        <button
                            onClick={closeModal}
                            style={{
                                backgroundColor: 'transparent',
                                color: 'red',
                                position: 'absolute',
                                top: '-5px',
                                right: '10px',
                                fontSize: '40px',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            &times; {/* Simbol 'X' untuk tombol close */}
                        </button>
                        <div className="mt-4">
                            <img src={selectedImage!} alt="Proof" style={{ maxWidth: '100%', maxHeight: '400px' }} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionList;
