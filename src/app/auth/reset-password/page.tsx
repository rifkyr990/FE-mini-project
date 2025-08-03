'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import api from '@/app/lib/api';

const ResetPasswordPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!token) {
            setError('Invalid or missing token');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const res = await api.post('/api/auth/reset-password', {
                token,
                newPassword: password,
            });
            setMessage(res.data.message);
            setTimeout(() => router.push('/auth/login'), 2000);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded shadow">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Reset Your Password</h1>
            <form onSubmit={handleReset} className="space-y-4">
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded"
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
            {message && <p className="mt-4 text-green-600">{message}</p>}
            {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
    </div>
    );
};

export default ResetPasswordPage;
