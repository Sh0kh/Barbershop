import { NavLink, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { useEffect, useState } from "react";
import ReactLoading from 'react-loading';
import { Calendar, Scissors } from "lucide-react";
import Comment from "@mui/icons-material/Comment";

export default function BarbersInfo() {
  const { t, i18n } = useTranslation();
  const { ID } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const getBarber = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/barbers/${ID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response?.data);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBarber();
  }, [ID]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <ReactLoading type="spinningBubbles" color="#1f2937" height={60} width={60} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Xatolik yuz berdi</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <NavLink to="/admin/barbers" className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
            Orqaga qaytish
          </NavLink>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Ma'lumot topilmadi</h3>
          <p className="text-gray-600 mb-6">Barber ma'lumotlari topilmadi</p>
          <NavLink to="/admin/barbers" className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
            Orqaga qaytish
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[70px]">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <NavLink
              to="/admin/barbers"
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </NavLink>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Barber Ma'lumotlari</h1>
              <p className="text-sm text-gray-500">Barber haqida batafsil ma'lumot</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="relative h-64 bg-gradient-to-r from-gray-800 to-gray-900">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative h-full flex items-end p-8">
              <div className="flex items-end gap-6">
                <div className="relative">
                  <img
                    src={data.image}
                    alt={`${data.name} ${data.lastname}`}
                    className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="text-white pb-2">
                  <h2 className="text-3xl font-bold mb-2">{data.name} {data.lastname}</h2>
                  <p className="text-xl mb-1 text-gray-200 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zM9 11a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
                    </svg>
                    {data.role}
                  </p>
                  <h2 className="text-xl text-gray-200"> {data.phone}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <NavLink
                to={`/admin/barber/service/${ID}`}
                className="group flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Scissors size={32} className="text-blue-600 group-hover:text-blue-800" />
                <span className="mt-2 text-lg font-semibold text-blue-600 group-hover:text-blue-800">Xizmatlar</span>
              </NavLink>

              <NavLink
                to={`/admin/barber/work-time/${ID}`}
                className="group flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Calendar size={32} className="text-green-600 group-hover:text-green-800" />
                <span className="mt-2 text-lg font-semibold text-green-600 group-hover:text-green-800">Ish vaqti</span>
              </NavLink>

              <NavLink
                to={`/admin/barber/day-off/${ID}`}
                className="group flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Calendar size={32} className="text-purple-600 group-hover:text-purple-800" />
                <span className="mt-2 text-lg font-semibold text-purple-600 group-hover:text-purple-800">Dam olish kuni</span>
              </NavLink>

              <NavLink
                to={`/admin/barber/comment/${ID}`}
              className="group flex flex-col items-center justify-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
              >
              <Comment size={32} className="text-yellow-600 group-hover:text-yellow-800" />
              <span className="mt-2 text-lg font-semibold text-yellow-600 group-hover:text-yellow-800">Commentlar</span>
            </NavLink>
          </div>


        </div>
      </div>
    </div>
    </div >
  );
}