import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { $api } from '../../utils';
import Swal from "sweetalert2";


export default function BarberServiceDelete({ isOpen, onClose, id, refresh }) {



    const DeleteService = async () => {
        try {
            await $api.delete(`services/${id}`)
            Swal.fire({
                title: "Muvaffaqiyatli!",
                icon: "success",
                toast: true,
                position: "top-end",
                timer: 3000,
                showConfirmButton: false
            });
            refresh()
            onClose()
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
    }

    return (
        <Dialog
            open={isOpen}

            onClose={onClose}
            PaperProps={{ className: 'bg-white text-black rounded-md shadow-lg' }}
        >
            <DialogTitle className="text-gray-900">O'chirishni tasdiqlang</DialogTitle>
            <DialogContent>
                <p className="text-sm text-gray-600">Siz ushbu xizmatni o'chirmoqchimisiz?</p>
            </DialogContent>
            <DialogActions className="px-4 pb-3">
                <Button
                    onClick={onClose}
                    color="primary"
                    className="text-gray-600 hover:text-gray-800"
                >
                    Bekor qilish
                </Button>
                <Button

                    onClick={DeleteService}
                    color="error"
                    variant="contained"
                    className="bg-red-600 hover:bg-red-700 text-white"
                >
                    O'chirish
                </Button>
            </DialogActions>
        </Dialog>
    );
}