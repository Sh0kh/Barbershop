import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { $api } from "../../../../utils";

export default function OrderEdit() {
    // Состояния остаются теми же
    const [barbers, setBarbers] = useState([]);
    const [services, setServices] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedBarber, setSelectedBarber] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [clientName, setClientName] = useState("");
    const [phone, setPhone] = useState("");
    const [bookingTime, setBookingTime] = useState("");
    const [selectedService, setSelectedService] = useState("");
    const [servicePrice, setServicePrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);
    const [errors, setErrors] = useState({
        clientName: "",
        phone: "",
        barber: "",
        date: "",
        service: ""
    });

    // Валидация формы
    const validateForm = () => {
        const newErrors = {
            clientName: !clientName ? "Ism familiya kiritilishi shart" : "",
            phone: !phone ? "Telefon raqam kiritilishi shart" :
                !/^\+998[0-9]{9}$/.test(phone) ? "Noto'g'ri telefon raqam formati" : "",
            barber: !selectedBarber ? "Sartarosh tanlanishi shart" : "",
            date: !selectedDate ? "Sana tanlanishi shart" : "",
            service: !selectedService ? "Xizmat tanlanishi shart" : ""
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    // Обработчик отправки формы с валидацией
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const formattedBookingTime = bookingTime
                ? `${selectedDate} ${bookingTime}`
                : `${selectedDate} 11:00:00`;

            await $api.post("/bronAdmin", {
                user_id: selectedBarber,
                user_name: clientName,
                user_phone: phone,
                booking_time: formattedBookingTime,
                services: [
                    {
                        id: parseInt(selectedService),
                        price: servicePrice
                    }
                ]
            });

            Swal.fire({
                title: "Muvaffaqiyatli!",
                text: "Buyurtma yaratildi",
                icon: "success",
                timer: 3000,
                toast: true,
                position: "top-end"
            });

            resetForm();

        } catch (error) {
            console.error("Error creating order:", error);
            Swal.fire({
                title: "Xato!",
                text: error.response?.data?.message || "Buyurtma yaratishda xatolik",
                icon: "error",
                timer: 3000,
                toast: true,
                position: "top-end"
            });
        } finally {
            setLoading(false);
        }
    };

    // Загрузка барберов
    useEffect(() => {
        const fetchBarbers = async () => {
            try {
                setFetchingData(true);
                const response = await $api.get("/barbers");
                const data = response.data?.data || response.data || [];
                setBarbers(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching barbers:", error);
                Swal.fire({
                    title: "Xato!",
                    text: "Sartaroshlarni yuklashda xatolik yuz berdi",
                    icon: "error",
                    position: "top-end",
                    timer: 3000,
                    toast: true,
                });
            } finally {
                setFetchingData(false);
            }
        };
        fetchBarbers();
    }, []);

    // Загрузка услуг по выбранному барберу
    useEffect(() => {
        const fetchServices = async () => {
            if (!selectedBarber) {
                setServices([]);
                return;
            }
            try {
                setFetchingData(true);
                const response = await $api.get(`/service?user_id=${selectedBarber}`);
                const data = response.data?.data || response.data || [];
                setServices(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching services:", error);
                setServices([]);
                Swal.fire({
                    title: "Xato!",
                    text: "Xizmatlarni yuklashda xatolik yuz berdi",
                    icon: "error",
                    position: "top-end",
                    timer: 3000,
                    toast: true,
                });
            } finally {
                setFetchingData(false);
            }
        };
        fetchServices();
    }, [selectedBarber]);

    // Загрузка доступного времени
    useEffect(() => {
        const fetchAvailableTimes = async () => {
            if (!selectedBarber || !selectedDate) {
                setAvailableTimes([]);
                setBookingTime("");
                return;
            }
            try {
                setFetchingData(true);
                const response = await $api.get(
                    `/date/${selectedBarber}?date=${selectedDate}`
                );
                const times = response.data?.available_times || response.data || [];
                setAvailableTimes(Array.isArray(times) ? times : []);
            } catch (error) {
                console.error("Error fetching available times:", error);
                setAvailableTimes([]);
                Swal.fire({
                    title: "Xato!",
                    text: "Mavjud vaqtlarni yuklashda xatolik",
                    icon: "error",
                    position: "top-end",
                    timer: 3000,
                    toast: true,
                });
            } finally {
                setFetchingData(false);
            }
        };
        fetchAvailableTimes();
    }, [selectedBarber, selectedDate]);

    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/[^0-9+]/g, "");
        if (!value.startsWith("+998")) {
            value = "+998";
        }
        if (value.length <= 13) {
            setPhone(value);
        }
    };

    const resetForm = () => {
        setSelectedBarber("");
        setSelectedDate("");
        setClientName("");
        setPhone("");
        setBookingTime("");
        setSelectedService("");
        setServicePrice(0);
        setServices([]);
        setAvailableTimes([]);
    };

    const handleServiceChange = (e) => {
        const serviceId = e.target.value;
        setSelectedService(serviceId);
        if (serviceId) {
            const service = services.find(s => s.id.toString() === serviceId.toString());
            if (service) {
                setServicePrice(service.price);
            }
        } else {
            setServicePrice(0);
        }
    };


    function formatPrice(input) {
        const cleanedInput = input.includes('.') ? input.replace(/\.0+$/, '') : input;

        const digits = cleanedInput.replace(/\D/g, '');

        return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }


    return (
        <div className="pt-[80px] pb-8 px-4">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 transition-all duration-300">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Yangi buyurtma qilish</h2>

                {fetchingData ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Sartarosh */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Sartarosh</label>
                            <select
                                value={selectedBarber}
                                onChange={(e) => {
                                    setSelectedBarber(e.target.value);
                                    setSelectedService("");
                                    setServicePrice(0);
                                    setSelectedDate("");
                                    setBookingTime("");
                                    setErrors({ ...errors, barber: "" });
                                }}
                                className={`w-full p-2.5 text-sm border ${errors.barber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                            >
                                <option value="">Tanlang...</option>
                                {barbers.map((barber) => (
                                    <option key={barber.id} value={barber.id}>
                                        {barber.name}
                                    </option>
                                ))}
                            </select>
                            {errors.barber && <p className="mt-1 text-xs text-red-500">{errors.barber}</p>}
                        </div>

                        {/* Sana */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Sana</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => {
                                    setSelectedDate(e.target.value);
                                    setBookingTime("");
                                    setErrors({ ...errors, date: "" });
                                }}
                                min={new Date().toISOString().split('T')[0]}
                                className={`w-full p-2.5 text-sm border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                            />
                            {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
                        </div>

                        {/* Xizmat turi */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Xizmat turi</label>
                            {!selectedBarber ? (
                                <div className="p-2.5 text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-500">
                                    Iltimos, avval sartaroshni tanlang
                                </div>
                            ) : services.length === 0 ? (
                                <div className="p-2.5 text-sm bg-red-50 rounded-lg border border-red-200 text-red-500">
                                    Ushbu sartaroshda xizmatlar mavjud emas
                                </div>
                            ) : (
                                <>
                                    <select
                                        value={selectedService}
                                        onChange={(e) => {
                                            handleServiceChange(e);
                                            setErrors({ ...errors, service: "" });
                                        }}
                                        className={`w-full p-2.5 text-sm border ${errors.service ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                                    >
                                        <option value="">Tanlang...</option>
                                        {services.map((service) => (
                                            <option key={service.id} value={service.id}>
                                                {service.name_uz} - {formatPrice(service.price)} so'm
                                            </option>
                                        ))}
                                    </select>
                                    {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service}</p>}
                                </>
                            )}
                        </div>

                        {/* Mavjud vaqtlar */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Mavjud vaqtlar</label>
                            {!selectedDate ? (
                                <div className="p-2.5 text-sm bg-gray-50 rounded-lg border border-gray-200 text-gray-500">
                                    Iltimos, avval sanani tanlang
                                </div>
                            ) : availableTimes.length === 0 ? (
                                <div className="p-2.5 text-sm bg-yellow-50 rounded-lg border border-yellow-200 text-yellow-700">
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        <span>Ushbu kunga bo'sh vaqt mavjud emas</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative">
                                    <select
                                        value={bookingTime}
                                        onChange={(e) => setBookingTime(e.target.value)}
                                        className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none"
                                    >
                                        <option value="">Standart vaqt (11:00)</option>
                                        {availableTimes.map((time) => (
                                            <option key={time} value={time}>{time}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Narx */}
                        {selectedService && (
                            <div className="p-3 text-sm bg-blue-50 rounded-lg border border-blue-200">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-gray-700">Jami narx:</span>
                                    <span className="text-lg font-bold text-blue-600">{formatPrice(servicePrice)} so'm</span>
                                </div>
                            </div>
                        )}

                        {/* Mijoz ismi */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Mijoz ismi</label>
                            <input
                                type="text"
                                value={clientName}
                                onChange={(e) => {
                                    setClientName(e.target.value);
                                    setErrors({ ...errors, clientName: "" });
                                }}
                                placeholder="Ism familiya"
                                className={`w-full p-2.5 text-sm border ${errors.clientName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                            />
                            {errors.clientName && <p className="mt-1 text-xs text-red-500">{errors.clientName}</p>}
                        </div>

                        {/* Telefon raqam */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Telefon raqam</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => {
                                    handlePhoneChange(e);
                                    setErrors({ ...errors, phone: "" });
                                }}
                                placeholder="+998901234567"
                                className={`w-full p-2.5 text-sm border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                            />
                            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full mt-6 py-2.5 px-4 text-sm rounded-lg text-white font-medium transition-all ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 shadow hover:shadow-md"
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Jarayonda...
                                </span>
                            ) : (
                                "Buyurtma qilish"
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}