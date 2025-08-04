"use client";

import { useState } from "react";

interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  availableSeats: number;
}

type TicketCategory = 'VVIP' | 'VIP' | 'Reguler';

interface EventFormData {
  name: string;
  image: File | null;
  imagePreview: string;
  startDate: string;
  endDate: string;
  description: string;
  ticketTypes: TicketType[];
}

export default function EventCreationPage() {
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    image: null,
    imagePreview: "",
    startDate: "",
    endDate: "",
    description: "",
    ticketTypes: [],
  });

  const [newTicketType, setNewTicketType] = useState<Omit<TicketType, "id">>({
    name: "VVIP",
    price: 0,
    description: "",
    availableSeats: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" || name === "availableSeats" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: "",
    }));
  };

  const handleTicketTypeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTicketType(prev => ({
      ...prev,
      [name]: name === "price" || name === "availableSeats" ? Number(value) : value,
    }));
  };

  const addTicketType = () => {
    if (newTicketType.name && newTicketType.price > 0 && newTicketType.availableSeats > 0) {
      // Check if this ticket type already exists
      const existingTicket = formData.ticketTypes.find(ticket => ticket.name === newTicketType.name);
      if (existingTicket) {
        alert(`Jenis tiket ${newTicketType.name} sudah ditambahkan!`);
        return;
      }
      
      const ticketType: TicketType = {
        ...newTicketType,
        id: Date.now().toString(),
      };
      setFormData(prev => ({
        ...prev,
        ticketTypes: [...prev.ticketTypes, ticketType],
      }));
      setNewTicketType({
        name: "VVIP",
        price: 0,
        description: "",
        availableSeats: 0,
      });
    } else {
      alert("Mohon isi semua field yang diperlukan!");
    }
  };

  const removeTicketType = (id: string) => {
    setFormData(prev => ({
      ...prev,
      ticketTypes: prev.ticketTypes.filter(ticket => ticket.id !== id),
    }));
  };

  // Calculate total price and seats from all ticket types
  const totalPrice = formData.ticketTypes.reduce((sum, ticket) => sum + ticket.price, 0);
  const totalSeats = formData.ticketTypes.reduce((sum, ticket) => sum + ticket.availableSeats, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.ticketTypes.length === 0) {
      alert("Minimal harus ada satu jenis tiket!");
      return;
    }
    console.log("Event Data:", formData);
    // Here you would typically send the data to your backend
    alert("Event created successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Buat Acara Baru
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nama Acara *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan nama acara"
              />
            </div>

            {/* Event Image */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Gambar Acara
              </label>
              <div className="space-y-4">
                {/* Image Upload Input */}
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="image"
                    className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Pilih Gambar
                  </label>
                  {formData.image && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="text-red-600 hover:text-red-800"
                    >
                      Hapus Gambar
                    </button>
                  )}
                </div>
                
                {/* Image Preview */}
                {formData.imagePreview && (
                  <div className="relative">
                    <img
                      src={formData.imagePreview}
                      alt="Preview"
                      className="max-w-xs h-auto rounded-lg border border-gray-300"
                    />
                    <div className="mt-2 text-sm text-gray-600">
                      {formData.image?.name}
                    </div>
                  </div>
                )}
                
                {/* Upload Instructions */}
                <div className="text-sm text-gray-500">
                  <p>Format yang didukung: JPG, PNG, GIF</p>
                  <p>Ukuran maksimal: 5MB</p>
                </div>
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Mulai *
                </label>
                <input
                  type="datetime-local"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Berakhir *
                </label>
                <input
                  type="datetime-local"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Acara *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Jelaskan detail acara Anda..."
              />
            </div>

            {/* Ticket Types Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Jenis Tiket dan Harga
              </h3>
              
              {/* Summary of Ticket Types */}
              {formData.ticketTypes.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h4 className="text-md font-medium text-blue-900 mb-2">Ringkasan Tiket:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Total Jenis Tiket:</span> {formData.ticketTypes.length}
                    </div>
                    <div>
                      <span className="font-medium">Total Kursi:</span> {totalSeats}
                    </div>
                    <div>
                      <span className="font-medium">Rentang Harga:</span> Rp {Math.min(...formData.ticketTypes.map(t => t.price)).toLocaleString()} - Rp {Math.max(...formData.ticketTypes.map(t => t.price)).toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Add New Ticket Type */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="text-md font-medium text-gray-700 mb-3">Tambah Jenis Tiket</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Jenis Tiket *
                    </label>
                    <select
                      name="name"
                      value={newTicketType.name}
                      onChange={handleTicketTypeChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="VVIP">VVIP</option>
                      <option value="VIP">VIP</option>
                      <option value="Reguler">Reguler</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Harga (Rp) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={newTicketType.price}
                      onChange={handleTicketTypeChange}
                      placeholder="0"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kursi Tersedia *
                    </label>
                    <input
                      type="number"
                      name="availableSeats"
                      value={newTicketType.availableSeats}
                      onChange={handleTicketTypeChange}
                      placeholder="0"
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi (Opsional)
                  </label>
                  <textarea
                    name="description"
                    value={newTicketType.description}
                    onChange={handleTicketTypeChange}
                    placeholder="Deskripsi jenis tiket (opsional)"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="button"
                  onClick={addTicketType}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Tambah Jenis Tiket
                </button>
              </div>

              {/* Display Added Ticket Types */}
              {formData.ticketTypes.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-md font-medium text-gray-700">Jenis Tiket yang Ditambahkan:</h4>
                  {formData.ticketTypes.map((ticket) => (
                    <div key={ticket.id} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              ticket.name === 'VVIP' ? 'bg-purple-100 text-purple-800' :
                              ticket.name === 'VIP' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {ticket.name}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">Harga:</span>
                              <p className="text-lg font-bold text-green-600">Rp {ticket.price.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Kursi Tersedia:</span>
                              <p className="text-lg font-bold text-blue-600">{ticket.availableSeats}</p>
                            </div>
                          </div>
                          {ticket.description && (
                            <div className="mt-2">
                              <span className="font-medium text-gray-700">Deskripsi:</span>
                              <p className="text-sm text-gray-600 mt-1">{ticket.description}</p>
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeTicketType(ticket.id)}
                          className="text-red-600 hover:text-red-800 ml-4 p-1"
                          title="Hapus tiket"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors font-medium text-lg"
              >
                Buat Acara
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
