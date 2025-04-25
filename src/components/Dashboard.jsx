import { useState, useEffect, useRef, useMemo } from "react";
import "../App.css";
import "../index.css";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
} from "recharts";
import {
  Bell,
  LogOut,
  User,
  Users,
  BedDouble,
  Activity,
  PlusCircle,
  X,
  Check,
  AlertTriangle,
  Calendar,
  Edit,
  Trash,
  Search,
  Menu,
  Home,
  ChevronDown,
  FileText,
  Settings,
} from "lucide-react";

// dummy data
const initialPatients = [
  {
    id: "P001",
    name: "Munku Chunku",
    bandStatus: "In Range",
    hub: "Hub 1",
    rfidVerified: "Yes",
    alert: "None",
    timestamp: "2025-04-25 08:30:22",
  },
  {
    id: "P002",
    name: "Titmuk Ji",
    bandStatus: "Out of Range",
    hub: "Hub 2",
    rfidVerified: "Yes",
    alert: "Ringing",
    timestamp: "2025-04-25 09:15:10",
  },
  {
    id: "P003",
    name: "Oddo Poddo",
    bandStatus: "In Range",
    hub: "Hub 1",
    rfidVerified: "Yes",
    alert: "None",
    timestamp: "2025-04-25 07:45:31",
  },
  {
    id: "P004",
    name: "Shanti ",
    bandStatus: "Tampered",
    hub: "Hub 3",
    rfidVerified: "No",
    alert: "Ringing",
    timestamp: "2025-04-25 10:22:05",
  },
  {
    id: "P005",
    name: "hodol bolod",
    bandStatus: "In Range",
    hub: "Hub 2",
    rfidVerified: "Yes",
    alert: "None",
    timestamp: "2025-04-25 08:50:47",
  },
  {
    id: "P006",
    name: "William Miller",
    bandStatus: "In Range",
    hub: "Hub 3",
    rfidVerified: "Yes",
    alert: "None",
    timestamp: "2025-04-25 09:30:18",
  },
];

// Dynamically calculate hub data from patients
const calculateHubData = (patients) => {
  const hubCounts = { "Hub 1": 0, "Hub 2": 0, "Hub 3": 0 };
  patients.forEach((patient) => {
    hubCounts[patient.hub]++;
  });

  return [
    {
      name: "Hub 1",
      occupied: hubCounts["Hub 1"],
      available: 5 - hubCounts["Hub 1"],
      color: "#4F46E5", // Indigo
    },
    {
      name: "Hub 2",
      occupied: hubCounts["Hub 2"],
      available: 4 - hubCounts["Hub 2"],
      color: "#0EA5E9", // Sky blue
    },
    {
      name: "Hub 3",
      occupied: hubCounts["Hub 3"],
      available: 3 - hubCounts["Hub 3"],
      color: "#10B981", // Emerald
    },
  ];
};

// Prepare pie chart data
const getCombinedPieData = (hubData) => [
  {
    name: "Occupied",
    value: hubData.reduce((sum, hub) => sum + hub.occupied, 0),
    color: "#6366F1", // Indigo for occupied
  },
  {
    name: "Available",
    value: hubData.reduce((sum, hub) => sum + hub.available, 0),
    color: "#0EA5E9", // Sky blue for available
  },
];

// Card data
const getCardsData = (patients, hubData) => [
  {
    title: "Total Patients",
    value: patients.length,
    icon: <Users size={24} />,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
    trend: "+12%",
    trendUp: true,
  },
  {
    title: "Overall Visitors",
    value: 12,
    icon: <User size={24} />,
    color: "text-sky-500",
    bgColor: "bg-sky-50",
    trend: "+5%",
    trendUp: true,
  },
  {
    title: "Total Beds/Hubs",
    value: hubData.reduce(
      (sum, item) => sum + (item.occupied + item.available),
      0
    ),
    icon: <BedDouble size={24} />,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    trend: "0%",
    trendUp: false,
  },
];

