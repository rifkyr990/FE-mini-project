'use client';

import Image from 'next/image';

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
      <div className="max-w-md bg-white rounded-xl shadow-xl p-8 text-center">
        {/* Email Icon */}
        <div className="flex justify-center mb-6">
          <Image
            src="/icon/email.png"
            alt="Email Icon"
            width={80}
            height={80}
            className="animate-bounce-slow"
          />
        </div>

        <h1 className="text-3xl font-bold text-green-700 mb-2">Check Your Email</h1>
        <p className="text-gray-600 leading-relaxed">
          Kami telah mengirimkan tautan verifikasi ke email Anda.
          Silakan buka kotak masuk Anda dan klik tautan tersebut untuk melanjutkan.
        </p>
      </div>
    </div>
  );
}
