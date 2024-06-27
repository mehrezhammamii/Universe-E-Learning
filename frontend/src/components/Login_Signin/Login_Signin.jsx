import React, { useContext, useState } from 'react';
import "./Login_Signin.css"
import axios from "axios";
import { StoreContext } from '../../context/StoreContext';

const Login_Signin = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login");
    const { url, setToken } = useContext(StoreContext);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
  
  //after login we will generate token for student to use him like an id  for anything about student
  //and store it in localstorage so every time he login we generate token for each student login  
    const onLogin=async (e)=>{
      e.preventDefault();
      let newUrl = url;
      if (currState === "Login") {
          newUrl += "/api/student/login";
      } else {
          newUrl += "/api/student/register";
      }
      console.log("datais", data);
      
      try {
          const response = await axios.post(newUrl, data);
          if (response.data.success) {
              setToken(response.data.token);
              console.log("token and data", response.data.token);
              localStorage.setItem("token", response.data.token);
              alert(response.data.message);
              setData({
                name: "",
                email: "",
                password: ""
            });
          } else {
             
              console.log("datais bad", data);
              alert(response.data.message);
          }
      } catch (error) {
         console.log("error",error);
         
         if (error.response && error.response.data) {
          alert(error.response.data.error);
      } else {
          alert("Login failed. Please check your email and password.");
      }
          }
      }
      
    

    return (
        <div className='login-popup'>
            <form className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                    <button onClick={() => setShowLogin(false)}>close</button>
                </div>
                <div className='login-popup-input'>
                    {currState === "Sign Up" && (
                        <input
                            type='text'
                            placeholder='Your name'
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            required
                        />
                    )}
                    <input
                        type='email'
                        placeholder='Your email'
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='password'
                        placeholder='Your password'
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button onClick={onLogin}>
                    {currState === "Sign Up" ? "Create Account" : "Login"}
                </button>
                <div className='login-popup-condition'>
                    <input type='checkbox' required />
                    <p>By continuing, I agree to the Terms of Use & Privacy Policy</p>
                </div>
                {
                    currState === "Login" ? (
                        <p>Don't have an account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                    ) : (
                        <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                    )
                }
            </form>
        </div>
    );
}

export default Login_Signin;
