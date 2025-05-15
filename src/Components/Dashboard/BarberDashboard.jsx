import { NavLink, useNavigate } from "react-router-dom";
import { User, Edit, Scissors, Calendar, Clock } from "lucide-react";
import BarberProfile from "./components/BarberProfile";

export default function BarberDashboard() {
    const navigate = useNavigate();

    // Profile data
    const barber = {
        name: "Aziz",
        surname: "Usmanov",
        style: "Klassik",
        experience: "5 yil",
        image: null // In a real app, this would be an image URL
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');

        
        navigate('/login');
    };

    return (
        <div className="mx-auto max-w-[600px] pb-24 min-h-screen p-4">
            <div className="mb-6 p-4 bg-white rounded-lg shadow  ">
                       <div className="mx-auto flex items-center justify-between">
                <button 
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center justify-between  hover:bg-red-600 transition"
                >
                    <span>Chiqish</span>
                    <span className="ml-2">&#8594;</span> {/* Yo'naltiruvchi nuqta (→) */}
                </button>

                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 
                    2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
                </button>
                                 </div>

            

                <BarberProfile/>

                <div className="grid grid-cols-3 gap-3 mt-4">
                    <NavLink 
                        to="/berber/dashboard/service" 
                        className="flex flex-col items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 text-blue-700"
                    >
                        <Scissors size={24} />
                        <span className="mt-1 text-sm">Xizmatlar</span>
                    </NavLink>
                    <NavLink 
                        to="/berber/date" 
                        className="flex flex-col items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 text-blue-700"
                    >
                        <Calendar size={24} />
                        <span className="mt-1 text-sm">Kalendar</span>
                    </NavLink>
                    <NavLink 
                        to="/berber/orders" 
                        className="flex flex-col items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 text-blue-700"
                    >
                        <Clock size={24} />
                        <span className="mt-1 text-sm">Buyurtmalar</span>
                    </NavLink>
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-6 mt-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Bugungi</p>
                            <p className="text-xl font-bold">4</p>
                        </div>
                        <Clock className="text-blue-500" size={24} />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Jami</p>
                            <p className="text-xl font-bold">24</p>
                        </div>
                        <Scissors className="text-blue-500" size={24} />
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-3">Bugungi jadval</h2>
                <div className="space-y-3">
                    <div className="border rounded-lg p-3 flex items-center justify-between">
                        <div>
                            <p className="font-medium">Jasur Aliyev</p>
                            <p className="text-sm text-gray-500">Klassik soch kesish</p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                            14:30
                        </span>
                    </div>
                    <div className="border rounded-lg p-3 flex items-center justify-between">
                        <div>
                            <p className="font-medium">Dilshod Raxmonov</p>
                            <p className="text-sm text-gray-500">Soqol olish</p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                            16:00
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}