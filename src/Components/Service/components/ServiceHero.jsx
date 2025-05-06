import { Search } from 'lucide-react';
import { useState } from 'react';
import ServiceOne from './ServiceOne';
import LogoUse from '../../LogoUsing';
import { useTranslation } from 'react-i18next';

export default function ServiceHero() {
  const [openAccordion, setOpenAccordion] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);
  const { t, i18n } = useTranslation();

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

      <h2 className="text-xl font-bold mb-4"> {t('service')}</h2>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="text-gray-400" size={18} />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
          placeholder="Topish"
        />
      </div>
      <ServiceOne />
    </div>
  );
}