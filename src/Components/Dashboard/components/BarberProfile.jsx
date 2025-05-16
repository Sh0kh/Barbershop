import { useState, useEffect } from "react";
import { User, Edit } from "lucide-react";

import { NavLink } from "react-router-dom";


export default function BarberProfile({ barber }) {


    return (
        <div className="flex flex-col items-center mb-4">
            <div className="relative">
                {barber.image ? (
                    <img
                        src={barber.image}
                        alt="berber rasmi"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                        <User size={40} className="text-gray-400" />
                    </div>
                )}
                <NavLink to={`/barber/profile`}>
                    <button
                        className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full text-white"
                    >
                        <Edit size={16} />
                    </button>
                </NavLink>
            </div>
            <h1 className="mt-2 text-xl font-bold">{barber.name}</h1>
            <h1 className="text-lg">{barber.lastname}</h1>
            <div className="flex mt-2 text-sm text-gray-600">
                {barber.phone && <p>{barber.phone}</p>}
            </div>


        </div>
    );
}