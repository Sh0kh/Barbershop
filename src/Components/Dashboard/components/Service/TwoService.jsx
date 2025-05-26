import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { $api } from "../../../../utils";
import Edit from "../../../UI/Icons/Edit";
import Delete from "../../../UI/Icons/Delete";
import ReactLoading from 'react-loading';
import BarberServiceDelete from "../../../BarberService/BarberServiceDelete";
import { Button } from "@material-tailwind/react";

export default function TwoService() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const handleLogout = () => {
    navigate(-1);
  };

  const getAllService = async () => {
    setLoading(true);
    try {
      const response = await $api.get(`services`);
      setServices(response?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllService();
  }, []);

  const handleDelete = (itemId) => {
    setDeleteModal(true);
    setDeleteId(itemId);
  };

  if (loading) {
    return (
      <div className="mx-auto w-full pb-24 min-h-screen p-4">
        <div className="mb-6 p-4 bg-white h-[100%] rounded-lg shadow">
          <div className="flex items-center justify-center h-screen">
            <ReactLoading type="spinningBubbles" color="black" height={80} width={80} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-[1000px] pb-24 min-h-screen p-2">
      {/* Header section with back and create buttons */}
      <div className="mb-4 p-4 bg-white rounded-lg shadow">
        <div className="flex justify-between items-center">
          <button
            onClick={handleLogout}
            className="px-4 py-3 bg-red-500 text-white rounded hover:bg-red-600 text-lg"
          >
            Ortga
          </button>
          <NavLink to={'/barber/dashboard/service/create'}>
            <Button color="black" className="px-6 py-3 text-lg">
              Yaratish
            </Button>
          </NavLink>
        </div>
      </div>

      {/* Empty state */}
      {services?.length <= 0 || !services ? (
        <div className="mx-auto min-h-screen mt-4">
          <div className="mb-6 p-4 bg-white h-[100%] rounded-lg shadow">
            <div className="flex flex-col items-center justify-center h-screen text-center px-4">
              <div className="text-gray-400 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-3">Ma'lumot topilmadi</h3>
              <p className="text-base text-gray-500 max-w-xs">
                Hozircha hali ma'lumot yo'q, iltimos, keyinroq urinib ko'ring.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Services list */
        <div className="rounded-lg mb-4">
          <div className="mb-2 p-2"></div>
          <div className="mb-6 p-2 bg-white rounded-lg shadow">
            {services?.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="mb-4 last:mb-0 border-2 border-black p-4 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 text-xl">{item.name_uz}</h3>
                    <p className="text-base text-gray-600 mt-2">{item.description_uz}</p>
                    <span className="font-semibold text-gray-800 mt-3 block text-lg">
                      {String(item?.price)?.slice(0, -3)?.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} uzs
                    </span>
                  </div>
                  <div className="flex flex-col gap-3 ml-4">
                    <NavLink to={`/barber/dashboard/service/edit/${item?.id}`}>
                      <button
                        className="text-black hover:text-yellow-800 hover:bg-yellow-100 p-3 rounded-full transition"
                        title="Tahrirlash"
                      >
                        <Edit size={24} />
                      </button>
                    </NavLink>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-black hover:text-red-800 hover:bg-red-100 p-3 rounded-full transition flex items-center justify-center"
                      title="O'chirish"
                    >
                      <Delete size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <BarberServiceDelete refresh={getAllService} id={deleteId} isOpen={deleteModal} onClose={() => setDeleteModal(false)} />
    </div>
  );
}