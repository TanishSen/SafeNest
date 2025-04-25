import { PlusCircle, Check, X, AlertTriangle, Edit, Trash } from "lucide-react";

export default function PatientTable({
  filteredPatients,
  setShowModal,
  removePatient,
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Patients</h3>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 px-3 py-1.5 rounded-md"
        >
          <PlusCircle size={16} className="mr-1" />
          Add Patient
        </button>
      </div>
      <table className="w-full text-sm">
        <thead className="text-gray-600">
          <tr className="text-left">
            <th className="py-2 px-4">Patient</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Hub/RFID</th>
            <th className="py-2 px-4">Alert</th>
            <th className="py-2 px-4">Timestamp</th>
            <th className="py-2 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr
              key={patient.id}
              className="border-t border-gray-100 hover:bg-gray-50"
            >
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-medium">
                    {patient.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-gray-900">
                      {patient.name}
                    </div>
                    <div className="text-xs text-gray-500">{patient.id}</div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    patient.bandStatus === "In Range"
                      ? "bg-green-100 text-green-700"
                      : patient.bandStatus === "Out of Range"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {patient.bandStatus}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="text-sm text-gray-900">{patient.hub}</div>
                <div className="text-xs text-gray-500 flex items-center">
                  RFID:
                  {patient.rfidVerified === "Yes" ? (
                    <Check size={14} className="text-green-500 ml-1" />
                  ) : (
                    <X size={14} className="text-red-500 ml-1" />
                  )}
                </div>
              </td>
              <td className="py-3 px-4">
                {patient.alert === "Ringing" ? (
                  <div className="flex items-center text-red-600">
                    <AlertTriangle size={14} className="mr-1" />
                    <span className="text-xs">Ringing</span>
                  </div>
                ) : (
                  <span className="text-gray-500 text-xs">—</span>
                )}
              </td>
              <td className="py-3 px-4 text-gray-500 text-xs">
                {patient.timestamp}
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex space-x-2 justify-end">
                  <button className="text-orange-600 hover:text-orange-800">
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => removePatient(patient.id)}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredPatients.length === 0 && (
        <div className="text-center py-6 text-gray-500 text-sm">
          No patients found.
        </div>
      )}
    </div>
  );
}
