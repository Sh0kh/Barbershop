import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { Input, Button } from "@material-tailwind/react";
import { useState } from "react";
import { $api } from "../../../utils";
import Swal from "sweetalert2";


export default function BarberWorkTimeCreate({refresh}) {
    const [open, setOpen] = useState(false);
    const today = new Date().toISOString().split("T")[0];
    const [formData, setFormData] = useState({
        date: today,
        startTime: "09:00",
        endTime: "18:00",
    });

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
                end_time: formData?.endTime
            }
            const response = await $api.post(`worktime`, newData)
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
            setFormData({
                date: today,
                startTime: "09:00",
                endTime: "18:00",
            });
            refresh()
            setOpen(false)
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
            <Button color="blue" onClick={() => setOpen(true)}>
                Yaratish
            </Button>

            <Dialog
                style={{ zIndex: 9000 }} 
                open={open} size="xl" handler={() => setOpen(false)} >
                <DialogHeader>Ish vaqti</DialogHeader>
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
                    <Button variant="text" color="red" onClick={() => setOpen(false)}>
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