import { useNavigate } from "react-router-dom";


export default function AdminHeader() {
    let navigate = useNavigate()

    const Exit = () => {
        navigate('/login');
        localStorage.clear();
    };

    return (
        <div className="w-[78%] p-[10px] fixed rounded-[10px] bg-[white] shadow-lg">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-[10px]">
                </div>
                <div>
                    <button
                        onClick={Exit}
                        className="box-border bg-black flex items-center gap-[5px] text-[white] px-[20px] py-[8px] rounded-[10px] shadow-xl duration-500 hover:text-black border-[2px] hover:border-black hover:bg-transparent"
                    >
                        Chiqish
                        <svg className="text-[20px]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M5.002 21h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2h-14c-1.103 0-2 .897-2 2v6.001H10V7l6 5l-6 5v-3.999H3.002V19c0 1.103.897 2 2 2"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
