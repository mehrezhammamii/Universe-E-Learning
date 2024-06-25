import React,{createContext, useEffect, useState} from 'react'
export const StoreContext=createContext(null);
const StoreContextPrivider = ({children}) => {
 const [token,setToken]=useState("");
 const url="http://localhost:3000";
 useEffect(()=>{
    
const laodData=()=>{
    if(localStorage.getItem("token")){
  setToken(localStorage.getItem("token"));      
console.log("token of student login is ",localStorage.getItem("token"));    
}

}
laodData();
},[])

 const contextValue={
    token,
    setToken,
    url,
 }
    return (
    <StoreContext.Provider value={contextValue}>
{children}
    </StoreContext.Provider>
  )
}

export default StoreContextPrivider