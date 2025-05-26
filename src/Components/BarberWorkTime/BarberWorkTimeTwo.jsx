import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ReactLoading from 'react-loading';
import { $api } from "../../utils";
import BarberWorkTimeCreate from "./Components/BarberWorkTimeCreate";
import Edit from "../UI/Icons/Edit";
import Delete from "../UI/Icons/Delete";
import { Button } from "@material-tailwind/react";
import BarberWorkTimeDelete from "./Components/BarberWorkTimeDelete";
import BarberWorkTimeEdit from "./Components/BarberWorkTimeEdit";

export default function BarberWorkTimeTwo() {

    const navigate = useNavigate()

    const [WorkTime, setWorkTime] = useState([]);
    const [loading, setLoading] = useState(true)
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState('')

    const [EditModal, setEditModal] = useState(false)
    const [EditData, setEditData] = useState(null)

    const handleLogout = () => {
        navigate(-1)
    };

    const getWorkTime = async () => {
        setLoading(true)
        try {
            const response = await $api.get(`worktime`)
            setWorkTime(response?.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getWorkTime()
    }, [])


    const handleDelete = (itemId) => {
        setDeleteModal(true)
        setDeleteId(itemId)
    };
    const handleEdit = (item) => {
        setEditModal(true)
        setEditData(item)
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
        <div className="mx-auto max-w-[1000px] pb-24  min-h-screen p-4">
            <div className="mb-1 p-4 bg-white rounded-lg shadow  ">

                <div className="flex justify-between items-center ">
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Ortga
                    </button>
                    <BarberWorkTimeCreate refresh={getWorkTime} />
                </div>
            </div>
            {WorkTime === null || !WorkTime || WorkTime?.length === 0 ? (
                <div className="mx-auto min-h-screen mt-4">
                    <div className="mb-6 p-4 bg-white h-[100%] rounded-lg shadow  ">
                        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
                            <div className="text-gray-400 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-700 mb-2"> Ma'lumot topilmadi</h3>
                            <p className="text-sm text-gray-500 max-w-xs">
                                Hozircha hali ma'lumot yo‘q, iltimos, keyinroq urinib korishni so‘raymiz.
                            </p>
                        </div>
                    </div>
                </div >
            ) : (

                <div className="rounded-lg mb-4">
                    <div className="mb-2 p-2">

                    </div>
                    <div className="mb-6 p-3 bg-white rounded-lg shadow  ">
                        <div className="grid grid-cols-3  gap-2">
                            {WorkTime?.map((item, index) => {
                                const date = new Date(item.date);
                                const day = date.getDate();

                                // Кастомные названия месяцев на узбекском (латин)
                                const uzMonthNames = {
                                    0: "Yan",
                                    1: "Fev",
                                    2: "Mar",
                                    3: "Apr",
                                    4: "May",
                                    5: "Iyun",
                                    6: "Iyul",
                                    7: "Avg",
                                    8: "Sen",
                                    9: "Okt",
                                    10: "Noy",
                                    11: "Dek"
                                };

                                const month = uzMonthNames[date.getMonth()];

                                return (
                                    <div key={index} className="bg-white shadow-md rounded-lg p-1 gap-[20px] flex flex-col items-center text-center">
                                        <div className="mb-1">
                                            <div className="text-[15px] font-bold">{day}</div>
                                            <div className="text-gray-500 text-[15px] uppercase">{month}</div>
                                        </div>
                                        <div className="flex justify-center gap-[5px] mt-auto">
                                            <Button
                                                onClick={() => handleEdit(item)}
                                                className="py-[5px] px-[9px]"
                                                variant="gradient" color="blue" >
                                                <Edit />
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(item?.id)}
                                                className="py-[5px] px-[12px]"
                                                variant="gradient" color="blue" >
                                                <Delete size={15} />
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
            <BarberWorkTimeDelete isOpen={deleteModal} onClose={() => setDeleteModal(false)} id={deleteId} refresh={getWorkTime} />
            <BarberWorkTimeEdit isOpen={EditModal} onClose={() => setEditModal(false)} data={EditData} refresh={getWorkTime} />
        </div>
    );
}
