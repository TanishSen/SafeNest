import { X, AlertTriangle } from "lucide-react";

export default function AddPatientModal({
  showModal,
  setShowModal,
  newPatient,
  handleInputChange,
  handleSubmit,
  error,
  modalRef,
}) {
  return (
    showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50">
        <div
          ref={modalRef}
          tabIndex={-1}
          className="bg-white rounded-lg w-full max-w-md"
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Add Patient</h3>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-500 hover:text-orange-600"
            >
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6">
            {error && (
              <div className="mb-4 p-2 bg-red-50 rounded-md text-red-600 text-sm flex items-center">
                <AlertTriangle size={16} className="mr-2" />
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={newPatient.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                  placeholder="Enter patient name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={newPatient.age}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                  placeholder="Enter age"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Guardian Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="guardianName"
                  value={newPatient.guardianName}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                  placeholder="Enter guardian name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hub <span className="text-red-500">*</span>
                </label>
                <select
                  name="hub"
                  value={newPatient.hub}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                >
                  <option value="Hub 1">Hub 1</option>
                  <option value="Hub 2">Hub 2</option>
                  <option value="Hub 3">Hub 3</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  RFID UID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="rfidUid"
                  value={newPatient.rfidUid}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                  placeholder="Enter RFID UID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Band UID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="bandUid"
                  value={newPatient.bandUid}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                  placeholder="Enter Band UID"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-orange-600 text-white hover:bg-orange-700 text-sm"
              >
                Add Patient
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
