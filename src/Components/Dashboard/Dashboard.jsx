import { useState } from "react";

export default function Dashboard() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      clientName: "Abdulaziz Karimov",
      phone: "+998 90 123 45 67",
      services: ["Soch olish (klassik)", "Soqol olish"],
      price: 120000,
      date: "2025-05-09T14:30:00",
      barber: "Jasur Aliyev",
      status: "kutilmoqda" 
    },
    {
      id: 2,
      clientName: "Firdavs Toshmatov",
      phone: "+998 99 765 43 21",
      services: ["Fade soch olish", "Yuz massaji"],
      price: 150000,
      date: "2025-05-09T16:00:00",
      barber: "Oybek Qodirov",
      status: "bajarilmoqda"
    },
    {
      id: 3,
      clientName: "Bobur Mamatov",
      phone: "+998 93 456 78 90",
      services: ["VIP soch olish", "Soqol shakllantirish", "Yuz parvarishi"],
      price: 200000,
      date: "2025-05-09T17:30:00",
      barber: "Jasur Aliyev",
      status: "bajarildi"
    },
    {
      id: 4,
      clientName: "Firdavs Umarov",
      phone: "+998 97 234 56 78",
      services: ["Bola soch olish", "Quloq atrofi tozalash"],
      price: 80000,
      date: "2025-05-10T10:00:00",
      barber: "Sardor Bahodirov",
      status: "kutilmoqda"
    },
    {
      id: 5,
      clientName: "Javohir Solijonov",
      phone: "+998 94 876 54 32",
      services: ["Soch bo'yash", "Soch olish (zamonaviy)"],
      price: 250000,
      date: "2025-05-10T11:30:00",
      barber: "Oybek Qodirov",
      status: "kutilmoqda"
    }
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const statusColors = {
    kutilmoqda: "bg-blue-100 text-blue-800",
    bajarilmoqda: "bg-yellow-100 text-yellow-800",
    bajarildi: "bg-green-100 text-green-800"
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}.${month}.${year} - ${hours}:${minutes}`;
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";
  };

  const handleEdit = (orderId) => {
    // Bu yerda edit logikasi bo'lishi kerak
    console.log("Edit order:", orderId);
    alert(`Edit order with ID: ${orderId}`);
  };

  const handleDeleteClick = (orderId) => {
    setOrderToDelete(orderId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setOrders(orders.filter(order => order.id !== orderToDelete));
    setShowDeleteModal(false);
    setOrderToDelete(null);
  };

  const handleCreate = () => {
    console.log("Create new order");
    alert("Create new order clicked");
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">{order.clientName}</h3>
                <p className="text-gray-600">{order.phone}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                {order.status === "kutilmoqda" ? "Kutilmoqda" : 
                 order.status === "bajarilmoqda" ? "Bajarilmoqda" : "Bajarildi"}
              </span>
            </div>
            
            <div className="border-t border-gray-100 pt-4 mb-4">
              <h4 className="text-sm font-semibold text-gray-500 mb-2">XIZMATLAR:</h4>
              <ul className="space-y-1">
                {order.services.map((service, idx) => (
                  <li key={idx} className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div>
                <p className="font-semibold text-gray-700">{formatPrice(order.price)}</p>
                <p className="text-gray-500">{formatDate(order.date)}</p>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-gray-700">{order.barber}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button 
                onClick={() => handleEdit(order.id)}
                className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-sm hover:bg-blue-100 transition flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button 
                onClick={() => handleDeleteClick(order.id)}
                className="px-3 py-1 bg-red-50 text-red-600 rounded-md text-sm hover:bg-red-100 transition flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

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