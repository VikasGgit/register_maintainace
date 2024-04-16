// import React, { useContext, useState } from 'react'
// import { Context } from '../main'
// import { useNavigate, Link, } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Appointment = () => {
//   const navigateto = useNavigate();
//   const { isAuthenticated } =useContext(Context);
//   const [name, setName]=useState("");
//   const [phoneNumber, setPhoneNumber]=useState("");
//   const [gender, setGender]=useState("");
//   const [dob, setDob]=useState("");
//   const [department, setDepartment]=useState("");
//   const [address, setAddress]=useState("");
//   const [purpose, setPurpose]=useState("");
//   const [enterTime, setEnterTime]=useState(new Date().toLocaleString());
//   const [pinCode, setPinCode]=useState("");
  
//   const handleAppointment= async(e) => {
//     e.preventDefault();
//     try{
//         const  response= await axios.get("http://localhost:4000/api/v2/appointment/appointment", {name,dob,role:"Visitor",phoneNumber,gender,department,address,enterTime,purpose}, {
//           withCredentials: true, headers: {'Content-Type': 'application/json'}, 
//         })
//         toast.success(response.data.message);
//         navigateto("/")
//     }catch(e){
//       console.log();
//         toast.error(e.response.data.message);
//     }
//   };
 
//   if (!isAuthenticated) {
  
//     toast.error("please login first");
//     return null;
//   }

//   return (
//     <div className='container form-component login-form' >
//        <h2>Appointment</h2>
//        <p>Make an appointment</p>
//        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, ratione. Totam iure dolorem at officia qui, ipsam obcaecati natus illo!
//        </p>
//        <form onSubmit={handleAppointment}>
//           <div>
//           <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name' />
//           <input type="text" value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} placeholder='Phone Number' />
//           </div>
//           <div>
//           <input type="text" value={purpose} onChange={(e)=>setPurpose(e.target.value)} placeholder='Purpose' />
//           <input type="number" value={pinCode} onChange={(e)=>setPinCode(e.target.value) } placeholder='Pin Code' />
//           </div>
//           <div>
//           <select value={gender} onChange={(e)=>setGender(e.target.value)  }  placeholder="Gender">
//             <option>Male</option>
//             <option>Female</option>
//             <option>Others</option>
//           </select>
//           <input type="date" value={dob} onChange={(e)=> setDob(e.target.value)} placeholder='Date Of Birth' />

//           </div>
//           <div>
//           <input 
//        type="text" 
//       value={enterTime} 
//      onChange={(e)=> setEnterTime(e.target.value)} 
//      placeholder={new Date().toLocaleString()} 
//     />

//   <input type="text" value={department} placeholder='department' onChange={(e)=>setDepartment(e.target.value)} />

// </div>
// <div>
// <textarea value={address}  rows="3" placeholder='Address with pincode' onChange={(e)=>setAddress(e.target.value)}/>
// </div>

//           <div style={{
//             gap:"10px", justifyContent: "center",
//             flexDirection: "row", alignItems:"center"
//           }}>
//             <p style={{marginBottom: 0}} >
//               Already Visited
//             </p>
//             <Link to={"/"}  style={{alignItems:"center", textDecoration:"none"}} >Already Visited : update</Link>
//           </div>
//           <div style={{ justifyContent: 'center', alignItems: 'center'} } >
//           <button className='btn' type='submit' >
//             Make Appointment
//           </button>
//           </div>
//        </form>
//     </div>
//   )
// }

// export default Appointment

import React, { useContext, useState } from 'react';
import { Context } from '../main';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
// import moment from 'moment';


const Appointment = () => {
  const navigateto = useNavigate();
  const { isAuthenticated } = useContext(Context);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState("Male");
  const [dob, setDob] = useState('');
  const [department, setDepartment] = useState('');
  const [address, setAddress] = useState('');
  const [purpose, setPurpose] = useState('');
  const [enterTime, setEnterTime] = useState(new Date().toLocaleString());
  const [pinCode, setPinCode] = useState(273010);


  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:4000/api/v2/appointment/appointment',
        {
          name,
          dob,
          role: 'Visitor',
          phoneNumber,
          gender,
          department,
          address,
          enterTime,
          purpose,
          pinCode,
        },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );
      toast.success(response.data.message);
      navigateto('/');
    } catch (e) {
      console.error(e);
      toast.error(e.response ? e.response.data.message : 'Failed to make an appointment');
    }
  };

  if (!isAuthenticated) {
    navigateto('/');
    return null;
  }
  setInterval(() => {
      setEnterTime(new Date().toLocaleString());
  },1000*60);

  return (
    <div className='container form-component login-form'>
      <h2>Appointment</h2>
      <p>Make an appointment</p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, ratione. Totam iure dolorem
        at officia qui, ipsam obcaecati natus illo!
      </p>
      <form onSubmit={handleAppointment}>
        <div>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name'
          />
          <input
            type='text'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder='Phone Number'
          />
        </div>
        <div>
          <input
            type='text'
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder='Purpose'
          />
          <input
            type='number'
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            placeholder='Pin Code'
          />
        </div>
        <div>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder='Gender'
          >
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </select>
          <input
            type='date'
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            placeholder='Date Of Birth'
          />
        </div>
        <div>
          <input
            type='text'
            value={enterTime}
            onChange={(e) => setEnterTime(e.target.value)}
          />

          <input
            type='text'
            value={department}
            placeholder='department'
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
        <div>
          <textarea
            value={address}
            rows='3'
            placeholder='Address with pincode'
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div style={{ gap: '10px', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
          <p style={{ marginBottom: 0 }}>Already Visited</p>
          <Link to={'/'} style={{ alignItems: 'center', textDecoration: 'none' }}>
            Already Visited : update
          </Link>
        </div>
        <div style={{ justifyContent: 'center', alignItems: 'center' }}>
          <button className='btn' type='submit'>
            Make Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default Appointment;
