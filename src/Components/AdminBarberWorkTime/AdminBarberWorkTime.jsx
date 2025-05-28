import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactLoading from 'react-loading';
import { $api } from "../../utils";
import Edit from "../UI/Icons/Edit";
import Delete from "../UI/Icons/Delete";
import { Button } from "@material-tailwind/react";
import AdminBarberWorkTimeCreate from "./AdminBarberWorkTimeCreate";
import AdminBarbersWorkTimeDelete from "./AdminBarbersWorkTimeDelete";
import AdminBarberWorkTimeEdit from "./AdminBarberWorkTimeEdit";

export default function AdminBarberWorkTime() {
    const navigate = useNavigate();
    const { ID } = useParams();
    const [WorkTime, setWorkTime] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [EditModal, setEditModal] = useState(false);
    const [EditData, setEditData] = useState(null);

    const getWorkTime = async () => {
        setLoading(true);
        try {
            const response = await $api.get(`barber-worktime/${ID}`);
            setWorkTime(response?.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getWorkTime();
    }, []);

    const handleDelete = (itemId) => {
        setDeleteModal(true);
        setDeleteId(itemId);
    };

    const handleEdit = (item) => {
        setEditModal(true);
        setEditData(item);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <ReactLoading type="spinningBubbles" color="black" height={80} width={80} />
            </div>
        );
    }

    return (
        <div className="px-4 md:px-8 mt-[80px] pb-20 min-h-screen ">
            <div className="sticky top-20 z-10 bg-white rounded-xl shadow-md p-6 mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">
                    {WorkTime?.user?.name || "Noma'lum"}
                </h1>
                <AdminBarberWorkTimeCreate refresh={getWorkTime} />
            </div>

            {WorkTime?.work_time?.length === 0 ? (
                <div className="bg-white shadow-md rounded-xl py-12 px-6 text-center  mx-auto mt-12">
                    <div className="text-gray-400 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Ma'lumot topilmadi</h3>
                    <p className="text-sm text-gray-500">
                        Hozircha hali ma'lumot yo‘q, iltimos, keyinroq urinib ko‘ring.
                    </p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {WorkTime?.work_time?.map((item, index) => {
                        const date = new Date(item.date);
                        const day = date.getDate();
                        const uzMonthNames = {
                            0: "Yan", 1: "Fev", 2: "Mar", 3: "Apr", 4: "May", 5: "Iyun",
                            6: "Iyul", 7: "Avg", 8: "Sen", 9: "Okt", 10: "Noy", 11: "Dek"
                        };
                        const month = uzMonthNames[date.getMonth()];

                        return (
                            <div key={index} className="bg-white rounded-xl shadow hover:shadow-lg transition duration-200 p-4 flex flex-col items-center">
                                <div className="text-center mb-4">
                                    <div className="text-2xl font-bold text-gray-800">{day}</div>
                                    <div className="text-gray-500 text-sm uppercase">{month}</div>
                                </div>
                                <div className="flex gap-3 mt-auto">
                                    <Button onClick={() => handleEdit(item)} className="py-1 px-2" color="blue" variant="gradient">
                                        <Edit />
                                    </Button>
                                    <Button onClick={() => handleDelete(item.id)} className="py-1 px-2" color="red" variant="gradient">
                                        <Delete size={18} />
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Модальные окна */}
            <AdminBarbersWorkTimeDelete
                isOpen={deleteModal}
                onClose={() => setDeleteModal(false)}
                id={deleteId}
                refresh={getWorkTime}
            />
            <AdminBarberWorkTimeEdit
                isOpen={EditModal}
                onClose={() => setEditModal(false)}
                data={EditData}
                refresh={getWorkTime}
            />
        </div>
    );
}
