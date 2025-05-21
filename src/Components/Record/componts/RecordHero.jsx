import { Link, NavLink, useParams, useSearchParams } from 'react-router-dom';
import Edit from '../../UI/Icons/Edit';
import LogoUse from '../../LogoUsing';
import { useTranslation } from 'react-i18next';
import FotoPerson from '../../../Components/UI/Icons/FotoPerson.jpg'




export default function RecordHero({ barberData, serviceData }) {
  const { t, i18n } = useTranslation();
  const { barberId, selectedServices } = useParams()

  const [searchParams] = useSearchParams();

  const date = searchParams.get('date');
  const time = searchParams.get('time');

  // Форматируем дату для отображения, если она доступна
  const formattedDate = date ?
    formatDate(date) :
    t('day-after'); // Fallback текст

  // Формируем время для отображения
  const timeRange = time ?
    `${time}` :
    '10:30 — 11:30';

  // Функция для форматирования даты без использования внешних библиотек
  function formatDate(dateStr) {
    const options = { day: 'numeric', month: 'long' };
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString('ru-RU', options);
  }

  // Вычисляем общую сумму всех цен
  const totalPrice = serviceData.reduce((sum, item) => sum + Number(item.price), 0);

  // Форматируем сумму: 600000 -> "600 000"
  const formattedTotal = totalPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return (
    <div className="record_hero max-w-[100%] mx-auto p-5 bg-white rounded-xl shadow-lg">
      <LogoUse />

      <div className="flex items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-900">{t('after')}</h1>
        <div className="flex-grow"></div>
      </div>

      {/* Barber Info */}
      <div className="flex items-center justify-between mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-200"
            src={barberData?.image || FotoPerson}
            alt="Barber"
          />
          <div>
            <h2 className="font-bold text-lg text-gray-900">{barberData?.name} {' '} {barberData?.lastname}</h2>
            <p className="text-blue-600 text-sm">{t('Barber')}</p>
          </div>
        </div>
        <NavLink to="/" className="text-blue-600 hover:text-blue-800">
          <Edit />
        </NavLink>
      </div>

      <div className="flex items-center justify-between mb-6 p-4 bg-green-50 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g fill="none">
                <path fill="currentColor" d="M2 9c0-1.886 0-2.828.586-3.414S4.114 5 6 5h12c1.886 0 2.828 0 3.414.586S22 7.114 22 9c0 .471 0 .707-.146.854C21.707 10 21.47 10 21 10H3c-.471 0-.707 0-.854-.146C2 9.707 2 9.47 2 9m0 9c0 1.886 0 2.828.586 3.414S4.114 22 6 22h12c1.886 0 2.828 0 3.414-.586S22 19.886 22 18v-5c0-.471 0-.707-.146-.854C21.707 12 21.47 12 21 12H3c-.471 0-.707 0-.854.146C2 12.293 2 12.53 2 13z" />
                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 3v3m10-3v3" />
              </g>
            </svg>
          </div>
          <div>
            <h2 className="font-medium text-gray-900">{formattedDate}</h2>
            <p className="text-gray-600 text-sm">{timeRange}</p>
          </div>
        </div>
        <NavLink to={`/date/${barberId}/${selectedServices}`} className="text-green-600 hover:text-green-800">
          <Edit size={20} />
        </NavLink>
      </div>
      <div className="mb-6">

        <h3 className="font-bold text-lg text-gray-900  pt-3 mb-3">
          {t('gone-aw')}
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
    </div>
  );
}