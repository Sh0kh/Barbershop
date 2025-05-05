import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function ServiceOne() {
  const [selectedServices, setSelectedServices] = useState([]);

  const handleServiceSelect = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const services = [
    {
      category: "Soch oldirish",
      items: [
        {
          title: "Klassik soch oldirish + shakllantirish",
          duration: "1 soat",
          price: "180 000 so'm",
          description: "Istagan soqqangizni professional ravishda bajarish.",
          id: "classic-cut",
        },
        {
          title: "Mashina bilan soch oldirish",
          duration: "30 daqiqa",
          price: "120 000 so'm",
          description: "Mashina bilan teng qilish hamda soch oldirish.",
          id: "machine-cut",
        },
        {
          title: "Maxsus uzun soch oldirish",
          duration: "1 soat",
          price: "180 000 so'm",
          description: "Maxsus uzun soch oldirish xizmati.",
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
            <p className="text-base">{selectedServices.length} xizmat {totalDuration}</p>
            <p className="text-lg font-semibold">{totalPrice.toLocaleString()} so'm</p>
          </div>
          <NavLink to="/date" className="block w-full text-center bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors no-underline focus:outline-none">
            Sana va vaqtni tanlash
          </NavLink>
        </div>
      )}
    </>
  )
}