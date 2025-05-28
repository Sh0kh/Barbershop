import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { $api } from "../../../utils";
import Swal from "sweetalert2";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
    Typography,
} from "@material-tailwind/react";

export default function AdminServiceEdit({ open, onClose, refresh, data }) {
    const { ID } = useParams();
    const [nameUz, setNameUz] = useState('');
    const [nameRu, setNameRu] = useState('');
    const [infoUz, setInfoUz] = useState('');
    const [infoRu, setInfoRu] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({});



    useEffect(() => {
        if (data) {
            setNameUz(data.name_uz || '');
            setNameRu(data.name_ru || '');
            setInfoUz(data.description_uz || '');
            setInfoRu(data.description_ru || '');
            setPrice(data.price ? data.price.toString() : '');
        }
    }, [data]);

    const EditService = async () => {
        try {
            const cleanedPrice = price.replace(/\s/g, '');
            const newData = {
                name_uz: nameUz.trim(),
                name_ru: nameRu.trim(),
                description_uz: infoUz.trim(),
                description_ru: infoRu.trim(),
                price: Number(cleanedPrice),
                user_id: ID,
            };

            await $api.put(`admin/services/${data?.id}`, newData);

            Swal.fire({
                icon: "success",
                title: "Muvaffaqiyatli!",
                toast: true,
                position: "top-end",
                timer: 3000,
                customClass: {
                    container: 'swal2-container-higher-zindex'
                },
                showConfirmButton: false,
            });

            onClose();
            if (refresh) refresh();
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Xato!",
                text: error.response?.data?.message || "Xatolik yuz berdi.",
                toast: true,
                position: "top-end",
                timer: 3000,
                customClass: {
                    container: 'swal2-container-higher-zindex'
                },
                showConfirmButton: false,
            });
        }
    };

    return (
        <Dialog style={{ zIndex: 9000 }} open={open} handler={onClose} size="sm">
            <DialogHeader className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray" className="font-bold">
                    Hizmatni tahrirlash
                </Typography>
            </DialogHeader>

            <DialogBody className="overflow-y-auto">
                <div className="grid gap-6">
                    <Input
                        label="Hizmat nomi (uz)"
                        value={nameUz}
                        onChange={(e) => setNameUz(e.target.value)}
                        error={!!errors.nameUz}
                        variant="outlined"
                        color="blue"
                    />

                    <Input
                        label="Hizmat nomi (ru)"
                        value={nameRu}
                        onChange={(e) => setNameRu(e.target.value)}
                        error={!!errors.nameRu}
                        variant="outlined"
                        color="blue"
                    />

                    <Input
                        type="text"
                        label="Hizmat narxi (so'm)"
                        value={price.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                        onChange={(e) => setPrice(e.target.value)}
                        error={!!errors.price}
                        variant="outlined"
                        color="blue"
                    />

                    <Textarea
                        label="Tavsif (uz)"
                        value={infoUz}
                        onChange={(e) => setInfoUz(e.target.value)}
                        rows={3}
                        variant="outlined"
                        color="blue"
                    />

                    <Textarea
                        label="Описание (ru)"
                        value={infoRu}
                        onChange={(e) => setInfoRu(e.target.value)}
                        rows={3}
                        variant="outlined"
                        color="blue"
                    />
                </div>
            </DialogBody>

            <DialogFooter className="pt-2">
                <Button
                    fullWidth
                    onClick={EditService}
                    className="normal-case text-base"
                >
                    Saqlash
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
