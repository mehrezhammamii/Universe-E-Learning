import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const url = "http://localhost:5000";
  const [courseList, setCourseList] = useState([]);
  const [scoreStudent, setScoreStudent] = useState({});

  const addToScore = async (courseId) => {
    if (token) {
       
        try {
         
          
          
        
            await axios.post(url + "/api/score/add", { courseId }, { headers: { token } });
            console.log("Score added successfully");
        } catch (error) {
            console.error("Error adding score:", error);
        }
    }
  };

  const fetchCourseList = async () => {
    try {
      const response = await axios.get(url + "/api/course");
      setCourseList(response.data);
    } catch (error) {
      console.error('Error fetching course list:', error);
    }
  };

  const loadScoreStudent = async (token) => {
    try {
      const response = await axios.get(url + "/api/score/get", { headers: { token } });
      setScoreStudent(response.data.scoreStudent);
      console.log("Score data is", response.data.scoreStudent);
    } catch (error) {
      console.error('Error loading score student:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      fetchCourseList();
      const tokenStudent = localStorage.getItem("token");
      if (tokenStudent) {
        setToken(tokenStudent);
        await loadScoreStudent(tokenStudent);
        console.log("Token of student login is", localStorage.getItem("token"));
      }
    };
    loadData();
    console.log("Score student", scoreStudent);
  }, [token]);

  const contextValue = {
    token,
    setToken,
    url,
    courseList,
    scoreStudent,
    setScoreStudent,
    addToScore,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
