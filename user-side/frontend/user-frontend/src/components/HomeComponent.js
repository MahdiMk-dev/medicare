// Home.js
import React from 'react';
import '../styles/home.css';
import logoImage2 from '../images/1-removebg-preview.png'; 
import newhero from '../images/newhero.png'
import contact from '../images/contact.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserNurse,faUserDoctor,faVialVirus   } from '@fortawesome/free-solid-svg-icons'; // Import the necessary icons
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaComments, FaFacebook, FaTwitter, FaInstagram, FaChartLine } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import about from '../images/newbg.png';
import hero from '../images/heroimg.png';

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
        <p>Delivering medical care to your doorstep with love and professionalism.</p>
        <p>Signup now to benefit from our services!</p>

        {userData ? (
  <button onClick={() => { 
    localStorage.clear(); 
    window.location.href="/#services"; 
  }}>
    <Link to="/#services">
      Request
    </Link>
  </button>
) : (
  <button onClick={() => { 
    localStorage.clear(); 
    window.location.href="/auth"; 
  }}>
    <Link to="/auth">
      Sign Up
    </Link>
  </button>
)}

        </div>
       
      </div>

      <div className="main">
      <div className="underlined-container">
      <p  id="services-title" class='title'>Services</p>
        <div className="underline"></div>
      </div>
        <div className="services" id="services">
        <div class="services-item">
                <div class="circle">
                <FontAwesomeIcon icon={faUserNurse } size="2x" color="white" />
                </div>
                <div class="rectangle">
                    <p>Private Nursing Services: Our registered nurses and practical nurses are available to provide specialized medical treatments, long-term care, or short-term assistance, all within the comfort of your home.</p>
                    <button id="request-nurse" ><a href='/requestNurse'>Request Private Nurse</a></button>
                </div>
            </div>
            <div class="services-item">
                <div class="circle">
               
                <FontAwesomeIcon icon={faUserDoctor} size="2x" color="white"   />
                </div>
                <div class="rectangle">
                    <p>Telemedicine Consultations: Access timely medical advice and consultations from board-certified physicians, right from the convenience of your living room. Whether it's an urgent matter or a routine check-up, our telemedicine services ensure that healthcare is just a click away.</p>
                    
                    <div>
    </div>
                    <button id="request-doctor"><a href='/requestDoctor'>Request Medical Consultation</a></button>

                </div>
            </div>
            <div class="services-item">
                <div class="circle">
                <FontAwesomeIcon icon={faVialVirus}  size="2x" color="white"  />
                </div>
                <div class="rectangle">
                    <p>At-Home Phlebotomy: Say goodbye to the hassle of visiting a lab for blood tests. Our skilled phlebotomists come to you, ensuring a seamless and stress-free experience. We collect blood samples at your convenience and ensure they reach the lab promptly for accurate testing.</p>
                    <button id="request-phlebotomist"><a href='/requestPhlebotomist'>Request Lab Tests</a></button>
                </div>
            </div> 
            <div class="services-item">
                <div class="circle">
                <FontAwesomeIcon icon={FaChartLine } size="2x" color="white" />
                </div>
                <div class="rectangle">
                    <p>Attach your medical result below so you can get a brief fast analysis!</p>
                    <p class='disclaimer'>Diclaimer: This analysis is AI generated and is not 100% dependable so don't hesitate to contact one of our Doctors for better medical plan</p>
                    <button id="analysis" ><a href='/result_analysis'>Analyze My Result</a></button>
                </div>
            </div>       
            </div>
            <div id="aboutUs">
        <div className="about">
        <div className="underlined-container">
      <p  id="aboutUs" className='title'>About Us</p>
        <div className="underline"></div>
      </div>
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
                        <img src={about} alt="2nd part"/>
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
                    <img src={about} alt="3rd"/>
                </div>
                </div>
                <div class="about-row">
                <div class="row-image">
                    <img src={about}/>
                </div>
                    <div class="row-item">
                    <h2>Our Commitment</h2>
                    <p>At Medicare, we are committed to putting your health and well-being first. We understand the challenges of navigating the healthcare system, which is why we're dedicated to providing you with the support and guidance you need every step of the way. Whether it's managing your medications, accessing expert advice, or simply having someone to talk to, we're here for you, 24/7.</p>
                </div>
            </div>        </div>
            </div>
            <div className="underlined-container">
      <p  id="aboutUs" className='title'>Contact Us</p>
        <div className="underline"></div>
      </div>
            <div className="contact-us">

        <div className='contact-column'>
        <div className="contact-methods">.
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
