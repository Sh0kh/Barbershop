import { useState } from "react";
import LogoUse from "../LogoUsing";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function BarberComment() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("+998");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const { ID } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async () => {

        const data = {
            user_id: ID,
            name,
            phone,
            rating,
            comment,
        };

        try {
            await axios.post(`commet`, data);
            Swal.fire({
                title: "Muvaffaqiyatli!",
                icon: "success",
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false,
            });
            setName("");
            setPhone("+998");
            setComment("");
            setRating(0);
            setHover(0);

            navigate(-1);
        } catch (error) {
            Swal.fire({
                title: "Xato!",
                text: error.response?.data?.message || "Xatolik yuz berdi.",
                icon: "error",
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false,
            });
            console.log(error);
        }
    };

    return (
        <div className="mx-auto max-w-[600px] pb-24 min-h-screen p-4">
            <LogoUse />
            <div
                className="bg-white rounded-lg shadow-md p-3 space-y-6"
            >
                <h2 className="text-xl font-semibold text-gray-700">Qoldiring izoh</h2>

                <div>
                    <label className="block text-gray-600 mb-1">Ismingiz</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-600 mb-1">Telefon raqam</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-600 mb-1">Baholang</label>
                    <div className="flex justify-center space-x-2">
                        {[...Array(5)].map((_, index) => {
                            const starValue = index + 1;
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setRating(starValue)}
                                    onMouseEnter={() => setHover(starValue)}
                                    onMouseLeave={() => setHover(0)}
                                >
                                    <FaStar
                                        className={`w-10 h-10 transition-colors duration-150 ${starValue <= (hover || rating)
                                            ? "text-yellow-400"
                                            : "text-gray-400"
                                            }`}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <label className="block text-gray-600 mb-1">Kommentariya</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg resize-none"
                        rows={4}
                        required
                    ></textarea>
                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-black text-white w-full px-6 py-2 rounded-lg transition"
                >
                    Yuborish
                </button>
            </div>
        </div>
    );
}
