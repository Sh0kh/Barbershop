import { useState } from 'react';
import { ChevronRight, Calendar, Users, ListChecks, Star, Info } from 'lucide-react';
import logo from '../../UI/Icons/HomeLogo.jpg';
import BarbersOne from './BarbersOne';

export default function HomeHero() {
  const [selectedTab, setSelectedTab] = useState(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [showServiceButton, setShowServiceButton] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const barbers = [
    {
      id: 1,
      name: 'Фархед (Farxad)',
      position: 'Барбер',
      rating: 4.8,
      reviews: 48,
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      availableTimes: ['11:50', '12:00', '12:30', '14:00', '14:30']
    },
    {
      id: 2,
      name: 'Анастасия (Anastaclia)',
      position: 'Барбер',
      rating: 4.5,
      reviews: 18,
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      availableTimes: ['11:50', '12:00', '12:30', '14:00', '14:30']
    }
  ];

  const handleSelectSpecialist = (barber) => {
    setSelectedSpecialist(barber);
    setShowServiceButton(true);
  };

  const handleSelectTime = (time, barberId) => {
    setSelectedTime({ time, barberId });
  };

  return (
    <div className="bg-gray-50 text-black w-full mx-auto max-w-xl relative">
      {/* Header Image */}
      <div className="relative w-full h-50 ">
        <img
          src={logo}
          alt="23:59 Barbershop staff"
          className="w-full h-full "
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20"></div>
        {/* <div className="absolute bottom-0 left-6 transform translate-y-1/2 z-20">
          <div className="bg-black mb-[25px] shadow-xl rounded-full p-[2px] w-[70px] h-[70px] flex items-center justify-center">
            <img src={logo} alt="23:59 Logo" className="w-full h-full rounded-full" />
          </div>
        </div> */}
      </div>

      <div className="px-5 pt-12 pb-24 bg-white rounded-t-3xl -mt-5 relative z-10 shadow-lg">
        <div className="mb-1">
          <div className="hero_assent flex items-center mb-1">
            <h1 className="hero_title text-lg font-extrabold">Guliston shahar </h1>
            <span className="hero_span inline-flex items-center ">
              <span className="h-2 w-2 bg-black rounded-full mx-2"></span>
              <h1 className="text-lg font-extrabold">O’zbekistonshox koʻchasi</h1>
            </span>
          </div>
          <div className="flex items-center mb-1">
            <h2 className="hero_h2 text-lg font-extrabold">Ustara Barbershop</h2>
            <ChevronRight className="ml-1 text-gray-400" size={20} />
          </div>
        </div>
        <p className="hero_p text-gray-500 mb-8 text-sm font-medium">Mojal:Sahovat binosi</p>
        <div className="space-y-4 ">
          <BarbersOne />
        </div>
      </div>
    </div>
  );
}