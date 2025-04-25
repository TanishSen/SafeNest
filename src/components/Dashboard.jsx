import { useState, useEffect, useRef, useMemo } from "react";
import {
  initialPatients,
  calculateHubData,
  getCombinedPieData,
  getCardsData,
  growthData,
} from "../utils/data";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import StatsCards from "./StatsCards";
import HubCapacityChart from "./HubCapacityChart";
import PatientTable from "./PatientTable";
import BarChartSection from "./BarChartSection";
import HubDetails from "./HubDetails";
import AddPatientModal from "./AddPatientModal";
import "../Dashboard.css";

export default function Dashboard() {
  console.log("Dashboard component rendered"); // Debugging log

  const [patients, setPatients] = useState(initialPatients);
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
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

  const hubData = useMemo(() => calculateHubData(patients), [patients]);
  const combinedPieData = useMemo(() => getCombinedPieData(hubData), [hubData]);
  const cardsData = useMemo(
    () => getCardsData(patients, hubData),
    [patients, hubData]
  );
  const filteredPatients = useMemo(() => {
    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.hub.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [patients, searchTerm]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
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

    setPatients((prevPatients) => [...prevPatients, patient]);
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
    setPatients((prevPatients) =>
      prevPatients.filter((patient) => patient.id !== id)
    );
  };

  // Add a fallback UI to ensure something renders
  if (!patients || patients.length === 0) {
    return <div>Loading patients...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="flex-1 overflow-y-auto">
        <TopNav searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <StatsCards cardsData={cardsData} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <HubCapacityChart combinedPieData={combinedPieData} />
              <PatientTable
                filteredPatients={filteredPatients}
                setShowModal={setShowModal}
                removePatient={removePatient}
              />
            </div>
            <div className="space-y-6">
              <HubDetails hubData={hubData} />
              <BarChartSection growthData={growthData} loading={loading} />
            </div>
          </div>
        </main>
      </div>
      <AddPatientModal
        showModal={showModal}
        setShowModal={setShowModal}
        newPatient={newPatient}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        error={error}
        modalRef={modalRef}
      />
    </div>
  );
}
