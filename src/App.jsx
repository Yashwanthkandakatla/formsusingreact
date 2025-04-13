import { useState } from 'react'
// import './App.css'
// import Survey from './components/Survey'
// import Getdata from './components/getdata'
// import Header from './components/Header'
// import Piechart from './components/charts/Piechart'
// import Login from './components/Login'
// import Signup from './components/Signup'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './context/ProtectedRoute';
// import LoginPage from './components/Login';
import LoginPage from './components/LoginPage';
// import AdminPage from './components/AddFaculty';
import Admin from './components/Admin';
import StudentPage from './components/Student';
// import Dashboard from './components/Dashboard';
import FacultyPage from './components/PendingLORPage';
// const FrontEnd_url  = "http://localhost:5173";
const FrontEnd_url  = "https://frontend-1-14k0.onrender.com";
function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
      
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute apiEndpoint="{FrontEnd_url}/user/admin">
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faculty"
            element={
              <ProtectedRoute apiEndpoint="{FrontEnd_url}/user/faculty">
                <FacultyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student"
            element={
              <ProtectedRoute apiEndpoint="{FrontEnd_url}/user/student">
                <StudentPage/>
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<p>Access Denied</p>} />
        </Routes>
      </Router>
    </UserProvider>
  );
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // return (
    <>




















    {/* <div className="relative font-sans">
    <div
          style={{
            color: "#f3f3f3",
            backgroundImage:
              "linear-gradient(115deg,rgba(58, 58, 158, 0.8),rgba(136, 136, 206, 0.7)),url(https://jgu.edu.in/blog/wp-content/uploads/2024/02/gettyimages-468616573-612x612-2.jpg)",
          }}
          className="fixed top-0 left-0 h-full w-full z-0 bg-cover bg-center"
        ></div>


    <div
        style={{ color: "#f3f3f3",}} 
        className="relative z-10 m-4 pt-12">
          <Header />
          <Survey />
          <Getdata/>
          <Piechart/>
          <Login/>
          <Signup/>
          
        </div>

    </div>
       */}
    </>
  // )
}

export default App
