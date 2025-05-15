import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { $api } from "../../../../utils";

export default function ProfileEdit({ isOpen, onClose, refresh, barber }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (barber) {
      setUsername(barber.username || "");
      setName(barber.name || "");
      setLastname(barber.lastname || "");
      setPhone(barber.phone || "");
      setImagePreview(barber.image || "https://i.pravatar.cc/150?img=1");
    }
  }, [barber]);

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

  const handleUpdate = async () => {
    if (!username || !name || !lastname || !phone) {
      Swal.fire("Xato!", "Barcha majburiy maydonlar to‘ldirilishi kerak.", "error");
      return;
    }

    if (password && password !== passwordConfirmation) {
      Swal.fire("Xato!", "Parollar mos kelmayapti.", "error");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("name", name);
      formData.append("lastname", lastname);
      formData.append("phone", phone);
      if (password) {
        formData.append("password", password);
        formData.append("password_confirmation", passwordConfirmation);
      }
      if (image) {
        formData.append("image", image);
      }

      await $api.post(`/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      Swal.fire({
        title: "Yangilandi!",
        icon: "success",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false
      });

      refresh();
      onClose();
      resetForm();
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
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPassword("");
    setPasswordConfirmation("");
    setImage(null);
  };

  if (!isOpen || !barber) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Sartaroshni tahrirlash</h1>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">❌</button>
        </div>

        <div className="mb-6 text-center">
          <label className="block text-sm font-medium text-gray-700 mb-2">Rasm</label>
          <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer hover:border-blue-500 transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                <span>+</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Input label="Username" value={username} onChange={setUsername} />
          <Input label="Ism" value={name} onChange={setName} />
          <Input label="Familiya" value={lastname} onChange={setLastname} />
          <Input label="Telefon" value={phone} onChange={setPhone} />
          <Input label="Yangi parol (ixtiyoriy)" value={password} onChange={setPassword} type="password" />
          <Input label="Parolni tasdiqlash" value={passwordConfirmation} onChange={setPasswordConfirmation} type="password" />

          <button
            disabled={loading}
            onClick={handleUpdate}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? "Yangilanmoqda..." : "Tahrirlashni saqlash"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded-lg outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}
