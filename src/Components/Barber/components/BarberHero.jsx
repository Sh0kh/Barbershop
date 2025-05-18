import axios from 'axios';
import { Star } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FotoPerson from '../../../Components/UI/Icons/FotoPerson.jpg'

export default function BarberHero({ data }) {
    const { t, i18n } = useTranslation();


    return (
        <>
            <div className='pt-[50px] '>
                <div className="content_type max-w-[100%] mx-auto p-4 bg-white ">
                    <div className='content_img mb-[15px]'>
                        <img className='border-[1px]' src={data?.image || FotoPerson} alt="" />
                    </div>
                    <h1>{data?.name} {' '} {data?.lastname}</h1>
                    <p>{t('Barber')}</p>
                    <div className="spicial flex items-center mt-1">
                        {[...Array(5)].map((_, index) => (
                            <Star
                                key={index}
                                className={
                                    index < Math.round(data?.rating || 0)
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                }
                                size={16}
                            />
                        ))}
                        <span className="rating_span ml-1 font-medium">{data?.rating}</span>
                        <span className="rating_span text-gray-500 ml-2 text-sm">
                            {data?.review_count} {t('otziv')}
                        </span>
                    </div>
                    <div className='quote_barber max-w-[100%]'>
                        <p className='mt-[20px]'>
                            <span className='barber_Span text-[15px]'>
                                {data?.name} {data?.lastname}
                            </span>{'-'}
                            {i18n.language === 'uz' ? data?.bio_uz : data?.bio_ru}
                        </p>
                    </div>
                </div>
            </div>

        </>
    )
}