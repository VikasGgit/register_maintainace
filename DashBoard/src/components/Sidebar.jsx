import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { useNavigate } from 'react-router-dom'
import { GrUserWorker } from "react-icons/gr";
import { GrUserAdmin } from "react-icons/gr";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdMeetingRoom } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import { TiHome } from "react-icons/ti";
import { CiLogout, CiMenuBurger } from "react-icons/ci";
import "../App.css"
import axios from 'axios';
import { toast } from 'react-toastify';


const Sidebar = () => {
    const [show, setShow]= useState(false);
    const {isAuthenticated, setIsAuthenticated}= useContext(Context);
    const navigateto=useNavigate();
    const gotoHome= ()=>{
        setShow(!show);
        navigateto("/")
    }
    const gotoMntnr= ()=>{
        setShow(!show);
        navigateto("/admin/allMntnr")
    }
    const addAdmin= ()=>{
        setShow(!show);
        navigateto("/admin/addAdmin")
    }
    const allAppointment= ()=>{
        setShow(!show);
        navigateto("/admin/appointments")
    }
    const allMessages= ()=>{
    setShow(!show);
    navigateto("/admin/messages")}

    const handleLogout= async()=>{
    
         await axios.get("https://rm-backend-qls2.onrender.com/api/v2/admin/logout" ,{withCredentials: true})
         .then((res)=>{
            toast.success(res.data.message)
            setIsAuthenticated(false);
         })
         .catch((err)=>{
            toast.error(err.response.data.message)
         });
    }

  return (
    <>
    <nav style={ !isAuthenticated ? {display: 'none'}: {display: 'flex'}}
    className={ !show? "show sidebar" : "sidebar" } >
        <div className="links">
            <TiHome onClick={gotoHome} />
   <IoPersonAddOutline onClick={addAdmin} />
        <MdMeetingRoom onClick={allAppointment} />
     < MdOutlineMessage onClick={allMessages} />
     <CiLogout onClick={handleLogout} />
        </div>

    </nav>
    <div className='wrapper' style={!isAuthenticated ? {display: "none"} : {display: "flex"}} >
        <CiMenuBurger className='mburger' onClick={()=>setShow(!show)} />
    </div>
</>
  )
}

export default Sidebar