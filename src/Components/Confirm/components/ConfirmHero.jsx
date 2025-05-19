import { NavLink, useParams } from "react-router-dom";
import ConfirmSer from "./ConfrimSer";
import ConfirmAdress from "./ConfrimAdress";
import { useTranslation } from 'react-i18next';
import FotoPerson from '../../../Components/UI/Icons/FotoPerson.jpg'


export default function ConfrimHero({ barberData, serviceData }) {
    const { t, i18n } = useTranslation();
    const { time, date } = useParams()

    const totalPrice = serviceData.reduce((sum, item) => sum + Number(item.price), 0);

    // Форматируем сумму: 600000 -> "600 000"
    const formattedTotal = totalPrice
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');


    const getFormattedDate = (dateString) => {
        const [year, month, day] = dateString.split("-");
        const months = {
            ru: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
            uz: ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentyabr", "oktyabr", "noyabr", "dekabr"]
        };

        const lang = i18n.language === 'ru' ? 'ru' : 'uz';
        return `${Number(day)} ${months[lang][Number(month) - 1]}`;
    };

    const formattedDate = getFormattedDate(date);


    return (
        <section>
            <div className="logo_end">
                <div className="confrim_firts">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <path fill="currentColor" d="m14.83 4.89l1.34.94l-5.81 8.38H9.02L5.78 9.67l1.34-1.25l2.57 2.4z" />
                    </svg>
                    {t('done3')}
                </div>

                <div className="confrim_content">
                    <h1>{formattedDate}</h1>
                    <h2>{time.slice(0, 5)}</h2>
                </div>

                <NavLink to={`/barberinfo/${barberData?.id}`}>
                    <div className="confrim_acc">
                        <div className="w-[48px] h-[48px]">
                            <img
                                className="end_foto border w-[100%] h-[100%]"
                                src={barberData?.image || FotoPerson}
                                alt=""
                            />
                        </div>
                        <div>
                            <h1>{barberData?.name}</h1>
                            <p>{t('Barber')}</p>
                        </div>
                    </div>
                </NavLink>
            </div>

            <ConfirmSer />

            <div className="mb-6">
                <h3 className="font-bold text-lg text-gray-900 border-t pt-3 mb-3">
                    {t('service1')}
                </h3>
                {serviceData?.map((i, index) => (
                    <div key={index} className="border-b border-gray-200 py-3">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-900">{i18n.language === 'uz' ? i.name_uz : i.name_ru}</span>
                            <span className="text-gray-600">1 {t('hour')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 text-sm">{String(i.price).slice(0, -3).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} uzs
                            </span>
                        </div>
                    </div>
                ))}

                <div className="flex justify-between font-bold mt-4 text-lg">
                    <span className="text-gray-900">{t('total')}</span>
                    <span className="text-blue-700">{formattedTotal} uzs</span>
                </div>
            </div>

            <ConfirmAdress />
        </section>
    );
}