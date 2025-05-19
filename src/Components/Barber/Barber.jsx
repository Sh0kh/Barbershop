import { NavLink, useParams } from "react-router-dom";
import LogoUse from "../LogoUsing";
import BarberHero from "./components/BarberHero";
import Comment from "./components/Comment";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { useEffect, useState } from "react";
import { $api } from "../../utils";
import ReactLoading from 'react-loading';


export default function Barber() {
  const { t, i18n } = useTranslation();
  const { ID } = useParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)


  const getBarber = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`/barberss/${ID}`)
      // const response = await $api.get(`/profile`)
      setData(response?.data?.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBarber()
  }, [ID])

  if (loading) {
    return (
      <div className="mx-auto max-w-[600px] pb-24 min-h-screen p-4">
        <div className="mb-6 p-4 bg-white h-[100%] rounded-lg shadow  ">
          <div className="flex items-center justify-center h-screen ">
            <ReactLoading type="spinningBubbles" color="black" height={80} width={80} />
          </div>
        </div>
      </div>
    )
  }





  return (
    <div className="mx-auto max-w-[600px] pb-24  min-h-screen p-4">
      <LogoUse />
      {!data || data?.length <= 0 ? (
        <div className="mx-auto min-h-screen mt-4">
          <div className="mb-6 p-4 bg-white h-[100%] rounded-lg shadow  ">
            <div className="flex flex-col items-center justify-center h-screen text-center px-4">
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
          </div>
        </div >
      ) : (
        <>
          <BarberHero data={data} />
          <Comment data={data?.top_reviews} />
          <div className="mt-6 fixed bottom-0  left-0 right-0 max-w-xl mx-auto p-4 z-50  border-gray-200">
            <NavLink to={`/service/${ID}`} className="block w-full text-center bg-black  text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors no-underline focus:outline-none">
              {t('barber-select')}
            </NavLink>
          </div>
        </>
      )}
    </div>
  )
}