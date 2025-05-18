import { useState } from "react";
import { Card, Typography, IconButton } from "@material-tailwind/react";
import PropTypes from 'prop-types';

export default function Calendar({ onDateSelect, dayOffDates = [] }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const months = [
        "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
        "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"
    ];


    const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        // Adjust for Monday as first day of week (Sunday is 0 in JS)
        const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        const prevMonthDays = new Date(year, month, 0).getDate();

        const days = [];

        // Previous month days
        for (let i = startingDay - 1; i >= 0; i--) {
            const day = prevMonthDays - i;
            days.push({
                day,
                month: month - 1,
                year: month === 0 ? year - 1 : year,
                isCurrentMonth: false,
                date: new Date(month === 0 ? year - 1 : year, month === 0 ? 11 : month - 1, day)
            });
        }

        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                day: i,
                month,
                year,
                isCurrentMonth: true,
                date: new Date(year, month, i)
            });
        }

        // Next month days
        const remainingCells = 42 - days.length; // 6 rows * 7 days = 42
        for (let i = 1; i <= remainingCells; i++) {
            days.push({
                day: i,
                month: month + 1,
                year: month === 11 ? year + 1 : year,
                isCurrentMonth: false,
                date: new Date(month === 11 ? year + 1 : year, month === 11 ? 0 : month + 1, i)
            });
        }

        return days;
    };

    const calendarDays = getDaysInMonth(currentMonth);

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        if (onDateSelect) {
            onDateSelect(date);
        }
    };

    const isToday = (date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    const isSelectedDate = (date) => {
        return selectedDate &&
            date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear();
    };

    // Check if date is in dayOffDates array
    const isDayOff = (date) => {
        // Format the date to YYYY-MM-DD for comparison
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const formattedDate = formatDate(date);

        return dayOffDates.some(dayOff => dayOff.day_off === formattedDate);
    };

    return (
        <Card className="w-full max-w-md mx-auto bg-white rounded-lg">
            <div className="p-2">
                <div className="flex items-center justify-between mb-4 px-2">
                    <div className="relative inline-flex items-center">
                        <button className="flex items-center gap-1 py-2 px-3 text-gray-800 text-sm font-medium rounded-full border border-gray-300">
                            {months[currentMonth.getMonth()]}
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <IconButton
                            variant="text"
                            size="sm"
                            onClick={handlePrevMonth}
                            className="text-gray-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </IconButton>
                        <IconButton
                            variant="text"
                            size="sm"
                            onClick={handleNextMonth}
                            className="text-gray-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </IconButton>
                    </div>
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {days.map((day, index) => (
                        <div key={index} className="text-center py-2">
                            <Typography variant="small" className="font-normal text-gray-700 text-sm">
                                {day}
                            </Typography>
                        </div>
                    ))}

                    {calendarDays.map((day, index) => (
                        <div
                            key={index}
                            className="text-center py-3"
                            onClick={() => day.isCurrentMonth && handleDateClick(day.date)}
                        >
                            <div
                                className={`
                  mx-auto w-8 h-8 flex items-center justify-center rounded-full 
                  ${!day.isCurrentMonth ? "text-gray-400" : "text-gray-800"} 
                  ${isSelectedDate(day.date) ? "bg-gray-400 text-white" : ""}
                  ${isDayOff(day.date) ? "bg-blue-500 text-white" : ""}
                  ${isToday(day.date) && !isSelectedDate(day.date) && !isDayOff(day.date) ? "bg-gray-100" : ""}
                  ${day.isCurrentMonth && !isSelectedDate(day.date) && !isDayOff(day.date) ? "hover:bg-gray-100" : ""}
                  ${day.isCurrentMonth ? "cursor-pointer" : "cursor-default"}
                `}
                            >
                                <Typography
                                    variant="small"
                                    className={`font-normal text-sm ${(isSelectedDate(day.date) || isDayOff(day.date)) ? "text-white" : ""}`}
                                >
                                    {day.day}
                                </Typography>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}

Calendar.propTypes = {
    onDateSelect: PropTypes.func,
    dayOffDates: PropTypes.array
};