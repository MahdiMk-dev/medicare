// Home.js
import React from 'react';
import '../styles/home.css';
import logoImage2 from '../images/1-removebg-preview.png'; 
import newhero from '../images/newhero.png'
import contact from '../images/contactimg.jpg'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserNurse,faUserDoctor,faVialVirus   } from '@fortawesome/free-solid-svg-icons'; // Import the necessary icons
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaComments, FaFacebook, FaTwitter, FaInstagram, FaChartLine } from 'react-icons/fa';
import { faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';
import about from '../images/newbg.png';
import hero from '../images/heroimg.png';
import vision from '../images/vision.jpg'
import doctor from '../images/doctor.jpg'
import workingdr from '../images/workingdr.jpg'

const HomeComponent = () => {
  const userData = useSelector(state => state.user.userData);
  return (
    <div className="bg">
        <div className="page">
      <div className="hero" id="hero">
        <div className="hero-item">
        <img src={hero} alt="hero" />
        </div>
        <div className  ='hero-item'>
        <h1>Welcome to Medicare</h1>
        <p>Delivering medical care to your doorstep with love and professionalism.</p>
       

        {userData ? (
  <button onClick={() => {  
    window.location.href="/#services"; 
  }}>
    <Link to="/#services">
      Request
    </Link>
  </button>
) : (
  <button onClick={() => { 
    window.location.href="/auth"; 
  }}>
    <Link to="/auth">
      Sign Up
    </Link>
  </button>
)}

        </div>
       
      </div>


      <div class="services-section" id="services-section">
      
        <p  id="services-homeTitle" class='homeTitle'>Services</p>


        <div className="services" id="services">
        <div class="services-item">

                <div class="rectangle">
                    <FontAwesomeIcon icon={faUserNurse } size="3x" />
                    <p>Private Nurse</p>
                    <button id="request-nurse" ><a href='/requestNurse'>Request Nurse</a></button>
                </div>
            </div>
            <div class="services-item">

                <div class="rectangle">
                    <FontAwesomeIcon icon={faUserDoctor} size="3x"    />
                    <p className='medical-title'>Medical Consultations</p>
                    
                    <div>
    </div>
                    <button id="request-doctor"><a href='/requestDoctor'>Request A Consultation</a></button>

                </div>
            </div>
            <div class="services-item">

                <div class="rectangle">
                <FontAwesomeIcon icon={faVialVirus}  size="3x"   />

                    <p>Labs</p>
                    <button id="request-phlebotomist"><a href='/requestPhlebotomist'>Request Lab Tests</a></button>
                </div>
            </div> 
            <div class="services-item">

                <div class="rectangle">
                <FontAwesomeIcon icon={faMagnifyingGlassChart}  size="3x"  />

                    <p>Result Analysis</p>
                    <button id="analysis" ><a href='/result_analysis'>Analyze My Result</a></button>
                </div>
            </div>       
            </div>
            </div>
            <div id="aboutUs">
        <div className="about">

      <p  id="aboutUs" className='homeTitle'>About Us</p>

        <div class="about-row">
                <div class="row-item">
                    <h2>Why Choose Us</h2>
                    <ul>
                      <li><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#1AB188' }}  /> <p>Delivering Medical Services to your doorstep</p></li>
                      <li><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#1AB188' }}  /><p>Our advanced AI technology provides quick and accurate analysis of your medical results</p></li>
                      <li><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#1AB188' }}  /><p> Our services are designed to save you time and provide the utmost convenience, fitting seamlessly into your schedule.</p></li>
                      <li><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#1AB188' }}  /><p>Our dedicated healthcare professionals provide personalized attention and care, tailoring their services to meet your specific health needs.</p></li>
                      <li><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#1AB188' }}  /><p>Our team comprises experienced and licensed medical professionals committed to delivering the highest standards of care. </p></li>
                    </ul>
                </div>
                <div class="row-image">
                    <img src={logoImage2} alt="logo medicare"/>
                </div>
            </div>
                        </div>
            </div>


<div className='contact-section'>
  <div className='contact-form'>
      <p  id="aboutUs" className='homeTitle'>Contact Us</p>

            <div className="contact-us">

        <div className='contact-column'>
        <div className="contact-methods">
          <h1 id='contact'>Contact Medicare</h1>
          <p>Need help beyond whats on Medicare?</p>
          <p>You can talk or live chat with a real person, 24 hours a day, 7 days a week (except some federal holidays.)</p>
          <div className="contact-method">
            <FaPhone />
            <p>00961 03 12 34 56</p>
          </div>
          <div className="contact-method">
            <FaEnvelope />
            <p>mokaledmahdi@gmail.com</p>
          </div>
          <div className="contact-method">
            <FaComments />
            <button><a href="/live_chat">Live Chat</a></button>
          </div>
          </div>
        </div>
        <div className='contact-column'>
            <img src={contact}></img>
        </div>
      </div>
      </div>
      </div>
      <footer className="footer">
      <div className="social-icons">
          <a href="https://facebook.com"><FaFacebook className="icon large" /></a>
          <a href="https://twitter.com"><FaTwitter className="icon large" /></a>
          <a href="https://instagram.com"><FaInstagram className="icon large" /></a>
        </div>
      </footer>
    </div>
    </div>
  );
};

export default HomeComponent;
