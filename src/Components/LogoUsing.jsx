import { Link, useNavigate } from 'react-router-dom';
import logo from '../Components/UI//Icons/photo_2025-05-02_21-23-30.jpg';

export default function LogoUse() {

  const navigate = useNavigate()

  return (
    <div className=" flex items-center mb-6">
      <div onClick={()=>navigate(-1)} className="mr-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600 hover:text-black transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </div>
      <div className="flex-1">
        <Link to="/" className="service_logo  flex items-center justify-start gap-[5px] no-underline text-black">
          <img src={logo} className="sevice_logo" alt="" />
          <div className=''>
            <h1 className="service_title font-bold text-lg"> © <span className="text-gray-500">Ustara</span> Barbershop</h1>
            <p className="text-sm text-gray-600">Guliston shahar, O’zbekistonshox koʻchasi</p>
          </div>
        </Link>
      </div>
    </div>
  )
}