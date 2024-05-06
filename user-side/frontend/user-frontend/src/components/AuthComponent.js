// AuthPage.js
import React, { useEffect } from 'react';
import '../styles/auth.css'; 

const AuthPage = () => {
  useEffect(() => {
    const handleInput = (e) => {
      const input = e.target;
      const label = input.previousSibling;
  
      if (e.type === 'keyup') {
        if (input.value === '') {
          label.classList.remove('active', 'highlight');
        } else {
          label.classList.add('active', 'highlight');
        }
      } else if (e.type === 'blur') {
        if (input.value === '') {
          label.classList.remove('active', 'highlight');
        } else {
          label.classList.remove('highlight');
        }
      } else if (e.type === 'focus') {
        if (input.value === '') {
          label.classList.remove('highlight');
        } else {
          label.classList.add('highlight');
        }
      }
    };

    const handleTabClick = (e) => {
      e.preventDefault();
      const tab = e.target.parentElement;
      const target = e.target.getAttribute('href');

      tab.classList.add('active');
      [...tab.parentElement.children].forEach((child) => {
        if (child !== tab) {
          child.classList.remove('active');
        }
      });

      const tabContent = document.querySelector('.tab-content');
      [...tabContent.children].forEach((div) => {
        if (div.id !== target.substr(1)) {
          div.style.display = 'none';
        } else {
          div.style.display = 'block';
        }
      });
    };

    document.querySelectorAll('.form input, .form textarea').forEach((element) => {
      element.addEventListener('keyup', handleInput);
      element.addEventListener('blur', handleInput);
      element.addEventListener('focus', handleInput);
    });

    document.querySelectorAll('.tab a').forEach((link) => {
      link.addEventListener('click', handleTabClick);
    });

    // Cleanup function to remove event listeners
    return () => {
      document.querySelectorAll('.form input, .form textarea').forEach((element) => {
        element.removeEventListener('keyup', handleInput);
        element.removeEventListener('blur', handleInput);
        element.removeEventListener('focus', handleInput);
      });

      document.querySelectorAll('.tab a').forEach((link) => {
        link.removeEventListener('click', handleTabClick);
      });
    };
  }, []);

  return (
    <div className='bg'>
    <div className="login">
    <div className="form">
      <ul className="tab-group">
        <li className="tab active"><a href="#signup">Sign Up</a></li>
        <li className="tab"><a href="#login">Log In</a></li>
      </ul>
      
      <div className="tab-content">
        <div id="signup">   
          <h1>Sign Up for Free</h1>
          <form action="/" method="post">
            <div className="top-row">
              <div className="field-wrap">
                <label>
                  First Name<span className="req">*</span>
                </label>
                <input type="text" required autoComplete="off" />
              </div>
          
              <div className="field-wrap">
                <label>
                  Last Name<span className="req">*</span>
                </label>
                <input type="text" required autoComplete="off"/>
              </div>
            </div>
            <div className="field-wrap">
              <label>
                Email Address<span className="req">*</span>
              </label>
              <input type="email" required autoComplete="off"/>
            </div>
            <div className="field-wrap">
              <label>
                Set A Password<span className="req">*</span>
              </label>
              <input type="password" required autoComplete="off"/>
            </div>
            <button type="submit" className="button button-block">Get Started</button>
          </form>
        </div>
        <div id="login">   
          <h1>Welcome Back!</h1>
          <form action="/" method="post">
            <div className="field-wrap">
              <label>
                Email Address<span className="req">*</span>
              </label>
              <input type="email" required autoComplete="off"/>
            </div>
            <div className="field-wrap">
              <label>
                Password<span className="req">*</span>
              </label>
              <input type="password" required autoComplete="off"/>
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
