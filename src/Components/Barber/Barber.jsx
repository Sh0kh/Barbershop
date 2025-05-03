import { NavLink } from "react-router-dom";
import LogoUse from "../LogoUsing";
import BarberHero from "./components/BarberHero";
import Comment from "./components/Comment";

export default function Barber(){
    return(
        <div className="mx-auto max-w-[600px] pb-24  min-h-screen p-4">
            <LogoUse/>
            <BarberHero/>
            <Comment/>
            <div className="mt-6 fixed bottom-0  left-0 right-0 max-w-xl mx-auto p-4 z-50  border-gray-200">
                      <NavLink to="/service" className="block w-full text-center bg-black  text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors no-underline focus:outline-none">
                      Выбрать этого специалиста 
                      </NavLink>
                    </div>
        </div>
    )
}