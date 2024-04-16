import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Message = () => {
  const handleSubmit= async (e)=>{
    e.preventDefault();
    try{
      await axios
      .post(
        "http://localhost:4000/api/v2/message/send", {firstName, lastName, email, phoneNumber, message}, {withCredentials: true,
              headers: {'Content-Type': 'application/json'}
        },
      ).then((res)=>{
        toast.success(res.data.message);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setMessage("");
      })

    }
    catch(err){ 
      toast.error(err.response.data.message);
    }
  }
  const [firstName, setFirstName]=useState();
  const [lastName, setLastName]=useState();
  const [email, setEmail]=useState();
  const [phoneNumber, setPhoneNumber]=useState();
  const [message, setMessage]=useState();
  return (
    <>
    <div className=' container form-component message-form'>
      <h2>Send us a message</h2>
      <form onSubmit={handleSubmit} >
        <div>
          <input type="text" value={firstName} placeholder='First Name' onChange={(e)=>setFirstName(e.target.value)} />
          <input type="text" value={lastName} placeholder='Last Name' onChange={(e)=>setLastName(e.target.value)} />
        </div>
        <div>
          <input type="text" value={email} placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
          <input type="number" value={phoneNumber} placeholder='10 digit Phone Number' onChange={(e)=>setPhoneNumber(e.target.value)} />
        </div>
        <textarea   rows="7"
        placeholder='Message'
        value={message}
        onChange={(e)=>setMessage(e.target.value)}></textarea>
         <div style={{ justifyContent: 'center', alignItems: 'center'} } >
          <button className='btn' type='submit' >
            Send
          </button>
          </div>
      </form>
    </div>
    </>
  )
}

export default Message