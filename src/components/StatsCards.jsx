export default function StatsCards({ cardsData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {cardsData.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center"
        >
          <div className={`p-2 ${card.bgColor} rounded-full mr-3`}>
            <div className={card.color}>{card.icon}</div>
          </div>
          <div>
            <p className="text-sm text-gray-600">{card.title}</p>
            <p className="text-xl font-semibold text-gray-900">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
