export default function RecentAlerts({ alertTimeline }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Alerts
      </h3>
      <div className="space-y-3">
        {alertTimeline.map((alert) => (
          <div key={alert.id} className="flex items-start">
            <div
              className={`mt-1 h-2 w-2 rounded-full ${
                alert.urgency === "high"
                  ? "bg-red-500"
                  : alert.urgency === "medium"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            ></div>
            <div className="ml-3 text-sm">
              <p className="font-medium text-gray-900">{alert.patient}</p>
              <p className="text-gray-600">{alert.type}</p>
              <p className="text-xs text-gray-400">{alert.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
