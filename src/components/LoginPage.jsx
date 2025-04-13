import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
// const url = 'http://localhost:3001';
const url = 'https://formsusingreact-6.onrender.com';
const LoginPage = () => {
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
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-blue-200 rounded-s-xl">
      <form className="bg-white p-10 rounded-lg shadow-md" onSubmit={handleLogin}>
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <div className="mb-4">
          <label  className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            
            className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;