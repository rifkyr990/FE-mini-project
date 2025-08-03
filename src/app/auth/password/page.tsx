'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/app/lib/api'; // pastikan ini mengarah ke Axios instance atau fetch wrapper kamu

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await api.post('/api/auth/forgot-password', { email }); // `name` opsional tergantung backend
      setMessage(response.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row relative">
        <Link
          href="/auth/login"
          className="absolute top-4 left-4 text-sm text-green-600 hover:text-green-800 font-medium z-10"
        >
          ← Back to Login
        </Link>

        <div className="hidden md:flex md:w-1/2 bg-gray-100 items-center justify-center p-6">
          <Image
            src="/forgot.png"
            alt="Forgot Password Illustration"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Forgot Password</h1>
          <p className="text-gray-600 mb-6">
            Enter your email and we’ll send you a link to reset your password.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-md transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>

            {message && <p className="text-green-600 text-sm">{message}</p>}
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Remember your password?{' '}
            <Link href="/auth/login" className="text-green-600 hover:text-green-500 font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
