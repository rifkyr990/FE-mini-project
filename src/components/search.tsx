import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  return (
    <div className="flex mx-8">
      <div className="flex items-center w-full max-w-6xl mx-auto border border-gray-300 bg-white rounded-full shadow-lg py-3 px-4 mt-6 sm:py-4 sm:px-6 md:py-4 md:px-8 lg:py-4 lg:px-8">
        <FiSearch className="text-green-700 text-lg sm:text-xl md:text-2xl mr-2 sm:mr-3 md:mr-4 flex-shrink-0" />
        <input
          type="text"
          placeholder="Cari event, artis, kategori dan lain-lain"
          className="flex-1 bg-transparent outline-none text-sm sm:text-base md:text-lg text-gray-600 placeholder-gray-400 min-w-0"
        />
      </div>
    </div>

  );
}
