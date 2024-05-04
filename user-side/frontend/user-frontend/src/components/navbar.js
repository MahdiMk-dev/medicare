import React from "react";
import '../styles/nav.css';
import logo from '../images/2-removebg-preview.png'; 
import logoImage2 from '../images/1-removebg-preview.png'; 

const Navbar=()=>{
    return(
        <div class="nav">
        <div class="logo">
            <img src={logo} alt="logo image"/>
            Medicare
        </div>
        <div class="nav-items">
            <a href="#hero">Home</a>
            <a href="#services">Services</a>
            <a href="#aboutUs">About Us</a>
            <a href="#contactUs">Contact Us</a>
        </div>
        <div class="profile">
            <a href="profile">Username</a>
        </div>
    </div>
    )
}
export default Navbar;