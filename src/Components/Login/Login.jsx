import React, { useState } from 'react';
import { Button, Input } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from '../../utils/axios';
import Logo from '../../Components/UI/Icons/HomeLogo.jpg';

const Login = () => {
  const [phone, setPhone] = useState('+998');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    const input = e.target.value;

    // Убедимся, что значение всегда начинается с '+998'
    if (!input.startsWith('+998')) {
      setPhone('+998');
      return;
    }

    const digitsOnly = input.slice(4).replace(/\D/g, '');

    // Ограничиваем до 9 цифр после '+998'
    const limitedDigits = digitsOnly.slice(0, 9);

    // Объединяем и устанавливаем
    setPhone('+998' + limitedDigits);
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const loginData = {
        phone,
        password,
      };

      const response = await axios.post('/login', loginData);
      const token = response.data.token;
      const role = response.data.role || 'user';

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        Swal.fire({
          title: 'Muvaffaqiyatli!',
          icon: 'success',
          position: 'top-end',
          timer: 3000,
          timerProgressBar: true,
          showCloseButton: true,
          toast: true,
          showConfirmButton: false,
        });

        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else if (role === 'barber') {
          navigate('/barber/dashboard');
        } else {
          navigate('/');
        }
      } else if (response?.data?.status === "error") {
        Swal.fire({
          title: 'Xatolik!',
          text: 'Telefon raqam yoki parol xato',
          icon: 'error',
          position: 'top-end',
          timer: 3000,
          timerProgressBar: true,
          showCloseButton: true,
          toast: true,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error('Xatolik:', error.response?.data);
      Swal.fire({
        title: 'Xatolik!',
        text: error.response?.data?.message || error.message || 'Kirishda xatolik.',
        icon: 'error',
        position: 'top-end',
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-8 border border-gray-200">
        <div className="text-center">
          <img src={Logo} alt="Logo" className="mx-auto h-32 w-auto object-contain" />
          <h2 className="mt-4 text-2xl font-semibold text-black">Tizimga kirish</h2>
          <p className="mt-2 text-sm text-gray-500">Kirish uchun ma'lumotlarni kiriting</p>
        </div>

        <div className="space-y-6">
          {/* Телефон */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefon raqam
            </label>
            <Input
              id="phone"
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              onKeyPress={handleKeyPress}
              placeholder="+998 XX XXX XX XX"
              className="bg-white text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              maxLength={13} 
              crossOrigin={undefined}
            />
          </div>

          {/* Пароль */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Parol
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Parolni kiriting"
              className="bg-white text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              crossOrigin={undefined}
            />
          </div>

          {/* Кнопка */}
          <Button
            onClick={handleLogin}
            disabled={loading}
            ripple={true}
            className="w-full bg-black text-white hover:bg-gray-800 font-medium py-3 rounded-md transition duration-200"
          >
            {loading ? 'Yuklanmoqda...' : 'Kirish'}
          </Button>
        </div>

        <div className="text-center text-xs text-gray-400 mt-6">
          &copy; {new Date().getFullYear()} SysName. Barcha huquqlar himoyalangan.
        </div>
      </div>
    </div>
  );
};

export default Login;