import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { $api } from "../../utils";
import Edit from "../UI/Icons/Edit";
import Delete from "../UI/Icons/Delete";
import ReactLoading from 'react-loading';
import AddAdminBarberService from "./components/AddAdminBarberService";
import AdminServiceDelete from "./components/AdminServiceDelete";
import AdminServiceEdit from "./components/AdminServiceEdit";

export default function AdminBarberService() {
    const { ID } = useParams();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    const [editModal, setEditModal] = useState(false)
    const [editData, setEditData] = useState()


    const getAllService = async () => {
        setLoading(true);
        try {
            const response = await $api.get(`barber-service/${ID}`);
            setServices(response?.data || []);
        } catch (error) {
            console.error("Ma'lumotlarni yuklashda xatolik:", error);
            setServices([]);
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
            <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 p-6">
                <div className="text-center">
                    <ReactLoading type="spinningBubbles" color="#1F2937" height={60} width={60} />
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full pb-24 min-h-screen px-4 mt-[80px]">
            {/* Header */}
            <div className="mb-6 p-6 bg-white rounded-xl shadow-lg">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {services?.user?.name || "Noma'lum"}
                    </h1>
                    <button onClick={() => setOpenModal(true)} className="px-4 py-2 bg-black text-white rounded">
                        Hizmat qo'shish
                    </button>
                </div>
            </div>

            {/* Empty state */}
            {!services?.service || services.service.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-gray-300" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-700 mt-4">Xizmatlar topilmadi</h3>
                    <p className="text-gray-500 mt-2">Bu barber uchun hali xizmatlar qo'shilmagan.</p>
                </div>
            ) : (
                /* Services list */
                <div className="space-y-6">
                    {services.service.map((item, index) => (
                        <div key={index}
                            className="bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-6">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-800">{item.name_uz}</h3>
                                    <p className="text-gray-600 mt-2">{item.description_uz}</p>
                                    <span className="font-bold text-lg text-indigo-600 mt-3 block">
                                        {Number(item.price).toLocaleString('ru-RU')} so'm
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={()=>{setEditData(item); setEditModal(true)}}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                                        title="Tahrirlash"
                                    >
                                        <Edit size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-all"
                                        title="O'chirish"
                                    >
                                        <Delete size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for delete */}
            <AdminServiceDelete refresh={getAllService} id={deleteId} isOpen={deleteModal} onClose={() => setDeleteModal(false)} />
            <AddAdminBarberService open={openModal} onClose={() => setOpenModal(false)} refresh={getAllService} />
            <AdminServiceEdit open={editModal} onClose={() => setEditModal(false)} data={editData} refresh={getAllService} />
        </div>
    );
}