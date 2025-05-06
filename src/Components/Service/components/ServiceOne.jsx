import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ServiceOne() {
  const [selectedServices, setSelectedServices] = useState([]);
  const { t, i18n } = useTranslation();

  const handleServiceSelect = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const services = [
    {
      category: `${t('service-1')}`,
      items: [
        {
          title: t('service-2'),
          duration: `1 ${t('hour')}`,
          price: "180 000 so'm",
          description: t('service-3'),
          id: "classic-cut",
        },
        {
          title: t('service-h'),
          duration: `30 ${t('minute')}`,
          price: "120 000 so'm",
          description: t('service-mashine'),
          id: "machine-cut",
        },
        {
          title: t('service-mc'),
          duration: `1 ${t('hour')}`,
          price: "180 000 so'm",
          description: t('service-4'),
          id: "premium-cut",
        },
      ],
    },
  
  ];

  const totalPrice = selectedServices.reduce((sum, serviceId) => {
    const service = services
      .flatMap((cat) => cat.items)
      .find((item) => item.id === serviceId);
    return sum + parseInt(service?.price.replace(/\D/g, '') || 0);
  }, 0);

  const totalDuration = selectedServices
    .map((serviceId) => services.flatMap((cat) => cat.items).find((item) => item.id === serviceId)?.duration)
    .filter(Boolean)
    .join(' + ');

  return (
    <>
      <div className="space-y-6">
        {services.map((service, index) => (
          <div key={index} className="border-none rounded-lg mb-4">
            <div className="mb-2 p-2">
              <span className="font-medium text-gray-800 text-base">{service.category}</span>
              {service.items.some((item) => selectedServices.includes(item.id)) && (
                <span className="ml-2 bg-black text-white rounded-full w-5 h-5 inline-flex items-center justify-center text-xs">
                  {service.items.filter((item) => selectedServices.includes(item.id)).length}
                </span>
              )}
            </div>
            <div className="p-2 bg-white pb-[30px]">
              {service.items.map((item, itemIndex) => (
                <div key={itemIndex} className="mb-4 last:mb-0 border-[2px] border-[black] p-[10px] rounded-[10px]">
                  <label className="flex items-start justify-between cursor-pointer">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{item.duration}</p>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      <span className="font-semibold text-gray-800 mt-[10px] mr-2 text-sm">{item.price}</span>
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
        ))}
      </div>

      {selectedServices.length > 0 && (
        <div className="mt-6 fixed bottom-0 bg-white left-0 right-0 max-w-xl mx-auto p-4 z-50 border-t border-gray-200">
          <div className="text-gray-800 mb-4 flex items-center justify-between">
            <p className="text-base">{selectedServices.length} {t('service1')} {totalDuration}</p>
            <p className="text-lg font-semibold">{totalPrice.toLocaleString()} so'm</p>
          </div>
          <NavLink to="/date" className="block w-full text-center bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors no-underline focus:outline-none">
            {t('data-nav')}
          </NavLink>
        </div>
      )}
    </>
  )
}