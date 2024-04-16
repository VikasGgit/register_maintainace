import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import AddNewMaintainer from './components/AddNewMaintainer'
import AddnewAdmin from './components/AddnewAdmin'
import Dashboard from './components/Dashboard'
import Maintainers from './components/Maintainers'
import Message from './components/Message'
import Appointments from './components/Appointments'
import {Context} from './main'
import axios from 'axios'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const {isAuthenticated, setIsAuthenticated,  setUser}= useContext(Context)

  useEffect(()=>{
    const fetchUser= async ()=>{
      try{
          const response= await axios.get("http://localhost:4000/api/v2/admin/me", {withCredentials: true,});
          setIsAuthenticated(true)
          setUser(response.data.user)
      }
      catch(err){
          setIsAuthenticated(false);
          setUser({})
      }
    }
    fetchUser();
  }, [isAuthenticated])

  return (
   <Router>
    <Sidebar/>
    <Routes>
      <Route path="/admin/login" element={<Login/>}/>
      <Route path="/admin/addAdmin" element={<AddnewAdmin/>}/>
      <Route path="/admin/addMntnr" element={<AddNewMaintainer/>}/>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/admin/allMntnr" element={<Maintainers/>}/>
      <Route path="/admin/messages" element={<Message/>}/>
      <Route path="/admin/appointments" element={<Appointments/>}/>
    </Routes>
    <ToastContainer position="top-center"/>
   </Router>
  )
}

export default App