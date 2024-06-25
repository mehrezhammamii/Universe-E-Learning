import React, { useState } from 'react';
import Navbar from './components/navbar';
import Home from './components/home';
import Course from './components/course';
import AboutUs from './components/aboutus';
import Contact from './components/contact';
import Login from './components/login';
import SignUp from './components/signup';
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

const App = () => {
    const [currentView, setCurrentView] = useState('home');

    const handleNavigation = (view) => {
        setCurrentView(view);
    };

    const renderView = () => {
        switch (currentView) {
            case 'home':
                return <Home />;
            case 'course':
                return <Course />;
            case 'about-us':
                return <AboutUs />;
            case 'contact':
                return <Contact />;
            case 'login':
                return <Login />;
            case 'sign-up':
                return <SignUp />;
            default:
                return <Home />;
        }
    };

    return (
        <div className="app">
            <Navbar handleNavigation={handleNavigation} />
            <div className="content">
                {renderView()}
            </div>
        </div>
    );
};

export default App;
