import { useState, useEffect, Fragment } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { $api } from "../../../../utils";
import { XMarkIcon, PhotoIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

export default function BarbersCreate({ isOpen, onClose, refresh }) {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handlePhoneChange = (e) => {
    let value = e.target.value;

    if (!value.startsWith("+998")) {
      value = "+998";
    }

    const phoneNumber = value.replace(/[^\d]/g, "").slice(3);
    if (phoneNumber.length <= 9) {
      setPhone("+998" + phoneNumber);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setName("");
    setLastname("");
    setPhone("");
    setPassword("");
    setPasswordConfirmation("");
    setImage(null);
    setImagePreview("");
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};

    if (!name) newErrors.name = "Ism talab qilinadi";
    if (!lastname) newErrors.lastname = "Familiya talab qilinadi";
    if (!phone || phone.length < 13) newErrors.phone = "To'liq telefon raqam talab qilinadi";
    if (!password) newErrors.password = "Parol talab qilinadi";
    if (password !== passwordConfirmation)
      newErrors.passwordConfirmation = "Parollar mos kelmadi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("username", `${name}_${lastname}`);
      formData.append("name", name);
      formData.append("lastname", lastname);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("password_confirmation", passwordConfirmation);

      if (image) {
        formData.append("image", image);
      }

      await $api.post("/barbers", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          container: 'swal2-container-higher-zindex'
        },
      });

      Toast.fire({
        icon: "success",
        title: "Muvaffaqiyatli yaratildi!"
      });

      refresh();
      onClose();
      resetForm();
    } catch (error) {
      // Error handling
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          container: 'swal2-container-higher-zindex'
        },
      });

      Toast.fire({
        icon: "error",
        title: error.response?.data?.message || "Xatolik yuz berdi"
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Dialog
        style={{ zIndex: 9000 }}
        size="sm" open={isOpen} handler={onClose}>
        <DialogHeader className="flex items-center justify-between">
          <Typography variant="h5" className="font-bold">
            Barber yaratish
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={onClose}
          >
            <XMarkIcon className="h-5 w-5" />
          </IconButton>
        </DialogHeader>

        <DialogBody className="overflow-y-auto">
          <div className="mb-6 flex flex-col items-center">
            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
              Barber rasmi
            </Typography>

            <div className="relative mx-auto w-24 h-24 group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 z-10 cursor-pointer"
              />
              <div className={`
                w-24 h-24 rounded-full overflow-hidden border-2 
                ${imagePreview ? "border-blue-500" : "border-blue-gray-200"}
                group-hover:border-blue-500 transition-colors duration-300
              `}>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-gray-50 text-blue-gray-400">
                    <PhotoIcon className="h-10 w-10" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-6">

            <Input
              label="Ism"
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
              label="Familiya"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              error={!!errors.lastname}
              variant="outlined"
              color="blue"
            />
            {errors.lastname && (
              <Typography variant="small" color="red" className="-mt-4">
                {errors.lastname}
              </Typography>
            )}

            <Input
              label="Telefon"
              value={phone}
              onChange={handlePhoneChange}
              error={!!errors.phone}
              variant="outlined"
              color="blue"
              maxLength={13}
            />
            {errors.phone && (
              <Typography variant="small" color="red" className="-mt-4">
                {errors.phone}
              </Typography>
            )}

            <Input
              type="password"
              label="Parol"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              variant="outlined"
              color="blue"
            />
            {errors.password && (
              <Typography variant="small" color="red" className="-mt-4">
                {errors.password}
              </Typography>
            )}

            <Input
              type="password"
              label="Parolni tasdiqlash"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              error={!!errors.passwordConfirmation}
              variant="outlined"
              color="blue"
            />
            {errors.passwordConfirmation && (
              <Typography variant="small" color="red" className="-mt-4">
                {errors.passwordConfirmation}
              </Typography>
            )}
          </div>
        </DialogBody>

        <DialogFooter className="pt-2">
          <Button
            fullWidth
            disabled={loading}
            onClick={handleCreate}
            className=" normal-case text-base"
          >
            {loading ? "Yaratilmoqda..." : "Barber yaratish"}
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}