import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import ServiceOne from './ServiceOne';
import LogoUse from '../../LogoUsing';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';


export default function ServiceHero() {
  const { t, i18n } = useTranslation();
  const { barberId } = useParams()
  const [serviceData, setServiceData] = useState([])
  const [loading, setLoading] = useState()

  const getService = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`/service?user_id=${barberId}`)
      setServiceData(response?.data?.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    getService()
  }, [])

  return (
    <div className="max-w-[100%] min-h-screen pb-24 mx-auto p-4 bg-white">
      <LogoUse />

      <h2 className="text-xl font-bold mb-4"> {t('service')}</h2>

      {loading ? (
        <div className="flex items-center justify-center h-[500px]">
          <ReactLoading type="spinningBubbles" color="black" height={80} width={80} />
        </div>
      ) : serviceData?.length <= 0 ? (
        <div className="flex flex-col items-center justify-center h-[500px] text-center px-4">
          <div className="text-gray-400 mb-4">
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
        <>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={18} />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              placeholder="Topish"
            />
          </div >
          <ServiceOne data={serviceData} />
        </>
      )
      }


    </div >
  );
}