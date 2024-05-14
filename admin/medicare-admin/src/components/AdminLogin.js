import '../styles/adminlogin.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function AdminLogin() {
 const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
 const[error,setError]=useState();
   const handleInputChange = (e, setData) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      axios.post('http://localhost:8000/api/adminlogin', loginData).then(response => {

      if(response.data.status=='success'){
        localStorage.setItem('admintoken', response.data.token);
         localStorage.setItem('name', response.data.user.first_name);
         localStorage.setItem('usertype', response.data.user.type);
        window.location.href='/admin'
      }
      
      else{
      setError(response.data.message);
      }
    })
  
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
   <div className="wrapper-admin">
  <div className="container-admin">
    <div className="col-left-admin">
      <div className="login-text-admin">
        <h2>Welcome Back</h2>
      </div>
    </div>
    <div className="col-right-admin">
      <div className="login-form-admin">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className='admin-form'>
        <div className='display-error'> {error && <p>{error}</p>}</div>
          <p>
            <label>Username or email address<span>*</span></label>
            <input type="text" placeholder="Email" id="email" name="email" onChange={(e) => handleInputChange(e, setLoginData)} required/>
          </p>
          <p>
            <label>Password<span>*</span></label>
            <input type="password" name="password" placeholder="Password" onChange={(e) => handleInputChange(e, setLoginData)} id="password" required/>
          </p>
          <p>
            <input type="submit" value="Sign In" />
          </p>
          <p>
            <a href="">Forget Password?</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</div>
  );
}
export default AdminLogin;