import React, { useState } from 'react';
import axios from 'axios';
import '../styles/auth.css'; 

const AuthPage = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', loginData);
      console.log(response.data); // Handle successful login response
    } catch (error) {
      console.error(error.response.data); // Handle login error
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', registerData);
      console.log(response.data); // Handle successful registration response
    } catch (error) {
      console.error(error.response.data); // Handle registration error
    }
  };

  const handleInputChange = (e, setData) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className='bg'>
      <div className="login">
        <div className="form">
          <ul className="tab-group">
            <li className="tab active"><a href="#signup">Sign Up</a></li>
            <li className="tab"><a href="#login">Log In</a></li>
          </ul>
          
          <div className="tab-content">
            {/* Signup Form */}
            <div id="signup">   
              <h1>Sign Up for Free</h1>
              <form onSubmit={handleRegisterSubmit}>
                <div className="top-row">
                  <div className="field-wrap">
                    <label>
                      First Name<span className="req">*</span>
                    </label>
                    <input type="text" name="first_name" required autoComplete="off" onChange={(e) => handleInputChange(e, setRegisterData)} />
                  </div>
              
                  <div className="field-wrap">
                    <label>
                      Last Name<span className="req">*</span>
                    </label>
                    <input type="text" name="last_name" required autoComplete="off" onChange={(e) => handleInputChange(e, setRegisterData)} />
                  </div>
                </div>
                <div className="field-wrap">
                  <label>
                    Email Address<span className="req">*</span>
                  </label>
                  <input type="email" name="email" required autoComplete="off" onChange={(e) => handleInputChange(e, setRegisterData)} />
                </div>
                <div className="field-wrap">
                  <label>
                    Set A Password<span className="req">*</span>
                  </label>
                  <input type="password" name="password" required autoComplete="off" onChange={(e) => handleInputChange(e, setRegisterData)} />
                </div>
                <button type="submit" className="button button-block">Get Started</button>
              </form>
            </div>
            {/* Login Form */}
            <div id="login">   
              <h1>Welcome Back!</h1>
              <form onSubmit={handleLoginSubmit}>
                <div className="field-wrap">
                  <label>
                    Email Address<span className="req">*</span>
                  </label>
                  <input type="email" name="email" required autoComplete="off" onChange={(e) => handleInputChange(e, setLoginData)} />
                </div>
                <div className="field-wrap">
                  <label>
                    Password<span className="req">*</span>
                  </label>
                  <input type="password" name="password" required autoComplete="off" onChange={(e) => handleInputChange(e, setLoginData)} />
                </div>
                <p className="forgot"><a href="#">Forgot Password?</a></p>
                <button className="button button-block">Log In</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
