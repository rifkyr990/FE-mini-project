import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  return (

    <div className="flex items-center w-full max-w-4xl mx-auto border-1 border-gray-300 bg-white rounded-full shadow-lg py-4 px-8 mt-8 ">
      <FiSearch className="text-green-700 text-2xl mr-4" />
      <input
        type="text"
        placeholder="Cari event, artis, kategori dan lain-lain"
        className="flex-1 bg-transparent outline-none text-lg text-gray-600 placeholder-gray-400"
      />
    </div>
  );
}
