import React, { useState } from 'react';
import axios from 'axios';
import '../styles/auth.css'; 
import { Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/userActions';

const AuthPage = () => {
   const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const userData = useSelector(state => state.user.userData);
  const [signupError,setSignupError]= useState({})
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
     dispatch(loginUser(loginData));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register/', registerData);

      if(response.data.status=='success'){
        dispatch(loginUser(registerData));
      }
      
      else{
        let d=JSON.parse(response.data.message)
        setSignupError(d)
      }

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
    const [activeTab, setActiveTab] = useState('signup');

  const handleTabClick = (tab) => {
    setActiveTab(tab);

  };

  return (
    <div className='bg'>
      <div className="login">
        <div className="form">
      <ul className="tab-group">
        <li className={`tab ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => handleTabClick('signup')}><a href="#signup">Sign Up</a></li>
        <li className={`tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => handleTabClick('login')}><a href="#login">Log In</a></li>
      </ul>
          
          <div className="tab-content">
            {/* Signup Form */}
            <div id="signup" style={{ display: activeTab === 'signup' ? 'block' : 'none' }}>   
              <h1>Sign Up for Free</h1>
              <div className='display-error'> 
              <ul>
            {Object.entries(signupError).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
              </div>
              <form onSubmit={handleRegisterSubmit}>
                <div className="top-row">
                  <div className="field-wrap">
                    <input type="text" name="first_name" placeholder='First Name' autoComplete="off" onChange={(e) => handleInputChange(e, setRegisterData)} />
                  </div>
              
                  <div className="field-wrap">
                    
                    <input type="text" name="last_name"  placeholder='Last Name' required autoComplete="off" onChange={(e) => handleInputChange(e, setRegisterData)} />
                  </div>
                </div>
                <div className="field-wrap">
                  <input type="email" name="email"  placeholder='Email Address' required autoComplete="off" onChange={(e) => handleInputChange(e, setRegisterData)} />
                </div>
                <div className="field-wrap">
                  <select name='gender' onChange={(e) => handleInputChange(e, setRegisterData)} >
                  <option value="" disabled selected>Select Value</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  </select>  
                </div>
                <div className="field-wrap">
                  <input type="text" name="phone_number"  placeholder='Phone Number' required autoComplete="off" onChange={(e) => handleInputChange(e, setRegisterData)} />
                </div>
                <div className="field-wrap">
                  <input type="text" name="address"  placeholder='Address' required autoComplete="off" onChange={(e) => handleInputChange(e, setRegisterData)} />
                </div>
                <div className='field-wrap'>
                <input type="date" name="dob"  required autoComplete="off" onChange={(e) => handleInputChange(e, setRegisterData)} />

                </div>
                <div className="field-wrap">
                  <input type="password" name="password"  placeholder='Password' required autoComplete="off" onChange={(e) => handleInputChange(e, setRegisterData)} />
                </div>
                <button type="submit" className="button button-block">Get Started</button>
              </form>
            </div>
            {/* Login Form */}
            <div id="login" style={{ display: activeTab === 'login' ? 'block' : 'none' }}>   
              <h1>Welcome Back!</h1>
              <div className='display-error'> {error && <p>{error}</p>}
              </div>

              <form onSubmit={handleLoginSubmit}>
                <div className="field-wrap">
                  <input type="email" name="email"  placeholder='Email Address' required autoComplete="off" onChange={(e) => handleInputChange(e, setLoginData)} />
                </div>
                <div className="field-wrap">
              
                  <input type="password" name="password"  placeholder='Password' required autoComplete="off" onChange={(e) => handleInputChange(e, setLoginData)} />
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
