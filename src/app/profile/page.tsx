'use client';

import { useState, useEffect, useRef } from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';
import api from '../lib/api';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function EditProfile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [message, setMessage] = useState('');

    // Password section
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
    const fetchProfile = async () => {
        try {
        const res = await api.get('/api/auth/profile', {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        const user = res.data;
            setName(user.name || '');
            setEmail(user.email || '');
            setPreview(user.profileImage || null);
        } catch (err) {
            console.error('Gagal memuat profil:', err);
            setMessage('Gagal memuat data profil.');
        }
    };

    fetchProfile();
    }, []);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setProfileImage(file || null);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword && newPassword !== confirmPassword) {
            setMessage('Konfirmasi password tidak cocok.');
            return;
        }

    const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        if (profileImage) formData.append('profileImage', profileImage);
        if (currentPassword && newPassword) {
            formData.append('currentPassword', currentPassword);
            formData.append('newPassword', newPassword);
        }

        try {
            const res = await api.put('/api/auth/profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            });

            const user = res.data;
            setName(user.name);
            setEmail(user.email);
            setPreview(user.profileImage || null);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setMessage('Profil berhasil diperbarui!');
        } catch (err) {
            console.error(err);
            setMessage('Terjadi kesalahan saat memperbarui profil.');
        }
    };

    return (
        <>
        <Navbar/>
        <div className="max-w-3xl mx-auto my-10 p-8 bg-white">
            <h2 className="text-3xl font-semibold mb-8 text-center">Edit Profil</h2>

            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
            {/* Foto Profil */}
                <div className="relative self-start mx-auto md:mx-0">
                    <img
                        src={
                            preview ||
                            'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff'
                        }
                        alt="Foto Profil"
                        className="w-32 h-32 rounded-full object-cover border shadow-sm"
                    />
                    <button
                        type="button"
                        onClick={handleImageClick}
                        className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition"
                        aria-label="Edit Foto"
                    >
                    <PencilIcon className="h-4 w-4" />
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        hidden
                    />
                </div>

                {/* Form Input */}
                <div className="flex-1 space-y-5">
                <div>
                    <label className="block text-sm font-medium mb-1">Nama</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border-0 border-b border-b-gray-300 focus:outline-none focus:ring-0 focus:border-b-gray-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border-0 border-b border-b-gray-300 focus:outline-none focus:ring-0 focus:border-b-gray-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Password Saat Ini</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 border-0 border-b border-b-gray-300 focus:outline-none focus:ring-0 focus:border-b-gray-500"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Kosongkan jika tidak ingin mengganti"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Password Baru</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 border-0 border-b border-b-gray-300 focus:outline-none focus:ring-0 focus:border-b-gray-500"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Konfirmasi Password Baru</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 border-0 border-b border-b-gray-300 focus:outline-none focus:ring-0 focus:border-b-gray-500"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition mt-4 float-end"
                >
                    Simpan Perubahan
                </button>

                {message && (
                    <p className="text-sm mt-2 text-center text-gray-700">{message}</p>
                )}
                </div>
            </form>
        </div>
        <Footer/>
        </>
    );
}
