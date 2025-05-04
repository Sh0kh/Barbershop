import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ServiceOne from './ServiceOne';

import LogoUse from '../../LogoUsing';

export default function ServiceHero() {
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

  return (
    <div className="max-w-[100%] min-h-screen pb-24 mx-auto p-4 bg-white">
      <LogoUse />

      <h2 className="text-xl font-bold mb-4">Выбрать услуги</h2>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="text-gray-400" size={18} />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
          placeholder="Найти"
        />
      </div>
      <ServiceOne />
    </div>
  );
}