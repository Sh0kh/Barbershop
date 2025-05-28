import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import BarberCreate from "./BarbersCreate";
import BarberEdit from "./BarbersEdit";
import Delete from "../../../UI/Icons/Delete";
import Edit from "../../../UI/Icons/Edit";
import ReactLoading from 'react-loading';
import FotoPerson from '../../../UI/Icons/FotoPerson.jpg'

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

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Card click eventini to'xtatish
    e.preventDefault(); // NavLink navigatsiyasini to'xtatish

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

  const handleEdit = (barber, e) => {
    e.stopPropagation(); // Card click eventini to'xtatish
    e.preventDefault(); // NavLink navigatsiyasini to'xtatish
    setSelectedBarber(barber);
    setIsEditOpen(true);
  };

  useEffect(() => {
    fetchBarbers();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <ReactLoading type="spinningBubbles" color="black" height={80} width={80} />
      </div>
    );
  }

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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Barberlar</h1>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="bg-black text-white px-5 py-2 rounded-lg shadow-md border border-gray-800 transition-all duration-300 hover:bg-white hover:text-black focus:outline-none"
          >
            + Barber qo'shish
          </button>
        </div>

        {barbers?.length <= 0 ? (
          <div className="mx-auto min-h-screen mt-4">
            <div className="mb-6 p-4 bg-white h-[100%] rounded-lg shadow">
              <div className="flex flex-col items-center justify-center h-screen text-center px-4">
                <div className="text-gray-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Ma'lumot topilmadi</h3>
                <p className="text-sm text-gray-500 max-w-xs">
                  Hozircha ma'lumot yo'q
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {barbers?.map((barber) => (
              <NavLink
                key={barber.id}
                to={`info/${barber.id}`}
                className="bg-white  rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-200 overflow-hidden block"
              >
                <div className="relative">
                  <img
                    src={barber.image || FotoPerson}
                    alt={barber.name}
                    className="w-full h-48 object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
                    {barber.name} {barber.lastname}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600 flex items-center">
                      <span className="font-medium">Telefon:</span>
                      <span className="ml-2">{barber.phone}</span>
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <span className="font-medium">Mutaxassislik:</span>
                      <span className="ml-2 truncate">{barber.role}</span>
                    </p>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={(e) => handleEdit(barber, e)}
                      className="text-yellow-600 hover:text-yellow-800 hover:bg-yellow-100 p-2 rounded-full transition-all duration-200"
                      title="Tahrirlash"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={(e) => handleDelete(barber.id, e)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-full transition-all duration-200"
                      title="O'chirish"
                    >
                      <Delete size={18} />
                    </button>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </>
  );
}