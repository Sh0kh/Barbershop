import { useEffect } from "react";
import { useState } from "react";
import { $api } from "../../../utils";
import Swal from "sweetalert2";
import ReactLoading from 'react-loading';
import { useNavigate } from "react-router-dom";
import FotoPerson from '../../../Components/UI/Icons/FotoPerson.jpg'

export default function Profile() {


    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [barber, setBarber] = useState([])
    const [infoUz, setinfoUz] = useState('')
    const [infoRu, setinfoRu] = useState('')

    const navigate = useNavigate()

    const fetchBarberData = async () => {
        try {
            setLoading(true);
            const response = await $api.get("/profile");
            setBarber(response?.data?.data);
            setName(response?.data?.data.name || "");
            setLastname(response?.data?.data.lastname || "");
            setPhone(response?.data?.data.phone || "");
            setinfoRu(response?.data?.data.bio_ru || "")
            setinfoUz(response?.data?.data.bio_uz || "")
            setImagePreview(response?.data?.data.image || "");
        } catch (err) {
            setError(err.response?.data?.message || "Profil ma'lumotlarini olishda xatolik yuz berdi");
            console.error("Xatolik:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBarberData()
    }, [])

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = async () => {
        if (!name || !lastname || !phone) {
            Swal.fire("Xato!", "Barcha majburiy maydonlar to‘ldirilishi kerak.", "error");
            return;
        }
        if (password && password !== passwordConfirmation) {
            Swal.fire("Xato!", "Parollar mos kelmayapti.", "error");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("lastname", lastname);
            formData.append("phone", phone);
            formData.append("text_uz", infoUz);
            formData.append("text_ru", infoRu);
            if (password) {
                formData.append("password", password);
                formData.append("password_confirmation", passwordConfirmation);
            }
            if (image) {
                formData.append("image", image);
            }

            await $api.post(`/profile`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            Swal.fire({
                title: "Yangilandi!",
                icon: "success",
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false
            });
            resetForm();
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

    const resetForm = () => {
        setPassword("");
        setPasswordConfirmation("");
        setImage(null);
    };


    if (loading) {
        return (
            <div className="mx-auto max-w-[600px] pb-24 min-h-screen p-4">
                <div className="mb-6 p-4 bg-white h-[100%] rounded-lg shadow  ">
                    <div className="flex items-center justify-center h-screen ">
                        <ReactLoading type="spinningBubbles" color="black" height={80} width={80} />
                    </div>
                </div>
            </div>
        )
    }


    if (barber === null || !barber || barber?.length === 0) {
        return (
            <div className="mx-auto max-w-[600px] pb-24 min-h-screen p-4">
                <div className="mb-6 p-4 bg-white h-[100%] rounded-lg shadow  ">
                    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
                        <div className="text-gray-400 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-700 mb-2"> Ma'lumot topilmadi</h3>
                        <p className="text-sm text-gray-500 max-w-xs">
                            Hozircha hali ma'lumot yo‘q, iltimos, keyinroq urinib korishni so‘raymiz.
                        </p>
                    </div>
                </div>
            </div >
        )
    }


    return (
        <>

            <div className="mx-auto max-w-[600px] pb-24 min-h-screen p-4">
                <div className=" p-4 bg-white rounded-lg shadow mb-[20px]  ">
                    <div className="flex justify-between items-center ">
                        <button
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Ortga
                        </button>
                    </div>
                </div>
                <div className="mb-6 p-4 bg-white rounded-lg shadow  ">
                    <div className="mb-6 text-center">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rasm</label>
                        <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer hover:border-blue-500 transition">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            {imagePreview ? (
                                <img src={imagePreview || FotoPerson} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                    <span>+</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Input label="Ism" value={name} onChange={setName} />
                        <Input label="Familiya" value={lastname} onChange={setLastname} />
                        <Input label="Telefon" value={phone} onChange={setPhone} />
                        <Input label="Yangi parol (ixtiyoriy)" value={password} onChange={setPassword} type="password" />
                        <Input label="Parolni tasdiqlash" value={passwordConfirmation} onChange={setPasswordConfirmation} type="password" />
                        <label className="mt-[10px] block" htmlFor="infoUz">
                            <span>
                                Info uz
                            </span>
                            <textarea
                                value={infoUz}
                                onChange={(e) => setinfoUz(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                name="infoUz">

                            </textarea>
                        </label>
                        <label className="mt-[10px] block" htmlFor="infoUz">
                            <span>
                                Info ru
                            </span>
                            <textarea
                                value={infoRu}
                                onChange={(e) => setinfoRu(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                name="infoUz">

                            </textarea>
                        </label>
                        <button
                            disabled={loading}
                            onClick={handleUpdate}
                            className={`w-full py-3 rounded-lg font-semibold text-white transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"
                                }`}
                        >
                            {loading ? "Yangilanmoqda..." : "Tahrirlashni saqlash"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

function Input({ label, value, onChange, type = "text" }) {
    return (
        <div>
            <label className="block text-sm text-gray-700">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-2 rounded-lg outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
        </div>
    );
}