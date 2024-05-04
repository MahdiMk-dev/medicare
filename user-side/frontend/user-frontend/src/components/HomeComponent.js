// Home.js
import React from 'react';
import '../styles/home.css';
import logoImage from '../images/2-removebg-preview.png'; 

const HomeComponent = () => {
  return (
    <div className="bg">
      <div className="nav">
        <div className="logo">
          <img src={logoImage} alt="logo image" />
          Medicare
        </div>
        <div className="nav-items">
          <a href="#hero">Home</a>
          <a href="#services">Services</a>
          <a href="#aboutUs">About Us</a>
          <a href="#contactUs">Contact Us</a>
        </div>
        <div className="profile">
          <a href="profile">Username</a>
        </div>
      </div>
      <div className="hero" id="hero">
        <img src="hero2.jpg" alt="hero" />
        <p>Delivering medical care to your doorstep </p>
        <p>with love and professionalism.</p>
      </div>

      <div className="main">
        <h2 id="services-title">Services</h2>
        <div className="services" id="services">
        <div class="services-item">
                <div class="circle">
                </div>
                <div class="rectangle">
                    <p>Private Nursing Services: Our registered nurses and practical nurses are available to provide specialized medical treatments, long-term care, or short-term assistance, all within the comfort of your home.</p>
                    <button id="request-nurse">Request Private Nurse</button>
                </div>
            </div>
            <div class="services-item">
                <div class="circle">
                </div>
                <div class="rectangle">
                    <p>Telemedicine Consultations: Access timely medical advice and consultations from board-certified physicians, right from the convenience of your living room. Whether it's an urgent matter or a routine check-up, our telemedicine services ensure that healthcare is just a click away.</p>
                    <button id="request-doctor">Request Medical Consultation</button>

                </div>
            </div>
            <div class="services-item">
                <div class="circle">
                </div>
                <div class="rectangle">
                    <p>At-Home Phlebotomy: Say goodbye to the hassle of visiting a lab for blood tests. Our skilled phlebotomists come to you, ensuring a seamless and stress-free experience. We collect blood samples at your convenience and ensure they reach the lab promptly for accurate testing.</p>
                    <button id="request-phlebotomist">Request Lab Tests</button>
                </div>
            </div>        </div>
        <h2 id="about">About Us</h2>
        <div className="about">
          {/* About content */}
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
