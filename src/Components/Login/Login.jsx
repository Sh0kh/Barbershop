import React, { useState } from 'react';
import { Button, Input } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from '../../utils/axios';

const Login = () => {
  const [phone, setPhone] = useState('+998');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
  
    const value = e.target.value;
    if (value.startsWith('+998')) {
      setPhone(value);
    } else {
      setPhone('+998' + value.replace('+998', ''));
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const loginData = {
        phone: phone,
        password: password,
      };

      console.log('Yuborilayotgan ma\'lumotlar:', loginData);

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
        }
      

        else {
          navigate('/');

        }
      } else {
        throw new Error('Token topilmadi');
      }

       if (role === 'barber') {
          navigate('/barber/dashboard');
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white rounded-xl overflow-hidden shadow-xl">
        <div className="relative w-2/5 bg-black text-white p-8 flex flex-col justify-between">
          <div className="absolute top-0 right-0 h-full w-12 overflow-hidden">
            <div className="h-full w-24 bg-white transform translate-x-6">
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={i} 
                  className="absolute bg-black" 
                  style={{
                    height: '72px', 
                    width: '72px', 
                    borderRadius: '50%',
                    top: `${i * 40 - 20}px`,
                    right: '-36px'
                  }}
                />
              ))}
            </div>
          </div>

          <div className="z-10">
            <h2 className="text-xl font-medium mb-1">Xush kelibsiz !!</h2>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold">Login page</h1>
            </div>
          
          </div>

          <div className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} SysName. All rights reserved.
          </div>
        </div>

        <div className="w-3/5 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            Tizimga kirish
          </h2>

          <div className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefon raqam
              </label>
              <div className="relative">
                <Input
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="border-gray-300"
                  required
                  onKeyPress={handleKeyPress}
                  placeholder="+998 XX XXX XX XX"
                  crossOrigin={undefined}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 text-sm">
                  <span className="sr-only">Phone prefix</span>
                </div>
              </div>
            </div>

  
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Parol
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-300"
                required
                onKeyPress={handleKeyPress}
                placeholder="Parolni kiriting"
                crossOrigin={undefined}
              />
            </div>

      
         

     
            <Button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 bg-black text-white hover:bg-gray-800"
            >
              {loading ? 'Yuklanmoqda...' : 'Kirish'}
            </Button>

          
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;