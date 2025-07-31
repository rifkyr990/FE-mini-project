'use client';

import { useState } from 'react';
import Image from 'next/image';
import ButtonFilter from '@/components/buttonFilter';

interface EventCard {
  id: number;
  eventName: string;
  place: string;
  organizer: string;
  category: string;
  rating: number;
  originalPrice: string;
  discountedPrice: string;
  isSpecialPricing?: boolean;
  specialText?: string;
  image: string;
  logo: string;
  date: string;
  city: string;
}

const eventData: EventCard[] = [
  {
    id: 1,
    eventName: "Konser Linkin Park",
    place: "Gelora Bung Karno, Jakarta",
    organizer: "Live Nation",
    category: "Konser",
    rating: 4.8,
    originalPrice: "Rp.2.500.000",
    discountedPrice: "Rp.2.250.000",
    image: "/linkin-park.webp",
    logo: "Live Nation",
    date: "2024-03-15",
    city: "Jakarta"
  },
  {
    id: 2,
    eventName: "Konser Padi",
    place: "Teater Jakarta, Jakarta",
    organizer: "Jakarta Arts Council",
    category: "Konser",
    rating: 4.9,
    originalPrice: "",
    discountedPrice: "Rp.850.000",
    isSpecialPricing: true,
    specialText: "Mulai dari",
    image: "/padi.webp",
    logo: "Jakarta Arts",
    date: "2024-03-20",
    city: "Jakarta"
  },
  {
    id: 3,
    eventName: "Persebaya vs Arema",
    place: "Gelora Bung Tomo, Surabaya",
    organizer: "PSSI",
    category: "Olahraga",
    rating: 5.0,
    originalPrice: "Rp.150.000",
    discountedPrice: "Rp.120.000",
    image: "/persebaya-vs-arema.webp",
    logo: "PSSI",
    date: "2024-03-25",
    city: "Surabaya"
  },
  {
    id: 4,
    eventName: "Pertunjukan Teater",
    place: "Taman Ismail Marzuki, Jakarta",
    organizer: "TIM Jakarta",
    category: "Teater",
    rating: 4.7,
    originalPrice: "Rp.300.000",
    discountedPrice: "Rp.250.000",
    image: "/teater.webp",
    logo: "TIM Jakarta",
    date: "2024-03-30",
    city: "Jakarta"
  }
];

export default function EventListPage() {
  const [selectedCategory, setSelectedCategory] = useState('Konser');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pesan Tiket Acara
          </h1>
          <p className="text-gray-600">
            Temukan dan pesan tiket acara dengan harga terbaik
          </p>
        </div>

        {/* Tombol Filter */}
        <div className='flex items-center mb-8'>
          <ButtonFilter />
        </div>

        {/* Event Cards Container - Vertical Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {eventData.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Event Image */}
              <div className="relative h-48">
                <Image
                  src={event.image}
                  alt={event.eventName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>

              {/* Card Content */}
              <div className="p-4">
                {/* Event Name */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {event.eventName}
                </h3>
                
                {/* place */}
                <p className="text-gray-600 mb-2">
                  {event.place}
                </p>
                
                {/* Organizer */}
                <p className="text-gray-600 mb-2">
                  {event.organizer}
                </p>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <span className="text-yellow-400 mr-1">⭐</span>
                  <span className="text-sm text-gray-600">
                    {event.rating}/5
                  </span>
                </div>
                
                {/* Pricing */}
                <div className="space-y-1">
                  {event.isSpecialPricing ? (
                    <div>
                      <p className="text-sm text-gray-600">{event.specialText}</p>
                      <p className="text-xl font-bold text-red-500">
                        {event.discountedPrice}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-500 line-through">
                        {event.originalPrice}
                      </p>
                      <p className="text-xl font-bold text-red-500">
                        {event.discountedPrice}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Check Other Events Button */}
        <div className="text-center mt-8">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Cek Acara Lainnya
          </button>
        </div>
      </div>
    </div>
  );
}
