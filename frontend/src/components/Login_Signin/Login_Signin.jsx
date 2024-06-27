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

    const onLogin = async (e) => {
        e.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/student/login";
        } else {
            newUrl += "/api/student/register";
        }
        try {
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                setToken(response.data.token);
                console.log("token and data", response.data.token);
                localStorage.setItem("token", response.data.token);
                alert(response.data.message);
            } else {
                alert(response.data.message);
            }
            setData({
                name: "",
                email: "",
                password: ""
            });
        } catch (error) {
            if (error.response) {
                console.error("Server responded with an error:", error.response.data);
                alert(error.response.data.message || "An error occurred");
            } else if (error.request) {
                console.error("No response received:", error.request);
                alert("No response from the server. Please try again later.");
            } else {
                console.error("Error setting up the request:", error.message);
                alert("An error occurred. Please try again.");
            }
        }
    };

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
