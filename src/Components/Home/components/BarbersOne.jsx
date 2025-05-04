import { useState } from 'react';
import { Calendar, Users, ListChecks, Star, Info } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function BarbersOne() {
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
    <>
      <div>
        <div className="mb-4">
          <div className="flex items-center">
            <div className="bg-gray-200 p-2 rounded-full mr-3 ">
              <Users size={20} className="text-gray-600" />
            </div>
            <span className="text-gray-800 font-semibold">Выбрать специалиста</span>
          </div>
        </div>

        <div className="mt-4 space-y-4 transition-all">
          <div
            className={`p-4 rounded-lg shadow-sm cursor-pointer transition-all bg-white border border-gray-200 hover:border-gray-300 ${!selectedSpecialist ? 'border-black' : ''}`}
            onClick={() => handleSelectSpecialist(null)}
          >
            <div className="flex justify-between items-center">
              <div className="font-medium text-lg">Любой специалист</div>
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center ${!selectedSpecialist ? 'bg-black' : 'border border-gray-300'}`}
              >
                {!selectedSpecialist && (
                  <div className="h-2 w-2 rounded-full bg-white"></div>
                )}
              </div>
            </div>
          </div>

          {barbers.map((barber) => (
            <div
              key={barber.id}
              className={`p-4 rounded-lg shadow-sm transition-all cursor-pointer ${selectedSpecialist?.id === barber.id
                ? 'border border-black'
                : 'border border-gray-200 hover:border-gray-300'
                }`}
              onClick={() => handleSelectSpecialist(barber)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="barber_assent flex items-start">
                  <div className="relative">
                    <img
                      src={barber.image}
                      alt={barber.name}
                      className="barber_img w-14 h-14 mr-[5px] rounded-full object-cover"
                    />
                  </div>
                  <div className='div_assent'>
                    <div className="barber_name font-bold text-lg">{barber.name}</div>
                    <div className="text-gray-600">{barber.position}</div>
                    <div className="spicial flex items-center mt-1">
                      <Star className="fill-yellow-400 text-yellow-400" size={16} />
                      <Star className="fill-yellow-400 text-yellow-400" size={16} />
                      <Star className="fill-yellow-400 text-yellow-400" size={16} />
                      <Star className="fill-yellow-400 text-yellow-400" size={16} />
                      <Star className="fill-yellow-400 text-yellow-400 mr-[10px]" size={16} />

                      <span className="rating_span ml-1 font-medium">{barber.rating.toFixed(1)}</span>
                      <span className="rating_span text-gray-500 ml-2 text-sm">{barber.reviews} отзывов</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 relative">
                  <NavLink to="/barberinfo" className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                    <Info size={18} />
                  </NavLink>
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${selectedSpecialist?.id === barber.id ? 'bg-black' : 'border border-gray-300'}`}
                  >
                    {selectedSpecialist?.id === barber.id && (
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-gray-500 text-sm mb-3">Ближайшее время для записи завтра:</p>
                <div className="flex flex-wrap gap-2">
                  {barber.availableTimes.map((time, index) => (
                    <button
                      key={index}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${selectedTime?.time === time && selectedTime?.barberId === barber.id
                        ? 'bg-black text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                        }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectTime(time, barber.id);
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showServiceButton && (
        <div className="fixed bottom-0 left-0 right-0 max-w-xl mx-auto p-4 z-50 border-gray-200">
          <NavLink
            to="/service"
            className="w-full block bg-black text-white py-3 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors text-center"
          >
            Выбрать услугу
          </NavLink>
        </div>
      )}
    </>
  )
}