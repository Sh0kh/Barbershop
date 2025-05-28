import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { Input, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { $api } from "../../utils";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";


export default function AdminBarberWorkTimeEdit({ isOpen, onClose, data, refresh }) {
    const today = new Date().toISOString().split("T")[0];

    const { ID } = useParams()
    const [formData, setFormData] = useState({
        date: today,
        startTime: "09:00",
        endTime: "18:00",
    });

    useEffect(() => {
        if (data) {
            setFormData({
                date: data.date || today,
                startTime: data.start_time?.slice(0, 5) || "09:00",
                endTime: data.end_time?.slice(0, 5) || "18:00",
            });
        }
    }, [data, today]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const newData = {
                date: formData?.date,
                start_time: formData?.startTime,
                end_time: formData?.endTime,
                user_id: ID,

            }
            const response = await $api.put(`work-schedules/${data?.id}`, newData)
            Swal.fire({
                title: "Muvaffaqiyatli!",
                icon: "success",
                toast: true,
                position: "top-end",
                timer: 3000,
                customClass: {
                    container: 'swal2-container-higher-zindex'
                },
                showConfirmButton: false
            });
            onClose()
            refresh()
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Xato!",
                text: error.response?.data?.message || "Xatolik yuz berdi.",
                icon: "error",
                toast: true,
                position: "top-end",
                customClass: {
                    container: 'swal2-container-higher-zindex'
                },
                timer: 3000,
                showConfirmButton: false
            });
        }
    };


    return (
        <>
            <Dialog
                style={{ zIndex: 9000 }} // Добавьте это
                open={isOpen} size="md" handler={onClose} >
                <DialogHeader>Ish vaqti tahrirlash</DialogHeader>
                <DialogBody divider className="grid gap-4">
                    <Input
                        label="Sana tanlang"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                    <Input
                        label="Ish boshlanish vaqti"
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                    />
                    <Input
                        label="Ish tugash vaqti"
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                    />
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={onClose}>
                        Yopish
                    </Button>
                    <Button variant="gradient" color="blue" onClick={handleSave}>
                        Saqlash
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}