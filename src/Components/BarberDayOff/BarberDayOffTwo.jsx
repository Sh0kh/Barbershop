import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from 'react-loading';
import { $api } from "../../utils";
import { Button } from "@material-tailwind/react";
import Calendar from "./Calendar";
import Swal from "sweetalert2";


export default function BarberDayOffTwo() {
    const navigate = useNavigate();
    const [day_off, setday_off] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDayOff, setIsDayOff] = useState(false);
    const [selectedDayOffId, setSelectedDayOffId] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    const handleLogout = () => {
        navigate(-1);
    };

    const getday_off = async () => {
        setLoading(true);
        try {
            const response = await $api.get(`dayoff`);
            setday_off(response?.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getday_off();
    }, []);

    const formatDateForApi = (date) => {
        // Create a new date object to avoid timezone issues
        const localDate = new Date(date);
        // Set time to noon to avoid timezone shifts
        localDate.setHours(12);

        const year = localDate.getFullYear();
        const month = String(localDate.getMonth() + 1).padStart(2, '0');
        const day = String(localDate.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const checkIfDayOff = (date) => {
        const formattedSelectedDate = formatDateForApi(date);

        const dayOffItem = day_off.find(item => {
            // Using substring to ensure we're comparing just the date part YYYY-MM-DD
            const dayOffDate = item.day_off.substring(0, 10);
            return dayOffDate === formattedSelectedDate;
        });

        if (dayOffItem) {
            setIsDayOff(true);
            setSelectedDayOffId(dayOffItem.id);
        } else {
            setIsDayOff(false);
            setSelectedDayOffId(null);
        }
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        checkIfDayOff(date);
    };

    const createDayOff = async () => {
        if (!selectedDate) return;

        setActionLoading(true);
        try {
            const formattedDate = formatDateForApi(selectedDate);
            await $api.post(`dayoff`, { day_off: formattedDate });
            await getday_off(); // Refresh the list
            setIsDayOff(true);
        } catch (error) {
            console.error("Error creating day off:", error);
            Swal.fire({
                title: "Xato!",
                text: error.response?.data?.message || "Xatolik yuz berdi.",
                icon: "error",
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false
            });
        } finally {
            setActionLoading(false);
        }
    };

    const deleteDayOff = async () => {
        if (!selectedDayOffId) return;

        setActionLoading(true);
        try {
            await $api.delete(`dayoff/${selectedDayOffId}`);
            await getday_off(); // Refresh the list
            setIsDayOff(false);
            setSelectedDayOffId(null);
        } catch (error) {
            console.error("Error deleting day off:", error);
            Swal.fire({
                title: "Xato!",
                text: error.response?.data?.message || "Xatolik yuz berdi.",
                icon: "error",
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false
            });
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="mx-auto max-w-[600px] pb-24 min-h-screen p-4">
                <div className="mb-6 p-4 bg-white h-[100%] rounded-lg shadow">
                    <div className="flex items-center justify-center h-screen">
                        <ReactLoading type="spinningBubbles" color="black" height={80} width={80} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-[1000px] pb-24 min-h-screen p-4">
            <div className="mb-1 p-4 bg-white rounded-lg shadow">
                <div className="flex justify-between items-center">
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Ortga
                    </button>
                </div>
            </div>

            <div className="rounded-lg mb-4">
                <div className="mb-2 p-2">
                    <h2 className="text-lg font-semibold">Dam olish kunini tanlang</h2>
                </div>
                <div className="mb-6 p-3 bg-white rounded-lg shadow">
                    {/* Calendar component with day off dates */}
                    <Calendar
                        onDateSelect={handleDateSelect}
                        dayOffDates={day_off}
                    />
                </div>
            </div>

            {selectedDate && (
                <div className="p-4 bg-white rounded-lg shadow">
                    <h3 className="font-medium mb-2">Tanlangan sana:</h3>
                    <p className="text-gray-700 mb-4">
                        {(() => {
                            const uzMonths = [
                                'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
                                'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'
                            ];
                            const day = selectedDate.getDate();
                            const month = uzMonths[selectedDate.getMonth()];
                            const year = selectedDate.getFullYear();

                            return `${day} ${month} ${year}`;
                        })()}
                    </p>


                    {isDayOff ? (
                        <Button
                            color="red"
                            className="w-full py-2 rounded"
                            onClick={deleteDayOff}
                            disabled={actionLoading}
                        >
                            {actionLoading ? "Yuklanmoqda..." : "Dam olish kunini o'chirish"}
                        </Button>
                    ) : (
                        <Button
                            color="blue"
                            className="w-full py-2 rounded"
                            onClick={createDayOff}
                            disabled={actionLoading}
                        >
                            {actionLoading ? "Yuklanmoqda..." : "Dam olish kunini yaratish"}
                        </Button>
                    )}
                </div>
            )}

            {day_off.length > 0 && (
                <div className="mt-4 p-4 bg-white rounded-lg shadow">
                    <h3 className="font-medium mb-2">Mavjud dam olish kunlari:</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {day_off.map((item) => {
                            const uzMonthsShort = [
                                'yan', 'fev', 'mar', 'apr', 'may', 'iyn',
                                'iyl', 'avg', 'sen', 'okt', 'noy', 'dek'
                            ];
                            const date = new Date(item.day_off);
                            const day = date.getDate();
                            const month = uzMonthsShort[date.getMonth()];

                            return (
                                <div
                                    key={item.id}
                                    className="bg-blue-100 p-2 rounded text-center"
                                >
                                    {`${day} ${month}`}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}