import {
  Activity,
  Menu,
  Home,
  Users,
  Calendar,
  User,
  FileText,
  Settings,
} from "lucide-react";

export default function Sidebar({ showSidebar, setShowSidebar }) {
  return (
    <div
      className={`${
        showSidebar ? "w-64" : "w-16"
      } bg-orange-600 text-white transition-all duration-300 ease-in-out flex flex-col`}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Activity size={24} />
          {showSidebar && (
            <h1 className="text-lg font-semibold ml-2">Safe Nest</h1>
          )}
        </div>
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="text-white hover:text-orange-200"
        >
          <Menu size={20} />
        </button>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <div className="flex items-center p-2 bg-orange-700 rounded-md">
          <Home size={18} />
          {showSidebar && <span className="ml-3 text-sm">Dashboard</span>}
        </div>
        {[
          { icon: <Users size={18} />, label: "Doctors" },
          { icon: <Calendar size={18} />, label: "Appointments" },
          { icon: <User size={18} />, label: "Patients" },
          { icon: <FileText size={18} />, label: "Reports" },
          { icon: <Settings size={18} />, label: "Settings" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center p-2 hover:bg-orange-700 rounded-md cursor-pointer transition-colors"
          >
            {item.icon}
            {showSidebar && <span className="ml-3 text-sm">{item.label}</span>}
          </div>
        ))}
      </nav>
      <div className="p-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-orange-200 text-orange-600 flex items-center justify-center font-semibold">
            RM
          </div>
          {showSidebar && (
            <div className="ml-3">
              <p className="text-sm font-medium">Hospital Name</p>
              <p className="text-xs text-orange-200">Administrator</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
