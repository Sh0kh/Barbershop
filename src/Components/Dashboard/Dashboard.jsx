import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, Clock, User, Scissors, Plus, Check, Trash2, X, ChevronDown } from "lucide-react";
import { $api } from '../../utils/index';
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";


export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [orders, setOrders] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredBarber, setFilteredBarber] = useState(null);
  const [showBarberDropdown, setShowBarberDropdown] = useState(false);

  const timeSlots = [];
  for (let hour = 9; hour <= 21; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
  }

  const getOrders = async () => {
    try {
      setLoading(true);
      // Format date as YYYY-MM-DD without timezone conversion
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      const response = await $api.get(`/notifications-table`, {
        params: {
          date: dateStr
        }
      });

      // Transform backend data to match our frontend structure
      const transformedOrders = response.data.data.map(order => ({
        id: order.id,
        barberId: order.data.barber_id,
        startTime: new Date(order.data.booking_time).getHours().toString().padStart(2, '0') + ':00',
        endTime: (new Date(order.data.booking_time).getHours() + 1).toString().padStart(2, '0') + ':00',
        customerName: order.data.user_name,
        service: order.data.services.map(s => s.name_uz).join(', '),
        phone: order.data.user_phone,
        bookingId: order?.data?.services[0]?.id,
        date: dateStr,
        active: order.active,
        completed: order.completed
      }));

      setOrders(transformedOrders);
    } catch (error) {
      console.log(error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getBarbers = async () => {
    try {
      const response = await $api.get('/barbers');
      const barberColors = [
        "bg-gradient-to-br from-blue-500 to-blue-600",
        // "bg-gradient-to-br from-emerald-500 to-emerald-600",
        "bg-gradient-to-br from-purple-500 to-purple-600",
        "bg-gradient-to-br from-amber-500 to-amber-600",
        "bg-gradient-to-br from-red-500 to-red-600",
        "bg-gradient-to-br from-indigo-500 to-indigo-600"
      ];

      const transformedBarbers = response.data.map((barber, index) => ({
        id: barber.id,
        name: barber.username || `${barber.first_name} ${barber.last_name}`,
        color: barberColors[index % barberColors.length]
      }));

      setBarbers(transformedBarbers);
    } catch (error) {
      console.log(error);
    }
  };

  const completeOrder = async (orderId) => {
    try {
      await $api.put(`/notifications/${orderId}/complete`);
      getOrders();
      Swal.fire({
        icon: "success",
        title: "Muvaffaqiyatli!",
        toast: true,
        position: "top-end",
        timer: 3000,
        customClass: {
          container: "swal2-container-higher-zindex",
        },
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error completing order:", error);
      Swal.fire({
        icon: "error",
        title: "Xato!",
        text: error.response?.data?.message || "Xatolik yuz berdi.",
        toast: true,
        position: "top-end",
        timer: 3000,
        customClass: {
          container: "swal2-container-higher-zindex",
        },
        showConfirmButton: false,
      });
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await $api.delete(`/notifications/${orderId}/archive`);
      getOrders();
      Swal.fire({
        icon: "success",
        title: "Muvaffaqiyatli!",
        toast: true,
        position: "top-end",
        timer: 3000,
        customClass: {
          container: "swal2-container-higher-zindex",
        },
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error canceling order:", error);
      Swal.fire({
        icon: "error",
        title: "Xato!",
        text: error.response?.data?.message || "Xatolik yuz berdi.",
        toast: true,
        position: "top-end",
        timer: 3000,
        customClass: {
          container: "swal2-container-higher-zindex",
        },
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    getBarbers();
  }, []);

  useEffect(() => {
    getOrders();
  }, [selectedDate]);

  const formatDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('uz-UZ', options);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getOrderForSlot = (barberId, time) => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const selectedDateStr = `${year}-${month}-${day}`;

    return orders.find(order =>
      order.barberId === barberId &&
      order.startTime === time &&
      order.date === selectedDateStr
    );
  };

  const isToday = (date) => {
    const today = new Date();
    return date && date.toDateString() === today.toDateString();
  };

  const isSameDay = (date1, date2) => {
    return date1 && date2 && date1.toDateString() === date2.toDateString();
  };

  const goToPreviousMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  const selectDate = (date) => {
    if (date) {
      setSelectedDate(date);
      setShowCalendar(false);
    }
  };

  const monthNames = [
    'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
    'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
  ];

  const dayNames = ['Yak', 'Du', 'Se', 'Cho', 'Pa', 'Ju', 'Sha'];

  const displayedBarbers = filteredBarber
    ? barbers.filter(barber => barber.id === filteredBarber)
    : barbers;

  const selectedBarberName = filteredBarber
    ? barbers.find(b => b.id === filteredBarber)?.name
    : "Barcha barberlar";

  return (
    <div className="py-4 px-6 mt-[70px] min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Barbershop jadvali</h1>
          <p className="text-gray-600">Buyurtmalar va jadvalni boshqarish</p>
        </div>

        <NavLink to={`/admin/bron/create`}>
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 font-medium">
            <Plus className="h-5 w-5" />
            <span>Buyurtma yaratish</span>
          </button>
        </NavLink>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 relative">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center space-x-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <div className="bg-blue-100 p-3 rounded-xl">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {formatDate(selectedDate)}
              </h2>
              {isToday(selectedDate) && (
                <span className="text-sm text-blue-600 font-medium">Bugun</span>
              )}
            </div>
          </div>
        </div>

        {showCalendar && (
          <div className="absolute top-full left-6 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 z-50 min-w-[300px]">
            <div className="flex items-center justify-between mb-4">
              <button onClick={goToPreviousMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeft className="h-4 w-4 text-gray-600" />
              </button>
              <h3 className="font-semibold text-gray-800">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <button onClick={goToNextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronRight className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentMonth).map((day, index) => (
                <button
                  key={index}
                  onClick={() => selectDate(day)}
                  disabled={!day}
                  className={`
                    h-8 w-8 text-sm rounded-lg transition-colors
                    ${!day ? 'invisible' : ''}
                    ${isSameDay(day, selectedDate)
                      ? 'bg-blue-600 text-white'
                      : isToday(day)
                        ? 'bg-blue-100 text-blue-600 font-medium'
                        : 'hover:bg-gray-100 text-gray-700'
                    }
                  `}
                >
                  {day?.getDate()}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {barbers.map((barber) => {
          const barberOrdersCount = orders.filter(order =>
            order.barberId === barber.id
          ).length;

          return (
            <div
              key={barber.id}
              className={`bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${filteredBarber === barber.id ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setFilteredBarber(filteredBarber === barber.id ? null : barber.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full ${barber.color}`}></div>
                  <div>
                    <p className="font-semibold text-gray-900">{barber.name}</p>
                    <p className="text-sm text-gray-500">{barberOrdersCount} buyurtma</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-400">
                  {barberOrdersCount}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <div className="animate-pulse flex justify-center">
            <div className="h-8 w-8 bg-blue-600 rounded-full animate-bounce"></div>
          </div>
          <p className="mt-4 text-gray-600">Yuklanmoqda...</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-700 border-r border-gray-200 w-32">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>Vaqt</span>
                    </div>
                  </th>
                  {displayedBarbers.map((barber) => (
                    <th key={barber.id} className="px-6 py-5 text-center text-sm font-semibold text-gray-700 border-r border-gray-200 last:border-r-0 min-w-[200px]">
                      <div className="flex items-center justify-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${barber.color}`}></div>
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{barber.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white">
                {timeSlots.map((time) => (
                  <tr key={time} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200 bg-gray-50/30">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                        <span className="font-mono">{time}</span>
                      </div>
                    </td>
                    {displayedBarbers.map((barber) => {
                      const order = getOrderForSlot(barber.id, time);
                      console.log(order)
                      return (
                        <td key={`${barber.id}-${time}`} className="px-4 py-4 border-r border-gray-200 last:border-r-0 h-20">
                          {order ? (
                            <div className={`${barber.color} rounded-xl p-4 text-white shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1 h-full flex flex-col justify-between`}>
                              <div>
                                <div className="font-semibold text-sm mb-1">{order.customerName}</div>
                                <div className="text-xs opacity-90 mb-2">{order.service}</div>
                                <div className="text-xs opacity-80 mb-2">{order.phone}</div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="flex items-center text-xs opacity-80">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {order.startTime}-{order.endTime}
                                </span>
                                <div className="flex space-x-2">
                                  {!order.completed && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        completeOrder(order?.bookingId);
                                      }}
                                      className="p-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                                      title="Yakunlash"
                                    >
                                      <Check className="h-3 w-3" />
                                    </button>
                                  )}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      cancelOrder(order?.bookingId);
                                    }}
                                    className="p-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                                    title="Bekor qilish"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="h-full flex items-center justify-center opacity-0"></div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}



      {(showCalendar || showBarberDropdown) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowCalendar(false);
            setShowBarberDropdown(false);
          }}
        ></div>
      )}
    </div>
  );
}