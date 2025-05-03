import logo from '../../UI/Icons/photo_2025-05-02_21-23-30.jpg';
import Telegram from '../../UI/Icons/Telegram';

export default function ConfirmAdress(){
    return(
        <div className="max-w-[100%] mx-auto ">
        <h2 className="text-sm font-bold text-gray-800 mb-2 mt-[20px]">Контакты</h2>
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex  items-center justify-center mr-2">
            <span className="go text-xs text-gray-600 "><img src={logo} alt="" /></span>
          </div>
          <p className="text-sm text-gray-700">Филиал на ул-Gulistan •Ustara Barbershop</p>
        </div>
        <div className="flex items-center mb-4">
          <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm text-gray-700">Gulistan ko'chasi, 5, Gulistan, Gulistan</p>
        </div>
        <div className="relative mb-4 ">
          <iframe
            title="Google Map"
            width="100%"
            height="300"
            frameBorder="0"
            style={{ border: 0 }}
            src="https://www.google.com/maps?q=41.3111,69.2401&z=15&output=embed"
            allowFullScreen
          ></iframe>
        </div>
        <div className="flex items-center">
       <Telegram />
          <a href="tel:+998555132359" className="text-sm text-gray-700 ml-[10px]">
            +998 55 513-23-59
          </a>
        </div>
      </div>
    )
}