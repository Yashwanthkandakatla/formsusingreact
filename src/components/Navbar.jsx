import React,{useContext} from 'react'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
function Navbar({ setActiveComponent }) {
    const { setUser } = useContext(UserContext);
     const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        setUser(null);
        navigate('/login');
      };
  return (
    <div className="bg-pink-100  top-0 left-0 w-full flex justify-center py-3 shadow-md">
        <button onClick={() => setActiveComponent("Piechart")} className="mx-2 px-4 py-2 bg-pink-300 hover:bg-pink-400 text-white rounded-lg">
          Charts
        </button>
        <button onClick={() => setActiveComponent("Addstudent")} className="mx-2 px-4 py-2 bg-pink-300 hover:bg-pink-400 text-white rounded-lg">
          Add Student
        </button>
        <button onClick={() => setActiveComponent("AddFaculty")} className="mx-2 px-4 py-2 bg-pink-300 hover:bg-pink-400 text-white rounded-lg">
          Add Faculty
        </button>
        <button onClick={() => setActiveComponent("Pendinglor")} className="mx-2 px-4 py-2 bg-pink-300 hover:bg-pink-400 text-white rounded-lg">
          Pending LOR's
        </button>
        <button onClick={handleLogout} className="mx-2 px-4 py-2 bg-pink-300 hover:bg-pink-400 text-white rounded-lg">
          Logout
        </button>
      </div>
  )
}

export default Navbar