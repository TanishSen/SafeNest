import { Users, User, BedDouble } from "lucide-react";

// Dummy data
export const initialPatients = [
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
    name: "Shanti",
    bandStatus: "Tampered",
    hub: "Hub 3",
    rfidVerified: "No",
    alert: "Ringing",
    timestamp: "2025-04-25 10:22:05",
  },
  {
    id: "P005",
    name: "Hodol Bolod",
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
export const calculateHubData = (patients) => {
  const hubCounts = { "Hub 1": 0, "Hub 2": 0, "Hub 3": 0 };
  patients.forEach((patient) => {
    hubCounts[patient.hub]++;
  });

  return [
    {
      name: "Hub 1",
      occupied: hubCounts["Hub 1"],
      available: 5 - hubCounts["Hub 1"],
      color: "#F97316",
    },
    {
      name: "Hub 2",
      occupied: hubCounts["Hub 2"],
      available: 4 - hubCounts["Hub 2"],
      color: "#FB923C",
    },
    {
      name: "Hub 3",
      occupied: hubCounts["Hub 3"],
      available: 3 - hubCounts["Hub 3"],
      color: "#FDBA74",
    },
  ];
};

// Prepare pie chart data
export const getCombinedPieData = (hubData) => [
  {
    name: "Occupied",
    value: hubData.reduce((sum, hub) => sum + hub.occupied, 0),
    color: "#F97316",
  },
  {
    name: "Available",
    value: hubData.reduce((sum, hub) => sum + hub.available, 0),
    color: "#FEE2E2",
  },
];

// Card data
export const getCardsData = (patients, hubData) => [
  {
    title: "Total Patients",
    value: patients.length,
    icon: <Users size={20} />,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Total Visitors",
    value: 12,
    icon: <User size={20} />,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Total Beds",
    value: hubData.reduce(
      (sum, item) => sum + (item.occupied + item.available),
      0
    ),
    icon: <BedDouble size={20} />,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

// Alert activity timeline
export const alertTimeline = [
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
export const growthData = [
  { month: "Jan", completed: 45, pending: 20 },
  { month: "Feb", completed: 52, pending: 18 },
  { month: "Mar", completed: 48, pending: 25 },
  { month: "Apr", completed: 61, pending: 15 },
  { month: "May", completed: 55, pending: 21 },
  { month: "Jun", completed: 67, pending: 12 },
  { month: "Jul", completed: 70, pending: 10 },
];
