import { Dialog, Typography, Button } from "@material-tailwind/react";
import { $api } from '../../../utils';
import Swal from "sweetalert2";

export default function AdminServiceDelete({ isOpen, onClose, id, refresh }) {

    const DeleteService = async () => {
        try {
            await $api.delete(`/admin/services/${id}`);
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
            refresh();
            onClose();
        } catch (error) {
            Swal.fire({
                title: "Xato!",
                text: error.response?.data?.message || "Xatolik yuz berdi.",
                icon: "error",
                toast: true,
                position: "top-end",
                timer: 3000,
                customClass: {
                    container: 'swal2-container-higher-zindex'
                },
                showConfirmButton: false
            });
        }
    };

    return (
        <Dialog
            open={isOpen}
            handler={onClose}
            size="xs" // 👈 Это делает модальное окно меньше
            style={{ zIndex: 9000 }}
            className="bg-white rounded-md shadow-lg max-w-xs"
        >
            <div className="p-4">
                <Typography variant="h5" color="blue-gray" className="text-gray-900">
                    O'chirishni tasdiqlang
                </Typography>
                <Typography variant="paragraph" className="mt-2 text-sm text-gray-600">
                    Siz ushbu xizmatni o'chirmoqchimisiz?
                </Typography>
            </div>
            <div className="flex justify-end gap-2 p-4 mt-2 border-t border-gray-200">
                <Button
                    variant="outlined"
                    color="gray"
                    onClick={onClose}
                    className="normal-case text-sm px-3 py-2"
                >
                    Bekor qilish
                </Button>
                <Button
                    variant="filled"
                    color="red"
                    onClick={DeleteService}
                    className="normal-case bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-2"
                >
                    O'chirish
                </Button>
            </div>
        </Dialog>
    );
}