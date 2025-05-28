import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { $api } from "../../../utils";

export default function AdminBarberCommentDelete({ isOpen, onClose, id, refresh }) {
    const handleDelete = async () => {
        try {
            await $api.delete(`commets/${id}`);

            Swal.fire({
                title: "Muvaffaqiyatli!",
                icon: "success",
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false,
                customClass: {
                    container: 'swal2-container-higher-zindex'
                }
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
                showConfirmButton: false
            });
        }
    };

    return (
        <Dialog open={isOpen} handler={onClose} size="sm" className="rounded-lg shadow-lg">
            <DialogHeader className="text-gray-900 text-lg font-semibold">
                O'chirishni tasdiqlang
            </DialogHeader>
            <DialogBody divider>
                <p className="text-sm text-gray-700 font-medium">
                    Siz ushbu commentni o'chirmoqchimisiz?
                </p>
            </DialogBody>
            <DialogFooter className="flex justify-end gap-3">
                <Button
                    variant="text"
                    color="blue-gray"
                    onClick={onClose}
                    ripple={true}
                    className="hover:bg-gray-100"
                >
                    Bekor qilish
                </Button>
                <Button
                    color="red"
                    onClick={handleDelete}
                    ripple={true}
                    className="bg-red-600 hover:bg-red-700"
                >
                    O'chirish
                </Button>
            </DialogFooter>
        </Dialog>
    );
}