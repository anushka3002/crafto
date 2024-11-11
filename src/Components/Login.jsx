import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Action/action';
import { useNavigate } from 'react-router';
import { ClipLoader } from 'react-spinners';

// Login page for auth via username and OTP
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false)
  const {loginData} = useSelector(state=>state.loginData)
  const token = localStorage.getItem("token")

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      username,
      otp
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false);
      dispatch(login(data))
    }, 2000);
  };

  useEffect(()=>{
    if(loginData.status == 200 && token){
      navigate('/homepage')
    }
  },[loginData])

  return (
    <div className='h-screen w-screen bg-cover bg-center min-h-screen bg-gradient-to-r from-white to-purple-200'>
      <p className='fixed left-4 top-4 text-gray-500'>Crafto.app</p>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full mx-4 max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className='mb-3'>
              <label className="block text-left mb-1 text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="block text-left mb-1 text-sm font-medium text-gray-700">
                OTP
              </label>
              <input
                type="number"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the OTP"
              />
              {loginData.status == 401 && <p className='text-red-500 text-sm mt-1'>Incorrect OTP</p>}
            </div>
            <button
              type="submit"
              className={`w-full px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none`}
            >
              {loading ? <ClipLoader
                color={'white'}
                loading={loading}
                size={20}
                className=''
                aria-label="Loading Spinner"
                data-testid="loader"
              /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
