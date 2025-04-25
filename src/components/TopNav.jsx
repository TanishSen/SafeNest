import { Search, Bell, ChevronDown } from "lucide-react";

export default function TopNav({ searchTerm, setSearchTerm }) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-2.5 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            />
          </div>
          <button className="relative text-gray-600 hover:text-orange-600">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-orange-500"></span>
          </button>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold text-sm">
              RM
            </div>
            <ChevronDown size={16} className="ml-1 text-gray-600" />
          </div>
        </div>
      </div>
    </nav>
  );
}
