"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import api from '@/app/lib/api';
import { setSignIn } from '@/app/lib/redux/features/userSlice';
import { useAppDispatch } from '@/app/lib/redux/hooks';


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/login", { email, password });
      const token = res.data.token;
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const profileRes = await api.get("/api/auth/profile");
      localStorage.setItem("user", JSON.stringify(profileRes.data));
      
      dispatch(setSignIn(profileRes.data));
      router.push("/");

    } catch (error) {
      console.error("Login error:", error);
      alert("Login gagal. Cek kembali email dan password.");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
        
        {/* Image Section */}
        <div className="md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
          <Image
            src="/login.png"
            alt="Login Illustration"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center md:text-left">Login</h1>
          <p className="text-gray-600 mb-6 text-center md:text-left">
            Welcome back! Please enter your credentials to access your account.
          </p>

          <form className="space-y-4" onSubmit={login}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="********"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span>Remember me</span>
              </label>
              <a href="/auth/password/" className="text-green-600 hover:text-green-500">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Log in
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/auth/signup" className="text-green-600 hover:text-green-500">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
