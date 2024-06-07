import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// "firstName": "Vikas",
//     "lastName": "Gupta",
//     "email": "vikas@gmail.com",
//     "password": "23249090",
//     "dob": "2003-10-24",
//     "phoneNumber": "8174877531",
//     "gender": "Male"
const AddnewAdmin = () => {
const navigateto=useNavigate();
const [firstName,setFirstName]= useState("");
const [lastName,setLastName]= useState("");
const [email,setEmail]= useState("");
const [password,setPassword]= useState("");
const [phoneNumber,setPhoneNumber]= useState("");
const [gender,setGender]= useState("Male");
const [dob,setDob]= useState("");

const handleAdd= async (e)=>{
  e.preventDefault();
  try{
     const res= await axios.post("https://rm-backend-qls2.onrender.com/api/v2/admin/addNewAdmin", {email,firstName, lastName, password, gender, dob, role:"Admin", phoneNumber}, { withCredentials: true, headers: {'Content-Type': 'application/json'}, })
    toast.success(res.data.message);
    navigateto("/")
  }
  catch(e){
    toast.error(e.response.data.message)
  }

}

  return (
    <>
      <div className='container  form-component login-form'>
        <h2>Complete the form for Adding new admin : Maintainer</h2>
        <form onSubmit={handleAdd}>
            <div>
              <input type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} value={email} />
              <input type="text" placeholder='First Name' onChange={(e)=>setFirstName(e.target.value)} value={firstName} />
            </div>
            <div>
              <input type="text" placeholder='lastName' onChange={(e)=>setLastName(e.target.value)} value={lastName} />
              <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} value={password} />
            </div>
            <div>
              <input type="number" placeholder='Phone Number' onChange={(e)=>setPhoneNumber(e.target.value)} value={phoneNumber} />
              <select onChange={(e)=>setGender(e.target.value)} value={gender} >
                <option> Male</option>
                <option> Female</option>
                <option> Others</option>
              </select>
            </div>
            <div>
              <input type="date" value={dob}  placeholder='Date of Birth' onChange={(e)=>setDob(e.target.value)} />
            </div>
            <div style={{display: "flex", justifyContent: "center", alignItems:"center",}}>
              <button style={{display: "flex", justifyContent: "center", alignItems:"center", cursor:"pointer" }}  type='submit' >Add Admin</button>
            </div>
        </form>

      </div>
    </>
  )
}

export default AddnewAdmin