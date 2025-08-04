"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import api from '@/app/lib/api';

const SignUpForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    referralCode: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange =  (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const {
      name,
      value,
    } = e.target;
    setFormData((prev) => ({
      ...prev, [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post("/api/auth/register", formData);

      if (!res.data) {
        throw new Error("Something went wrong");
      }

      router.push("/auth/check-email");
      } catch (error: any) {
        console.error(error);
        setError(error?.response?.data?.message || "Registration failed.");
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
        
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100 p-6">
          <Image
            src="/signup.png"
            alt="Sign Up Illustration"
            width={350}
            height={350}
            className="object-contain"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center md:text-left">
            Sign up
          </h1>
          <p className="text-gray-600 mb-6 text-center md:text-left">
            Create an account to get started.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                placeholder="********"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="CUSTOMER">Customer</option>
                <option value="ORGANIZER">Organizer</option>
              </select>
            </div>

            {/* Referal code */}
            <div>
              <label htmlFor="referal code" className='block text-sm font-medium text-gray-700 mb-1'>Referal code</label>
              <input
              type="text"
              value={formData.referralCode}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
              placeholder='Opsional'
              />
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-2">
              <input
                id="terms"
                type="checkbox"
                className="mt-1 h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              {loading ? "Creating..." : "Create account"}
            </button>
          </form>

          {/* Redirect to login */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/auth/login" className="text-green-600 hover:text-green-500">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
