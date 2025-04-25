export default function HubDetails({ hubData }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Hub Details</h3>
      <div className="space-y-4">
        {hubData.map((hub, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: hub.color }}
                ></div>
                <h4 className="text-sm font-medium text-gray-900 ml-2">
                  {hub.name}
                </h4>
              </div>
              <span className="text-xs text-orange-600">
                {hub.occupied + hub.available} beds
              </span>
            </div>
            <div className="text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Occupied:</span>
                <span className="font-medium">{hub.occupied}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Available:</span>
                <span className="font-medium">{hub.available}</span>
              </div>
              <div className="mt-2 h-1 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-orange-400 rounded-full"
                  style={{
                    width: `${
                      (hub.occupied / (hub.occupied + hub.available)) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
