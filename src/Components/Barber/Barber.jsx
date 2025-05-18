import { NavLink, useParams } from "react-router-dom";
import LogoUse from "../LogoUsing";
import BarberHero from "./components/BarberHero";
import Comment from "./components/Comment";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { useEffect, useState } from "react";
import { $api } from "../../utils";


export default function Barber() {
  const { t, i18n } = useTranslation();
  const { ID } = useParams()
  const [data, setData] = useState([])


  const getBarber = async () => {
    try {
      // const response = await axios.get(`/barberss/${ID}`)
      const response = await $api.get(`/profile`)
      setData(response?.data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBarber()
  }, [])

  return (
    <div className="mx-auto max-w-[600px] pb-24  min-h-screen p-4">
      <LogoUse  />
      <BarberHero data={data} />
      <Comment />
      <div className="mt-6 fixed bottom-0  left-0 right-0 max-w-xl mx-auto p-4 z-50  border-gray-200">
        <NavLink to="/service" className="block w-full text-center bg-black  text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors no-underline focus:outline-none">
          {t('barber-select')}
        </NavLink>
      </div>
    </div>
  )
}