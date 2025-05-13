import { NavLink, useNavigate } from "react-router-dom";
import { User, Edit, Scissors, Calendar, Clock } from "lucide-react";

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
            {/* Profile Section */}
            
            <div className="mb-6 p-4 bg-white rounded-lg shadow ">
                       <div className="mx-auto">
                <button 
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center justify-between  hover:bg-red-600 transition"
                >
                    <span>Chiqish</span>
                    <span className="ml-2">&#8594;</span> {/* Yo'naltiruvchi nuqta (→) */}
                </button>
                                 </div>

                <div className="flex flex-col items-center mb-4">
                    <div className="relative">
                        {barber.image ? (
                            <img 
                                src={barber.image} 
                                alt="berber rasmi" 
                                className="w-24 h-24 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                                <User size={40} className="text-gray-400" />
                            </div>
                        )}
                        <button className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full text-white">
                            <Edit size={16} />
                        </button>
                    </div>
                    <h1 className="mt-2 text-xl font-bold">{barber.name}</h1>
                    <h1 className="text-lg">{barber.surname}</h1>
                    <div className="flex mt-2 text-sm text-gray-600">
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                    <NavLink 
                        to="/berber/service" 
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

            {/* Logout Button */}
     

            {/* Quick Stats */}
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