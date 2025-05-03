import { useState } from 'react';
import { NavLink } from 'react-router-dom';
export default function ServiceOne(){
      const [openAccordion, setOpenAccordion] = useState(0); // Birinchi accordion ochiq bo‘lishi uchun
      const [selectedServices, setSelectedServices] = useState([]);
    
      const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
      };
    
      const handleServiceSelect = (service) => {
        setSelectedServices((prev) =>
          prev.includes(service)
            ? prev.filter((s) => s !== service)
            : [...prev, service]
        );
      };
    
      const services = [
        {
          category: "Стрижка",
          items: [
            {
              title: "Классическая стрижка + укладка",
              duration: "1 ч",
              price: "180 000 so'm",
              description: "Любая стрижка по вашему желанию, выполненная на высшем уровне.",
              id: "classic-cut",
            },
            {
              title: "Стрижка под машинку",
              duration: "30 мин",
              price: "120 000 so'm",
              description: "Стрижка под машинку с выравниванием.",
              id: "machine-cut",
            },
            {
              title: "Премиальная услуга, специально для любителей удлиненных ст... ещё",
              duration: "1 ч",
              price: "180 000 so'm",
              description: "Премиальная стрижка с удлинением.",
              id: "premium-cut",
            },
          ],
        },
        {
          category: "Уход за лицом",
          items: [
            {
              title: "Услуга позволяет подготовиться к ответственному мероприятию... ещё",
              duration: "25 мин",
              price: "60 000 so'm",
              description: "Подготовка лица к мероприятиям.",
              id: "face-care",
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
    return(
        <>
        <div className="space-y-2 ">
        {services.map((service, index) => (
          <div key={index} className="border-none rounded-lg">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center p-2 text-left transition-colors"
            >
              <span className="font-medium text-gray-800 text-base">{service.category}</span>
              <div className="flex items-center">
                {service.items.some((item) => selectedServices.includes(item.id)) && (
                  <span className="mr-2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {service.items.filter((item) => selectedServices.includes(item.id)).length}
                  </span>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${openAccordion === index ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </button>

            {openAccordion === index && (
              <div className="p-2 bg-white">
                {service.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="mb-4 last:mb-0">
                    <label className="flex items-center justify-between cursor-pointer">
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
            )}
          </div>
        ))}
      </div>
        {selectedServices.length > 0 && (
            <div className="mt-6 fixed bottom-0 bg-white left-0 right-0 max-w-xl mx-auto p-4 z-50 border-t border-gray-200">
              <div className="text-gray-800 mb-4 flex items-center justify-between">
                <p className="text-base">{selectedServices.length} услуга{selectedServices.length > 1 ? 'и' : ''} {totalDuration}</p>
                <p className="text-lg font-semibold">{totalPrice.toLocaleString()} so'm</p>
              </div>
              <NavLink to="/date" className="block w-full text-center bg-black  text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors no-underline focus:outline-none">
                Выбрать дату и время
              </NavLink>
            </div>
          )}
         </>
    )
}