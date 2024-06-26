import React,{createContext, useEffect, useState} from 'react'
import axios from 'axios';
export const StoreContext=createContext(null);
const StoreContextPrivider = ({children}) => {
 const [token,setToken]=useState("");
 const url="http://localhost:3000";
 const[scoreStudent,setScoreStudent]=useState({})
    
  const [courseList,setCourseList]=useState([]);
  const addToScore= async (coursId)=>{
if(token){
  await axios.post(url+"/api/score/add",{coursId},{headers:{token}})
}
  }

    
          const fetchCoursList=async ()=>{
              const response=await axios.get(url+"/api/course")
              setCourseList(response.data);
              console.log("res",response.data);
              }
              const loadScoreStudent=async(token)=>{
const response= await axios.get(url+"/api/score/get",{headers:{token}});

setScoreStudent(response.data.scoreStudent);
console.log("scoredata is",response.data.scoreStudent);

         
}





 useEffect(()=>{
 
const laodData=async ()=>{
  fetchCoursList();
  const tokenStudent=localStorage.getItem("token");
    if(tokenStudent){
  setToken(tokenStudent);      
 await loadScoreStudent(tokenStudent);
console.log("token of student login is ",localStorage.getItem("token"));    
}

}
laodData();
console.log("scorestudent",scoreStudent);
},[])

 const contextValue={
    token,
    setToken,
    url,
    courseList,
    scoreStudent,
    setScoreStudent,
    addToScore,
 }
    return (
    <StoreContext.Provider value={contextValue}>
{children}
    </StoreContext.Provider>
  )
}

export default StoreContextPrivider