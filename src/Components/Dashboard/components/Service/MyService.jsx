import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { $api } from "../../../../utils";
import Edit from "../../../UI/Icons/Edit";
import Delete from "../../../UI/Icons/Delete";
import ReactLoading from 'react-loading';
import BarberServiceDelete from "../../../BarberService/BarberServiceDelete";

export default function MyService() {

  const navigate = useNavigate()

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState('')

  const handleLogout = () => {
    navigate(-1)
  };

  const getAllService = async () => {
    setLoading(true)
    try {
      const response = await $api.get(`services`)
      setServices(response?.data?.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllService()
  }, [])


  const handleDelete = (itemId) => {
    setDeleteModal(true)
    setDeleteId(itemId)
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-[600px] pb-24 min-h-screen p-4">
        <div className="mb-6 p-4 bg-white h-[100%] rounded-lg shadow  ">
          <div className="flex items-center justify-center h-screen ">
            <ReactLoading type="spinningBubbles" color="black" height={80} width={80} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[600px] pb-24  min-h-screen p-4">
      <div className="mb-1 p-4 bg-white rounded-lg shadow  ">

        <div className="flex justify-between items-center ">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Ortga
          </button>
          <NavLink to={'/barber/dashboard/service/create'}>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              + Yangi xizmat qo‘shish
            </button>
          </NavLink>
        </div>
      </div>

      <div className="rounded-lg mb-4">
        <div className="mb-2 p-2">

        </div>
        <div className="mb-6 p-4 bg-white rounded-lg shadow  ">
          {services?.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className="mb-4 last:mb-0 border-2 border-black p-4 rounded-lg"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{item.name_uz}</h3>
                  <p className="text-sm text-gray-500 mt-1">60 daqiqa</p>
                  <p className="text-sm text-gray-600 mt-1">{item.description_uz}</p>
                  <span className="font-semibold text-gray-800 mt-2 block text-sm">
                    {String(item?.price)?.slice(0, -3)?.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} uzs
                  </span>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <NavLink to={`/barber/dashboard/service/edit/${item?.id}`}>
                    <button
                      className="text-black hover:text-yellow-800 hover:bg-yellow-100 p-2 rounded-full transition"
                      title="Tahrirlash"
                    >
                      <Edit />
                    </button>
                  </NavLink>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-black hover:text-red-800 hover:bg-red-100 p-2 rounded-full transition flex items-center justify-center"
                    title="O'chirish"
                  >
                    <Delete size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BarberServiceDelete refresh={getAllService} id={deleteId} isOpen={deleteModal} onClose={() => setDeleteModal(false)} />
    </div>
  );
}
