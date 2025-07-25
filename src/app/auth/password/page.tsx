import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 py-12">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row-reverse relative">
        {/* Image Section */}
        <div className="md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
          <Image src="/forgot.png" alt="Forgot Password Illustration" width={400} height={400} />
        </div>

        {/* Back to login button */}
        <Link
          href="/login"
          className="absolute top-4 left-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          ← Back to Login
        </Link>

        {/* Form Section */}
        <div className="md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Forgot Password</h1>
          <p className="text-gray-600 mb-6">
            Enter your email and we'll send you a link to reset your password.
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send Reset Link
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remembered your password?{' '}
              <Link href="/login" className="text-blue-600 hover:text-blue-500">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
