import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { $api } from "../../utils"
import ReactLoading from 'react-loading';
import BarberDashboardCommentDelete from "./components/BarberComment/BarberDashboardCommentDelete";
import Delete from "../UI/Icons/Delete";


export default function BarberDashboardComTwo() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState()
    const navigate = useNavigate()

    const getAllComment = async () => {
        setLoading(true)
        try {
            const response = await $api.get(`/commets`)
            setData(response?.data?.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getAllComment()
    }, [])

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


    return (
        <>
            <div className="mx-auto max-w-[1000px] pb-24 min-h-screen p-4">
                <div className="mb-6 p-4 bg-white rounded-lg shadow  ">
                    <div className="flex justify-between items-center ">
                        <h1 className="text-[16px] font-bold">
                            Comment
                        </h1>
                        <button
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Ortga
                        </button>
                    </div>
                </div>
                {data?.length <= 0 ? (
                    <div className="mx-auto min-h-screen mt-4">
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
                ) : (
                    <div className="mb-6 p-4 bg-white rounded-lg shadow  ">
                        {data?.map((review, index) => (
                            <div key={index} className="flex items-center mb-[20px]">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold mr-2">
                                    {review.name?.trim().charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 mb-[10px]">
                                    <div className="flex items-center justify-between">
                                        <div className="flex text-yellow-400 mb-[10px]">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className="w-4 h-4 fill-current"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M10 15l-5.5 3 1-5.5L2 8l5.5-1L10 2l2.5 5 5.5 1-3.5 4.5 1 5.5z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <button 
                                        onClick={()=>{setDeleteModal(true); setDeleteId(review?.id)}}
                                        >
                                            <Delete size={20} />
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500">{review.name}</p>
                                    <p className="text-xs text-gray-500 my-[3px]">{review.comment}</p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(review.created_at).toLocaleString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false,
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <BarberDashboardCommentDelete isOpen={deleteModal} onClose={()=>setDeleteModal(false)} id={deleteId} refresh={getAllComment} />
        </>
    )
}