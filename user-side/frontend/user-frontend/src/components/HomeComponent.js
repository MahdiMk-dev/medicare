// Home.js
import React from 'react';
import '../styles/home.css';
import logoImage from '../images/2-removebg-preview.png'; 
import logoImage2 from '../images/1-removebg-preview.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserNurse,faUserDoctor,faVialVirus   } from '@fortawesome/free-solid-svg-icons'; // Import the necessary icons


import hero from '../images/hero.jpg';
import hero2 from '../images/hero2.jpg';

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
        <img src={hero2} alt="hero" />
        <p>Delivering medical care to your doorstep </p>
        <p>with love and professionalism.</p>
      </div>

      <div className="main">
        <h2 id="services-title">Services</h2>
        <div className="services" id="services">
        <div class="services-item">
                <div class="circle">
                <FontAwesomeIcon icon={faUserNurse } size="2x" color="#008037" />
                </div>
                <div class="rectangle">
                    <p>Private Nursing Services: Our registered nurses and practical nurses are available to provide specialized medical treatments, long-term care, or short-term assistance, all within the comfort of your home.</p>
                    <button id="request-nurse">Request Private Nurse</button>
                </div>
            </div>
            <div class="services-item">
                <div class="circle">
               
                <FontAwesomeIcon icon={faUserDoctor} size="2x" color="#008037"   />
                </div>
                <div class="rectangle">
                    <p>Telemedicine Consultations: Access timely medical advice and consultations from board-certified physicians, right from the convenience of your living room. Whether it's an urgent matter or a routine check-up, our telemedicine services ensure that healthcare is just a click away.</p>
                    
                    <div>
    </div>
                    <button id="request-doctor">Request Medical Consultation</button>

                </div>
            </div>
            <div class="services-item">
                <div class="circle">
                <FontAwesomeIcon icon={faVialVirus}  size="2x" color="#008037"  />
                </div>
                <div class="rectangle">
                    <p>At-Home Phlebotomy: Say goodbye to the hassle of visiting a lab for blood tests. Our skilled phlebotomists come to you, ensuring a seamless and stress-free experience. We collect blood samples at your convenience and ensure they reach the lab promptly for accurate testing.</p>
                    <button id="request-phlebotomist">Request Lab Tests</button>
                </div>
            </div>        </div>
        <h2 id="aboutUs">About Us</h2>
        <div className="about">
        <div class="about-row">
                <div class="row-item">
                    <h2>About Medicare</h2>
                    <p>At Medicare, we believe in delivering exceptional healthcare services right to your doorstep. Our mission is to provide convenient and comprehensive medical care tailored to meet the diverse needs of our patients. With a focus on quality, compassion, and efficiency, we strive to redefine the healthcare experience by making it accessible and personalized.</p>
                </div>
                <div class="row-image">
                    <img src={logoImage2} alt="logo medicare"/>
                </div>
            </div>
                <div class="about-row">
                    <div class="row-image">
                        <img src={hero} alt="2nd part"/>
                    </div>
                <div class="row-item">
                    <h2>Our Vision</h2>
                    <p>We envision a future where healthcare is not just a service but a seamless part of everyday life. By harnessing the power of technology and human expertise, we aim to revolutionize the way healthcare is delivered, making it more patient-centric, efficient, and empowering.</p>

                </div>
            </div>
            <div class="about-row">
                <div class="row-item">
                    <h2>Our Services</h2>
                    <p>Medicare offers a range of in-home medical services designed to promote wellness, recovery, and comfort. Whether you require the expertise of a registered nurse, a consultation with a qualified physician, or the convenience of blood testing at home, we've got you covered. Our dedicated team of professionals is committed to ensuring that you receive the highest standard of care, tailored to your unique needs.</p>
                </div>
                <div class="row-image">
                    <img src={hero} alt="3rd"/>
                </div>
                </div>
                <div class="about-row">
                <div class="row-image">
                    <img src={hero}/>
                </div>
                    <div class="row-item">
                    <h2>Our Commitment</h2>
                    <p>At Medicare, we are committed to putting your health and well-being first. We understand the challenges of navigating the healthcare system, which is why we're dedicated to providing you with the support and guidance you need every step of the way. Whether it's managing your medications, accessing expert advice, or simply having someone to talk to, we're here for you, 24/7.</p>
                </div>
            </div>        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
