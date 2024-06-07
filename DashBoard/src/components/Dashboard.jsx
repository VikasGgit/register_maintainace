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
          "http://localhost:4000/api/v2/appointment/allAppointments",
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
        const response = await axios.put(`https://rm-backend-qls2.onrender.com/api/v2/appointment/update/${appointmentId}`,{departed_time},{withCredentials: true});;
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
    return <Navigate to={"/admin/login"} />;
  }

  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img
              src="https://img.freepik.com/free-vector/business-man-cartoon-character_1308-134316.jpg?w=360&t=st=1713172961~exp=1713173561~hmac=e7b1d0439672c9bf7a52f4d83dcd12c6b636c4b8dd39fb7589aa6080cd64bd12"
              alt="this is a image tage"
            />
            <div className="content">
              <div>
                <h5>
                  {" "}
                  <span style={{ color: "black" }}>Hello,</span>{" "}
                  {user && `  ${user.firstName} ${user.lastName}`}
                </h5>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde
                aut vitae tenetur nam perspiciatis facilis esse reiciendis
                doloribus repellat? Culpa consectetur magni eaque dignissimos
                ex!
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>{appointments.length}</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Maintainers</p>
            <h3>20</h3>
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
