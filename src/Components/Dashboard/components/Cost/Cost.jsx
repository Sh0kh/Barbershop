import React, { useState } from 'react';
import { Eye, Edit, Trash2, Filter, X } from 'lucide-react';

export default function Cost() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    date: '',
    status: 'Kutilmoqda'
  });

  // Sample data - replace with your actual data
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      name: "Ofis ijara haqi",
      amount: 5000000,
      category: "Asosiy xarajat",
      date: "2024-05-15",
      status: "Tasdiqlangan"
    },
    {
      id: 2,
      name: "Xodimlar maoshi",
      amount: 25000000,
      category: "Mehnat haqi",
      date: "2024-05-14",
      status: "To'langan"
    },
    {
      id: 3,
      name: "Internet va kommunikatsiya",
      amount: 800000,
      category: "Texnologiya",
      date: "2024-05-13",
      status: "Kutilmoqda"
    },
    {
      id: 4,
      name: "Marketing kampaniyasi",
      amount: 3500000,
      category: "Marketing",
      date: "2024-05-12",
      status: "Tasdiqlangan"
    },
    {
      id: 5,
      name: "Ofis jihozlari",
      amount: 2200000,
      category: "Jihozlar",
      date: "2024-05-11",
      status: "To'langan"
    },
    {
      id: 6,
      name: "Transport xarajatlari",
      amount: 1500000,
      category: "Transport",
      date: "2024-05-10",
      status: "Tasdiqlangan"
    },
    {
      id: 7,
      name: "Dasturiy ta'minot litsenziyasi",
      amount: 4000000,
      category: "Texnologiya",
      date: "2024-05-09",
      status: "To'langan"
    },
    {
      id: 8,
      name: "Ofis ta'mirlash",
      amount: 6500000,
      category: "Asosiy xarajat",
      date: "2024-05-08",
      status: "Kutilmoqda"
    },
    {
      id: 9,
      name: "Reklama banerlari",
      amount: 1800000,
      category: "Marketing",
      date: "2024-05-07",
      status: "Tasdiqlangan"
    },
    {
      id: 10,
      name: "Elektr energiyasi",
      amount: 900000,
      category: "Kommunal",
      date: "2024-05-06",
      status: "To'langan"
    },
    {
      id: 11,
      name: "Xavfsizlik tizimi",
      amount: 2800000,
      category: "Xavfsizlik",
      date: "2024-05-05",
      status: "Kutilmoqda"
    },
    {
      id: 12,
      name: "Korporativ tadbir",
      amount: 3200000,
      category: "Tadbirlar",
      date: "2024-05-04",
      status: "Tasdiqlangan"
    }
  ]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  // Filter data based on date range
  const filteredExpenses = expenses.filter(expense => {
    if (!startDate && !endDate) {
      return true;
    }
    
    const expenseDate = new Date(expense.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    
    if (start && end) {
      return expenseDate >= start && expenseDate <= end;
    } else if (start) {
      return expenseDate >= start;
    } else if (end) {
      return expenseDate <= end;
    }
    
    return true;
  });

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('uz-UZ').format(amount) + ' so\'m';
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'To\'langan':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Tasdiqlangan':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Kutilmoqda':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.amount || !formData.category || !formData.date) {
      alert('Barcha maydonlarni to\'ldiring!');
      return;
    }

    // Create new expense
    const newExpense = {
      id: expenses.length + 1,
      name: formData.name,
      amount: parseInt(formData.amount),
      category: formData.category,
      date: formData.date,
      status: formData.status
    };

    // Add to expenses
    setExpenses(prev => [...prev, newExpense]);

    // Reset form and close modal
    setFormData({
      name: '',
      amount: '',
      category: '',
      date: '',
      status: 'Kutilmoqda'
    });
    setIsCreateOpen(false);
  };

  const closeModal = () => {
    setIsCreateOpen(false);
    setFormData({
      name: '',
      amount: '',
      category: '',
      date: '',
      status: 'Kutilmoqda'
    });
  };

  return (
    <div className="pt-[75px] pb-[50px] px-4 md:px-6 lg:px-8 max-w-[1200px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Harajat</h1>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="bg-black text-white px-5 py-2 rounded-lg shadow-md border border-gray-800 transition-all duration-300 hover:bg-white hover:text-black focus:outline-none"
        >
          + Qo'shish
        </button>
      </div>

      {/* Filter inputs */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-700">Sana bo'yicha filter</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Boshlang'ich sana
            </label>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Oxirgi sana
            </label>
            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={handleEndDateChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setStartDate('');
                setEndDate('');
              }}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
            >
              Filterni tozalash
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nomi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Miqdor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategoriya
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sana
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Holat
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExpenses.map((expense) => (
                <tr 
                  key={expense.id} 
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {expense.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {expense.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                    {formatAmount(expense.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {expense.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {expense.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusStyle(expense.status)}`}>
                      {expense.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 rounded transition-colors"
                        title="Ko'rish"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-green-600 hover:text-green-800 hover:bg-green-50 p-1 rounded transition-colors"
                        title="Tahrirlash"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1 rounded transition-colors"
                        title="O'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredExpenses.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-lg font-medium">Ma'lumot topilmadi</div>
            <div className="text-sm mt-1">
              {startDate || endDate ? 'Tanlangan sana oralig\'ida ma\'lumot yo\'q' : 'Ma\'lumot yo\'q'}
            </div>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Yangi harajat qo'shish</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Harajat nomi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Masalan: Ofis ijara haqi"
                    required
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Miqdor (so'm) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategoriya <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Kategoriyani tanlang</option>
                    <option value="Asosiy xarajat">Asosiy xarajat</option>
                    <option value="Mehnat haqi">Mehnat haqi</option>
                    <option value="Texnologiya">Texnologiya</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Jihozlar">Jihozlar</option>
                    <option value="Transport">Transport</option>
                    <option value="Kommunal">Kommunal</option>
                    <option value="Xavfsizlik">Xavfsizlik</option>
                    <option value="Tadbirlar">Tadbirlar</option>
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sana <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Holat
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Kutilmoqda">Kutilmoqda</option>
                    <option value="Tasdiqlangan">Tasdiqlangan</option>
                    <option value="To'langan">To'langan</option>
                  </select>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Summary */}
      {filteredExpenses.length > 0 && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Jami ko'rsatildi: <span className="font-semibold">{filteredExpenses.length}</span> ta yozuv
            </span>
            <span className="text-sm text-gray-600">
              Umumiy summa: <span className="font-semibold text-green-600">
                {formatAmount(filteredExpenses.reduce((total, expense) => total + expense.amount, 0))}
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}