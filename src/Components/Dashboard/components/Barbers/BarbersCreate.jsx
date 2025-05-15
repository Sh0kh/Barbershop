import { useState } from "react";
import Swal from "sweetalert2";
import { $api } from "../../../../utils";
export default function BarbersCreate({ isOpen, onClose, refresh }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhoneChange = (e) => {
    let value = e.target.value;

    if (!value.startsWith("+998")) {
      value = "+998";
    }

    const phoneNumber = value.replace(/[^0-9]/g, "").slice(3);
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
    setUsername("");
    setName("");
    setLastname("");
    setPhone("");
    setPassword("");
    setPasswordConfirmation("");
    setImage(null);
    setImagePreview("");
  };

  const handleCreate = async () => {
    if (!username || !name || !lastname || !phone || !password || !passwordConfirmation) {
      Swal.fire("Xato!", "Barcha maydonlarni to'ldiring.", "error");
      return;
    }

    if (password !== passwordConfirmation) {
      Swal.fire("Xato!", "Parollar mos kelmadi.", "error");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("username", username);
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

      Swal.fire({
        title: "Muvaffaqiyatli!",
        icon: "success",
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showCloseButton: true,
        toast: true,
        showConfirmButton: false,
      });

      refresh();
      onClose();
      resetForm();
    } catch (error) {
      Swal.fire({
        title: "Xato!",
        text: error.response?.data?.message || "Xatolik yuz berdi.",
        icon: "error",
        position: "top-end",
        timer: 3000,
        timerProgressBar: true,
        showCloseButton: true,
        toast: true,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Sartarosh yaratish</h1>
          <button onClick={onClose}>❌</button>
        </div>

        <div className="mb-4 text-center">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sartarosh rasmi
          </label>
          <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer hover:border-blue-500 transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                <span>+</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username kiriting"
              className="w-full px-4 py-2 rounded-lg outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Ism</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ism kiriting"
              className="w-full px-4 py-2 rounded-lg outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Familiya</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Familiya kiriting"
              className="w-full px-4 py-2 rounded-lg outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Telefon</label>
            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full px-4 py-2 rounded-lg outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              maxLength={13}
              pattern="\+998[0-9]{9}"
              title="Telefon raqami +998 bilan boshlanib, 9 raqamdan iborat bo‘lishi kerak"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Parol</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Parol kiriting"
              className="w-full px-4 py-2 rounded-lg outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Parolni tasdiqlash</label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Parolni qayta kiriting"
              className="w-full px-4 py-2 rounded-lg outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            disabled={loading}
            onClick={handleCreate}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? "Yaratilmoqda..." : "Sartarosh yaratish"}
          </button>
        </div>
      </div>
    </div>
  );
}
