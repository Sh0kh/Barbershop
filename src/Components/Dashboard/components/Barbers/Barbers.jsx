import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import BarberCreate from "./BarbersCreate";
import BarberEdit from "./BarbersEdit";

export default function Barbers() {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedBarber, setSelectedBarber] = useState(null);

  const token = localStorage.getItem("token"); 

  const fetchBarbers = async () => {
    try {
      const response = await axios.get("/barbers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBarbers(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Ishonchingiz komilmi?",
      text: "Bu sartaroshni o'chirishni xohlaysizmi?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Ha, o'chir!",
      cancelButtonText: "Bekor qilish",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/barbers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBarbers(barbers.filter((barber) => barber.id !== id));

        Swal.fire({
          title: "O'chirildi!",
          icon: "success",
          timer: 2000,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          title: "Xato!",
          text: error.response?.data?.message || "O'chirishda xatolik.",
          icon: "error",
        });
      }
    }
  };

  useEffect(() => {
    fetchBarbers();
  }, []);

  if (loading) return <div className="text-center py-10">Yuklanmoqda...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Xatolik yuz berdi: {error}
      </div>
    );

  return (
    <>
      <BarberCreate
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        refresh={fetchBarbers}
      />

      <BarberEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        refresh={fetchBarbers}
        barber={selectedBarber}
      />

      <div className="pt-[75px] pb-[50px] px-4 md:px-6 lg:px-8 max-w-[1200px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Sartaroshlar</h1>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="bg-black text-white px-5 py-2 rounded-lg shadow-md border border-gray-800 transition-all duration-300 hover:bg-white hover:text-black focus:outline-none"
          >
            + Sartarosh qo'shish
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <table className="w-full table-auto">
            <thead className="bg-gray-100 text-left text-sm md:text-base text-gray-600">
              <tr>
                <th className="p-4 font-semibold">#</th>
                <th className="p-4 font-semibold">Rasm</th>
                <th className="p-4 font-semibold">Ismi</th>
                <th className="p-4 font-semibold">Username</th>

                <th className="p-4 font-semibold">Telefon</th>
                <th className="p-4 font-semibold">Mutaxassisligi</th>
                <th className="p-4 font-semibold text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {barbers?.map((barber, index) => (
                <tr
                  key={barber.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="p-4 text-gray-700">{index + 1}</td>
                  <td className="p-4">
                    <img
                      src={barber.image}
                      alt={barber.name}
                      className="w-10 h-10 object-cover rounded-full border-2 border-gray-300"
                      onClick={() =>
                        Swal.fire({
                          imageUrl: barber.image,
                          imageAlt: barber.name,
                          showConfirmButton: false,
                          width: 'auto',
                          padding: '1rem'
                        })
                      }
                      style={{ cursor: 'pointer' }}
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-800">{barber.name} {barber.lastname}</td>
                  <td className="p-4 font-medium text-gray-800">{barber.username}</td>

                  <td className="p-4 text-gray-600">{barber.phone}</td>
                  <td className="p-4 text-gray-600">{barber.role}</td>
                  <td className="p-4 flex justify-end space-x-2">
                    <button
                      onClick={() => {
                        setSelectedBarber(barber);
                        setIsEditOpen(true);
                      }}
                      className="text-yellow-600 hover:text-yellow-800 hover:bg-yellow-100 p-2 rounded-full transition"
                      title="Tahrirlash"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(barber.id)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-full transition"
                      title="O'chirish"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
