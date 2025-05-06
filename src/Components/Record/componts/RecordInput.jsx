import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function RecordInput() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('+998');
    const [email, setEmail] = useState('');

    const { t, i18n } = useTranslation();

    return ( 
        <div className="record_input mb-24 mt-[20px] bg-white p-4">
            <h3 className="font-bold text-lg mb-4">{t('password1')}
            </h3>

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
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-gray-900"
                    required
                />
            </div>

            <div className="mb-5">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                {t('comment')}
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-gray-900"
                />
            </div>

            <div className="flex items-start justify-start gap-[10px] mb-6">
                <label className="flex items-start gap-[10px] cursor-pointer">
                    <input
                        type="checkbox"
                        className="h-[20px] w-[20px] text-black focus:ring-black border-gray-300 rounded accent-black checked:bg-black checked:border-black mt-1"
                    />
                    <p className="text-sm">
                     {t('password3')}
                    </p>
                </label>
            </div>


            <div className="flex justify-between font-bold mt-4">
                <span className="text-gray-900">{t('total')}</span>
                <span className="text-gray-900">180 000 so'm</span>
            </div>

            <div className="mt-6 fixed bottom-0 bg-white left-0 right-0 max-w-xl mx-auto p-4 z-50 border-t border-gray-200">
                <NavLink
                    to="/confirm"
                    className="block w-full text-center bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors no-underline focus:outline-none"
                >
                    {t('done2')}
                </NavLink>
            </div>
        </div>
    );
}