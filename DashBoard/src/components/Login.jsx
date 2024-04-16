import React, { useContext, useState } from 'react';
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateto = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/v2/user/login", { email, password, confirmPassword, role: "Admin" }, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateto("/");
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
    if(isAuthenticated) {
      return <Navigate to={"/"}/>
    }
  return (
    <div className='container form-component login-form'>
      <h2>Only for admin</h2>
      <p>Please Login to Continue</p>
      <form onSubmit={handleLogin}>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' />
        <button type="submit" >Login</button>
      </form>
      <div style={{
        gap: "10px", justifyContent: "center",
        flexDirection: "row", alignItems: "center"
      }}>
        <p style={{ marginBottom: 0 }} >
          Not Registered : Contact Admin for adding New Admin
        </p>
      </div>
    </div>
  );
}

export default Login;
