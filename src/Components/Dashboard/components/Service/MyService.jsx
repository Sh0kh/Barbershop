import { useState } from "react";

export default function MyService() {
  const [services, setServices] = useState([
    {
      category: "Soch xizmatlari",
      items: [
        {
          title: "Klassik soch olish",
          duration: "1 soat",
          price: "180 000 so'm",
          description: "Klassik uslubda professional soch olish xizmati.",
          id: "classic-cut",
        },
        {
          title: "Mashina bilan soch olish",
          duration: "30 daqiqa",
          price: "120 000 so'm",
          description: "Mashina yordamida tezkor soch olish.",
          id: "machine-cut",
        },
        {
          title: "Premium xizmat",
          duration: "1 soat",
          price: "180 000 so'm",
          description: "Premium uslubda to‘liq parvarish va soch olish.",
          id: "premium-cut",
        },
      ],
    },
  ]);

  const handleLogout = () => {
    console.log("Chiqish bosildi");
   
  };

  const handleAddService = () => {
    console.log("Yangi xizmat qo‘shish");
   
  };

  const handleEdit = (itemId) => {
    console.log("Edit: ", itemId);
 
  };

  const handleDelete = (itemId) => {
    console.log("Delete: ", itemId);
  
  };

  return (
    <div className="mx-auto max-w-[600px] pb-24  min-h-screen p-4">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Chiqish
        </button>
        <button
          onClick={handleAddService}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Yangi xizmat qo‘shish
        </button>
      </div>

      {services.map((service, index) => (
        <div key={index} className="rounded-lg mb-4">
          <div className="mb-2 p-2">
          
          </div>
          <div className="p-2 bg-white pb-[30px]">
            {service.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="mb-4 last:mb-0 border-2 border-black p-4 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.duration}</p>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    <span className="font-semibold text-gray-800 mt-2 block text-sm">
                      {item.price}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(item.id)}
                       className="text-yellow-600 hover:text-yellow-800 hover:bg-yellow-100 p-2 rounded-full transition"
                      title="Tahrirlash"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                   className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-full transition"
                      title="O'chirish"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
