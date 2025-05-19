import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';


export default function ServiceOne({ data }) {
  const [selectedServices, setSelectedServices] = useState([]);
  const { t, i18n } = useTranslation();
  const { barberId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();



  const handleServiceSelect = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((s) => s !== serviceId)
        : [...prev, serviceId]
    );
  };

  const totalPrice = selectedServices.reduce((sum, serviceId) => {
    const service = data.find((item) => item.id === serviceId);
    return sum + parseInt(service?.price || 0);
  }, 0);

  const totalDuration = ""; // You may need to add duration field to your data if needed

  const redirectToNextPage = () => {
    const queryParams = new URLSearchParams(location.search);
    const hasDate = queryParams.has('date');
    const queryString = queryParams.toString();
    const servicesPath = selectedServices.join(',');

    const path = hasDate
      ? `/record/${barberId}/${servicesPath}${queryString ? `?${queryString}` : ''}`
      : `/date/${barberId}/${servicesPath}`;

    navigate(path);
  };



  return (
    <>
      <div className="space-y-6">
        <div className="border-none rounded-lg mb-4">
          <div className="mb-2 p-2">
          </div>
          <div className="bg-white pb-[30px]">
            {data.map((item) => (
              <div key={item.id} className="mb-4 last:mb-0 border-[2px] border-black p-[10px] rounded-[10px]">
                <label className="flex items-start justify-between cursor-pointer">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{i18n.language === 'uz' ? item.name_uz : item.name_ru}</h3>
                    <p className="text-sm text-gray-600 mt-1">{i18n.language === 'uz' ? item.description_uz : item.description_ru}</p>
                    <span className="font-semibold text-gray-800 mt-[10px] mr-2 text-sm">
                      {String(item.price).slice(0, -3).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} uzs
                    </span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(item.id)}
                      onChange={() => handleServiceSelect(item.id)}
                      className="h-5 w-5 text-black focus:ring-black border-gray-300 rounded accent-black checked:bg-black checked:border-black"
                    />
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedServices.length > 0 && (
        <div className="mt-6 fixed bottom-0 bg-white left-0 right-0 max-w-xl mx-auto p-4 z-50 border-t border-gray-200">
          <div className="text-gray-800 mb-4 flex items-center justify-between">
            <p className="text-base">{selectedServices.length} {t('service1')} {totalDuration}</p>
            <p className="text-lg font-semibold">{totalPrice.toLocaleString()} so'm</p>
          </div>
          <button
            onClick={redirectToNextPage}
            className="block w-full text-center bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors focus:outline-none"
          >
            {t('data-nav')}
          </button>

        </div>
      )}
    </>
  );
}