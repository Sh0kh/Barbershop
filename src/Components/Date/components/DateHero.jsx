import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogoUse from '../../LogoUsing';

export default function DateHero() {
  const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const [currentMonthIndex, setCurrentMonthIndex] = useState(4); // May = 4
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const times = {
    'Kunduzgi': ['10:00', '13:30', '15:00', '16:30'],
    'Tungi': ['18:00', '18:30', '19:00']
  };

  const handlePrevMonth = () => {
    setCurrentMonthIndex(prev => (prev === 0 ? 11 : prev - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex(prev => (prev === 11 ? 0 : prev + 1));
  };

  const generateCalendarDays = () => {
    const year = 2025;
    const daysInMonth = new Date(year, currentMonthIndex + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, currentMonthIndex, 1).getDay();


    const firstDayIndex = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    let days = [];


    const prevMonthDays = new Date(year, currentMonthIndex, 0).getDate();
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

  const calendarDays = generateCalendarDays();

  return (
    <div className="max-w-[100%] mx-auto p-4 bg-white  pb-24 min-h-screen">

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

        <h2 className="font-medium text-lg">{months[currentMonthIndex]}</h2>

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
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
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
                ${currentMonth && selectedDay === day ? 'bg-black text-white cursor-pointer' : ''}
                ${currentMonth ? 'hover: cursor-pointer' : ''}`}
              onClick={() => currentMonth && setSelectedDay(day)}
            >
              {day}
              {selectedDay === day && currentMonth && (
                <span className="absolute inset-0 border-2 border-black rounded-full"></span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Time selection */}
      <div className="space-y-6">
        {Object.entries(times).map(([category, timeSlots]) => (
          <div key={category} className="border-none">
            <h3 className="font-medium text-gray-800 text-base mb-3">{category}</h3>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((time) => (
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
      </div>

      {/* Confirm button */}
      {selectedTime && (
        <div className="mt-6 fixed bottom-0 bg-white left-0 right-0 max-w-xl mx-auto p-4 z-50 border-t border-gray-200">
          <NavLink to="/record" className="block w-full text-center bg-black  text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors no-underline focus:outline-none">
            Tayyor
          </NavLink>
        </div>
      )}
    </div>
  );
}