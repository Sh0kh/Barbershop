import { useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import LogoUse from '../../LogoUsing';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import ReactLoading from 'react-loading';


export default function DateHero() {

  const today = new Date();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(today.getMonth()); // Current month
  const [currentYear, setCurrentYear] = useState(today.getFullYear()); // Current year
  const [selectedDate, setSelectedDate] = useState(today); // Default to today
  const [selectedTime, setSelectedTime] = useState(null);
  const { t, i18n } = useTranslation();
  const { barberId, selectedServices } = useParams();
  const [barberData, setBarberData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Parse selected services from URL
  const servicesArray = selectedServices ? selectedServices.split(',').map(id => parseInt(id, 10)) : [];


  const months = i18n.language === 'ru'
    ? ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    : ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];

  const getBarberTime = async () => {
    if (!selectedDate) return;
    setLoading(true);
    try {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      const response = await axios.get(`/date/${barberId}?date=${formattedDate}`);
      setBarberData(response.data);
      // Reset selected time when date changes
      setSelectedTime(null);
    } catch (error) {
      console.log(error);
      setBarberData({ barber_name: "", available_times: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      getBarberTime();
    }
  }, [selectedDate, barberId]);

  // Group available times into morning, day, and evening
  const groupTimesByPeriod = (times) => {
    if (!times || times.length === 0) return {};

    const grouped = {
      [t('morning')]: [],  // до 12:00
      [t('day')]: [],     // 12:00 - 17:00
      [t('evning')]: []   // после 17:00
    };

    times.forEach(time => {
      const hour = parseInt(time.split(':')[0], 10);

      if (hour < 12) {
        grouped[t('morning')].push(time);
      } else if (hour >= 12 && hour < 17) {
        grouped[t('day')].push(time);
      } else {
        grouped[t('evning')].push(time);
      }
    });

    // Remove empty periods
    Object.keys(grouped).forEach(key => {
      if (grouped[key].length === 0) {
        delete grouped[key];
      }
    });

    return grouped;
  };

  const handlePrevMonth = () => {
    setCurrentMonthIndex(prev => {
      if (prev === 0) {
        setCurrentYear(currentYear - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex(prev => {
      if (prev === 11) {
        setCurrentYear(currentYear + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const generateCalendarDays = () => {
    const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonthIndex, 1).getDay();

    const firstDayIndex = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    let days = [];

    const prevMonthDays = new Date(currentYear, currentMonthIndex, 0).getDate();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, currentMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, currentMonth: true });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, currentMonth: false });
    }

    return days;
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(currentYear, currentMonthIndex, day);
    setSelectedDate(newDate);
  };

  const calendarDays = generateCalendarDays();

  // Create a path with date and time as query parameters
  const getRecordPath = () => {
    if (!selectedDate) return "/record";

    // Format date as YYYY-MM-DD for URL
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const servicesParam = servicesArray.length > 0 ? `/${servicesArray.join(',')}` : '';

    // Base path without query parameters
    let path = `/record/${barberId}${servicesParam}`;

    // Add date as query parameter
    path += `?date=${formattedDate}`;

    // Add time as query parameter if selected
    if (selectedTime) {
      path += `&time=${selectedTime}`;
    }

    return path;
  };

  const isDateSelected = (day) => {
    if (!selectedDate) return false;
    return selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonthIndex &&
      selectedDate.getFullYear() === currentYear;
  };

  const availableTimes = barberData?.available_times || [];
  const groupedTimes = groupTimesByPeriod(availableTimes);

  useEffect(() => {
    getBarberTime();
  }, []);

  return (
    <div className="max-w-[100%] mx-auto p-4 bg-white pb-24 min-h-screen">
      <LogoUse />

      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h2 className="font-medium text-lg">{months[currentMonthIndex]} {currentYear}</h2>

        <button
          onClick={handleNextMonth}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Calendar */}
      <div className="mb-8">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-3">
          {(
            i18n.language === 'ru'
              ? ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
              : ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya']
          ).map((day) => (
            <div key={day} className="text-center text-gray-500 font-medium text-sm">{day}</div>
          ))}

        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map(({ day, currentMonth }, index) => (
            <div
              key={index}
              className={`relative text-center p-2 text-sm rounded-full
                ${currentMonth ? 'text-black' : 'text-gray-300'} 
                ${currentMonth && isDateSelected(day) ? 'bg-black text-white cursor-pointer' : ''}
                ${currentMonth ? 'hover: cursor-pointer' : ''}`}
              onClick={() => currentMonth && handleDateSelect(day)}
            >
              {day}
              {isDateSelected(day) && currentMonth && (
                <span className="absolute inset-0 border-2 border-black rounded-full"></span>
              )}
            </div>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center">
          <ReactLoading type="spinningBubbles" color="black" height={80} width={80} />
        </div>
      ) : (
        <div className="space-y-6">
          {selectedDate && (
            <>
              {barberData && availableTimes.length > 0 ? (
                <>
                  {Object.entries(groupedTimes).map(([period, times]) => (
                    <div key={period} className="border-none">
                      <h3 className="font-medium text-gray-800 text-base mb-3">{period}</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {times.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 rounded-lg text-center text-sm transition-colors
                              ${selectedTime === time ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-gray-100 rounded-lg p-6 inline-block mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="font-medium text-lg text-gray-800 mb-2">{t('barber_busy')}</h3>
                    <p className="text-gray-600 mt-2">{t('please_select_another_day')}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {selectedDate && selectedTime && (
        <div className="mt-6 fixed bottom-0 bg-white left-0 right-0 max-w-xl mx-auto p-4 z-50 border-t border-gray-200">
          <NavLink to={getRecordPath()} className="block w-full text-center bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors no-underline focus:outline-none">
            {t('done')}
          </NavLink>
        </div>
      )}
    </div>
  );
}