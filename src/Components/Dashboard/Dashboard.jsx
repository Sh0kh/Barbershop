import { useState, useEffect } from "react";
import Orders from "./components/Orders/Orders";
import { $api } from "../../utils";
import OrderCreate from "./components/Orders/OrderCreate";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await $api.get("/orders");
      setOrders(response.data);
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Buyurtmalarni yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";
  };

  const handleCreate = () => {
    setIsCreateOpen(true);
  };

  const confirmDelete = () => {
    setOrders(orders.filter(order => order.id !== orderToDelete));
    setShowDeleteModal(false);
    setOrderToDelete(null);
  };

  if (loading) return (
    <div className="pt-[80px] px-4 bg-[#f8f9ff] min-h-screen flex items-center justify-center">
      <p className="text-xl">Yuklanmoqda...</p>
    </div>
  );

  if (error) return (
    <div className="pt-[80px] px-4 bg-[#f8f9ff] min-h-screen flex items-center justify-center">
      <p className="text-xl text-red-500">Xatolik: {error}</p>
    </div>
  );

  return (
    <div className="pt-[80px] px-4 bg-[#f8f9ff] min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-sm text-gray-500 mb-8">Barber Shop buyurtmalari</p>

      <div className="mb-6">
        <button 
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Yangi buyurtma
        </button>

        <OrderCreate
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          refresh={fetchOrders}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Bugungi buyurtmalar</p>
              <h2 className="text-3xl font-bold">{orders.filter(order => new Date(order.date).toDateString() === new Date().toDateString()).length}</h2>
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
              <p className="text-gray-500 text-sm">Bajarilgan buyurtmalar</p>
              <h2 className="text-3xl font-bold">{orders.filter(order => order.status === "bajarildi").length}</h2>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Jami daromad</p>
              <h2 className="text-3xl font-bold">{formatPrice(orders.reduce((sum, order) => sum + order.price, 0))}</h2>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <Orders orders={orders} loading={false} error={null} />

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Buyurtmani o'chirish</h3>
            <p className="text-gray-600 mb-6">Haqiqatan ham bu buyurtmani o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi.</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Bekor qilish
              </button>
              <button 
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}