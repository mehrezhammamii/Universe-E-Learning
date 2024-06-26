import React,{createContext, useEffect, useState} from 'react'
import axios from 'axios';
export const StoreContext=createContext(null);
const StoreContextPrivider = ({children}) => {
 const [token,setToken]=useState("");
 const url="http://localhost:5000";
 const[scoreStudent,setScoreStudent]=useState({})  
  const [courseList,setCourseList]=useState([]);
  const addToScore = async (courseId) => {
    if (token) {
       
        try {
          setScoreStudent(prev => {
            const newScore = { ...prev };
            if (!newScore[courseId]) {
                newScore[courseId] = 1;
            } else {
                newScore[courseId] += 1;
            }
            return newScore;
        });
            await axios.post(url + "/api/score/add", { courseId }, { headers: { token } });
            console.log("Score added successfully");
        } catch (error) {
            console.error("Error adding score:", error);
        }
    }
};
             const fetchCoursList=async ()=>{
              const response=await axios.get(url+"/api/course")
              setCourseList(response.data);
              console.log("res",response.data);
              }
              const loadScoreStudent=async(token)=>{
const response= await axios.get(url+"/api/score/get",{headers:{token}});
setScoreStudent(response.data.scoreStudent);
console.log("score data is",response.data.scoreStudent);         
}

 useEffect(()=>{
 
const loadData=async ()=>{
  fetchCoursList();
  const tokenStudent=localStorage.getItem("token");
    if(tokenStudent){
  setToken(tokenStudent);      
 await loadScoreStudent(tokenStudent);
console.log("token of student login is ",localStorage.getItem("token"));    
}
}
loadData();
console.log("score student",scoreStudent);
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