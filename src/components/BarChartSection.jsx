import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";

export default function BarChartSection({ growthData, loading }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Bed Status</h3>
      {loading ? (
        <div className="animate-pulse space-y-2">
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={growthData}>
            <XAxis dataKey="month" />
            <Tooltip />
            <Bar
              dataKey="completed"
              fill="#F97316"
              name="Completed"
              barSize={20}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="pending"
              fill="#FDBA74"
              name="Pending"
              barSize={20}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
