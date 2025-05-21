import { useState, useEffect } from "react";
import Orders from "./components/Orders/Orders";
import { $api } from "../../utils";
import { NavLink } from "react-router-dom";
import ReactLoading from 'react-loading';


export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await $api.get("/admin/notifications");
      setOrders(response.data?.data);
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Buyurtmalarni yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const today = new Date();
  const todayBookingsCount = orders.filter(i => {
    const bookingDate = new Date(i?.data?.booking_time);
    return (
      bookingDate.getFullYear() === today.getFullYear() &&
      bookingDate.getMonth() === today.getMonth() &&
      bookingDate.getDate() === today.getDate()
    );
  }).length;



  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <ReactLoading type="spinningBubbles" color="black" height={80} width={80} />
      </div>
    );
  }

  if (error) return (
    <div className="pt-[80px] px-4 bg-[#f8f9ff] min-h-screen flex items-center justify-center">
      <p className="text-xl text-red-500">Xatolik: {error}</p>
    </div>
  );

  return (
    <div className="pt-[80px] px-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-sm text-gray-500 mb-8">Barber Shop buyurtmalari</p>

      <div className="mb-6">
        <NavLink to={'/admin/bron/create'}>
          <button

            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Yangi buyurtma
          </button>
        </NavLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Bugungi buyurtmalar</p>
              <h2 className="text-3xl font-bold">{todayBookingsCount}</h2>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Buyurtmalar</p>
              <h2 className="text-3xl font-bold">{orders?.length}</h2>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <Orders refresh={fetchOrders} orders={orders} loading={false} error={null} />
    </div>
  );
}