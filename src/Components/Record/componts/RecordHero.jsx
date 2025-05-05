import { Link, NavLink } from 'react-router-dom';
import Edit from '../../UI/Icons/Edit';
import LogoUse from '../../LogoUsing';

export default function RecordHero() {
  return (
    <div className="record_hero max-w-[100%] mx-auto p-4 bg-white">
      <LogoUse />
      <div className="flex items-center mb-8">
        <div className="flex-1">
          <h1 className="font-bold text-lg">Yozuv tafsilotlari</h1>
        </div>
        <div className="w-6"></div> {/* Balans uchun */}
      </div>

      <div className="flex items-center justify-between">
        <div className="mb-8 flex items-center justify-start gap-[10px]">
          <div>
            <img
              className="barber_img w-14 h-14 mr-[5px] rounded-full object-cover"
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt=""
            />
          </div>
          <div>
            <h2 className="font-bold text-xl mb-1">Anastasiya (Anastacija)</h2>
            <p className="text-gray-600 text-base">Barber</p>
          </div>
        </div>

        <NavLink to="/">
          <Edit />
        </NavLink>
      </div>

      <div className="flex items-center justify-between">
        <div className="mb-8 flex items-center justify-start gap-[10px]">
          <div className="div_calen">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M2 9c0-1.886 0-2.828.586-3.414S4.114 5 6 5h12c1.886 0 2.828 0 3.414.586S22 7.114 22 9c0 .471 0 .707-.146.854C21.707 10 21.47 10 21 10H3c-.471 0-.707 0-.854-.146C2 9.707 2 9.47 2 9m0 9c0 1.886 0 2.828.586 3.414S4.114 22 6 22h12c1.886 0 2.828 0 3.414-.586S22 19.886 22 18v-5c0-.471 0-.707-.146-.854C21.707 12 21.47 12 21 12H3c-.471 0-.707 0-.854.146C2 12.293 2 12.53 2 13z"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 3v3m10-3v3"/></g></svg>
          </div>
          <div>
            <h2 className="font-medium text-gray-900">Juma, 9-may</h2>
            <p className="text-gray-600 text-base">10:30 — 11:30</p>
          </div>
        </div>

        <NavLink to="/date">
          <Edit />
        </NavLink>
      </div>

      <div className="mb-8">
        <h3 className="font-bold text-lg mb-4 border-t pt-[10px]">
          Xizmatlar <span className="font-normal text-gray-600">1 soat</span>
        </h3>

        <div className="border-b border-gray-200 py-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-900">Klassik soqqa qirqish + shakllantirish</span>
            <span className="text-gray-600">1 soat</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">180 000 so'm</span>
          </div>
        </div>

        <div className="flex justify-between font-bold mt-4">
          <span className="text-gray-900">Jami</span>
          <span className="text-gray-900">180 000 so'm</span>
        </div>
      </div>
    </div>
  );
}