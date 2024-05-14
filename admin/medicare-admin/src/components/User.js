import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@mui/icons-material";
  import ToggleOnIcon from '@mui/icons-material/ToggleOn';

import { Link } from "react-router-dom";
import '../styles/user.css'
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Topbar from './Topbar';
import Sidebar from './Sidebar';
function User() {
    const [data, setData] = useState({});
    const [sidata, setsideData] = useState({});
    const { userId } = useParams(); // Get the userId from URL params
    
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('hi')
        const token = localStorage.getItem('admintoken');
        const response = await fetch('http://localhost:8000/api/get_user/'+userId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const userData = await response.json();
        console.log(userData)
        if(userData.status=='success'){
          setData(userData.user);
          setsideData(userData.user)
      }
      else{
        alert(data.message)
      }
        
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);
      const handleChange = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    };
 const handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('email').value;
    const email = document.getElementById('email').value;
    const type = document.getElementById('type').value;
    const phone_number = document.getElementById('phone_number').value;
    const status = document.getElementById('status').value; 
    const station = document.getElementById('station').value;
    const id=userId
    const formData = {
            id: userId,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            type: data.type,
            phone_number: data.phone_number,
        };
    try {
      const token = localStorage.getItem('admintoken');
      console.log(token)
      const response = await fetch('http://localhost:8000/api/updateadminusers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if(data.status=='success'){
        alert('updated successfully')
        window.location.href='/admin'
      }
      else{
        alert(data.message)
         window.location.href="/admin_login"
      }
      console.log(data); // Handle the response data here
    } catch (error) {
      console.error('Error:', error);
    }
  }; 

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">{sidata.first_name} {sidata.last_name}</span>
              <span className="userShowUserTitle">{data.type}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{sidata.email}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{sidata.phone_number}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>First Name</label>
                <input
                  type="text"
                  id="first_name"
                  placeholder={data.first_name}
                  className="userUpdateInput"
                  value={data.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="userUpdateItem">
                <label>Last Name</label>
                <input
                  type="text"
                  id="last_name"
                  placeholder={data.last_name}
                  className="userUpdateInput"
                  value={data.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder={data.email}
                  className="userUpdateInput"
                  onChange={handleChange}
                  value={data.email}
                  required
                />
              </div>
              <div className="userUpdateItem">
                <label>Type</label>
                 <select
                  placeholder="type"
                  id="type"
                  className="userUpdateInput"
                  value={data.type}
                  onChange={handleChange}
                  required
                >
                <option value="admin">Admin</option>
                <option value="Nurse">Nurse</option>
                <option value="Doctor">Doctor</option>
                <option value="Phlebotomist">Phlebotomist</option>
                </select>
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  id="phone_number"
                  placeholder={data.phone_number}
                  className="userUpdateInput"
                  value={data.phone_number}
                  onChange={handleChange}
                  required
                />
              </div>
               <button className="userUpdateButton">Update</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
export default User;