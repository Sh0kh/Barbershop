import { NavLink, useNavigate } from "react-router-dom";
import { User, Edit, Scissors, Calendar, Clock } from "lucide-react";
import BarberProfile from "./components/BarberProfile";
import { useState } from "react";
import { useEffect } from "react";
import ReactLoading from 'react-loading';
import { $api } from "../../utils";
import { Comment } from "@mui/icons-material";
import Delete from "../UI/Icons/Delete";
import Eye from "../UI/Icons/Eye";
import BarberOrderDelete from "./BarberOrderDelete";




export default function BarberDashboard() {
    const navigate = useNavigate();
    const [deleteModal, setDeleteModal] = useState()
    const [deleteId, setDeleteId] = useState()

    const [barber, setBarber] = useState({
        id: null,
        image: null,
        username: "",
        name: "",
        lastname: "",
        phone: "",
        role: ""
    });
    const [bronData, setBronData] = useState([])
    const [loading, setLoading] = useState(true);

    const fetchBarberData = async () => {
        try {
            setLoading(true);
            const response = await $api.get("/profile");
            setBarber(response.data.data);
        } catch (err) {
            console.error("Xatolik:", err);
        } finally {
            setLoading(false);
        }
    };

    const getBron = async () => {
        try {
            const response = await $api.get('/barber/notifications')
            setBronData(response?.data?.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBarberData();
        getBron()
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        navigate('/login');
    };

    const today = new Date();
    const todayBookingsCount = bronData.filter(i => {
        const bookingDate = new Date(i?.data?.booking_time);
        return (
            bookingDate.getFullYear() === today.getFullYear() &&
            bookingDate.getMonth() === today.getMonth() &&
            bookingDate.getDate() === today.getDate()
        );
    }).length;


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
        <div className="mx-auto max-w-[600px] pb-24 min-h-screen p-4">
            <div className="mb-6 p-4 bg-white rounded-lg shadow  ">
                <div className="mx-auto flex items-center justify-between">
                    <button>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 
                    2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg> */}
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center justify-between  hover:bg-red-600 transition"
                    >
                        <span>Chiqish</span>
                    </button>
                </div>
                <BarberProfile barber={barber} />
                <div className="grid grid-cols-2  gap-3 mt-4">
                    <NavLink
                        to="/berber/dashboard/service"
                        className="flex flex-col items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 text-blue-700"
                    >
                        <Scissors size={24} />
                        <span className="mt-1 text-sm">Xizmatlar</span>
                    </NavLink>
                    <NavLink
                        to="/barber/dashboard/workTime"
                        className="flex flex-col items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 text-blue-700"
                    >
                        <Calendar size={24} />
                        <span className="mt-1 text-sm">Ish vaqti</span>
                    </NavLink>
                </div>
                <div className="grid grid-cols-2  gap-3 mt-2">
                    <NavLink
                        to="/barber/dashboard/dayOff"
                        className="flex flex-col items-center  p-3 bg-blue-50 rounded-lg hover:bg-blue-100 text-blue-700"
                    >
                        <Calendar size={24} />
                        <span className="mt-1 text-sm">Dam olish kuni</span>
                    </NavLink>
                    <NavLink
                        to="/barber/dashboard/comment"
                        className="flex flex-col items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 text-blue-700"
                    >
                        <Comment size={24} />
                        <span className="mt-1 text-sm">Commentlar</span>
                    </NavLink>
                </div>

            </div>

            <div className="grid grid-cols-2 gap-3 mb-6 mt-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Bugungi</p>
                            <p className="text-xl font-bold">{todayBookingsCount}</p>
                        </div>
                        <Clock className="text-blue-500" size={24} />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Jami</p>
                            <p className="text-xl font-bold">{bronData?.length}</p>
                        </div>
                        <Scissors className="text-blue-500" size={24} />
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-3">Jadval</h2>
                <div className="space-y-3">
                    {bronData?.map((i, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-semibold text-lg text-gray-800">{i?.data?.user_name}</p>
                                    <p className="font-medium text-gray-600 my-1">{i?.data?.user_phone}</p>
                                    <p className="text-sm text-gray-500">Klassik soch kesish</p>
                                </div>
                                <span className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                                    {i?.data?.booking_time && (() => {
                                        const date = new Date(i.data.booking_time);
                                        const day = date.getDate();
                                        const month = date.toLocaleString('en-US', { month: 'short' }).toLowerCase(); // 'May' -> 'may'
                                        const hours = String(date.getHours()).padStart(2, '0');
                                        const minutes = String(date.getMinutes()).padStart(2, '0');
                                        return `${day} ${month} ${hours}:${minutes}`;
                                    })()}
                                </span>
                            </div>

                            <div className="w-full h-[1px] bg-gray-200 my-3"></div>

                            <div className="flex items-center justify-end gap-2 mt-3">
                                {/* <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center transition-colors duration-200">
                                    <Eye size={18} className="text-gray-700" />
                                </button> */}
                                <button onClick={()=>{setDeleteId(i?.id); setDeleteModal(true)}} className="px-4 text-[white] py-2 bg-[red] hover:bg-red-200 rounded-lg flex items-center justify-center transition-colors duration-200">
                                    <Delete size={18} className="text-red-800" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <BarberOrderDelete isOpen={deleteModal} onClose={()=>setDeleteModal(false)} refresh={getBron} id={deleteId}/>
        </div>
    );
}