import { useState, useEffect } from "react";
import { User, Edit } from "lucide-react";
import { $api } from "../../../utils";
import ProfileEdit from "./Profile/ProfileEdit";

export default function BarberProfile() {
    const [barber, setBarber] = useState({
        id: null,
        image: null,
        username: "",
        name: "",
        lastname: "",
        phone: "",
        role: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const fetchBarberData = async () => {
        try {
            setLoading(true);
            const response = await $api.get("/profile"); 
            setBarber(response.data.data);
        } catch (err) {
            setError(err.response?.data?.message || "Profil ma'lumotlarini olishda xatolik yuz berdi");
            console.error("Xatolik:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBarberData();
    }, []); 

    const handleEditClick = () => {
        setIsEditOpen(true);
    };

    if (loading) {
        return <div className="flex justify-center py-8">Yuklanmoqda...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-8">{error}</div>;
    }

    return (
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
                <button 
                    className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full text-white"
                    onClick={handleEditClick}
                >
                    <Edit size={16} />
                </button>
            </div>
            <h1 className="mt-2 text-xl font-bold">{barber.name}</h1>
            <h1 className="text-lg">{barber.lastname}</h1>
            <div className="flex mt-2 text-sm text-gray-600">
                {barber.phone && <p>{barber.phone}</p>}
            </div>

            <ProfileEdit
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                refresh={fetchBarberData}
                barber={barber}
            />
        </div>
    );
}