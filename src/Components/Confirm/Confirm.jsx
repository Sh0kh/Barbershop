import { useState } from "react";
import LogoUse from "../LogoUsing";
import ConfrimHero from "./components/ConfirmHero";
import ReactLoading from 'react-loading';
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Confrim() {

    const { barberId, selectedServices } = useParams()
    const [barberData, setBarberData] = useState([])
    const [serviceData, setServiceData] = useState([])
    const [loadingBarber, setLoadingBarber] = useState(true)
    const [loadingService, setLoadingService] = useState(true)


    const getBarber = async () => {
        setLoadingBarber(true)
        try {
            const response = await axios.get(`/barberss/${barberId}`)
            setBarberData(response?.data?.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingBarber(false)
        }
    }
    const getService = async () => {
        try {
            setLoadingService(true)
            const serviceIds = selectedServices.split(",");
            const requests = serviceIds.map(id =>
                axios.get(`/serviceId?user_id=${barberId}&service=${id}`)
            );

            const responses = await Promise.all(requests);
            const allServices = responses.map(res => res?.data?.data).flat();

            setServiceData(allServices);
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingService(false)
        }
    };




    useEffect(() => {
        getBarber()
        getService()
    }, [barberId])



    if (loadingBarber && loadingService) {
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
        <div className="mx-auto max-w-[600px] pb-24 bg-white  min-h-screen p-4">
            <LogoUse />
            <ConfrimHero barberData={barberData} serviceData={serviceData} />
        </div>
    )
}