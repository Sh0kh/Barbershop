import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from "sweetalert2";

export default function RecordInput() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('+998');
    const [email, setEmail] = useState('');
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false);

    const { barberId, selectedServices } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const date = queryParams.get('date');
    const time = queryParams.get('time');
    const { t } = useTranslation();
    const navigate = useNavigate();

    const validate = () => {
        if (!name.trim()) {
            Swal.fire("Xatolik!", "Iltimos, ismingizni kiriting.", "warning");
            return false;
        }

        const numericPhone = phone.replace(/\D/g, '');
        if (numericPhone.length < 9 || numericPhone.length > 12) {
            Swal.fire("Xatolik!", "Telefon raqam noto‘g‘ri. 9 dan 12 gacha raqam bo‘lishi kerak.", "warning");
            return false;
        }

        if (!agree) {
            Swal.fire("Xatolik!", "Davom etish uchun shartlarga rozilik bildiring.", "warning");
            return false;
        }

        return true;
    };

    const CreateBron = async () => {
        if (!validate()) return;

        setLoading(true);

        try {
            const servicesArray = selectedServices
                .split(',')
                .map(id => ({ id: Number(id) }));

            const booking_time = `${date} ${time}:00`;
            const newData = {
                user_id: barberId,
                user_name: name,
                user_phone: phone,
                booking_time,
                services: servicesArray
            };

            await axios.post('bron', newData);
            navigate(`/confirm/${barberId}/${selectedServices}/${date}/${time}`);

        } catch (error) {
            Swal.fire({
                title: "Xato!",
                text: error.response?.data?.message || "Xatolik yuz berdi.",
                icon: "error",
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false
            });
        } finally {
            setLoading(false);
        }
    };

    const handlePhoneChange = (e) => {
        const input = e.target.value;
        // Разрешить только цифры + ограничение длины
        if (/^\+?\d*$/.test(input) && input.length <= 13) {
            setPhone(input);
        }
    };

    return (
        <div className="record_input mb-24 mt-[20px] bg-white p-4">
            <h3 className="font-bold text-lg mb-4">{t('password1')}</h3>

            <div className="mb-5">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                    {t('name')} <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ismingizni kiriting"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-gray-900"
                    required
                />
            </div>

            <div className="mb-5">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                    {t('tell')} <span className="text-red-500">*</span>
                </label>
                <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="+998901234567"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-gray-900"
                    required
                />
            </div>

            <div className="mb-5">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                    {t('comment')}
                </label>
                <textarea
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-gray-900"
                />
            </div>

            <div className="flex items-start justify-start gap-[10px] mb-6">
                <label className="flex items-start gap-[10px] cursor-pointer">
                    <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        className="h-[20px] w-[20px] text-black focus:ring-black border-gray-300 rounded accent-black checked:bg-black checked:border-black mt-1"
                    />
                    <p className="text-sm">
                        {t('password3')}
                    </p>
                </label>
            </div>

            <div className="mt-6 fixed bottom-0 bg-white rounded-[5px   ] left-0 right-0 max-w-xl mx-auto p-4 z-50 border-t border-gray-200">
                <button
                    onClick={CreateBron}
                    disabled={loading}
                    className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors no-underline focus:outline-none ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800 text-white'}`}
                >
                    {loading ? t('loading') || 'Yuklanmoqda...' : t('done2')}
                </button>
            </div>
        </div>
    );
}
