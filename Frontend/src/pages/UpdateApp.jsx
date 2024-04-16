import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { isAuthenticated, user } = useContext(Context);
  const [appointments, setAppointments] = useState([]);
  const [departed_time, setDepartedTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const interval = setInterval(() => {
      setDepartedTime(new Date().toLocaleTimeString());
    }, 1000 * 60);
  
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v2/appointment/aallAppointments",
          { withCredentials: true }
        );
        setAppointments(response.data.appointments);
      } catch (e) {
        console.error("Error getting Appointments", e);
        setAppointments({});
      }
    };
    fetchAppointments();
  }, []);

  const handleAppDepart= async (appointmentId, departed)=>{
      try{
        const response = await axios.put(`http://localhost:4000/api/v2/appointment/uupdate/${appointmentId}`,{departed_time},{withCredentials: true});;
        setAppointments((prev) => {
  return prev.map((appoint) => {
    return appoint._id === appointmentId ? { ...appoint, departed_time:departed } : appoint;
  });
});

        toast.success(response.data.message);
      }
      catch (e) {
        toast.error(e.response.data.message);
      }
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="dashboard">
        <div className="banner">
          <div  className="secondBox" >
            <p>Total Appointments</p>
            <h3>{appointments.length}</h3>
          </div>
          
        </div>
        <div className="banner">
          <h5>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th> Name  </th>
                <th> Date  </th>
                <th> Entering-Time  </th>
                <th> Depart-Time  </th>
                <th>PhoneNumber</th>
                {/* <th>Gender</th> */}
                {/* <th>Department</th> */}
                <th>Address</th>
                {/* <th>Pin Code</th> */}
                <th>Depart</th>
              </tr>
            </thead>
            <tbody>
              {
                appointments && appointments.length>0 ? (
                  appointments.map(appoint =>{
                    return(
                     <tr key={appoint._id}>
                      <td>{appoint.name}</td>
                      <td>{new Date(appoint.createdAt).toLocaleDateString()}</td>
                      <td>{new Date(appoint.createdAt).toLocaleTimeString()}</td>
                      <td>{appoint.departed_time}</td>
                      <td>{appoint.phoneNumber}</td>
                      {/* <td>{appoint.gender}</td>
                      <td>{appoint.department}</td> */}
                      <td>{appoint.address}</td>
                      {/* <td>{appoint.pinCode}</td> */}
                      <td>{ <button onClick={()=>handleAppDepart(appoint._id, departed_time)} >Depart</button> }</td>
                     </tr>
                    )
                  })
                ): <h1>No Appointments</h1>
              }
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
