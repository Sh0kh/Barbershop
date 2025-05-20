import { ChevronRight, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect } from 'react'; // Add these imports
import logo from '../../UI/Icons/photo_2025-05-02_21-23-30.jpg';
import BarbersOne from './BarbersOne';
import Foto from '../../UI/Icons/kov00774-scaled.jpg'

export default function HomeHero() {
  const { t, i18n } = useTranslation();
  const imageRef = useRef(null); // Create a ref for the image

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrollPosition = window.pageYOffset;
        imageRef.current.style.transform = `translateY(${scrollPosition * 0.3}px) scale(${1 + scrollPosition * 0.0005})`;
        imageRef.current.style.opacity = `${1 - scrollPosition * 0.002}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gray-50 text-black w-full mx-auto max-w-xl relative overflow-hidden">

      <div className="absolute top-4 right-4 z-30">
        <div className="flex items-center bg-black bg-opacity-70 text-white rounded-full shadow-lg overflow-hidden">
          <button
            onClick={() => changeLanguage('uz')}
            className={`px-4 py-2 transition-all flex items-center ${i18n.language === 'uz' ? 'bg-white text-black' : 'hover:bg-opacity-80'}`}
          >
            <Globe size={18} className="mr-2" />
            <span>Uz</span>
          </button>

          <div className="h-6 w-px bg-gray-400"></div>

          <button
            onClick={() => changeLanguage('ru')}
            className={`px-4 py-2 transition-all flex items-center ${i18n.language === 'ru' ? 'bg-white text-black' : 'hover:bg-opacity-80'}`}
          >
            <Globe size={18} className="mr-2" />
            <span>Ru</span>
          </button>
        </div>
      </div>

      <div className="relative w-full h-70 bg-black overflow-hidden">
        <img
          ref={imageRef} // Attach the ref here
          src={Foto}
          alt="23:59 Barbershop staff"
          className="w-full h-full object-cover transition-transform duration-300 ease-out will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
        <div className="absolute bottom-[-23px] left-6 z-[99999999] ">
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