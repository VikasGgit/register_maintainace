import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'

export const Context = createContext({
  isAuthenticated: false,
});

const AppWrapper = ()=>{
  const [ isAuthenticated, setIsAuthenticated ]=useState(false);
  const [user, setUser]=useState({});
  return(
    <Context.Provider  value={{isAuthenticated, setIsAuthenticated, user, setUser}} >
      <App/>
    </Context.Provider>
  )
}
ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);

