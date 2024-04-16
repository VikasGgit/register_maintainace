import React, { useContext, useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { Context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from "react-icons/gi";



const Navbar = () => {
    const [show, setShow]=useState(true);
    const { isAuthenticated , setIsAuthenticated}  =useContext(Context);
    const navigateto=useNavigate();
    const handleLogout=async()=>{
       {
            await axios.get("http://localhost:4000/api/v2/user/logout", 
            { withCredentials: true,}).then((response)=>{
                toast.success(response.data.message);
                console.log(isAuthenticated);
                setIsAuthenticated(false);
                navigateto("/")
            }).catch((error)=>{ toast.error(error.response.data.message); });
       }
    }
    const gotoLogin=()=>{
        navigateto("/login")
    }


  return (
   <>
   <nav className="container ">
        <div className="logo"><img src="main.jpeg" alt="" /></div>
        <div className={!show ? "navLinks showmenu" : "navLinks"} >
            <div className="links">
                <Link to={"/"} >HOME</Link>
                <Link  to={"/Appointment"}>C-APNTMNT</Link>
                <Link to={"/appointments"}  >D-APNTMNT</Link>
            </div>
                {isAuthenticated ?
                  (<button className='logoutBtn' onClick={handleLogout} >LOGOUT</button> )
                  : (<button className='logoutBtn' onClick={gotoLogin} >LOGIN</button>) }
        </div>
        <div className='hamburger' onClick={()=>setShow(!show)} > 
           <GiHamburgerMenu/>
        </div>
   </nav>
   </>
  )
}

export default Navbar

