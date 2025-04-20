import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { Link } from "react-router-dom";
// const url = 'http://localhost:3001';
const url = 'https://formsusingreact-6.onrender.com';

function Login() {

  const { setUser } = useContext(UserContext);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url+'/login', {
        email: credentials.email,
        password:credentials.password,
      });
      const { token, role } = response.data;
      console.log(token)
      console.log("Login successful:", response.data); 
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);
      setUser({ token, role }); // Save token and role
      // Redirect based on role
      if (role === 'Admin') navigate('/admin');
      else if (role === 'Faculty') navigate('/faculty');
      else if (role === 'Student') navigate('/student');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };
  return (
    <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0 bg-gradient-to-r from-blue-500 to-blue-200">
      <div className="flex bg-white rounded-lg shadow-2xl border overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
          style={{
            backgroundImage: `url(https://www.tailwindtap.com//assets/components/form/userlogin/login_tailwindtap.jpg)`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="email"
              value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
            />
          </div>
          <div className="mt-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
            </div>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="password"
              value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
            <a
              href="#"
              className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
            >
              Forget Password?
            </a>
          </div>
          <div className="mt-8">
            <button onClick={handleLogin} className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
              Login
            </button>
          </div>
          <a
            href="#"
            className=" flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
          >
            
          </a>
          <div className="mt-4 flex items-center w-full text-center">
            <a
              href="#"
              className="text-xs text-gray-500 capitalize text-center w-full"
            >
              Don&apos;t have any account yet?
              <span className="text-blue-700"> <Link to="/signup">Sign Up</Link></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login