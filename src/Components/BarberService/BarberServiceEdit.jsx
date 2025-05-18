import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { $api } from "../../utils"
import Swal from "sweetalert2";

export default function BarberServiceEdit() {

    const [nameUz, setnameUz] = useState('')
    const [nameRu, setnameRu] = useState('')
    const [infoUz, setInfoUZ] = useState('')
    const [infoRu, setInfoRu] = useState('')
    const [price, setPrice] = useState('')
    const { ID } = useParams()


    const getService = async () => {
        try {
            const response = await $api.get(`services/${ID}`)
            const data = response?.data?.data
            setnameUz(data?.name_uz || '')
            setnameRu(data?.name_ru || '')
            setInfoUZ(data?.description_uz || '')
            setInfoRu(data?.description_ru || '')
            setPrice(data?.price || '')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getService()
    }, [ID])

    const EditServece = async () => {
        try {
            const newData = {
                id: ID,
                name_uz: nameUz,
                name_ru: nameRu,
                description_uz: infoUz,
                description_ru: infoRu,
                price: Number(price.replace(/\s/g, ''))
            }
            const response = await $api.put(`services`, newData)
            Swal.fire({
                title: "Muvaffaqiyatli!",
                icon: "success",
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false
            });
            setnameRu('')
            setnameUz('')
            setInfoRu('')
            setInfoUZ('')
            setPrice('')
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Xato!",
                text: error.response?.data?.message || "Xatolik yuz berdi.",
                icon: "error",
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false
            });
        }
    }

    const navigate = useNavigate()
    return (
        <>
            <div className="mx-auto max-w-[600px] pb-24 min-h-screen p-4">
                <div className="mb-6 p-4 bg-white rounded-lg shadow flex items-center justify-between">
                    <h1 className="text-[20px] font-bold">
                        Hizmat yangilash
                    </h1>
                    <button
                        onClick={() => {
                            navigate(-1)
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Ortga
                    </button>
                </div>
                <div className="mb-6 p-4 bg-white rounded-lg shadow  ">
                    <div>
                        <label className="block text-sm text-gray-700  mb-[7px]">Hizmat nomi (uz)</label>
                        <input
                            type='text'
                            value={nameUz}
                            onChange={(e) => setnameUz(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mt-[15px]">
                        <label className="block text-sm text-gray-700  mb-[7px]">Hizmat nomi (ru)</label>
                        <input
                            type='text'
                            value={nameRu}
                            onChange={(e) => setnameRu(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mt-[15px]">
                        <label className="block text-sm text-gray-700  mb-[7px]">Hizmat narxi</label>
                        <input
                            type="text"
                            value={price.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <label className="mt-[10px] block" htmlFor="infoUz">
                        <span className="block text-sm text-gray-700  mb-[7px]">
                            Info (uz)
                        </span>
                        <textarea
                            value={infoUz}
                            onChange={(e) => setInfoUZ(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            name="infoUz">

                        </textarea>
                    </label>
                    <label className="mt-[10px] block" htmlFor="infoUz">
                        <span className="block text-sm text-gray-700  mb-[7px]">
                            Info (ru)
                        </span>
                        <textarea
                            value={infoRu}
                            onChange={(e) => setInfoRu(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            name="infoUz">

                        </textarea>
                    </label>
                    <button
                        onClick={EditServece}
                        className="px-4 py-2 w-full mt-[20px] bg-black text-white rounded hover:bg-black-600">
                        Yangilash
                    </button>
                </div>
            </div>

        </>
    )
}