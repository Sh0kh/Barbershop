import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from '../../../../Components/UI/Icons/HomeLogo.jpg'
export default function Sidebar() {
    const [role, setRole] = useState('admin');
    const location = useLocation()

    const adminMenuItems = [
        {
            id: 1,
            title: "Bosh sahifa",
            path: "/admin/dashboard",
            icon: (
                <svg
                    className="text-[40px] text-MainColor group-hover:text-[#0077b6] duration-300"
                    xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1" />
                </svg>
            )
        },
        {
            id: 2,
            title: "Barberlar",
            path: "/admin/barbers",
            icon: (
                <svg
                    className="text-[40px] text-MainColor group-hover:text-[#0077b6] duration-300"
                    xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M336 256c-20.56 0-40.44-9.18-56-25.84c-15.13-16.25-24.37-37.92-26-61c-1.74-24.62 5.77-47.26 21.14-63.76S312 80 336 80c23.83 0 45.38 9.06 60.7 25.52c15.47 16.62 23 39.22 21.26 63.63c-1.67 23.11-10.9 44.77-26 61C376.44 246.82 356.57 256 336 256m131.83 176H204.18a27.71 27.71 0 0 1-22-10.67a30.22 30.22 0 0 1-5.26-25.79c8.42-33.81 29.28-61.85 60.32-81.08C264.79 297.4 299.86 288 336 288c36.85 0 71 9 98.71 26.05c31.11 19.13 52 47.33 60.38 81.55a30.27 30.27 0 0 1-5.32 25.78A27.68 27.68 0 0 1 467.83 432M147 260c-35.19 0-66.13-32.72-69-72.93c-1.42-20.6 5-39.65 18-53.62c12.86-13.83 31-21.45 51-21.45s38 7.66 50.93 21.57c13.1 14.08 19.5 33.09 18 53.52c-2.87 40.2-33.8 72.91-68.93 72.91m65.66 31.45c-17.59-8.6-40.42-12.9-65.65-12.9c-29.46 0-58.07 7.68-80.57 21.62c-25.51 15.83-42.67 38.88-49.6 66.71a27.39 27.39 0 0 0 4.79 23.36A25.32 25.32 0 0 0 41.72 400h111a8 8 0 0 0 7.87-6.57c.11-.63.25-1.26.41-1.88c8.48-34.06 28.35-62.84 57.71-83.82a8 8 0 0 0-.63-13.39c-1.57-.92-3.37-1.89-5.42-2.89" />
                </svg>
            )
        },
         {
            id: 2,
            title: "Foyda",
            path: "/admin/benefit",
            icon: (
             <svg className="text-[40px] text-MainColor group-hover:text-[#0077b6] duration-300" xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7M10.5 16a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0"/><path fill="currentColor" d="M17.526 5.116L14.347.659L2.658 9.997L2.01 9.99V10H1.5v12h21V10h-.962l-1.914-5.599zM19.425 10H9.397l7.469-2.546l1.522-.487zM15.55 5.79L7.84 8.418l6.106-4.878zM3.5 18.169v-4.34A3 
             3 0 0 0 5.33 12h13.34a3 3 0 0 0 1.83 1.83v4.34A3 3 0 0 0 18.67 20H5.332A3.01 3.01 0 0 0 3.5 18.169"/></svg>
            )
        },
         {
            id: 2,
            title: "Arxiv",
            path: "/admin/archive",
            icon: (
             <svg className="text-[40px] text-MainColor group-hover:text-[#0077b6] duration-300" xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 24 24"><path fill="currentColor"
              d="M5 21q-.825 0-1.412-.587T3 19V6.525q0-.35.113-.675t.337-.6L4.7 3.725q.275-.35.687-.538T6.25 3h11.5q.45 0 .863.188t.687.537l1.25 1.525q.225.275.338.6t.112.675V19q0 .825-.587 1.413T19 21zm.4-15h13.2l-.85-1H6.25zm6.6 4q-.425 0-.712.288T11 11v3.2l-.9-.9q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.6 2.6q.3.3.7.3t.7
             -.3l2.6-2.6q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275l-.9.9V11q0-.425-.288-.712T12 10"/></svg>
            )
        }
    ];

    return (
        <div className="h-[97%] w-[300px] shadow-2xl bg-white fixed mt-[10px] ml-[10px] p-[10px] rounded-[10px]">
            <div>
                <img src={Logo} alt="Logo" className="mx-auto w-[220px]" />
            </div>
            <div className="mt-[10px]">
                {adminMenuItems.map((item) => (
                    <NavLink key={item.id} to={item.path}>
                        <button
                            className={`group w-full ${location.pathname === item?.path ? 'shadow-xl scale-100 border-[#E6F0F9] bg-[#F0F8FF]' : ''} shadow-md duration-500 mt-[10px] hover:shadow-xl scale-95 hover:scale-100 flex items-center gap-[10px] border-[2px] rounded-[10px] border-[#E5EFF9] p-[5px] hover:border-[#E6F0F9] hover:bg-[#F0F8FF]`}>
                            {item.icon}
                            <span className="text-[#70757b] group-hover:text-[#0077b6] duration-300">
                                {item.title}
                            </span>
                        </button>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}