import { Search } from "lucide-react";

export  const SearchBar = ({ value, onChange, placeholder = "Search articles, strategies, tips..." }) => {
  return (
    <div className="relative mb-4 w-full max-w-md mx-auto">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:shadow-sm focus:shadow-green-600 transition-colors duration-200 text-gray-700"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={25} />
    </div>
  );
};


