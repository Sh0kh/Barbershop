import { useEffect } from "react";
import Edit from "../../../UI/Icons/Edit";
import DeleteIcon from "../../../UI/Icons/Delete";
import Swal from 'sweetalert2';
import { $api } from "../../../../utils";
import { NavLink } from "react-router-dom";

export default function Orders({ orders, error, refresh }) {
  const formatPrice = (price) => {
    // Обработка строкового формата цены, например "30000.00"
    const numPrice = parseFloat(price);
    return numPrice.toLocaleString("uz-UZ") + " so'm";
  };

  const formatDate = (dateStr) => {
    // Форматирование даты в виде "May 22 14:00"
    const date = new Date(dateStr);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${month} ${day} ${hours}:${minutes}`;
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Ishonchingiz komilmi?",
      text: "Bu buyurtmani o'chirishni xohlaysizmi?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Ha, o'chirish!",
      cancelButtonText: "Bekor qilish",
    });

    if (result.isConfirmed) {
      try {
        await $api.delete(`/admin/notifications/${id}`);
        Swal.fire({
          title: "O'chirildi!",
          icon: "success",
          timer: 2000,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });
        refresh();
      } catch (error) {
        Swal.fire({
          title: "Xato!",
          text: error.response?.data?.message || "O'chirishda xatolik.",
          icon: "error",
        });
      }
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-6 rounded-lg text-red-700">
          <h2 className="text-xl font-bold">Xatolik yuz berdi</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 rounded-[5px]">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Buyurtmalar</h1>
          <div className="bg-white shadow-sm rounded-lg px-4 py-2">
            <span className="text-gray-500">Jami: </span>
            <span className="font-bold">{orders?.length || 0}</span>
          </div>
        </div>

        {orders?.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-10 text-center">
            <p className="text-xl text-gray-500">Buyurtmalar mavjud emas</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {orders?.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Заголовок карточки с информацией о клиенте */}
                <div className="bg-gray-50 p-4 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center text-blue-600 font-semibold">
                        {order?.data?.user_name?.charAt(0).toUpperCase() || "?"}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{order?.data?.user_name}</h3>
                        <p className="text-gray-600 text-sm">{order?.data?.user_phone}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition flex items-center gap-1"
                        onClick={() => handleDelete(order?.id)}
                        aria-label="Delete order"
                      >
                        <DeleteIcon size={18} />
                        <span className="text-sm hidden sm:inline">O'chirish</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Основная информация о заказе */}
                <div className="p-4">
                  {/* Информация о барбере и времени */}
                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-500 text-sm block mb-1">Barber:</span>
                      <p className="text-gray-800 font-medium">
                        {order.data?.barber_name || "Not specified"} {order?.data?.barber_lastname}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-500 text-sm block mb-1">Vaqt:</span>
                      <p className="text-gray-800 font-medium">{formatDate(order.data?.booking_time)}</p>
                    </div>
                  </div>

                  {/* Список услуг */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Xizmatlar:</h4>
                    <div className="space-y-2">
                      {order?.data?.services?.map((item, serviceIndex) => (
                        <div
                          key={serviceIndex}
                          className="border border-gray-100 p-3 rounded-lg flex justify-between items-center"
                        >
                          <p className="text-gray-700">
                            <span className="text-gray-500 mr-1">{serviceIndex + 1}.</span>
                            {item?.name_uz}
                          </p>
                          <p className="text-blue-600 font-medium">{formatPrice(item?.price)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Общая сумма */}
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Jami summa:</span>
                      <span className="font-bold text-lg">
                        {order?.data?.services?.reduce((sum, service) => {
                          // Обработка как числового, так и строкового формата цены
                          const servicePrice = typeof service.price === 'string'
                            ? parseFloat(service.price)
                            : service.price;
                          return sum + servicePrice;
                        }, 0).toLocaleString("uz-UZ") + " so'm"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}