import { useEffect, useState } from 'react';
import { Calendar, Users, ListChecks, Star, Info } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from '../../../utils/axios';
import personFoto from '../../UI/Icons/FotoPerson.jpg'
import ReactLoading from 'react-loading';

export default function BarbersOne() {
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [showServiceButton, setShowServiceButton] = useState(false);
  const { t, i18n } = useTranslation();
  const [barberId, setBarberId] = useState(null)
  const [data, setData] = useState([])
  const [loading, setLoadin] = useState(true)



  const getAllBarbers = async () => {
    setLoadin(true)
    try {
      const response = await axios.get(`/barberss`)
      setData(response?.data?.data)
    } catch (error) {
      console.log(error)
      console.log(error.response?.data)
    } finally {
      setLoadin(false)
    }
  }

  useEffect(() => {
    getAllBarbers()
  }, [])



  const handleSelectSpecialist = (barber) => {
    setSelectedSpecialist(barber);
    setShowServiceButton(true);
    setBarberId(barber?.id)
  };




  return (
    <>
      <div>
        <div className="mb-4">
          <div className="flex items-center">
            <div className="bg-gray-200 p-2 rounded-full mr-3 ">
              <Users size={20} className="text-gray-600" />
            </div>
            <span className="text-gray-800 font-semibold">{t('Special')}</span>
          </div>
        </div>

        <div className="mt-4 space-y-4 transition-all">
          {loading ? (
            <div className="flex items-center justify-center h-[200px]">
              <ReactLoading type="spinningBubbles" color="black" height={80} width={80} />
            </div>
          ) : data?.length <= 0 ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-center px-4">
              <div className="text-gray-400 mb-4">
                {/* Иконка "документ/файл" из Heroicons или подобных библиотек */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2"> Ma'lumot topilmadi</h3>
              <p className="text-sm text-gray-500 max-w-xs">
                Hozircha hali ma'lumot yo‘q, iltimos, keyinroq urinib korishni so‘raymiz.
              </p>
            </div>
          ) : (
            data?.map((barber) => (
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
                        src={barber.image ? barber?.image : personFoto}
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

                        {/* <span className="rating_span ml-1 font-medium">{barber.rating.toFixed(1)}</span> */}
                        <span className="rating_span text-gray-500 ml-2 text-sm">{barber.review_count } {t('otziv')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 relative">
                    <NavLink to={`/barberinfo/${barber?.id}`} className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
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
                  <p className="text-gray-500 text-sm mb-3">{t('home-day')} </p>
                  <div className="flex flex-wrap gap-2">
                    {barber?.available_times_tomorrow?.map((time, index) => (
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
            ))
          )}
        </div>
      </div>
      {showServiceButton && (
        <div className="fixed bottom-0 left-0 right-0 max-w-xl mx-auto p-4 z-50 border-gray-200">
          <NavLink
            to={`/service/${barberId}`}
            className="w-full block bg-black text-white py-3 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors text-center"
          >
            {t('service')}
          </NavLink>
        </div>
      )}
    </>
  )
}