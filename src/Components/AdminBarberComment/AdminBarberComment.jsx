import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { $api } from "../../utils";
import ReactLoading from "react-loading";
import Delete from "../UI/Icons/Delete";
import AdminBarberCommentDelete from "./components/AdminBarberCommentDelete";

export default function AdminBarberComment() {
    const { ID } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const navigate = useNavigate();

    const getAllComment = async () => {
        setLoading(true);
        try {
            const response = await $api.get(`userscommets/${ID}`);
            setData(response?.data?.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllComment();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <ReactLoading type="spinningBubbles" color="black" height={80} width={80} />
            </div>
        );
    }

    return (
        <>
            <div className="mx-auto  p-6 mt-14">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Foydalanuvchi Izohlari</h1>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                    >
                        Ortga
                    </button>
                </div>

                {data?.length <= 0 ? (
                    <div className="flex flex-col items-center justify-center bg-white rounded-xl p-10 shadow-md">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 text-gray-300 mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">Ma'lumot topilmadi</h3>
                        <p className="text-sm text-gray-500 text-center max-w-sm">
                            Hozircha hali izoh yo‘q, iltimos keyinroq qayta urinib ko‘ring.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {data?.map((review, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-green-100 text-green-600 font-bold rounded-full flex items-center justify-center mr-3">
                                            {review.name?.trim().charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800">{review.name}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {new Date(review.created_at).toLocaleString("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: false,
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setDeleteModal(true);
                                            setDeleteId(review?.id);
                                        }}
                                        className="text-red-500 hover:text-red-600 transition"
                                    >
                                        <Delete size={20} />
                                    </button>
                                </div>

                                <div className="mt-3">
                                    <div className="flex text-yellow-400 mb-1">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className="w-5 h-5 fill-current"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 15l-5.5 3 1-5.5L2 8l5.5-1L10 2l2.5 5 5.5 1-3.5 4.5 1 5.5z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-700">{review.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AdminBarberCommentDelete
                isOpen={deleteModal}
                onClose={() => setDeleteModal(false)}
                id={deleteId}
                refresh={getAllComment}
            />
        </>
    );
}
