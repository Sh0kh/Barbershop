import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function BarberHero(){
   const { t, i18n } = useTranslation();
 
    return(
        <>
        <div className='pt-[50px] '>
            <div  className="content_type max-w-[100%] mx-auto p-4 bg-white ">
                <div className='content_img mb-[15px]'>
                <img className='' src="https://assets.alteg.io/masters/origin/c/c7/c7b84d425a2b8eb_20250410181807.png" alt="" />
                </div>
                <h1>Фархад (Farxad)</h1>
                <p>{t('Barber')}</p>
                 <div className="spicial flex items-center  mt-1">
                                        <Star className="fill-yellow-400 text-yellow-400" size={16} />
                                        <Star className="fill-yellow-400 text-yellow-400" size={16} />
                                        <Star className="fill-yellow-400 text-yellow-400" size={16} />
                                        <Star className="fill-yellow-400 text-yellow-400" size={16} />
                                        <Star className="fill-yellow-400 text-yellow-400 mr-[10px]" size={16} />
                
                                        <span className="rating_span ml-1 font-medium">4.8</span>
                                        <span className="rating_span text-gray-500 ml-2 text-sm">48 {t('otziv')}</span>
               </div>
               <div className='quote_barber max-w-[100%]'>
               <p className='mt-[20px]'><span className='barber_Span text-[15px] '>Барбер Фархад </span>
        
               {t('barber-text')}
              </p>
               </div>
               
            </div>
        </div>
 
      </>
    )
}