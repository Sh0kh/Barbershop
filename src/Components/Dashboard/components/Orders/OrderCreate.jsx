import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { $api } from "../../../../utils";

export default function OrderCreate({ isOpen, onClose, refresh }) {
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

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        setFetchingData(true);
        const response = await $api.get("/barbers");
        setBarbers(response.data?.data || response.data || []);
      } catch (error) {
        console.error("Error fetching barbers:", error);
        Swal.fire({
          title: "Xato!",
          text: "Sartaroshlarni yuklashda xatolik yuz berdi",
          icon: "error",
          position: "top-end",
          timer: 3000,
          showCloseButton: true,
          toast: true,
        });
      } finally {
        setFetchingData(false);
      }
    };

    if (isOpen) fetchBarbers();
  }, [isOpen]);

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
          showCloseButton: true,
          toast: true,
        });
      } finally {
        setFetchingData(false);
      }
    };

    fetchServices();
  }, [selectedBarber]);

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
        const times = response.data?.data || response.data || [];
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
          showCloseButton: true,
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
    
    // Tanlangan xizmat uchun narxni saqlash
    if (serviceId) {
      const service = services.find(s => s.id.toString() === serviceId.toString());
      if (service) {
        setServicePrice(service.price);
      }
    } else {
      setServicePrice(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedBarber || !clientName || !phone || !selectedService || !selectedDate) {
      Swal.fire({
        title: "Xato!",
        text: "Iltimos, barcha maydonlarni to'ldiring",
        icon: "error",
        position: "top-end",
        timer: 3000,
        showCloseButton: true,
        toast: true,
      });
      return;
    }

    setLoading(true);
    try {
      // Soat mavjud bo'lmasa standart format ishlatiladi
      const formattedBookingTime = bookingTime ? `${selectedDate} ${bookingTime}` : `${selectedDate} 11:00:00`;
      
      // Yangi formatda ma'lumotlarni yuborish
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
        position: "top-end",
        timer: 3000,
        showCloseButton: true,
        toast: true,
      });

      refresh();
      onClose();
      resetForm();
    } catch (error) {
      console.error("Error creating order:", error);
      Swal.fire({
        title: "Xato!",
        text: error.response?.data?.message || "Buyurtma yaratishda xatolik",
        icon: "error",
        position: "top-end",
        timer: 3000,
        showCloseButton: true,
        toast: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Yangi buyurtma</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        {fetchingData ? (
          <div className="py-8 text-center">
            <p className="text-gray-500">Yuklanmoqda...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sartarosh
              </label>
              <select
                value={selectedBarber}
                onChange={(e) => {
                  setSelectedBarber(e.target.value);
                  setSelectedService("");
                  setServicePrice(0);
                  setSelectedDate("");
                  setBookingTime("");
                }}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Tanlang...</option>
                {barbers.map((barber) => (
                  <option key={barber.id} value={barber.id}>
                    {barber.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sana
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setBookingTime("");
                }}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mijoz ismi
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ism familiya"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Xizmat turi
              </label>
              <select
                value={selectedService}
                onChange={handleServiceChange}
                disabled={!selectedBarber || services.length === 0}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Tanlang...</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - {service.price} so'm
                  </option>
                ))}
                {selectedBarber && services.length === 0 && (
                  <option value="" disabled>
                    Xizmatlar topilmadi
                  </option>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefon raqam
              </label>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="+998901234567"
                pattern="\+998[0-9]{9}"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mavjud vaqtlar
              </label>
              <select
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                disabled={!selectedDate || availableTimes.length === 0}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Standart vaqt (11:00:00)</option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
                {selectedDate && availableTimes.length === 0 && (
                  <option value="" disabled>
                    {selectedBarber ? "Mavjud vaqtlar topilmadi" : "Avval sartarosh va sanani tanlang"}
                  </option>
                )}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Jarayonda..." : "Buyurtma qilish"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}