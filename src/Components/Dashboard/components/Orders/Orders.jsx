import { useEffect } from "react";
import Edit from "../../../UI/Icons/Edit";
import DeleteIcon from "../../../UI/Icons/Delete";

// Импорт SweetAlert2
import Swal from 'sweetalert2';
import { $api } from "../../../../utils";


export default function Orders({ orders, error, refresh }) {

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

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Ishonchingiz komilmi?",
      text: "Bu barberni o'chirishni xohlaysizmi?",
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
        refresh()
      } catch (error) {
        Swal.fire({
          title: "Xato!",
          text: error.response?.data?.message || "O'chirishda xatolik.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Buyurtmalar</h1>
        <div className="space-y-6">
          {orders?.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{order?.data?.user_name}</h3>
                    <p className="text-gray-600">{order?.data?.user_phone}</p>
                  </div>
                  <div className="flex space-x-2">
                    {/* <button
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition"
                      onClick={() => console.log("Edit order", order.id)}
                      aria-label="Edit order"
                    >
                      <Edit />
                    </button> */}
                    <button
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full transition"
                      onClick={() => handleDelete(order?.id)}
                      aria-label="Delete order"
                    >
                      <DeleteIcon size={20} />
                    </button>
                  </div>
                </div>

                <div className="mt-6 border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Date:</span>
                      <p className="text-gray-800">{formatDate(order.data?.booking_time)}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Barber:</span>
                      <p className="text-gray-800">{order.barber || "Not specified"}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Total:</span>
                      <p className="text-gray-800">Not set</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}