import React, { useContext, useState } from 'react'
import { Context } from '../main'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
  const {isAuthenticated, setIsAuthenticated} =useContext(Context);
  const navigateto = useNavigate();
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [firstName, setFirstName]=useState("");
  const [lastName, setLastName]=useState("");
  const [phoneNumber, setPhoneNumber]=useState("");
  const [gender, setGender]=useState("Male");
  const [dob, setDob]=useState("");
  
  const handleRegister= async(e) => {
    e.preventDefault();
    try{
        const  response= await axios.post("http://localhost:4000/api/v2/user/register", {firstName,lastName,email,password,dob,role:"random",phoneNumber,gender}, {
          withCredentials: true, headers: {'Content-Type': 'application/json'}, 
        })
        
        toast.success(response.data.message);
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
       <h2>Register</h2>
       <p>Register Here</p>
       <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, ratione. Totam iure dolorem at officia qui, ipsam obcaecati natus illo!
       </p>
       <form onSubmit={handleRegister}>
          <div>
          <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder='FirstName' />
          <input type="text" value={lastName} onChange={(e)=> setLastName(e.target.value)} placeholder='LastName' />
          </div>
          <div>
          <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' />
          <input type="Number" value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} placeholder='10 digit phone Number only' />
          </div>
          <div>
          <select value={gender} onChange={(e)=>setGender(e.target.value)  }  placeholder="Gender">
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </select>
          <input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/>
          </div>
          <div>
          <input type="date" value={dob} onChange={(e)=> setDob(e.target.value)} placeholder='Date Of Birth' />
 
</div>

          <div style={{
            gap:"10px", justifyContent: "center",
            flexDirection: "row", alignItems:"center"
          }}>
            <p style={{marginBottom: 0}} >
              Already Registed
            </p>
            <Link to={"/login"}  style={{alignItems:"center", textDecoration:"none"}} > Login Now</Link>
          </div>
          <div style={{ justifyContent: 'center', alignItems: 'center'} } >
          <button className='btn' type='submit' >
            Register
          </button>
          </div>
       </form>
    </div>
  )
}

export default Register