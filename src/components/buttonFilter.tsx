'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  IoLocationOutline, 
  IoCalendarOutline, 
  IoChevronDownOutline,
  IoCompassOutline 
} from 'react-icons/io5';

interface FilterButtonProps {
  onLocationChange?: (location: string) => void;
  onDateChange?: (date: string) => void;
  onTypeChange?: (type: string) => void;
}

const LOCATIONS = ['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta'];
const DATES = ['All dates', 'Today', 'This week', 'This month'];
const TYPES = [
  { label: 'All types', value: 'All types' },
  { label: 'Konser', value: 'Konser' },
  { label: 'Olahraga', value: 'Olahraga' },
  { label: 'Teater', value: 'Teater' },
];

const ButtonFilter: React.FC<FilterButtonProps> = ({
  onLocationChange,
  onDateChange,
  onTypeChange
}) => {
  const [selectedLocation, setSelectedLocation] = useState('Unknown Location');
  const [selectedDate, setSelectedDate] = useState('All dates');
  const [selectedType, setSelectedType] = useState('All types');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const locationRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        locationRef.current && !locationRef.current.contains(event.target as Node)
      ) setShowLocationDropdown(false);
      if (
        dateRef.current && !dateRef.current.contains(event.target as Node)
      ) setShowDateDropdown(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    setShowLocationDropdown(false);
    onLocationChange?.(location);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setShowDateDropdown(false);
    onDateChange?.(date);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    onTypeChange?.(type);
  };

  return (
    <div className="flex items-center gap-3 p-4">
      {/* Compass/Map Button */}
      <button
        className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center hover:bg-green-800 transition-colors"
        onClick={() => alert('Fitur Map/Compass belum tersedia')}
        aria-label="Open map"
      >
        <IoCompassOutline className="text-white text-lg" />
      </button>

      {/* Location Filter */}
      <div className="relative" ref={locationRef}>
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-700 rounded-full text-green-700 hover:bg-green-100 transition-colors"
          onClick={() => setShowLocationDropdown((v) => !v)}
        >
          <IoLocationOutline className="text-green-700" />
          <span className="text-sm font-medium">{selectedLocation}</span>
          <IoChevronDownOutline className="text-green-700 text-xs" />
        </button>
        {showLocationDropdown && (
          <div className="absolute left-0 mt-2 w-40 bg-white border border-green-200 rounded shadow z-10">
            {LOCATIONS.map(loc => (
              <button
                key={loc}
                className={`block w-full text-left px-4 py-2 hover:bg-green-50 ${selectedLocation === loc ? 'bg-green-100 font-bold' : ''}`}
                onClick={() => handleLocationChange(loc)}
              >
                {loc}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Date Filter */}
      <div className="relative" ref={dateRef}>
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition-colors"
          onClick={() => setShowDateDropdown((v) => !v)}
        >
          <IoCalendarOutline className="text-gray-600" />
          <span className="text-sm font-medium">{selectedDate}</span>
          <IoChevronDownOutline className="text-gray-600 text-xs" />
        </button>
        {showDateDropdown && (
          <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow z-10">
            {DATES.map(date => (
              <button
                key={date}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-50 ${selectedDate === date ? 'bg-gray-100 font-bold' : ''}`}
                onClick={() => handleDateChange(date)}
              >
                {date}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Separator */}
      <div className="w-px h-6 bg-gray-300"></div>

      {/* Type Filters */}
      <div className="flex gap-2">
        {TYPES.map(type => (
          <button
            key={type.value}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedType === type.value
                ? 'bg-green-50 border border-green-700 text-green-700'
                : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => handleTypeChange(type.value)}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonFilter;
