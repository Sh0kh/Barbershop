import { useEffect } from "react";

export default function Orders({ orders, loading, error }) {

  const formatPrice = (price) =>
    price.toLocaleString("uz-UZ") + " so'm";

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusColors = {
    kutilmoqda: "bg-yellow-100 text-yellow-800",
    bajarilmoqda: "bg-blue-100 text-blue-800",
    bajarildi: "bg-green-100 text-green-800",
  };

  if (loading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-lg">{order.clientName}</h3>
              <p className="text-gray-600">{order.phone}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}
            >
              {order.status === "kutilmoqda"
                ? "Kutilmoqda"
                : order.status === "bajarilmoqda"
                ? "Bajarilmoqda"
                : "Bajarildi"}
            </span>
          </div>

          <div className="border-t border-gray-100 pt-4 mb-4">
            <h4 className="text-sm font-semibold text-gray-500 mb-2">XIZMATLAR:</h4>
            <ul className="space-y-1">
              {order.services.map((service, idx) => (
                <li key={idx} className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-700">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between items-center text-sm">
            <div>
              <p className="font-semibold text-gray-700">
                {formatPrice(order.price)}
              </p>
              <p className="text-gray-500">{formatDate(order.date)}</p>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-gray-700">{order.barber}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}