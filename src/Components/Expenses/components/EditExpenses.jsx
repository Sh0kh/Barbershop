import { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { $api } from "../../../utils";
import Swal from "sweetalert2";

export default function EditExpenses({ refresh, isOpen, onClose, data }) {
  // Состояния формы
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});

  // При открытии модалки подставляем данные из props.data
  useEffect(() => {
    if (data) {
      setName(data.name || "");
      // price приходит в виде строки "500000.00" — преобразуем в читаемый формат с пробелами
      const formattedPrice = data.price
        ? Number(data.price).toLocaleString("ru-RU")
        : "";
      setPrice(formattedPrice);
      setDate(data.date || "");
      setErrors({});
    } else {
      // Если data нет — чистим форму (на всякий случай)
      setName("");
      setPrice("");
      setDate("");
      setErrors({});
    }
  }, [data, isOpen]);

  // Валидация
  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Xarajat nomi talab qilinadi";
    if (!price || isNaN(Number(price.replace(/\s/g, ""))))
      newErrors.price = "Narx noto‘g‘ri kiritildi";
    if (!date) newErrors.date = "Sana talab qilinadi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Функция обновления расхода
  const updateExpenses = async () => {
    if (!validate()) return;

    try {
      const cleanedPrice = price.replace(/\s/g, "");
      const newData = {
        name: name.trim(),
        price: Number(cleanedPrice),
        date,
      };

      await $api.put(`expenses/${data.id}`, newData);

      Swal.fire({
        icon: "success",
        title: "Muvaffaqiyatli yangilandi!",
        toast: true,
        position: "top-end",
        timer: 3000,
        customClass: {
          container: "swal2-container-higher-zindex",
        },
        showConfirmButton: false,
      });

      refresh();
      onClose();

      // Очистка формы (на всякий случай)
      setName("");
      setPrice("");
      setDate("");
      setErrors({});
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
          container: "swal2-container-higher-zindex",
        },
        showConfirmButton: false,
      });
    }
  };

  return (
    <>
      <Dialog open={isOpen} handler={onClose} size="sm" style={{ zIndex: 9000 }}>
        <DialogHeader>
          <Typography variant="h5" className="font-bold">
            {data ? "Xarajatni tahrirlash" : "Xarajat yaratish"}
          </Typography>
        </DialogHeader>

        <DialogBody className="overflow-y-auto">
          <div className="grid gap-6">
            <Input
              label="Xarajat nomi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              variant="outlined"
              color="blue"
            />
            {errors.name && (
              <Typography variant="small" color="red" className="-mt-4">
                {errors.name}
              </Typography>
            )}

            <Input
              label="Narx (so'm)"
              type="text"
              value={price.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              onChange={(e) => setPrice(e.target.value)}
              error={!!errors.price}
              variant="outlined"
              color="blue"
            />
            {errors.price && (
              <Typography variant="small" color="red" className="-mt-4">
                {errors.price}
              </Typography>
            )}

            <Input
              label="Sana"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              error={!!errors.date}
              variant="outlined"
              color="blue"
            />
            {errors.date && (
              <Typography variant="small" color="red" className="-mt-4">
                {errors.date}
              </Typography>
            )}
          </div>
        </DialogBody>

        <DialogFooter className="pt-2">
          <Button
            fullWidth
            onClick={updateExpenses}
            className="normal-case text-base"
          >
            {data ? "Saqlash" : "Yaratish"}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
