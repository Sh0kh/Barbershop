import { ChevronRight, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from '../../UI/Icons/photo_2025-05-02_21-23-30.jpg';
import BarbersOne from './BarbersOne';

export default function HomeHero() {
  const { t, i18n } = useTranslation();
  
  const ChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'uz', name: 'O\'zbek' },
    { code: 'ru', name: 'Русский' }
  ];

  return (
    <div className="bg-gray-50 text-black w-full mx-auto max-w-xl relative">
  
      <div className="absolute top-4 right-4 z-30">
        <div className="relative group">
          <button 
            className="flex items-center bg-black bg-opacity-70 text-white px-4 py-2 rounded-full shadow-lg hover:bg-opacity-90 transition-all"
          >
            <Globe size={18} className="mr-2" />
            <span>{i18n.language === 'uz' ? 'O\'zbek' : 'Русский'}</span>
          </button>
          
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => ChangeLanguage(lang.code)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full h-70 bg-black">
        <img 
          src="https://assets.alteg.io/booking_form_appearance_header/origin/2/2a/2ac2bcb7a129f97_20241028031212.png" 
          alt="23:59 Barbershop staff" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
        <div className="absolute bottom-0 left-6 transform translate-y-1/2 z-20">
          <div className="bg-black mb-[25px] shadow-xl rounded-full p-[2px] w-[70px] h-[70px] flex items-center justify-center">
            <img src={logo} alt="23:59 Logo" className="w-full h-full rounded-full" />
          </div>
        </div>
      </div>

      <div className="px-5 pt-12 pb-24 bg-white rounded-t-3xl -mt-5 relative z-10 shadow-lg">
        <div className="mb-1">
          <div className="hero_assent flex items-center mb-1">
            <h1 className="hero_title text-lg font-extrabold">{t('home-filial')}</h1>
            <span className="hero_span inline-flex items-center ml-2">
              <span className="h-2 w-2 bg-black rounded-full mx-1"></span>
              <span className="text-lg font-extrabold">Ustara</span>
            </span>
          </div>
          <div className="flex items-center mb-1">
            <h2 className="hero_h2 text-lg font-extrabold">{t('Barber')}</h2>
            <ChevronRight className="ml-1 text-gray-400" size={20} />
          </div>
        </div>
        <p className="hero_p text-gray-500 mb-8 text-sm font-medium">{t('street')}</p>

        <div className="space-y-4">
          <BarbersOne />
        </div>
      </div>
    </div>
  );
}