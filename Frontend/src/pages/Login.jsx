import React, { useContext, useState } from 'react'
import { Context } from '../main'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const {isAuthenticated, setIsAuthenticated} =useContext(Context);
  const navigateto = useNavigate();
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [confirmPassword, setConfirmPassword]=useState("");

  const handleLogin= async(e) => {
    e.preventDefault();
    try{
        const  response= await axios.post("http://localhost:4000/api/v2/user/login", {email, password, confirmPassword, role:"Maintainer"}, {
          withCredentials: true, headers: {'Content-Type': 'application/json'}, 
        })
        toast.success(response.data.message);
        console.log(isAuthenticated);
        setIsAuthenticated(true);
        navigateto("/")
    }catch(e){
        toast.error(e.response.data.message);
    }
  };

  if(isAuthenticated) {
    return navigateto("/");
  }

  return (
    <div className='container form-component login-form' >
       <h2>Sign in</h2>
       <p>Please Login to Continue</p>
       <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, ratione. Totam iure dolorem at officia qui, ipsam obcaecati natus illo!
       </p>
       <form onSubmit={handleLogin}>
          <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email' />
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password' />
          <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value) } placeholder='Confirm Password'/>

          <div style={{
            gap:"10px", justifyContent: "center",
            flexDirection: "row", alignItems:"center"
          }}>
            <p style={{marginBottom: 0}} >
              Not Registered
            </p>
            <Link to={"/register"}  style={{alignItems:"center", textDecoration:"none"}} > Register Now</Link>
          </div>
          <div style={{ justifyContent: 'center', alignItems: 'center'} } >
          <button className='btn' type='submit' >
            Login
          </button>
          </div>
       </form>
    </div>
  )
}

export default Login