// Alert activity timeline
const alertTimeline = [
  {
    id: 1,
    patient: "Noah Smith",
    type: "Out of Range",
    time: "20 minutes ago",
    urgency: "medium",
  },
  {
    id: 2,
    patient: "Liam Brown",
    type: "Tampered Band",
    time: "45 minutes ago",
    urgency: "high",
  },
  {
    id: 3,
    patient: "Olivia Johnson",
    type: "Check-in",
    time: "2 hours ago",
    urgency: "low",
  },
];

// Growth data for bar chart
const growthData = [
  { month: "Jan", completed: 45, pending: 20 },
  { month: "Feb", completed: 52, pending: 18 },
  { month: "Mar", completed: 48, pending: 25 },
  { month: "Apr", completed: 61, pending: 15 },
  { month: "May", completed: 55, pending: 21 },
  { month: "Jun", completed: 67, pending: 12 },
  { month: "Jul", completed: 70, pending: 10 },
];

export default function Dashboard() {
  const [patients, setPatients] = useState(initialPatients);
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    guardianName: "",
    rfidUid: "",
    bandUid: "",
    hub: "Hub 1",
  });
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  // Memoize derived data
  const hubData = useMemo(() => calculateHubData(patients), [patients]);
  const combinedPieData = useMemo(() => getCombinedPieData(hubData), [hubData]);
  const cardsData = useMemo(
    () => getCardsData(patients, hubData),
    [patients, hubData]
  );

  // Filter patients based on search term
  const filteredPatients = useMemo(() => {
    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.hub.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [patients, searchTerm]);

  // Handle modal focus and escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && showModal) setShowModal(false);
    };
    if (showModal && modalRef.current) {
      modalRef.current.focus();
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ageNum = Number(newPatient.age);
    if (
      !newPatient.name ||
      !newPatient.age ||
      !newPatient.guardianName ||
      !newPatient.rfidUid ||
      !newPatient.bandUid ||
      isNaN(ageNum) ||
      ageNum < 0 ||
      ageNum > 120
    ) {
      setError(
        "All fields are required. Age must be a number between 0 and 120."
      );
      return;
    }

    const id = `P${String(patients.length + 1).padStart(3, "0")}`;
    const timestamp = new Date().toLocaleString();
    const patient = {
      id,
      name: newPatient.name,
      bandStatus: "In Range",
      hub: newPatient.hub,
      rfidVerified: "Yes",
      alert: "None",
      timestamp,
    };

    setPatients([...patients, patient]);
    setShowModal(false);
    setNewPatient({
      name: "",
      age: "",
      guardianName: "",
      rfidUid: "",
      bandUid: "",
      hub: "Hub 1",
    });
    setError("");
  };

  const removePatient = (id) => {
    setPatients(patients.filter((patient) => patient.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          showSidebar ? "w-64" : "w-20"
        } bg-indigo-900 text-white transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4 border-b border-indigo-800">
          <div className="flex items-center">
            <Activity className="text-sky-400" size={32} />
            {showSidebar && (
              <h1 className="text-xl font-bold ml-2">Safe Nest</h1>
            )}
          </div>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-indigo-300 hover:text-white"
          >
            <Menu size={20} />
          </button>
        </div>
        <div className="p-4">
          {/* Navigation */}
          <nav className="space-y-2">
            <div className="flex items-center p-3 bg-indigo-800 rounded-lg text-white">
              <Home size={20} />
              {showSidebar && <span className="ml-3">Dashboard</span>}
            </div>

            {[
              { icon: <Users size={20} />, label: "Doctors" },
              { icon: <Calendar size={20} />, label: "Appointments" },
              { icon: <User size={20} />, label: "Patients" },
              { icon: <FileText size={20} />, label: "Reports" },
              { icon: <Settings size={20} />, label: "Settings" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center p-3 hover:bg-indigo-800 rounded-lg text-indigo-300 hover:text-white cursor-pointer transition-colors"
              >
                {item.icon}
                {showSidebar && <span className="ml-3">{item.label}</span>}
              </div>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 w-full border-t border-indigo-800 p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
              RM
            </div>
            {showSidebar && (
              <div className="ml-3">
                <p className="text-sm font-medium">Hospital Name</p>
                <p className="text-xs text-indigo-300">Administrator</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        {/* Top Navigation Bar */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Dashboard
                </h2>
              </div>
              <div className="flex items-center">
                {/* Search */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="py-2 pl-10 pr-4 block w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Notifications */}
                <button className="ml-4 p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 relative">
                  <Bell size={22} />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                {/* Profile Dropdown */}
                <div className="ml-4 relative">
                  <button className="flex items-center text-gray-700 hover:text-gray-900">
                    <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium text-sm">
                      RM
                    </div>
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl shadow-lg mb-6">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Dashboard
                  </h2>
                  <p className="text-indigo-100 mt-2">
                    Welcome back to Safe Nest. Here's what's happening today.
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="mt-4 md:mt-0 bg-white text-indigo-600 px-6 py-2.5 rounded-lg hover:bg-indigo-50 transition-colors shadow-md flex items-center font-medium"
                >
                  <PlusCircle size={18} className="mr-2" />
                  Add New Patient
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {cardsData.map((card, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {card.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {card.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <span
                        className={`text-xs font-medium ${
                          card.trendUp ? "text-green-500" : "text-gray-500"
                        }`}
                      >
                        {card.trend}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        vs. last week
                      </span>
                    </div>
                  </div>
                  <div
                    className={`${card.bgColor} p-3 rounded-full h-12 w-12 flex items-center justify-center`}
                  >
                    <div className={card.color}>{card.icon}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Charts */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hub Capacity Chart */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Hub Capacity
                  </h3>
                  <div className="flex space-x-2">
                    <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 py-1 px-3 rounded-full bg-indigo-50">
                      Weekly
                    </button>
                    <button className="text-xs font-medium text-gray-500 hover:text-indigo-600 py-1 px-3 rounded-full hover:bg-indigo-50">
                      Monthly
                    </button>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={combinedPieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={130}
                        innerRadius={70}
                        dataKey="value"
                        paddingAngle={5}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {combinedPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [`${value} beds`, name]}
                        contentStyle={{
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        wrapperStyle={{ paddingTop: "20px" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Patient Table */}
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Patient Overview</h2>
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center"
                  >
                    <PlusCircle size={16} className="mr-1" />
                    Add
                  </button>
                </div>
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr className="text-left text-gray-500">
                      <th className="py-2 px-6">Patient</th>
                      <th className="py-2 px-6">Status</th>
                      <th className="py-2 px-6">Hub/RFID</th>
                      <th className="py-2 px-6">Alert</th>
                      <th className="py-2 px-6">
                        Timestamp <span className="ml-1">↓</span>
                      </th>
                      <th className="py-2 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {filteredPatients.map((patient) => (
                      <tr
                        key={patient.id}
                        className="hover:bg-gray-50 border-b border-gray-100"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium">
                              {patient.name.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <div className="font-medium text-gray-900">
                                {patient.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {patient.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              patient.bandStatus === "In Range"
                                ? "bg-green-100 text-green-800"
                                : patient.bandStatus === "Out of Range"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {patient.bandStatus}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm text-gray-900">
                            {patient.hub}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center">
                            RFID:
                            {patient.rfidVerified === "Yes" ? (
                              <Check
                                size={14}
                                className="text-green-500 ml-1"
                              />
                            ) : (
                              <X size={14} className="text-red-500 ml-1" />
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          {patient.alert === "Ringing" ? (
                            <div className="flex items-center text-red-600">
                              <AlertTriangle size={16} className="mr-1" />
                              <span className="text-sm">Ringing</span>
                            </div>
                          ) : (
                            <span className="text-gray-500 text-sm">—</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-gray-500">
                          {patient.timestamp}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex space-x-3 justify-end">
                            <button className="text-indigo-600 hover:text-indigo-800">
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => removePatient(patient.id)}
                              className="text-gray-500 hover:text-red-600"
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredPatients.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No patients found matching your search.
                  </div>
                )}
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-4">Number of beds</h2>
              {loading ? (
                <div className="animate-pulse flex flex-col space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={growthData}>
                    <XAxis dataKey="month" />
                    <Tooltip />
                    <Bar
                      dataKey="completed"
                      fill="#4049FF"
                      stackId="a"
                      name="Completed"
                      barSize={40}
                      radius={[15, 15, 0, 0]}
                    />
                    <Bar
                      dataKey="pending"
                      fill="#FF9000"
                      stackId="b"
                      name="Pending"
                      barSize={40}
                      radius={[15, 15, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
              <div className="flex justify-center items-center gap-8 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#4049FF]"></div>
                  <span className="text-sm text-gray-600">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF9000]"></div>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
              </div>
            </div>

            {/* Right Column - Details and Alerts */}
            <div className="space-y-6">
              {/* Hub Details */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Hub Details
                  </h3>
                  <button className="text-gray-500 hover:text-indigo-600 transition-colors">
                    <Settings size={18} />
                  </button>
                </div>
                <div className="space-y-4">
                  {hubData.map((hub, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: hub.color }}
                          ></div>
                          <h4 className="text-sm font-semibold text-gray-900 ml-2">
                            {hub.name}
                          </h4>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full">
                          {hub.occupied + hub.available} beds
                        </span>
                      </div>
                      <div className="mt-3 bg-white rounded-lg p-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Occupied:</span>
                          <span className="font-medium text-gray-900">
                            {hub.occupied}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-gray-600">Available:</span>
                          <span className="font-medium text-gray-900">
                            {hub.available}
                          </span>
                        </div>
                        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500"
                            style={{
                              width: `${
                                (hub.occupied /
                                  (hub.occupied + hub.available)) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Alerts Timeline */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Recent Alerts
                  </h3>
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {alertTimeline.map((alert) => (
                    <div key={alert.id} className="flex items-start">
                      <div
                        className={`mt-1 h-3 w-3 rounded-full flex-shrink-0 ${
                          alert.urgency === "high"
                            ? "bg-red-500"
                            : alert.urgency === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {alert.patient}
                        </p>
                        <p className="text-xs text-gray-500">{alert.type}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {alert.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Status */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  System Status
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      name: "Server Health",
                      status: "Operational",
                      statusColor: "bg-green-500",
                    },
                    {
                      name: "RFID System",
                      status: "Operational",
                      statusColor: "bg-green-500",
                    },
                    {
                      name: "Band Network",
                      status: "Minor Issues",
                      statusColor: "bg-yellow-500",
                    },
                    {
                      name: "Backup System",
                      status: "Operational",
                      statusColor: "bg-green-500",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm text-gray-600">{item.name}</span>
                      <div className="flex items-center">
                        <div
                          className={`h-2 w-2 rounded-full ${item.statusColor} mr-2`}
                        ></div>
                        <span className="text-sm font-medium text-gray-900">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Patient Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            ref={modalRef}
            tabIndex={-1}
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg"
          >
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-5 bg-indigo-50">
              <h3 className="text-xl font-bold text-indigo-600">
                Add New Patient
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:text-indigo-500 transition-colors"
                aria-label="Close modal"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm flex items-center">
                    <AlertTriangle size={16} className="mr-2" />
                    {error}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Patient Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newPatient.name}
                    onChange={handleInputChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Enter patient name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={newPatient.age}
                    onChange={handleInputChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Enter age"
                  />
                </div>

                <div>
                  <label
                    htmlFor="guardianName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Guardian Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="guardianName"
                    name="guardianName"
                    value={newPatient.guardianName}
                    onChange={handleInputChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Enter guardian name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="hub"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Hub <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="hub"
                    name="hub"
                    value={newPatient.hub}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    <option value="Hub 1">Hub 1</option>
                    <option value="Hub 2">Hub 2</option>
                    <option value="Hub 3">Hub 3</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="rfidUid"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    RFID UID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="rfidUid"
                    name="rfidUid"
                    value={newPatient.rfidUid}
                    onChange={handleInputChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Enter RFID UID"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bandUid"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Band UID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="bandUid"
                    name="bandUid"
                    value={newPatient.bandUid}
                    onChange={handleInputChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Enter Band UID"
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 mt-6 pt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-md font-medium"
                >
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
