import React, { useEffect } from 'react'
import { useState, useContext } from 'react'
import { Context } from '../main'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

const Message = () => {
  const { isAuthenticated } = useContext(Context)
  const [messages, setMessages] = useState([]);
  useEffect(() =>{
    const fetchMessages= async ()=>{
      try{
          const response=await axios.get("https://rm-backend-qls2.onrender.com/api/v2/message/allMessage", {withCredentials:true},)
          setMessages(response.data.message);
      }catch(err){
        console.error("Error in detecting message" , err);
      }
    }
    fetchMessages(); 
  },
   [])
          if(!isAuthenticated){
            return <Navigate to={"/admin/login"} />
          }

  return (
    
     <>
      <section className='page messages' >
        <h1>MESSAGES</h1>
        <div className="banner">
          {
            messages && messages.length>0 ?(
              messages.map((element)=>{
                return(
                <div className="card">
                  <div className="details">
                   <p>Date: <span>{new Date(element.updatedAt).toLocaleDateString()}</span></p>
                   <p>Time: <span>{new Date(element.updatedAt).toLocaleTimeString()}</span></p>
                    <p> Name : <span>{ element.firstName } { element.lastName}</span> </p>
                    <p> Phone Number : <span>{ element.phoneNumber}</span> </p>
                    <p> Email : <span>{ element.email}</span> </p>
                    <p> Message : <span>{ element.message}</span> </p>
                  </div>
                </div>
              )})
            ): (<h1>No Messages</h1>)
          }
        </div>
      </section>
      
    </>
  )
}

export default Message


// import React, { useEffect, useState, useContext } from 'react';
// import { Context } from '../main';
// import { Navigate } from 'react-router-dom';
// import axios from 'axios';

// const Message = () => {
//   const { isAuthenticated } = useContext(Context);
//   const [messages, setMessages] = useState([]);
  
//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/api/v2/message/allMessage", { withCredentials: true });
//         setMessages(response.data.message); // Assuming messages are in the format { messages: [...] }
//       } catch (error) {
//         console.error("Error in fetching messages", error);
//       }
//     };

//     fetchMessages();
//   }, []);

//   if (!isAuthenticated) {
//     return <Navigate to="/admin/login" />;
//   }

//   return (
//     <>
//     {messages.map(message => (
//       <div key={message._id}>
//         <p>Name: {message.firstName} {message.lastName}</p>
//         <p>Email: {message.email}</p>
//         <p>Phone Number: {message.phoneNumber}</p>
//         <p>Message: {message.message}</p>
//       </div>
//     ))}
//   </>
//   );
// };

// export default Message;
